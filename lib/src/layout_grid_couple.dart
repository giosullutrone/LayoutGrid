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
    this.sizeKey}
  );

  final Widget widget;
  int col0, col1, row0, row1;
  final String name;
  final BoxFit boxFit;
  final Alignment alignment;
  final String sizeKey;
}