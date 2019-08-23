import 'package:flutter_web/material.dart';
import 'Util/layout_creation.dart';
import 'Util/layout_grid_private_units.dart';

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
    this.width,
    this.height,
    this.scrollDirection = Axis.vertical,
    this.scrollController,
    this.layoutModel,
    Key key,
  }): super(key: key);

  final List<LayoutUnit> columns, rows;

  final List<LayoutGridCouple> couples;

  final List<List<String>> areas;

  final double width, height;

  final Axis scrollDirection;
  final ScrollController scrollController;

  final InheritedLayoutModel layoutModel;

  List<LayoutGridCouple> _calculatedCouples;

  List<double> _calculatedLayout;

  _LayoutGridState createState() => _LayoutGridState();
}

class _LayoutGridState extends State<LayoutGrid> {

  List<LayoutGridCouple> _couples;
  List<double> _cols, _rows;
  double _top, _left, _width, _height;

  @override
  void initState() {
    super.initState();

    if (widget._calculatedCouples == null) widget._calculatedCouples = LayoutGridCouple.getPositionedGridCoupleList(widget.areas, widget.couples);
    _couples = widget._calculatedCouples;
  }

  @override
  Widget build(BuildContext context) {

    widget._calculatedLayout = Layout.createLayout(widget.columns, widget.rows, (widget.width != null) ? widget.width : 0.0, (widget.height != null) ? widget.height : 0.0);

    _cols = widget._calculatedLayout.sublist(0,widget.columns.length);
    _rows = widget._calculatedLayout.sublist(widget.columns.length);

    return ScrollConfiguration(

      behavior: CustomLayoutGridScrollBehavior(),

      child: Container(

        child: ListView(

          controller: widget.scrollController,
          scrollDirection: widget.scrollDirection,

          children: <Widget>[
            Container(

              height: (widget.height != null) ? widget.height : widget._calculatedLayout.last,
              width: (widget.width != null) ? widget.width : widget._calculatedLayout[widget.columns.length - 1],

              child: (_couples.isNotEmpty) ? Stack(
                fit: StackFit.expand,
                children: List<Widget>.generate(_couples.length, (int index) {
                  
                  setParameters(Layout.getWidgetParameters(index, _couples, _cols, _rows));
                  
                  if (_couples[index].modelKey != null) {
                    widget.layoutModel.updateModel(_couples[index].modelKey, Size(_width, _height), Offset(_left,_top));
                  }

                  return LayoutGridChild(
                    key: (_couples[index].key != null) ? _couples[index].key : UniqueKey(),
                    top: _top,
                    left: _left,
                    height: _height,
                    width: _width,
                    widget: _couples[index].widget,
                  );
                }
              )) : Container(),
            ),
          ]
        ),
      ),
    );
  }

  void setParameters(Map<String, double> map) {
    _top = map["top"];
    _left = map["left"];
    _height = map["height"];
    _width = map["width"];
  }
}