import 'package:flutter_web/material.dart';

import '../layout_grid_couple.dart';
import 'inherited_size_model.dart';
import 'custom_scroll_behavior.dart';
import 'layout_grid_child.dart';
import 'layout_grid_unit.dart';
import 'layout_grid_unit_classes.dart';
import 'line_creation.dart';

class AncestorLayoutGrid extends StatelessWidget {

  AncestorLayoutGrid({
    @required this.couples,
    @required this.columns,
    @required this.rows,
    this.scrollDirection = Axis.vertical,
    Key key,
  }) : assert(couples != null),
       assert(columns != null),
       assert(rows != null),
       super(key: key);

  final List<LayoutUnit> columns, rows;
  final List<LayoutGridCouple> couples;
  final Axis scrollDirection;

  BoxConstraints _lastConstraints;
  List<double> _col, _rows;
  double _top,_left,_width,_height;

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

                    //If the user gave a key to the widget then we add or update the Size associated with that key,
                    //making it accessible from elsewhere just by calling the InheritedSizeModel
                    if (couples[index].sizeKey != null) {
                      InheritedSizeModel.of(context).updateSize(couples[index].sizeKey, Size(_width,_height));
                    }

                    //We pass top and left to the positioned widget inside of the LayoutGridChild,
                    //The height and width calculated via difference of cols(col1 and col0) and rows(row1 and row0) to the Container
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
                  })
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