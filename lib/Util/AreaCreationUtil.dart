import '../layouGrid.dart';

List<LayoutGridCouple> getPositionedGridCoupleList(List<List<String>> areas, List<LayoutGridCouple> couples) {

  List<LayoutGridCouple> _couples = couples;
  String _name;

  for (int _i=0; _i<_couples.length; _i++) {

    _name = _couples[_i].name;

    if (_name != null) {
      _couples[_i] = getPositionededGridCouple(areas, _couples[_i]);
    }
  }

  return _couples;
}

LayoutGridCouple getPositionededGridCouple(List<List<String>> areas, LayoutGridCouple couple) {

  LayoutGridCouple _child = couple;

  for (int _i=0; _i<areas.length; _i++) {
    for (int _j=0; _j<areas[_i].length; _j++) {

      if (areas[_i][_j] == _child.name) {

        if(_child.col0 > _j || _child.col0 == -1) {
          _child.col0 = _j;
        }
        if(_child.col1 < _j + 1 || _child.col1 == -1) {
          _child.col1 = _j + 1;
        }

        if(_child.row0 > _i || _child.row0 == -1) {
          _child.row0 = _i;
        }
        if(_child.row1 < _i + 1|| _child.row1 == -1) {
          _child.row1 = _i + 1;
        }
      }

    }
  }

  return _child;  
}