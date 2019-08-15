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
      this.size,
      this.position,
      this.key,
      this.modelKey});

  ///[widget] to link the area with
  final Widget widget;

  ///Cols and rows of the area to link the [widget] with
  int col0, col1, row0, row1;

  ///Name of the area to link the widget with
  final String name;

  ///Optional size overwrite
  final Size size;

  ///Optional position overwrite
  final Offset position;

  ///Key to assign to the widget
  final Key key;

  ///Specify a String to save the dimensions of the linked [widget] inside the [InheritedSizeModel]
  final String modelKey;
}
