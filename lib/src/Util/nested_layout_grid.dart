import 'package:flutter_web/material.dart';

import '../layout_grid_couple.dart';
import 'inherited_size_model.dart';
import 'layout_grid_child.dart';
import 'line_creation.dart';

///Only difference with LayoutGrid is that they want and need a width and height
///So they have to be used inside another LayoutGrid or at least they need a specific size to respect
class NestedLayoutGrid extends StatelessWidget {
  
  final List<String> columns,rows;
  final List<LayoutGridCouple> couples;
  final double width, height;

  NestedLayoutGrid({
    @required this.columns,
    @required this.rows,
    @required this.couples,
    @required this.height,
    @required this.width,
  }) : assert (width >= 0, height >= 0);

  List<double> _col, _rows;
  double _top,_left,_width,_height;

  @override
  Widget build(BuildContext context) {

    updateGrid(width, height);

    return Container(
      height: _rows.last,
      width: _col.last,
      child: Stack(
        fit: StackFit.expand,
        children: List<Widget>.generate(couples.length, (int index) {

          _top = _rows[couples[index].row0];
          _left = _col[couples[index].col0];
          _height = _rows[couples[index].row1] - _rows[couples[index].row0];
          _width = _col[couples[index].col1] - _col[couples[index].col0];

          if (couples[index].sizeModelKey != null) {
            InheritedSizeModel.of(context).updateSize(couples[index].sizeModelKey, Size(width,height));
          }

          return LayoutGridChild(

            key: UniqueKey(),

            top: _top,
            left: _left,

            height: _height,
            width: _width,

            widget: couples[index].widget,

            boxFit: couples[index].boxFit,
            alignment: couples[index].alignment,
          );
        })
      ),
    );
  }

  void updateGrid(double width, double height) {

    _col = calculateGridLines(columns, width);

    _rows = calculateGridLines(rows, height);    
  }
}