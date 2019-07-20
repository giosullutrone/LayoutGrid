List<double> calculateGridLines(List<String> list, double space) {
  List<String> _list = list;

  ///[list.lenght + 1] becuase we will add the starting line = 0.0 later on
  List<double> _finalList = List<double>(list.length + 1);

  ///We get the total number of fractions 
  int sumOfFractions = getSumOfFractions(list);

  double _value = 0.0;
  double _freespace = space;

  ///To keep track of where we are inside our Stack (It's just an offset)
  double _currentPosition = 0.0;

  ///We calculate the free space by pre-calculating the pixels and % sizes 
  for (int _i = 0; _i < _list.length; _i++) {
    if (list[_i].endsWith("px")) {
      _value = double.parse(getValueFromString(_list[_i], "px"));

      _freespace -= _value;
    } else if (list[_i].endsWith("%")) {
      _value = double.parse(getValueFromString(_list[_i], "%")) / 100 * space;

      _freespace -= _value;
    }
  }

  ///We now start creating our list of pixels-converted lines
  for (int _i = 0; _i < _list.length; _i++) {
    if (list[_i].endsWith("px")) {
      _value = double.parse(getValueFromString(_list[_i], "px"));

      ///We have to do [_i + 1] 'cause our first place will have to be occupied by the 0.0 or in other words by our starting line (0)
      _finalList[_i + 1] = _value + _currentPosition;

      _currentPosition += _value;
    } else if (list[_i].endsWith("%")) {
      _value = double.parse(getValueFromString(_list[_i], "%")) / 100 * space;

      _finalList[_i + 1] = _value + _currentPosition;

      _currentPosition += _value;
    } else if (list[_i].endsWith("fr")) {
      _value = double.parse(getValueFromString(_list[_i], "fr")) / sumOfFractions * _freespace;

      _finalList[_i + 1] = _value + _currentPosition;

      _currentPosition += _value;
    } else if (list[_i] == "auto") {
      _value = _freespace;

      _finalList[_i + 1] = _value + _currentPosition;

      _currentPosition += _value;
      _freespace -= _value;
    }
  }

  _finalList[0] = 0.0;

  return _finalList;
}

int getSumOfFractions(List<String> list) {
  int _sumOfFractions = 0;

  for (int _i = 0; _i < list.length; _i++) {
    if (list[_i].endsWith("fr")) {
      _sumOfFractions += int.parse(getValueFromString(list[_i], "fr"));
    }
  }

  return _sumOfFractions;
}

///We remove blank spaces and remove the suffix from our actual values
String getValueFromString(String string, String subStringToRemove) {
  String _final;

  _final = string
      .replaceAll(RegExp(r' '), '')
      .substring(0, string.length - subStringToRemove.length);

  return _final;
}
