import 'layout_grid_unit.dart';
import 'layout_grid_unit_classes.dart';

//Used to convert LayoutUnits into their corresponding pixels sizes
List<double> calculateGridLines(List<LayoutUnit> _list, double space) {
  //We create a list where we register our minMax final values
  List<double> _listOfMinMaxValues = List<double>.filled(_list.length, 0.0);

  //list.lenght + 1 becuase we will add the starting line = 0.0 later on
  List<double> _finalList = List<double>(_list.length + 1);

  //We get the total number of fractions
  int _sumOfFractions = getSumOfFractions(_list);

  //We calculate the free space by pre-calculating the pixels and % sizes
  double _freeSpace = getFreeSpace(_list, space);

  //To keep track of where we are inside our Stack (It's just an offset)
  double _currentPosition = 0.0;

  //We create a copy of the original free space
  double _copyOfFreeSpace = _freeSpace;
  double _spaceOccupiedByMinMaxFractions = 0.0;
  bool hasToReCalculate = false;

  //We now check if MinMax have pixels or percentage as MaxUnit and if they have then we check that
  //they do exceed or are equal to our MinUnit
  for (int _i = 0; _i < _list.length; _i++) {
    double _maxValue = 0.0;
    double _minValue = 0.0;
    LayoutMinMax _layoutMinMax;

    if (_list[_i] is LayoutMinMax) {
      _layoutMinMax = _list[_i];

      if (_layoutMinMax.getMaxUnit() is LayoutPixel ||
          _layoutMinMax.getMaxUnit() is LayoutPercentage) {
        _maxValue = getValueFromLayoutUnit(
            _layoutMinMax.getMaxUnit(), space, _freeSpace, _sumOfFractions);
        _minValue = getValueFromLayoutUnit(
            _layoutMinMax.getMinUnit(), space, _freeSpace, _sumOfFractions);

        if (_maxValue < _freeSpace) {
          _listOfMinMaxValues[_i] = _maxValue;
          _freeSpace -= _maxValue;
        } else {
          if (_freeSpace > _minValue) {
            _listOfMinMaxValues[_i] = _freeSpace;
            _freeSpace = 0;
          } else if (_freeSpace < _minValue) {
            _listOfMinMaxValues[_i] = _minValue;
            _freeSpace = 0;
          }
        }
      }
    }
  }

  //We now check if MinMax have fraction as MaxUnit and if they have then we check that
  //they do exceed or are equal to our MinUnit
  for (int _i = 0; _i < _list.length; _i++) {
    double _maxValue = 0.0;
    double _minValue = 0.0;
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

          _spaceOccupiedByMinMaxFractions += _minValue;
          _listOfMinMaxValues[_i] = _minValue;

          hasToReCalculate = true;
        } else {

          _spaceOccupiedByMinMaxFractions += _maxValue;

          _listOfMinMaxValues[_i] = _maxValue;
        }
      }
    }
  }

  //If hasToReCalculate then it means that some MinMax fraction didn't have enought space and had to use the minUnit
  //That means that the space avaible to the other MinMax with Pixels and Percentages just shrinked and we have to
  //Calculate them again
  if (hasToReCalculate) {

    //We redo our calculations with our space occupied by MinMax fractions removed
    _copyOfFreeSpace -= _spaceOccupiedByMinMaxFractions;

    for (int _i = 0; _i < _list.length; _i++) {
      double _maxValue = 0.0;
      double _minValue = 0.0;
      LayoutMinMax _layoutMinMax;

      if (_list[_i] is LayoutMinMax) {
        _layoutMinMax = _list[_i];

        if (_layoutMinMax.getMaxUnit() is LayoutPixel || _layoutMinMax.getMaxUnit() is LayoutPercentage) {
          _maxValue = getValueFromLayoutUnit(_layoutMinMax.getMaxUnit(), space, _copyOfFreeSpace, _sumOfFractions);
          _minValue = getValueFromLayoutUnit(_layoutMinMax.getMinUnit(), space, _copyOfFreeSpace, _sumOfFractions);

          if (_maxValue < _copyOfFreeSpace) {
            _listOfMinMaxValues[_i] = _maxValue;
            _copyOfFreeSpace -= _maxValue;
          } else {
            if (_copyOfFreeSpace > _minValue) {
              _listOfMinMaxValues[_i] = _copyOfFreeSpace;
              _copyOfFreeSpace = 0;
            } else if (_copyOfFreeSpace <= _minValue) {
              _listOfMinMaxValues[_i] = _minValue;
              _copyOfFreeSpace = 0;
            }
          }
        }
      }
    }
  }

  //We now create our list of pixels-converted lines
  for (int _i = 0; _i < _list.length; _i++) {
    double _value = 0.0;

    if (_list[_i] is SingleUnit) {
      _value = getValueFromLayoutUnit(_list[_i], space, _freeSpace, _sumOfFractions);

      _finalList[_i + 1] = _value + _currentPosition;
      _currentPosition += _value;
    } else {
      _value = _listOfMinMaxValues[_i];

      _finalList[_i + 1] = _value + _currentPosition;
      _currentPosition += _value;
    }
  }
  _finalList[0] = 0.0;

  return _finalList;
}

//Same use of the previous function, but in this case we provide a list of already calculated lines
//and we access them to calculate the Dependent Units
List<double> calculateGridLinesWithDependetUnit(List<LayoutUnit> _list, double space, List<double> _listOfDoubles) {
  //We create a list where we register our minMax final values
  List<double> _listOfMinMaxValues = List<double>.filled(_list.length, 0.0);

  //list.lenght + 1 because we will add the starting line = 0.0 later on
  List<double> _finalList = List<double>(_list.length + 1);

  //We get the total number of fractions
  int _sumOfFractions = getSumOfFractions(_list);

  //We calculate the free space by pre-calculating the pixels, % sizes AND also the dependent units
  double _freeSpace = getFreeSpaceWithDependentUnit(_list, space, _listOfDoubles);

  //To keep track of where we are inside our Stack (It's just an offset)
  double _currentPosition = 0.0;

  //We now check if MinMax have pixels or percentage as MaxUnit and if they have then we check that
  //they do exceed or are equal to our MinUnit
  for (int _i = 0; _i < _list.length; _i++) {
    double _maxValue = 0.0;
    double _minValue = 0.0;
    LayoutMinMax _layoutMinMax;

    if (_list[_i] is LayoutMinMax) {
      _layoutMinMax = _list[_i];

      if (_layoutMinMax.getMaxUnit() is LayoutPixel ||
          _layoutMinMax.getMaxUnit() is LayoutPercentage ||
          _layoutMinMax.getMaxUnit() is LayoutDependent) {

        _maxValue = getValueFromLayoutUnitWithDependentUnit(_layoutMinMax.getMaxUnit(), space, _freeSpace, _sumOfFractions, _listOfDoubles);
        _minValue = getValueFromLayoutUnitWithDependentUnit(_layoutMinMax.getMinUnit(), space, _freeSpace, _sumOfFractions, _listOfDoubles);

        if (_maxValue < _freeSpace) {

          _listOfMinMaxValues[_i] = _maxValue;
          _freeSpace -= _maxValue;
        } else {
          if (_freeSpace > _minValue) {

            _listOfMinMaxValues[_i] = _freeSpace;
            _freeSpace = 0;
          } else if (_freeSpace < _minValue) {

            _listOfMinMaxValues[_i] = _minValue;
            _freeSpace = 0;
          }
        }
      }
    }
  }

  //We now check if MinMax have fraction as MaxUnit and if they have then we check that
  //they do exceed or are equal to our MinUnit
  for (int _i = 0; _i < _list.length; _i++) {
    double _maxValue = 0.0;
    double _minValue = 0.0;
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

          _listOfMinMaxValues[_i] = _minValue;
        } else {
          _listOfMinMaxValues[_i] = _maxValue;
        }
      }
    }
  }

  //We now create our list of pixels-converted lines
  for (int _i = 0; _i < _list.length; _i++) {
    double _value = 0.0;

    if (_list[_i] is SingleUnit) {
      _value =
          getValueFromLayoutUnit(_list[_i], space, _freeSpace, _sumOfFractions);

      _finalList[_i + 1] = _value + _currentPosition;
      _currentPosition += _value;
    } else if (_list[_i] is LayoutDependent) {
      _value = getDependentLineValue(_list[_i], _listOfDoubles);

      _finalList[_i + 1] = _value + _currentPosition;
      _currentPosition += _value;
    } else {
      _value = _listOfMinMaxValues[_i];

      _finalList[_i + 1] = _value + _currentPosition;
      _currentPosition += _value;
    }
  }
  _finalList[0] = 0.0;

  return _finalList;
}

double getValueFromLayoutUnit(LayoutUnit layoutUnit, double space, double freeSpace, int sumOfFractions) {
  double _value = 0.0;

  if (layoutUnit is LayoutPixel) {
    _value = layoutUnit.pixels;
  } else if (layoutUnit is LayoutPercentage) {
    _value = layoutUnit.getValue(space);
  } else if (layoutUnit is LayoutFraction) {
    _value = layoutUnit.getValue(sumOfFractions, freeSpace);
  }

  return _value;
}

double getValueFromLayoutUnitWithDependentUnit(LayoutUnit layoutUnit, double space, double freeSpace, int sumOfFractions, List<double> _listOfDoubles) {
  double _value = 0.0;

  if (layoutUnit is LayoutPixel) {
    _value = layoutUnit.pixels;
  } else if (layoutUnit is LayoutPercentage) {
    _value = layoutUnit.getValue(space);
  } else if (layoutUnit is LayoutFraction) {
    _value = layoutUnit.getValue(sumOfFractions, freeSpace);
  }else if (layoutUnit is LayoutDependent) {
    _value = getDependentLineValue(layoutUnit, _listOfDoubles);
  }

  return _value;
}

double getFreeSpace(List<LayoutUnit> listToGetSpaceFrom, double space) {
  double _freeSpace = space;

  for (int _i = 0; _i < listToGetSpaceFrom.length; _i++) {
    if (listToGetSpaceFrom[_i] is LayoutPixel ||
        listToGetSpaceFrom[_i] is LayoutPercentage) {
      _freeSpace -= getValueFromLayoutUnit(listToGetSpaceFrom[_i], space, 0, 0);
    }
  }

  return _freeSpace;
}

double getFreeSpaceWithDependentUnit(List<LayoutUnit> listToGetSpaceFrom,double space, List<double> _listOfDoubles) {
  double _freeSpace = space;

  for (int _i = 0; _i < listToGetSpaceFrom.length; _i++) {
    if (listToGetSpaceFrom[_i] is LayoutPixel ||
        listToGetSpaceFrom[_i] is LayoutPercentage) {
      _freeSpace -= getValueFromLayoutUnit(listToGetSpaceFrom[_i], space, 0, 0);
    } else if (listToGetSpaceFrom[_i] is LayoutDependent) {
      _freeSpace -=
          getDependentLineValue(listToGetSpaceFrom[_i], _listOfDoubles);
    }
  }

  return _freeSpace;
}

double getDependentLineValue(LayoutDependent _layoutDependent, List<double> _listOfDoubles) {
  double _value = 0.0;

  _value =
      (_listOfDoubles[_layoutDependent.line] - _listOfDoubles[_layoutDependent.line - 1]) * _layoutDependent.multiplicator;
  
  return _value;
}

int getSumOfFractions(List<LayoutUnit> listToSumFunctionOf) {
  LayoutFraction _layoutFraction;
  LayoutMinMax _layoutMinMax;
  int _sumOfFractions = 0;

  for (int _i = 0; _i < listToSumFunctionOf.length; _i++) {
    if (listToSumFunctionOf[_i] is LayoutFraction) {
      _layoutFraction = listToSumFunctionOf[_i];
      _sumOfFractions += _layoutFraction.fraction;
    } else if (listToSumFunctionOf[_i] is LayoutMinMax) {
      _layoutMinMax = listToSumFunctionOf[_i];

      if (_layoutMinMax.getMaxUnit() is LayoutFraction) {
        _layoutFraction = _layoutMinMax.getMaxUnit();
        _sumOfFractions += _layoutFraction.fraction;
      }
    }
  }

  return _sumOfFractions;
}
