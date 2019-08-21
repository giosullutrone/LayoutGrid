import 'package:flutter_web/material.dart';

import 'layout_grid_units.dart';

List<double> createLayout(List<LayoutUnit> cols, List<LayoutUnit> rows, double width, double height) {

  double _freeWidth = width;
  double _freeHeight = height;

  List<double> _widthSizes = initSizesListWithDefaultValue(cols.length);
  List<double> _heightSizes = initSizesListWithDefaultValue(rows.length);

  setIndexAndAxis(cols, Axis.vertical);
  setIndexAndAxis(rows, Axis.horizontal);

  List<LayoutUnit> _joinedList = initJoinedAndSortedList(cols, rows);

  for(int _i=0; _i<_joinedList.length; _i++) {

    if ((_joinedList[_i].axis == Axis.vertical && _widthSizes[_joinedList[_i].index] == -1.0) || 
        (_joinedList[_i].axis == Axis.horizontal && _heightSizes[_joinedList[_i].index] == -1.0)) {

      print("$_i");

      if (_joinedList[_i] is LayoutMinMax || _joinedList[_i] is LayoutFraction) {

        (_joinedList[_i].axis == Axis.vertical) ? _freeWidth = manageMinMaxAndFractionsAndGetFreeSpace(_joinedList, _i, _widthSizes, width, _freeWidth):
                                                  _freeHeight = manageMinMaxAndFractionsAndGetFreeSpace(_joinedList, _i, _heightSizes, height, _freeHeight);

      }else {
        (_joinedList[_i].axis == Axis.vertical) ? _freeWidth =  manageDeterminedUnit(_joinedList, _i, _widthSizes, width, _freeWidth):
                                                  _freeHeight = manageDeterminedUnit(_joinedList, _i, _heightSizes, height, _freeHeight);
      }
    }
  }

  return calculateFinalList(cols, _widthSizes, _heightSizes);
}

List<double> initSizesListWithDefaultValue(int lenght) {
  List<double> _list = List<double>(lenght);

  _list.fillRange(0, _list.length, -1.0);

  return _list;
}

void setIndexAndAxis(List<LayoutUnit> list, Axis axis) {

  for (int _i=0; _i<list.length;_i++) {
    list[_i].index = _i;
  }

  list.forEach(
    (a) => a.axis = axis
  );
}

List<LayoutUnit> initJoinedAndSortedList(List<LayoutUnit> cols, List<LayoutUnit> rows) {
  List<LayoutUnit> _colsAndRows = [...cols, ...rows];
  _colsAndRows.sort((b,a) => a.priority.compareTo(b.priority));

  return _colsAndRows;
}

double manageMinMaxAndFractionsAndGetFreeSpace(List<LayoutUnit> joinedList, int joinedListIndex, List<double> sizes, double space, double freeSpace) {

  if(joinedList[joinedListIndex] is LayoutMinMax) {

    if ((joinedList[joinedListIndex] as LayoutMinMax).minUnit is LayoutFraction || 
        (joinedList[joinedListIndex] as LayoutMinMax).maxUnit is LayoutFraction ) {

      freeSpace = manageFractionsAndGetFreeSpace(joinedList, joinedListIndex, sizes, space, freeSpace);

    }else {
      freeSpace = manageDeterminedMinMaxAndGetFreeSpace(joinedList, joinedListIndex, sizes, space, freeSpace);
    }
  }else if (joinedList[joinedListIndex] is LayoutFraction) {

    freeSpace = manageFractionsAndGetFreeSpace(joinedList, joinedListIndex, sizes, space, freeSpace);
  }

  return freeSpace;
}

double manageFractionsAndGetFreeSpace(List<LayoutUnit> joinedList, int joinedListIndex, List<double> sizes,double space, double freeSpace) {

  List<LayoutMinMax> _layoutMinMaxList = initLayoutMinMaxList(joinedList, joinedListIndex);
  int _sumOfFractions = getSumOfFractions(joinedList, joinedList[joinedListIndex].priority, joinedList[joinedListIndex].axis);

  double _finalFreeSpace = freeSpace;

  _layoutMinMaxList.sort((b,a) => a.subPriority.compareTo(b.subPriority));

  for (int _i=0; _i < _layoutMinMaxList.length; _i++) {
    if (_layoutMinMaxList[_i] is LayoutMinMax) {

      if(_layoutMinMaxList[_i].maxUnit is LayoutFraction) {        

        double maxValue = (_layoutMinMaxList[_i].maxUnit as LayoutFraction).getValue(_sumOfFractions, freeSpace);
        double minValue = getDeterminedValue(_layoutMinMaxList[_i].minUnit, space, sizes);
        print("min value: $minValue, max value: $maxValue");

        if (maxValue < minValue) {
          _sumOfFractions -= (_layoutMinMaxList[_i].maxUnit as LayoutFraction).fraction;
          freeSpace -= minValue;
          _finalFreeSpace -= minValue;

          print("free space: $freeSpace");

          sizes[_layoutMinMaxList[_i].index] = minValue;
        }
      }else if (_layoutMinMaxList[_i] is LayoutMinMax) {

        if(_layoutMinMaxList[_i].minUnit is LayoutFraction) {

          double minValue = (_layoutMinMaxList[_i].minUnit as LayoutFraction).getValue(_sumOfFractions, freeSpace);
          double maxValue = getDeterminedValue(_layoutMinMaxList[_i].maxUnit, space, sizes);
          print("min value: $minValue, max value: $maxValue");

          if (maxValue < minValue) {
            _sumOfFractions -= (_layoutMinMaxList[_i].minUnit as LayoutFraction).fraction;
            freeSpace -= maxValue;
            _finalFreeSpace -= maxValue;

            print("free space: $freeSpace");

            sizes[_layoutMinMaxList[_i].index] = maxValue;
          }
        }
      }
    }
  }

  for (int _i=0; _i < joinedList.length; _i++) {

    if (sizes[joinedList[_i].index] == -1.0 && joinedList[_i].priority == joinedList[joinedListIndex].priority) {

      if (joinedList[_i] is LayoutMinMax) {

        if((joinedList[_i] as LayoutMinMax).maxUnit is LayoutFraction) {

          double maxValue =  ((joinedList[_i] as LayoutMinMax).maxUnit as LayoutFraction).getValue(_sumOfFractions, freeSpace);

          _finalFreeSpace = 0.0;
          sizes[joinedList[_i].index] = maxValue;

        }else if((joinedList[_i] as LayoutMinMax).minUnit is LayoutFraction) {

          double minValue = ((joinedList[_i] as LayoutMinMax).minUnit as LayoutFraction).getValue(_sumOfFractions, freeSpace);

          _finalFreeSpace = 0.0;
          sizes[joinedList[_i].index] = minValue;

        }

      }else if (joinedList[_i] is LayoutFraction) {

        double value = (joinedList[_i] as LayoutFraction).getValue(_sumOfFractions, freeSpace);

        _finalFreeSpace = 0.0;
        sizes[joinedList[_i].index] = value;
      }
    }
  }

  return _finalFreeSpace;
}

List<LayoutMinMax> initLayoutMinMaxList(List<LayoutUnit> joinedList, int joinedListIndex) {

  List<LayoutMinMax> _layoutMinMaxList = List<LayoutMinMax>();

  for (int _i=0; _i < joinedList.length; _i++) {

    if (joinedList[_i] is LayoutMinMax && joinedList[_i].priority == joinedList[joinedListIndex].priority) {

      if((joinedList[_i] as LayoutMinMax).maxUnit is LayoutFraction || (joinedList[_i] as LayoutMinMax).minUnit is LayoutFraction) {
        _layoutMinMaxList.add(joinedList[_i]);
      }
    }
  }

  return _layoutMinMaxList;
}

double manageDeterminedMinMaxAndGetFreeSpace(List<LayoutUnit> joinedList, int joinedListIndex, List<double> sizes, double space, double freeSpace) {
  
  double _finalFreeSpace = freeSpace;

  double minValue = getDeterminedValue((joinedList[joinedListIndex] as LayoutMinMax).minUnit, space, sizes);
  double maxValue = getDeterminedValue((joinedList[joinedListIndex] as LayoutMinMax).maxUnit, space, sizes);

  if (maxValue > minValue) {
    sizes[joinedList[joinedListIndex].index] = maxValue;
    _finalFreeSpace -= maxValue;
  }else {
    sizes[joinedList[joinedListIndex].index] = minValue;
    _finalFreeSpace -= minValue;
  }

  return _finalFreeSpace;
}

double manageDeterminedUnit(List<LayoutUnit> joinedList, int joinedListIndex, List<double> sizes, double space, double freeSpace) {

  double _finalFreeSpace = freeSpace;

  double value = getDeterminedValue(joinedList[joinedListIndex], space, sizes);

  sizes[joinedList[joinedListIndex].index] = value;
  _finalFreeSpace -= value;

  return _finalFreeSpace;
}

double getDeterminedValue(LayoutUnit unit, double space, List<double> sizes) {
  double _value = 0.0;

  if (unit is LayoutPixel) {
    _value = unit.getValue();

  }else if (unit is LayoutPercentage) {
    _value = unit.getValue(space);

  }else if (unit is LayoutDependent) {
    _value = unit.getValue(sizes);

  }

  return _value;
}

int getSumOfFractions(List<LayoutUnit> list, int priority, Axis axis) {
  int _sumOfFractions = 0;

  for (int _i=0; _i < list.length; _i++) {

    if(list[_i].priority == priority && list[_i].axis == axis) {

      if (list[_i] is LayoutFraction) {
        _sumOfFractions += (list[_i] as LayoutFraction).fraction;

      }else if (list[_i] is LayoutMinMax) {

        if ((list[_i] as LayoutMinMax).maxUnit is LayoutFraction) {
          _sumOfFractions += ((list[_i] as LayoutMinMax).maxUnit as LayoutFraction).fraction;

        }else if ((list[_i] as LayoutMinMax).minUnit is LayoutFraction) {
          _sumOfFractions += ((list[_i] as LayoutMinMax).minUnit as LayoutFraction).fraction;
        }
      }
    }
  }

  return _sumOfFractions;
}

List<double> calculateFinalList(List<LayoutUnit> cols, List<double> widthSizes, List<double> heightSizes) {

  List<double> _finalList = List<double>(widthSizes.length + heightSizes.length);
  int colsLenght = cols.length;

  double widthPosition = 0.0, heightPosition = 0.0;

  print(widthSizes);
  print(heightSizes);

  for(int _i=0; _i < _finalList.length; _i++) {

    if (_i < colsLenght) {
      _finalList[_i] = widthPosition + widthSizes[_i];
      widthPosition += widthSizes[_i];
    }else {
      _finalList[_i] = heightPosition + heightSizes[_i - colsLenght];
      heightPosition += heightSizes[_i - colsLenght];
    }
  }

  return _finalList;
}