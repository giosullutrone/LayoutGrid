/*import 'package:flutter_web/material.dart';

class Area {
  /*
            Here we have p0 => _____________
                             |             |
                             |    name     |
                             |_____________| <= Here we have p1

 */

  int x0, x1, y0, y1;
  String name;

  Area(
      {@required this.x0,
      @required this.x1,
      @required this.y0,
      @required this.y1,
      @required this.name});
}

class LayoutGridCouple {
  Widget widget;
  String name;

  LayoutGridCouple({@required this.name, @required this.widget});
}

class LayoutGridFractional extends StatelessWidget {
  List<int> gridColumns;
  List<int> gridRows;

  List<Area> areas;
  List<LayoutGridCouple> children;

  BoxFit boxFit;

  BoxConstraints constraints;
  bool adapt;

  double autoGap;

  LayoutGridFractional(
      {@required this.areas,
      @required this.children,
      @required this.gridColumns,
      @required this.gridRows,
      this.boxFit,
      this.adapt = true,
      this.constraints,
      this.autoGap = 0.0});

  List<double> _lineColumns = List<double>();
  List<double> _lineRows = List<double>();

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (BuildContext context, BoxConstraints _constraints) {
        if (adapt) {
          constraints = _constraints;

          _lineColumns = createLines(gridColumns, constraints.maxWidth);
          _lineRows = createLines(gridRows, constraints.maxHeight);
        }

        return Container(
          width: constraints.maxWidth,
          height: constraints.maxHeight,
          child: Stack(
            children: List<Widget>.generate(children.length, (int index) {
              //We look for the index of the area with the name associated with our widget from the layoutGridChild
              int areaIndex =
                  areas.indexWhere((area) => area.name == children[index].name);

              return LayoutGridChild(
                key: Key("$index"),

                top: _lineRows[areas[areaIndex].y0] +
                    getGap(autoGap, areas[areaIndex].y0),

                left: _lineColumns[areas[areaIndex].x0] +
                    getGap(autoGap, areas[areaIndex].x0),

                width: (_lineColumns[areas[areaIndex].x1] -
                        _lineColumns[areas[areaIndex].x0]) -
                    getGap(autoGap, areas[areaIndex].x0),

                height: (_lineRows[areas[areaIndex].y1] -
                        _lineRows[areas[areaIndex].y0]) -
                    getGap(autoGap, areas[areaIndex].y0),

                boxFit: (boxFit == null) ? BoxFit.fill : boxFit,
                widget: children[index].widget,
              );
            }
          )),
        );
      },
    );
  }

  int listSum(List<int> list) {
    int _sum = 0;

    for (int _i = 0; _i < list.length; _i++) {
      _sum += list[_i];
    }

    return _sum;
  }

  List<double> createLines(List<int> list, double maxSize) {
    int _sumList = 0;
    double _size = 0.0;
    double _lastPos = 0.0;

    List<double> _lineList = List<double>();

    _sumList = listSum(list);

    _size = maxSize / _sumList;

    _lineList.add(0.0);

    for (int _i = 0; _i < list.length; _i++) {
      _lineList.add((list[_i] * _size) + _lastPos);
      _lastPos += (list[_i] * _size);
    }

    return _lineList;
  }

  double getGap(double gap, int index) {
    if (index != 0) {
      return gap;
    } else {
      return 0.0;
    }
  }
}

class LayoutGridChild extends StatelessWidget {
  final double top, left, height, width;
  final BoxFit boxFit;
  final Widget widget;

  const LayoutGridChild({
    @required Key key,
    @required this.top,
    @required this.left,
    @required this.height,
    @required this.width,
    @required this.boxFit,
    @required this.widget,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Positioned(
      top: top,
      left: left,
      child: Container(
          height: height,
          width: width,
          child: FittedBox(
            //If the user has not specified the type of boxfit, set to fill as default
            fit: boxFit,

            //we pass the widget from our layouGridChild
            child: widget,
          )),
    );
  }
}
*/