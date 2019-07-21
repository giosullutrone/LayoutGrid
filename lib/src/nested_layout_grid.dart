import 'package:flutter_web/material.dart';

import 'Util/InheritedSizeMap.dart';
import 'Util/area_creation.dart';
import 'Util/layout_grid_child.dart';
import 'Util/line_creation.dart';
import 'layout_grid_couple.dart';


///Only difference with LayoutGrid is that they want and need a width and height
///So they have to be used inside another LayoutGrid or at least they need a specific size to respect
class NestedLayoutGrid extends StatefulWidget {
  final List<String> columns;
  final List<String> rows;

  final List<LayoutGridCouple> couples;
  final List<List<String>> areas;

  final double width;
  final double height;

  final Axis scrollDirection;

  NestedLayoutGrid({
    @required this.columns,
    @required this.rows,
    @required this.couples,
    this.areas,
    this.scrollDirection = Axis.vertical,
    this.height,
    this.width,
  });

  List<LayoutGridCouple> calculatedCouples;

  _NestedLayoutGridState createState() => _NestedLayoutGridState();
}

class _NestedLayoutGridState extends State<NestedLayoutGrid> {
  List<double> _col;
  List<double> _rows;
  List<LayoutGridCouple> _couples;

  @override
  void initState() {
    super.initState();
    ///We calculate our "positioned" couples (couples with rows and cols specified) only once
    if (widget.calculatedCouples == null) widget.calculatedCouples = getPositionedGridCoupleList(widget.areas, widget.couples);
    _couples = widget.calculatedCouples;
  }

  @override
  Widget build(BuildContext context) {

    updateGrid(widget.width, widget.height);

    return Container(
      height: _rows.last,
      width: _col.last,
      child: Stack(
          fit: StackFit.expand,
          children: List<Widget>.generate(_couples.length, (int index) {

            if (_couples[index].sizeModelKey != null) {
              SizeModel.of(context).updateSize(_couples[index].sizeModelKey, Size(_col[_couples[index].col1] - _col[_couples[index].col0],
                                                                                  _rows[_couples[index].row1] - _rows[_couples[index].row0]));
            }

            return LayoutGridChild(

              key: UniqueKey(),

              top: _rows[_couples[index].row0],
              left: _col[_couples[index].col0],

              height: _rows[_couples[index].row1] - _rows[_couples[index].row0],
              width: _col[_couples[index].col1] - _col[_couples[index].col0],

              widget: _couples[index].widget,

              boxFit: _couples[index].boxFit,
              alignment: _couples[index].alignment,
            );
          })),
    );
  }

  void updateGrid(double width, double height) {
    if (width != null) {
      _col = calculateGridLines(widget.columns, width);
    }
    if (height != null) {
      _rows = calculateGridLines(widget.rows, height);
    }
  }
}
