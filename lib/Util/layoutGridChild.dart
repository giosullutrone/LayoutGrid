import 'package:flutter_web/material.dart';
import 'package:layout_grid_for_web/layouGrid.dart';

import '../nestedLayoutGrid.dart';

class LayoutGridChild extends StatelessWidget {
  final double top, left, height, width;
  final BoxFit boxFit;
  final Widget widget;
  final Alignment alignment;

  const LayoutGridChild({
    @required Key key,
    @required this.top,
    @required this.left,
    @required this.height,
    @required this.width,
    @required this.widget,
    this.boxFit = BoxFit.fill,
    this.alignment,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Positioned(
      top: top,
      left: left,
      child: Container(
        height: height,
        width: width,
        child: FittedBox(
          fit: boxFit,
          child: widget,
        ),
      ),
    );
  }
}

class NestedLayoutGridChild extends StatelessWidget {
  final double top, left, height, width;
  final BoxFit boxFit;
  final Widget widget;
  final Alignment alignment;

  const NestedLayoutGridChild({
    @required Key key,
    @required this.top,
    @required this.left,
    @required this.height,
    @required this.width,
    @required this.widget,
    this.boxFit = BoxFit.fill,
    this.alignment,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Positioned(
      top: top,
      left: left,
      child: Container(
        height: height,
        width: width,
        child: FittedBox(
          fit: boxFit,
          child: NestedWidget(widget, width, height),
        ),
      ),
    );
  }
}

Widget NestedWidget(NestedLayoutGrid widget, double width, double height) {
  widget.width = width;
  widget.height = height;

  return (widget);
}

class CustomScrollBehavior extends ScrollBehavior {
  @override
  Widget buildViewportChrome(
      BuildContext context, Widget child, AxisDirection axisDirection) {
    return child;
  }
}
