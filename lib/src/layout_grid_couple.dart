import 'package:flutter_web/material.dart';

///Used to link a widget to a specific area
///
///The area can be assigned by specifing beginning [col0] and [row0] and ending [col1] and [row1]
///
///The [isNested] var is used to tell the main [LayoutGrid] that it is dealing with a [NestedLayoutGrid]
///and it has to pass a [width] and [height] to it
class LayoutGridCouple {
  LayoutGridCouple(
      {@required this.widget,
      this.name,
      this.col0 = -1,
      this.col1 = -1,
      this.row0 = -1,
      this.row1 = -1,
      this.offset = const Offset(0.0, 0.0),
      this.size,
      this.position,
      this.key,
      this.alignment = const Alignment(-1.0, -1.0),
      this.modelKey});

  ///[widget] to link the area with
  final Widget widget;

  ///Cols and rows of the area to link the [widget] with
  int col0, col1, row0, row1;

  ///Name of the area to link the widget with
  final String name;

  ///Optional offset from top-left point of the area
  final Offset offset;

  ///Optional size overwrite
  final Size size;

  ///Optional position overwrite
  final Offset position;

  ///Key to assign to the widget
  final Key key;

  ///Widget alignment 
  final Alignment alignment;

  ///Specify a String to save the dimensions of the linked [widget] inside the [InheritedSizeModel]
  final String modelKey;

  static List<LayoutGridCouple> getPositionedGridCoupleList(List<List<String>> areas, List<LayoutGridCouple> couples) {
    List<LayoutGridCouple> _couples = couples;
    String _name;

    for (int _i = 0; _i < _couples.length; _i++) {
      _name = _couples[_i].name;

      if (_name != null) {
        _couples[_i] = _getPositionededGridCouple(areas, _couples[_i]);
      }
    }

    return _couples;
  }

  static LayoutGridCouple _getPositionededGridCouple(List<List<String>> areas, LayoutGridCouple couple) {
    LayoutGridCouple _couple = couple;

    for (int _i = 0; _i < areas.length; _i++) {
      for (int _j = 0; _j < areas[_i].length; _j++) {
        if (areas[_i][_j] == _couple.name) {
          if (_couple.col0 > _j || _couple.col0 == -1) {
            _couple.col0 = _j;
          }
          if (_couple.col1 < _j + 1 || _couple.col1 == -1) {
            _couple.col1 = _j + 1;
          }

          if (_couple.row0 > _i || _couple.row0 == -1) {
            _couple.row0 = _i;
          }
          if (_couple.row1 < _i + 1 || _couple.row1 == -1) {
            _couple.row1 = _i + 1;
          }
        }
      }
    }

    ///check that we did find the corresponding area
    if (_couple.col0 == -1) {
      throw ("Could not find the area specified by the LayoutGridCouple, did you write it correctly?");
    }

    return _couple;
  }

}
