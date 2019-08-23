import 'package:flutter_web/material.dart';

import '../layout_grid_couple.dart';
import 'layout_grid_private_units.dart';
import 'layout_grid_units.dart';

class Layout {

  static List<double> createLayout(List<LayoutUnit> cols, List<LayoutUnit> rows, double width, double height) {

    double _freeWidth = width;
    double _freeHeight = height;

    List<double> _widthSizes = _initSizesListWithDefaultValue(cols.length);
    List<double> _heightSizes = _initSizesListWithDefaultValue(rows.length);

    _setIndexAndAxis(cols, Axis.vertical);
    _setIndexAndAxis(rows, Axis.horizontal);

    List<LayoutUnit> _joinedList = _initJoinedAndSortedList(cols, rows);

    for(int _i=0; _i<_joinedList.length; _i++) {

      if ((_joinedList[_i].axis == Axis.vertical && _widthSizes[_joinedList[_i].index] == -1.0) || 
          (_joinedList[_i].axis == Axis.horizontal && _heightSizes[_joinedList[_i].index] == -1.0)) {

        if (_joinedList[_i] is LayoutMinMax || _joinedList[_i] is LayoutFraction) {

          (_joinedList[_i].axis == Axis.vertical) ? _freeWidth = _manageMinMaxAndFractionsAndGetFreeSpace(_joinedList, _i, _widthSizes, width, _freeWidth):
                                                    _freeHeight = _manageMinMaxAndFractionsAndGetFreeSpace(_joinedList, _i, _heightSizes, height, _freeHeight);

        }else {
          (_joinedList[_i].axis == Axis.vertical) ? _freeWidth =  _manageDeterminedUnit(_joinedList, _i, _widthSizes, width, _freeWidth):
                                                    _freeHeight = _manageDeterminedUnit(_joinedList, _i, _heightSizes, height, _freeHeight);
        }
      }
    }

    return _calculateFinalList(cols, _widthSizes, _heightSizes);
  }

  static Map<String, double> getWidgetParameters(int index, List<LayoutGridCouple> couples, List<double> cols, List<double> rows) {

    Map<String, double> _map = Map<String,double>();

    if (couples[index].position != null) {
      _map.addAll({'top' : couples[index].position.dy,
                  'left' : couples[index].position.dx});
    }else {
      _map.addAll({'top' : rows[couples[index].row0],
                  'left' : cols[couples[index].col0]});
    }

    if (couples[index].size != null) {
      _map.addAll({'height' : couples[index].size.height,
                  'width' : couples[index].size.width});
    }else {
      _map.addAll({'height' : (rows[couples[index].row1] - rows[couples[index].row0] >= 0.0) ? rows[couples[index].row1] - rows[couples[index].row0] : 0.0,
                  'width' : (cols[couples[index].col1] - cols[couples[index].col0] >= 0.0) ? cols[couples[index].col1] - cols[couples[index].col0] : 0.0});
    }

    return _map;
  }

  static List<double> _initSizesListWithDefaultValue(int lenght) {
    List<double> _list = List<double>(lenght);

    _list.fillRange(0, _list.length, -1.0);

    return _list;
  }

  static void _setIndexAndAxis(List<LayoutUnit> list, Axis axis) {

    for (int _i=0; _i<list.length;_i++) {
      list[_i].index = _i;
    }

    list.forEach(
      (a) => a.axis = axis
    );
  }

  static List<LayoutUnit> _initJoinedAndSortedList(List<LayoutUnit> cols, List<LayoutUnit> rows) {
    List<LayoutUnit> _colsAndRows = [...cols, ...rows];
    _colsAndRows.sort((b,a) => a.priority.compareTo(b.priority));

    return _colsAndRows;
  }

  static double _manageMinMaxAndFractionsAndGetFreeSpace(List<LayoutUnit> joinedList, int joinedListIndex, List<double> sizes, double space, double freeSpace) {

    if(joinedList[joinedListIndex] is LayoutMinMax) {

      if ((joinedList[joinedListIndex] as LayoutMinMax).unit is LayoutFraction) {

        freeSpace = _manageFractionsAndGetFreeSpace(joinedList, joinedListIndex, sizes, space, freeSpace);

      }else {
        freeSpace = _manageDeterminedMinMaxAndGetFreeSpace(joinedList, joinedListIndex, sizes, space, freeSpace);
      }
    }else if (joinedList[joinedListIndex] is LayoutFraction) {

      freeSpace = _manageFractionsAndGetFreeSpace(joinedList, joinedListIndex, sizes, space, freeSpace);
    }

    return freeSpace;
  }

  static double _manageFractionsAndGetFreeSpace(List<LayoutUnit> joinedList, int joinedListIndex, List<double> sizes,double space, double freeSpace) {

    List<LayoutMinMax> _layoutMinMaxList = _initLayoutMinMaxList(joinedList, joinedListIndex);
    int _sumOfFractions = _getSumOfFractions(joinedList, joinedList[joinedListIndex].priority, joinedList[joinedListIndex].axis);

    double _finalFreeSpace = freeSpace;

    _layoutMinMaxList.sort((b,a) => a.subPriority.compareTo(b.subPriority));

    for (int _i=0; _i < _layoutMinMaxList.length; _i++) {
      if (_layoutMinMaxList[_i] is LayoutMinMax) {

        if(_layoutMinMaxList[_i].unit is LayoutFraction) {

          double value = (_layoutMinMaxList[_i].unit as LayoutFraction).getValue(_sumOfFractions, freeSpace);

          double maxValue = _getDeterminedValue(_layoutMinMaxList[_i].maxUnit, space, sizes);
          double minValue = _getDeterminedValue(_layoutMinMaxList[_i].minUnit, space, sizes);

          if (value > maxValue && maxValue != -1.0) {
            _sumOfFractions -= (_layoutMinMaxList[_i].unit as LayoutFraction).fraction;
            freeSpace -= maxValue;
            _finalFreeSpace -= maxValue;

            sizes[_layoutMinMaxList[_i].index] = maxValue;

          }else if (value < minValue && minValue != -1.0) {
            _sumOfFractions -= (_layoutMinMaxList[_i].unit as LayoutFraction).fraction;
            freeSpace -= minValue;
            _finalFreeSpace -= minValue;

            sizes[_layoutMinMaxList[_i].index] = minValue;          
          }
        }
      }
    }

    for (int _i=0; _i < joinedList.length; _i++) {

      if (sizes[joinedList[_i].index] == -1.0 && joinedList[_i].priority == joinedList[joinedListIndex].priority) {

        if (joinedList[_i] is LayoutMinMax) {

          if((joinedList[_i] as LayoutMinMax).unit is LayoutFraction) {

            double value =  ((joinedList[_i] as LayoutMinMax).unit as LayoutFraction).getValue(_sumOfFractions, freeSpace);

            _finalFreeSpace -= value;
            sizes[joinedList[_i].index] = value;
          }
        }else if (joinedList[_i] is LayoutFraction) {

          double value = (joinedList[_i] as LayoutFraction).getValue(_sumOfFractions, freeSpace);

          _finalFreeSpace -= value;
          sizes[joinedList[_i].index] = value;
        }
      }
    }

    if (_finalFreeSpace > 0.0) {

      for (int _i=0; _i < _layoutMinMaxList.length; _i++) {
        
        if (_layoutMinMaxList[_i] is LayoutMinMax && _finalFreeSpace > 0.0) {

          if(_layoutMinMaxList[_i].unit is LayoutFraction) {

            double maxValue = _getDeterminedValue(_layoutMinMaxList[_i].maxUnit, space, sizes);

            if (maxValue == -1.0) {

              sizes[_layoutMinMaxList[_i].index] += _finalFreeSpace;
              freeSpace = 0.0;
              _finalFreeSpace = 0.0;
            }else if (maxValue > sizes[_layoutMinMaxList[_i].index]){

              double value = maxValue - _finalFreeSpace;

              sizes[_layoutMinMaxList[_i].index] += value;
              freeSpace -= value;
              _finalFreeSpace -= value;
            }
          }
        }
      }
    }

    return _finalFreeSpace;
  }

  static List<LayoutMinMax> _initLayoutMinMaxList(List<LayoutUnit> joinedList, int joinedListIndex) {

    List<LayoutMinMax> _layoutMinMaxList = List<LayoutMinMax>();

    for (int _i=0; _i < joinedList.length; _i++) {

      if (joinedList[_i] is LayoutMinMax && joinedList[_i].priority == joinedList[joinedListIndex].priority) {

        if((joinedList[_i] as LayoutMinMax).unit is LayoutFraction) {
          _layoutMinMaxList.add(joinedList[_i]);
        }
      }
    }

    return _layoutMinMaxList;
  }

  static double _manageDeterminedMinMaxAndGetFreeSpace(List<LayoutUnit> joinedList, int joinedListIndex, List<double> sizes, double space, double freeSpace) {
    
    double _finalFreeSpace = freeSpace;

    double value = _getDeterminedValue((joinedList[joinedListIndex] as LayoutMinMax).unit, space, sizes);
    double minValue = _getDeterminedValue((joinedList[joinedListIndex] as LayoutMinMax).minUnit, space, sizes);
    double maxValue = _getDeterminedValue((joinedList[joinedListIndex] as LayoutMinMax).maxUnit, space, sizes);

    if (value > maxValue && maxValue != -1.0) {
      sizes[joinedList[joinedListIndex].index] = maxValue;
      _finalFreeSpace -= maxValue;

    }else if(value < minValue && minValue != -1.0){
      sizes[joinedList[joinedListIndex].index] = minValue;
      _finalFreeSpace -= minValue;

    }else {
      sizes[joinedList[joinedListIndex].index] = value;
      _finalFreeSpace -= value;
    }

    return _finalFreeSpace;
  }

  static double _manageDeterminedUnit(List<LayoutUnit> joinedList, int joinedListIndex, List<double> sizes, double space, double freeSpace) {

    double _finalFreeSpace = freeSpace;

    double value = _getDeterminedValue(joinedList[joinedListIndex], space, sizes);

    sizes[joinedList[joinedListIndex].index] = value;
    _finalFreeSpace -= value;

    return _finalFreeSpace;
  }

  static double _getDeterminedValue(LayoutUnit unit, double space, List<double> sizes) {
    double _value = 0.0;

    if (unit is LayoutPixel) {
      _value = unit.getValue();

    }else if (unit is LayoutPercentage) {
      _value = unit.getValue(space);

    }else if (unit is LayoutDependent) {
      _value = unit.getValue(sizes);

    }else if (unit == null) {
      _value = -1.0;
    }

    return _value;
  }

  static int _getSumOfFractions(List<LayoutUnit> list, int priority, Axis axis) {
    int _sumOfFractions = 0;

    for (int _i=0; _i < list.length; _i++) {

      if(list[_i].priority == priority && list[_i].axis == axis) {

        if (list[_i] is LayoutFraction) {
          _sumOfFractions += (list[_i] as LayoutFraction).fraction;

        }else if (list[_i] is LayoutMinMax) {

          if ((list[_i] as LayoutMinMax).unit is LayoutFraction) {
            _sumOfFractions += ((list[_i] as LayoutMinMax).unit as LayoutFraction).fraction;
          }
        }
      }
    }

    return _sumOfFractions;
  }

  static List<double> _calculateFinalList(List<LayoutUnit> cols, List<double> widthSizes, List<double> heightSizes) {

    List<double> _finalList = List<double>(widthSizes.length + heightSizes.length);
    int colsLenght = cols.length;

    double widthPosition = 0.0, heightPosition = 0.0;

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
}