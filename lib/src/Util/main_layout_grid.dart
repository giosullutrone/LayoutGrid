import 'package:flutter_web/material.dart';

import '../layout_grid_couple.dart';
import 'inherited_size_model.dart';
import 'custom_scroll_behavior.dart';
import 'layout_grid_child.dart';
import 'line_creation.dart';

class MainLayoutGrid extends StatelessWidget {
  MainLayoutGrid({
    @required this.couples,
    this.scrollDirection = Axis.vertical,
    @required this.columns,
    @required this.rows,
    Key key,
  }):super(key: key);

  final Axis scrollDirection;
  final List<LayoutGridCouple> couples;
  final List<String> columns, rows;

  List<double> _col, _rows;
  double _top,_left,_width,_height;
  BoxConstraints _lastConstraints;

  @override
  Widget build(BuildContext context) {
    return InheritedSizeModel(
      
      child: LayoutBuilder(
        builder: (BuildContext context, BoxConstraints constraints) {

          //We make sure that the constraints have changed before re-calculating everything wasting resources
          if (_lastConstraints != constraints) {
            //We now convert our rows and columns to pixels (relatively to our constraints or ,in case specified, width and height)
            updateGrid(constraints);
            _lastConstraints = constraints;
          }

          return ScrollConfiguration(

            //We use ScrollConfiguration to remove the list glow that is used manly on mobile devices
            behavior: CustomScrollBehavior(),

            child: ListView(scrollDirection: scrollDirection, children: <Widget>[

              Container(

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
                        InheritedSizeModel.of(context).updateSize(couples[index].sizeModelKey, Size(_width,_height));
                      }

                      //We pass top and left to the positioned widget inside of it,
                      //and the height and width calculated via difference of cols(col1 and col0) and rows(row1 and row0)
                      //
                      //We assign an UniqueKey so that flutter is forced to update the widget
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
                    }
                  )
                ),
              ),
            ]),
          );
        },
      ),
    );
  }

  void updateGrid(BoxConstraints constraints) {

    _col = calculateGridLines(columns, constraints.maxWidth);
  
    _rows = calculateGridLines(rows, constraints.maxHeight);    
  }
}