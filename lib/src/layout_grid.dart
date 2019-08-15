import 'package:flutter_web/material.dart';

import 'Util/area_creation.dart';
import 'Util/custom_layout_grid_scroll_behavior.dart';
import 'Util/inherited_layout_model.dart';
import 'Util/layout_grid_child.dart';
import 'layout_grid_couple.dart';

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
    this.layoutModel,
    Key key,
  }) : super(key: key);

  final List<double> columns, rows;

  final List<LayoutGridCouple> couples;

  final List<List<String>> areas;

  final double width, height;

  final Axis scrollDirection;
  final ScrollController scrollController;

  final InheritedLayoutModel layoutModel;

  List<LayoutGridCouple> _calculatedCouples;

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
    if (widget._calculatedCouples == null) widget._calculatedCouples = getPositionedGridCoupleList(widget.areas, widget.couples);
    _couples = widget._calculatedCouples;
  }

  @override
  Widget build(BuildContext context) {

    updateGrid();

    return ScrollConfiguration(

      //We use ScrollConfiguration to remove the list glow that is used manly on mobile devices
      behavior: CustomLayoutGridScrollBehavior(),

      child: ListView(

        controller: widget.scrollController,
        scrollDirection: widget.scrollDirection,

        children: <Widget>[
          Container(

            height: widget.height,
            width: widget.width,

            child: Stack(
              fit: StackFit.expand,
              children: List<Widget>.generate(_couples.length, (int index) {

                getWidgetParameters(index);

                //If the user gave a key to the widget then we add or update the Size associated with that key,
                //making it accessible from elsewhere just by calling the InheritedSizeModel
                if (_couples[index].modelKey != null) {
                  widget.layoutModel.updateSize(_couples[index].modelKey, Size(_width, _height));
                  widget.layoutModel.updatePosition(_couples[index].modelKey,Offset(_left,_top));
                }

                //We pass top and left to the positioned widget inside of the LayoutGridChild
                //And the height and width calculated via difference of cols(col1 and col0) and rows(row1 and row0) to the Container
                //
                //We assign an UniqueKey so that flutter is forced to update the widget
                return LayoutGridChild(
                  key: (_couples[index].key != null) ? _couples[index].key : UniqueKey(),
                  top: _top,
                  left: _left,
                  height: _height,
                  width: _width,
                  widget: _couples[index].widget,
                );
              }
            )),
          ),
        ]
      ),
    );
  }

  void updateGrid() {

    _col = widget.columns;
    _rows = widget.rows;

    if (_col[0] != 0.0) {
      _col.insert(0, 0.0);
    }
    if (_rows[0] != 0.0) {
      _rows.insert(0, 0.0);
    }
  }

  void getWidgetParameters(int index) {

    if (_couples[index].position != null) {

      _top = _couples[index].position.dy;
      _left = _couples[index].position.dx;
    }else {   

      _top = _rows[_couples[index].row0];
      _left = _col[_couples[index].col0];
    }

    if (_couples[index].size != null) {

      _height = _couples[index].size.height;
      _width = _couples[index].size.width;
    }else {
    
      _height = (_rows[_couples[index].row1] - _rows[_couples[index].row0] >= 0.0) ? _rows[_couples[index].row1] - _rows[_couples[index].row0] : 0.0;
      _width = (_col[_couples[index].col1] - _col[_couples[index].col0] >= 0.0) ? _col[_couples[index].col1] - _col[_couples[index].col0] : 0.0;
    }
  }
}