
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

 Area({@required this.x0,@required this.x1,@required this.y0,@required this.y1,@required this.name});

 static double fractionToDouble(double fraction, double size) {
   double _value = size * fraction;
   return _value;
 }
}

class LayoutGridCouple {
 Widget widget;
 String name;

 LayoutGridCouple({@required this.name,@required this.widget});
}


class LayoutGrid {

  static StatelessWidget fractional({List<Area> areas, List<int> gridColumns, List<int> gridRows, List<LayoutGridCouple> children, BoxFit boxFit, BoxConstraints constraints, bool adapt = true}) {

    return LayoutGridFractional(
      areas: areas,
      children: children,
      adapt: adapt,
      boxFit: boxFit,
      constraints: constraints,
      gridColumns: gridColumns,
      gridRows: gridRows,
    );
  }

  static StatelessWidget pixel({List<Area> areas, List<double> gridColumns, List<double> gridRows, List<LayoutGridCouple> children, BoxFit boxFit, BoxConstraints constraints, bool adapt = true}) {

    return LayoutGridFractional(
      areas: areas,
      children: children,
      adapt: adapt,
      boxFit: boxFit,
      constraints: constraints,
      gridColumns: gridColumns,
      gridRows: gridRows,
    );
  }
}

class LayoutGridPixel extends StatelessWidget {

  List<Area> areas;
  List<double> gridColumns;
  List<double> gridRows;
  List<LayoutGridCouple> children;
  BoxFit boxFit;
  bool adapt = true;
  BoxConstraints constraints;

  LayoutGridPixel({@required this.areas, @required this.children, @required this.gridColumns, @required this.gridRows, this.boxFit,this.adapt,this.constraints,});

  @override
  Widget build(BuildContext context) {

    gridColumns = adjustInputs(gridColumns,false);
    gridRows = adjustInputs(gridRows,false);

    return LayoutBuilder(
      builder: (BuildContext context, BoxConstraints _constraints) {

        if(adapt) constraints = _constraints;

        return Container(

          //width: constraints.maxWidth,
          //height: constraints.maxHeight,

          child: Stack(
            children: List<Widget>.generate(children.length, (int index) {

              //We look for the index of the area with the name associated with our widget from the layoutGridChild
              int areaIndex = areas.indexWhere((area) => area.name == children[index].name);

              return LayoutGridChild(
                key: Key("$index"),

                top: gridRows[areas[areaIndex].y0],
                left: gridColumns[areas[areaIndex].x0],

                width: gridColumns[areas[areaIndex].x1] - gridColumns[areas[areaIndex].x0],
                height: gridRows[areas[areaIndex].y1] - gridRows[areas[areaIndex].y0],

                
                boxFit: (boxFit == null) ? BoxFit.fill : boxFit,
                widget: children[index].widget,
              );
            })
          ),
        );
      },
    );
  }
}

class LayoutGridFractional extends StatelessWidget {
  

  List<Area> areas;
  List<double> gridColumns;
  List<double> gridRows;
  List<LayoutGridCouple> children;
  BoxFit boxFit;
  BoxConstraints constraints;
  bool adapt = true;

 LayoutGridFractional({@required this.areas, @required this.children,  @required this.gridColumns, @required this.gridRows, this.boxFit,this.adapt,this.constraints});

 @override
 Widget build(BuildContext context) {

   return LayoutBuilder(
     builder: (BuildContext context, BoxConstraints _constraints) {

       if(adapt) constraints = _constraints;

       return Container(

         width: constraints.maxWidth,
         height: constraints.maxHeight,

         child: Stack(
           children: List<Widget>.generate(children.length, (int index) {

             //We look for the index of the area with the name associated with our widget from the layoutGridChild
             int areaIndex = areas.indexWhere((area) => area.name == children[index].name);

             return LayoutGridChild(
               key: Key("$index"),

               top: gridRows[areas[areaIndex].y0] *  constraints.maxHeight ,
               left: gridColumns[areas[areaIndex].x0] * constraints.maxWidth ,

               width: (gridColumns[areas[areaIndex].x1] - gridColumns[areas[areaIndex].x0]) * constraints.maxWidth,
               height: (gridRows[areas[areaIndex].y1] - gridRows[areas[areaIndex].y0]) * constraints.maxHeight,

               
               boxFit: (boxFit == null) ? BoxFit.fill : boxFit,
               widget: children[index].widget,
             );
           })
         ),
       );
     },
   );
 }
}

class LayoutGridChild extends StatelessWidget {

  final double top,left,height,width;
  final BoxFit boxFit;
  final Widget widget;

  const LayoutGridChild({@required Key key, @required this.top, @required this.left, @required this.height, 
                         @required this.width, @required this.boxFit, @required this.widget,}) : super(key: key);

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
        )
      ),
    );
  }
}

 List<double> adjustInputs(List<double> list, bool fractional) {

   //We make sure that our fractions contain 0.0 and 1.0
   if (fractional) list = checkForBeginandEnd(list);

   //We sort them in ascending order
   list.sort((a,b) => a.compareTo(b));

   return list;
 }

 List<double> checkForBeginandEnd(List<double> list) {

   //We see if the list contains the 0.0 and 1.0 and if it doesn't then we add them
   if (!list.contains(0.0)) {
     list.add(0.0);
   }
   if (!list.contains(1.0)) {
     list.add(1.0);
   }
   return list;
 }
*/