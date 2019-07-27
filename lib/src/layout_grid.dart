import 'package:flutter_web/material.dart';

import 'Util/area_creation.dart';
import 'Util/custom_layout_grid_scroll_behavior.dart';
import 'Util/inherited_size_model.dart';
import 'Util/layout_grid_child.dart';
import 'Util/layout_grid_unit_classes.dart';
import 'Util/line_creation.dart';
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
    @required this.width,
    @required this.height,
    this.scrollDirection = Axis.vertical,
    this.scrollController,
    this.sizeModel,
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

  final InheritedSizeModel sizeModel;

  //Used to store the manipulated and ready-to-use couples
  List<LayoutGridCouple> calculatedCouples;

  _LayoutGridState createState() => _LayoutGridState();
}

class _LayoutGridState extends State<LayoutGrid> {

  List<LayoutGridCouple> _couples;
  List<double> _col, _rows;
  double _top, _left, _width, _height;

  @override
  void initState() {
    super.initState();

    //We convert the various named couples (LayoutGridCouples with area names instead of rows and columns)
    //to couples with cols and rows specified
    //
    //We only do the calculation once
    if (widget.calculatedCouples == null) widget.calculatedCouples = getPositionedGridCoupleList(widget.areas, widget.couples);

    _couples = widget.calculatedCouples;
  }

  @override
  Widget build(BuildContext context) {

    //We now convert our rows and columns to pixels (relatively to our constraints or ,in case specified, width and height)
    updateGrid(widget.width,widget.height, widget.scrollDirection);

    return ScrollConfiguration(
      //We use ScrollConfiguration to remove the list glow that is used manly on mobile devices
      behavior: CustomLayoutGridScrollBehavior(),

      child: ListView(
        controller: widget.scrollController,
        scrollDirection: widget.scrollDirection,

        children: <Widget>[
          Container(
            //We get height and width from the last line of rows and cols so that we can expand the stack over
            //the page area, allowing the scrolling of the stack
            height: widget.height,
            width: widget.width,

            child: Stack(
              fit: StackFit.expand,
              children: List<Widget>.generate(_couples.length, (int index) {

                _top = _rows[_couples[index].row0];
                _left = _col[_couples[index].col0];
                _height = (_rows[_couples[index].row1] - _rows[_couples[index].row0] >= 0.0) ? _rows[_couples[index].row1] - _rows[_couples[index].row0] : 0.0;
                _width = (_col[_couples[index].col1] - _col[_couples[index].col0] >= 0.0) ? _col[_couples[index].col1] - _col[_couples[index].col0] : 0.0;

                //If the user gave a key to the widget then we add or update the Size associated with that key,
                //making it accessible from elsewhere just by calling the InheritedSizeModel
                if (_couples[index].sizeKey != null) {
                  widget.sizeModel.updateSize(_couples[index].sizeKey, Size(_width, _height));
                }

                //We pass top and left to the positioned widget inside of the LayoutGridChild
                //And the height and width calculated via difference of cols(col1 and col0) and rows(row1 and row0) to the Container
                //
                //We assign an UniqueKey so that flutter is forced to update the widget
                return LayoutGridChild(
                  key: UniqueKey(),
                  top: _top + _couples[index].offset.dy,
                  left: _left + _couples[index].offset.dx,
                  height: _height,
                  width: _width,
                  widget: _couples[index].widget,
                  boxFit: _couples[index].boxFit,
                  alignment: _couples[index].alignment,
                );
              }
            )),
          ),
        ]
      ),
    );
  }

  void updateGrid(double width, double height, Axis scrollDirection) {

    //Dependent Unit depends on some other gridLine of the opposite type (ex. rows => cols) depending on the scrolling passed
    //
    //The tought process goes like this, if we have a vertical scrolling then the width of the stack will be fixed to the width of the page,
    //the height instead can go up to infinity, that means that a minmax will "only" work for the width of the stack where the freeSpace is relevant
    //therefore we make the dependent unit accessible to the rows so that the user can access the minmax of the height
    //
    //Used for example to create Square areas
    if (scrollDirection == Axis.vertical) {
      _col = calculateGridLines(widget.columns, width);
      _rows = calculateGridLinesWithDependetUnit(widget.rows, height, _col);
    } else if (scrollDirection == Axis.horizontal) {
      _rows = calculateGridLines(widget.columns, width);
      _col = calculateGridLinesWithDependetUnit(widget.rows, widget.height, _rows);
    }
  }
}