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
      this.boxFit = BoxFit.none,
      this.alignment = const Alignment(0.0, 0.0),
      this.offset = const Offset(0.0, 0.0),
      this.sizeKey});

  ///[widget] to link the area with
  final Widget widget;

  ///Cols and rows of the area to link the [widget] with
  int col0, col1, row0, row1;

  ///Name of the area to link the widget with
  final String name;

  ///Specify [BoxFit] if you want to, for example, fill the space with the [widget]
  ///
  ///This may lead to distortion of the [widget], to prevent it pass a sizeKey and inside the [widget]
  ///use the width and height provided by the [InheritedSizeModel]
  final BoxFit boxFit;

  final Alignment alignment;

  ///Offset from top-left point of area
  final Offset offset;

  ///Specify a String to save the dimensions of the linked [widget] inside the [InheritedSizeModel]
  final String sizeKey;
}
