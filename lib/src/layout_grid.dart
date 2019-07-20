import 'package:flutter_web/material.dart';

import 'Util/area_creation.dart';
import 'Util/custom_scroll_behavior.dart';
import 'Util/layout_grid_child.dart';
import 'Util/line_creation.dart';
import 'Util/nested_layout_grid_child.dart';
import 'layout_grid_couple.dart';


class LayoutGrid extends StatefulWidget {
  final List<String> columns;
  final List<String> rows;

  final List<LayoutGridCouple> couples;
  final List<List<String>> areas;

  final double width;
  final double height;

  final Axis scrollDirection;

  LayoutGrid({
    @required this.columns,
    @required this.rows,
    @required this.couples,
    this.areas,
    this.width,
    this.height,
    this.scrollDirection = Axis.vertical,
    Key key,
  }):super(key: key);

  _LayoutGridState createState() => _LayoutGridState();
}

class _LayoutGridState extends State<LayoutGrid> {
  BoxConstraints _lastConstraints;
  List<double> _col;
  List<double> _rows;
  List<LayoutGridCouple> _couples;

  @override
  void initState() {
    super.initState();
    _couples = getPositionedGridCoupleList(widget.areas, widget.couples);
    print("recal");
  }

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (BuildContext context, BoxConstraints constraints) {
        if (_lastConstraints != constraints) {
          updateGrid(constraints, widget.width, widget.height);
          print("updatingMain");
          _lastConstraints = constraints;
        }

        return ScrollConfiguration(
          behavior: CustomScrollBehavior(),
          child: ListView(scrollDirection: widget.scrollDirection, children: <
              Widget>[
            Container(
              height: _rows.last,
              width: _col.last,
              child: Stack(
                  overflow: Overflow.visible,
                  fit: StackFit.expand,
                  children: List<Widget>.generate(_couples.length, (int index) {
                    if (!_couples[index].isNested) {
                      return LayoutGridChild(
                        key: UniqueKey(),
                        top: _rows[_couples[index].row0],
                        left: _col[_couples[index].col0],
                        height: _rows[_couples[index].row1] -
                            _rows[_couples[index].row0],
                        width: _col[_couples[index].col1] -
                            _col[_couples[index].col0],
                        widget: _couples[index].widget,
                        boxFit: _couples[index].boxFit,
                        alignment: _couples[index].alignment,
                      );
                    } else {
                      return NestedLayoutGridChild(
                        key: UniqueKey(),
                        top: _rows[_couples[index].row0],
                        left: _col[_couples[index].col0],
                        height: _rows[_couples[index].row1] -
                            _rows[_couples[index].row0],
                        width: _col[_couples[index].col1] -
                            _col[_couples[index].col0],
                        widget: _couples[index].widget,
                        boxFit: _couples[index].boxFit,
                        alignment: _couples[index].alignment,
                      );
                    }
                  })),
            ),
          ]),
        );
      },
    );
  }

  void updateGrid(BoxConstraints constraints, double width, double height) {
    if (width != null) {
      _col = calculateGridLines(widget.columns, width);
    } else {
      _col = calculateGridLines(widget.columns, constraints.maxWidth);
    }

    if (height != null) {
      _rows = calculateGridLines(widget.rows, height);
    } else {
      _rows = calculateGridLines(widget.rows, constraints.maxHeight);
    }
  }
}
