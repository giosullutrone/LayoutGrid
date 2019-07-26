import 'package:flutter_web/material.dart';

import 'Util/area_creation.dart';
import 'Util/layout_grid_unit_classes.dart';
import 'Util/ancestor_layout_grid.dart';
import 'Util/nested_layout_grid.dart';
import 'layout_grid_couple.dart';

///A Stack widget that lets you divide its space in areas and link them to widgets.
///
///Widget can be linked to named areas or specific columns and rows
///
///Similar to CSS Grid, it reacts to constraints changes.
///It makes for a perfect responsive and simple to implement layout tool.
///
///Example of LayoutGrid:
///
///          col:  1fr        2fr        1fr    rows:
///           0  |-----|---------------|------|
///              |     |               |      | 50%
///              |     | name: center  |center|
///           1  |-----|---------------|------|
///              |     |               |      | 50%
///              |     |               |      |
///           2  |----------------------------|
///              0     1               2      3
///
///   * You can assign a widget to the area "center" by using a [LayoutGridCouple] and passing the argument name: "center"
///
///
///   * Or you can pass col0: 1, col1: 3, row0: 0, row1: 1
///
///
///   Notes:
///
///   * You can call different areas the same to expand that area
///
///   * The LayoutBuilder will not check if they are adjacent but will try to create the biggest area
///
///Example:
///
///   * You can create an extended area by naming the two opposite corners the same string
///
///
///          col:  1fr        2fr        1fr    rows:
///           0  |-----|---------------|------|
///              |     |               |      | 50%
///              | top |               |      |
///           1  |-----|---------------|------|
///              |     |               |top   |
///              |     |               |      | 50%
///           2  |----------------------------|
///              0     1               2      3
///
///   The top will span from col0: 0 , row0:0 to col1: 3, row1:2,
class LayoutGrid extends StatefulWidget {
  LayoutGrid({
    @required this.columns,
    @required this.rows,
    @required this.couples,
    this.areas,
    this.width,
    this.height,
    this.scrollDirection = Axis.vertical,
    this.scrollController,
    this.isAncestor = false,
    Key key,
  }) : super(key: key);

  /// Every element of the list is a line that is defined by a unit of measure that tells the widget where to place the subdivisory line
  ///
  /// ex.
  ///
  ///          col:  1fr        2fr        1fr    rows:
  ///           0  |-----|---------------|------|
  ///              |     |               |      | 50%
  ///              | top |               |      |
  ///           1  |-----|---------------|------|
  ///              |     |               |top   |
  ///              |     |               |      | 50%
  ///           2  |----------------------------|
  ///              0     1               2      3
  ///
  ///
  /// [columns] = ["1fr", "2fr", "1fr"]
  /// [rows] = ["50%", "50%"]
  ///
  /// Unit of measure avaible:
  ///
  /// * LayoutPixel == simple pixel
  ///
  ///
  /// * LayoutPercentage == percentage of Stack size (if columns => percentage of width, else if rows => percentage of height)
  ///
  ///
  /// * LayoutFraction == fraction of free space (The widget divides the free space between the different fractions
  ///
  ///   ex. LayoutFraction(fraction: 1), LayoutFraction(fraction: 2) => It will divide the space in (1 + 2) parts and then assign 1 part to the first column and 2 to the second)
  ///
  ///
  /// * LayoutDependent == Unit that depends on another line of the opposite type(Ex. (Col => row) depending on scrollDirection), usable only in Ancestor LayuotGrid
  final List<LayoutUnit> columns, rows;

  ///[LayoutGridCouple] will let you link a widget to an area by [name] or by [col0],[col1],[row0],[row1]
  ///
  ///You can also specify a [boxFit] and an [alignment]
  ///
  ///It has the [sizeKey] which is used to archive and access the saved Size of the [widget] inside of the [InheritedSizeModel]
  ///
  ///Used to directly assign the size of the area to the widget instead of using a boxFit which may distort its child
  final List<LayoutGridCouple> couples;

  ///List of list used to assign names to the various areas
  ///Let's take the previous layout as an example:
  ///
  ///          col:  1fr        2fr        1fr    rows:
  ///           0  |-----|---------------|------|
  ///              |     |               |      | 50%
  ///              | top |   center      |right |
  ///           1  |-----|---------------|------|
  ///              |     |               |top   |
  ///              |left |    center     |      | 50%
  ///           2  |----------------------------|
  ///              0     1               2      3
  ///
  ///   list = [["top","center","right",],
  ///           ["left","center","top",]]
  final List<List<String>> areas;

  ///Used for [NestedLayoutGrid] that are dependent on the ancestor stack for size
  final double width, height;

  final Axis scrollDirection;
  final ScrollController scrollController;

  ///[true] if the stack has to manage all draw calls and the creation and manipulation of the [InheritedSizeModel]
  final bool isAncestor;

  //Used to store the manipulated and ready-to-use couples
  List<LayoutGridCouple> calculatedCouples;

  _LayoutGridState createState() => _LayoutGridState();
}

class _LayoutGridState extends State<LayoutGrid> {
  List<LayoutGridCouple> _couples;

  @override
  void initState() {
    super.initState();

    //We convert the various named couples (LayoutGridCouples with area names instead of rows and columns)
    //to couples with cols and rows specified
    //
    //We only do the calculation once
    if (widget.calculatedCouples == null)
      widget.calculatedCouples =
          getPositionedGridCoupleList(widget.areas, widget.couples);
    _couples = widget.calculatedCouples;
  }

  @override
  Widget build(BuildContext context) {
    //if isAncestor then we return a LayoutGrid with a SizeModel and a LayoutBuilder to update sizes and redraw its children
    //else we just use a nestedLayoutGrid without a builder and with width and height specified
    if (widget.isAncestor) {
      return AncestorLayoutGrid(
        key: UniqueKey(),
        columns: widget.columns,
        rows: widget.rows,
        couples: _couples,
        scrollDirection: widget.scrollDirection,
        scrollController: widget.scrollController,
      );
    } else {
      return NestedLayoutGrid(
        key: UniqueKey(),
        columns: widget.columns,
        rows: widget.rows,
        couples: _couples,
        height: widget.height,
        width: widget.width,
      );
    }
  }
}
