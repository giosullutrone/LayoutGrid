import 'layout_grid_unit.dart';
import 'layout_grid_unit_classes.dart';

List<double> calculateGridLines(List<LayoutUnit> list, double space) {

  //We create a copy becuase we are going to have to modify it in this cycle
  List<LayoutUnit> _list = list;
  //list.lenght + 1 becuase we will add the starting line = 0.0 later on
  List<double> _finalList = List<double>(list.length + 1);

  //We get the total number of fractions 
  int _sumOfFractions = getSumOfFractions(list);

  //We calculate the free space by pre-calculating the pixels and % sizes 
  double _freeSpace = getFreeSpace(list, space);

  //To keep track of where we are inside our Stack (It's just an offset)
  double _currentPosition = 0.0;

  //We now check if MinMax have pixels or percentage as MaxUnit and if they have then we check that
  //they do exceed or are equal to our MinUnit
  for (int _i = 0; _i < _list.length; _i++) {

    double _maxValue;
    double _minValue;
    LayoutPixel _newLayoutPixel = LayoutPixel();
    LayoutMinMax _layoutMinMax;

    if (_list[_i] is LayoutMinMax) {
      _layoutMinMax = _list[_i];

      if (_layoutMinMax.getMaxUnit() is LayoutPixel || _layoutMinMax.getMaxUnit() is LayoutPercentage) {

        _maxValue = getValueFromLayoutUnit(_layoutMinMax.getMaxUnit(), space, _freeSpace, _sumOfFractions);
        _minValue = getValueFromLayoutUnit(_layoutMinMax.getMinUnit(), space, _freeSpace, _sumOfFractions);

        if(_maxValue < _freeSpace) {
          _freeSpace -= _maxValue;
        }else {
          if(_freeSpace > _minValue) {
            _newLayoutPixel.pixels = _freeSpace;
            _freeSpace = 0;
          }else if (_freeSpace < _minValue) {
            _newLayoutPixel.pixels = _minValue;
            _freeSpace = 0;
          }

          _layoutMinMax.maxUnit = _newLayoutPixel;
          _list[_i] = _layoutMinMax;
        }
      }
    }
  }

  //We now check if MinMax have fraction as MaxUnit and if they have then we check that
  //they do exceed or are equal to our MinUnit
  for (int _i = 0; _i < _list.length; _i++) {

    double _maxValue;
    double _minValue;
    LayoutPixel _newLayoutPixel = LayoutPixel();
    LayoutFraction _layoutFraction;
    LayoutMinMax _layoutMinMax;

    if (_list[_i] is LayoutMinMax) {
      _layoutMinMax = _list[_i];

      if (_layoutMinMax.getMaxUnit() is LayoutFraction) {

        _maxValue = getValueFromLayoutUnit(_layoutMinMax.getMaxUnit(), space, _freeSpace, _sumOfFractions);
        _minValue = getValueFromLayoutUnit(_layoutMinMax.getMinUnit(), space, _freeSpace, _sumOfFractions);

        if (_minValue > _maxValue) {
          _layoutFraction = _layoutMinMax.getMaxUnit();
          _sumOfFractions -= _layoutFraction.fraction;
          _freeSpace -= _minValue;

          _newLayoutPixel.pixels = _minValue;
          _layoutMinMax.maxUnit = _newLayoutPixel;
          _list[_i] = _layoutMinMax;
        }
      }
    }
  }

  //We now create our list of pixels-converted lines
  for (int _i = 0; _i < _list.length; _i++) {

    LayoutMinMax _layoutMinMax;
    double _value = 0.0;

    if(_list[_i] is SingleUnit) {
      _value = getValueFromLayoutUnit(_list[_i], space, _freeSpace, _sumOfFractions);

      _finalList[_i + 1] = _value + _currentPosition;
      _currentPosition += _value;
    }else {
      _layoutMinMax = _list[_i];
      _value = getValueFromLayoutUnit(_layoutMinMax.getMaxUnit(), space, _freeSpace, _sumOfFractions);

      _finalList[_i + 1] = _value + _currentPosition;
      _currentPosition += _value;
    }
  }
  _finalList[0] = 0.0;

  return _finalList;
}

double getValueFromLayoutUnit(LayoutUnit layoutUnit, double space,double freeSpace, int sumOfFractions) {
  double _value = 0.0;

  if (layoutUnit is LayoutPixel) {
    _value = layoutUnit.pixels;
  }else if (layoutUnit is LayoutPercentage) {
    _value = layoutUnit.getValue(space);
  }else if (layoutUnit is LayoutFraction) {
    _value = layoutUnit.getValue(sumOfFractions, freeSpace);
  }

  return _value;
}

double getFreeSpace(List<LayoutUnit> list, double space) {
  double _freeSpace = space;

  for (int _i = 0; _i < list.length; _i++) {
    if (list[_i] is LayoutPixel || list[_i] is LayoutPercentage) {

      _freeSpace -= getValueFromLayoutUnit(list[_i], space, 0, 0);
    }
  }

  return _freeSpace;
}

int getSumOfFractions(List<LayoutUnit> list) {
  LayoutFraction _layoutFraction;
  LayoutMinMax _layoutMinMax;
  int _sumOfFractions = 0;

  for (int _i = 0; _i < list.length; _i++) {
    if (list[_i] is LayoutFraction) {
      _layoutFraction = list[_i];
      _sumOfFractions += _layoutFraction.fraction;
    }else if (list[_i] is LayoutMinMax) {
      _layoutMinMax = list[_i];

      if (_layoutMinMax.getMaxUnit() is LayoutFraction) {
        _layoutFraction = _layoutMinMax.getMaxUnit();
        _sumOfFractions += _layoutFraction.fraction;
      } 
    }
  }

  return _sumOfFractions;
}