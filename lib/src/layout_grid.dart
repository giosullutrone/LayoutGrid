import 'package:flutter_web/material.dart';
import 'Util/layout_creation.dart';
import 'Util/layout_grid_private_units.dart';

import 'Util/inherited_layout_model.dart';
import 'Util/layout_grid_child.dart';
import 'layout_grid_couple.dart';

class LayoutGrid extends StatefulWidget {

  LayoutGrid({
    @required this.columns,
    @required this.rows,
    @required this.couples,
    this.areas,
    this.referenceWidth,
    this.referenceHeight,
    this.maxWidth,
    this.maxHeight,
    this.layoutModel,
    Key key,
  }): super(key: key);

  final List<LayoutUnit> columns, rows;

  final List<LayoutGridCouple> couples;

  final List<List<String>> areas;

  final double maxWidth, maxHeight;

  double referenceWidth, referenceHeight;

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

    if(widget.maxWidth != null) {
      widget.referenceWidth = widget.maxWidth;
    }

    if (widget.maxHeight != null) {
      widget.referenceHeight = widget.maxHeight;
    }

    widget._calculatedLayout = Layout.createLayout(widget.columns, widget.rows, (widget.referenceWidth != null) ? widget.referenceWidth : 0.0, 
                                                                                (widget.referenceHeight != null) ? widget.referenceHeight : 0.0);

    _cols = widget._calculatedLayout.sublist(0,widget.columns.length);
    _rows = widget._calculatedLayout.sublist(widget.columns.length);

    return Container(

      height: (widget.maxHeight != null) ? widget.maxHeight : widget._calculatedLayout.last,
      width: (widget.maxWidth != null) ? widget.maxWidth : widget._calculatedLayout[widget.columns.length - 1],

      child: Stack(
        fit: StackFit.expand,
        children: List<Widget>.generate(_couples.length, (int index) {
          
          setParameters(Layout.getWidgetParameters(index, _couples, _cols, _rows), _couples, index);
          
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
            alignment: _couples[index].alignment,
          );
        })
      )
    );
  }

  void setParameters(Map<String, double> map, List<LayoutGridCouple> list, int index) {

    if (list[index].position != null) {
      _top = list[index].position.dy + list[index].offset.dy;
      _left = list[index].position.dx + list[index].offset.dx;
    }else {
      _top = map["top"] + list[index].offset.dy;
      _left = map["left"] + list[index].offset.dx;
    }

    if (list[index].size != null) {
      _height = list[index].size.height;
      _width = list[index].size.width;
    }else {
      _height = map["height"];
      _width = map["width"];
    }
  }
}