import 'package:flutter_web/material.dart';

import 'Util/area_creation.dart';
import 'Util/main_layout_grid.dart';
import 'Util/nested_layout_grid.dart';
import 'layout_grid_couple.dart';

///A Stack widget that reacts to device || web page size changes and that lets you divide the space in areas.
///
///You can create columns and rows lines and name the area defined by them or just specify where the widget begins and ends.
///
///Similar to CSS Grid.
///
///Manly used for web pages but can be also useful for mobile devices.
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
///   In this case you can assign using [LayoutGridCouple] a widget to the area "center"
///   or you can say col0: 1, col1: 3, row0: 0, row1: 1 which will net the same result
/// 
///   Note that you can call different areas with the same name to tell the widget to expand the area 
/// 
///   Note n.2 Carefull with the use of the same area name because the widget doesn't check whether they are near each other
///            but will instead just try to create the biggest area with the same name which in some cases can be extremely useful
/// 
///   Ex You can create an extended area by naming the two opposite corners the same string
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
    this.isMain = false,
    Key key,
  }):super(key: key);

  /// Every element of the columns and rows list is a line that is defined by a unit of measure that tells the widget where to place the subdivisory line
  ///
  /// ex. ["20px", "2fr", "30%" , "4fr"]
  ///
  /// Unit of measure avaible:
  ///
  /// * "px" == simple pixel
  /// 
  ///
  /// * "%" == percentage of Stack size (if columns => percentage of width, else if rows => percentage of height)
  /// 
  ///
  /// * "fr" == fraction of free space (The widget divides the free space between the different fractions .
  /// 
  ///   ex. "1fr", "2fr" => It will divide the space in (1 + 2) parts and then assign 1 part to the first column and 2 to the second)
  /// 
  /// 
  /// * "auto" == remaining free space 
  ///   
  ///   (Carefull not to use auto and fr at the same time... "fr"s will divide the avaible space leaving nothing to the "auto")
  ///
  final List<String> columns, rows;

  ///[LayoutGridCouple] will let you link a widget to an area by name or by col0,col1,row0,row1
  ///
  ///You can also specify a boxfit and an align
  ///
  ///It has the isNested variable which is used to tell the LayoutGrid that the child is a NestedGridLayout and has to pass it
  ///a specific widh and height otherwise the flutter engine will throw an error 
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

  ///You can pass the width and height var in order to force the Stack to a specific size instead of having it adapt to
  ///the BoxConstraints  
  final double width, height;

  final Axis scrollDirection;

  final bool isMain;

  ///Couples that have been manipulated in order to convert them from having only names specified to col0,col1,row0,row1
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
    if (widget.calculatedCouples == null) widget.calculatedCouples = getPositionedGridCoupleList(widget.areas, widget.couples);
    _couples = widget.calculatedCouples;
  }

  @override
  Widget build(BuildContext context) {

    //if isMain then we return a LayoutGrid with a SizeModel and
    //a LayoutBuilder to update sizes and redraw its children
    //else we just use a nestedLayoutGrid without a builder and with width and height specified
    if(widget.isMain) {
      return MainLayoutGrid(
        columns: widget.columns,
        rows: widget.rows,
        couples: _couples,
        scrollDirection: widget.scrollDirection,
      );
    }else {
      return NestedLayoutGrid(
        columns: widget.columns,
        rows: widget.rows,
        couples: _couples,
        height: widget.height,
        width: widget.width,
      );
    }
  }
}