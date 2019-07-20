import 'package:flutter_web/material.dart';

class LayoutGridCouple {
  Widget widget;
  int col0, col1, row0, row1;
  String name;
  BoxFit boxFit;
  Alignment alignment;
  bool isNested;

  LayoutGridCouple(
      {@required this.widget,
      this.name,
      this.col0 = -1,
      this.col1 = -1,
      this.row0 = -1,
      this.row1 = -1,
      this.boxFit = BoxFit.fill,
      this.alignment = const Alignment(0.0, 0.0),
      this.isNested = false});
}