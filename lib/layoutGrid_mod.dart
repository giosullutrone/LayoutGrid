
import 'package:flutter_web/material.dart';

class Area {

 /*
            Here we have p0 => _____________
                             |             |
                             |    name     |
                             |_____________| <= Here we have p1

 */

 double x0, x1, y0, y1;
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

class LayoutGrid extends StatelessWidget {

 List<Area> areas;
 List<LayoutGridCouple> children;
 BoxFit boxFit;
 BoxConstraints constraints;
 bool adapt = true;
 bool fractional = true;

 LayoutGrid({@required this.areas, @required this.children, this.boxFit,this.adapt,this.constraints,this.fractional});

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
               boxFit: (boxFit == null) ? BoxFit.fill : boxFit,
               top: areas[areaIndex].y0 * ((fractional) ? constraints.maxHeight : 1),
               left: areas[areaIndex].x0 * ((fractional) ? constraints.maxWidth : 1),
               width: (areas[areaIndex].x1 - areas[areaIndex].x0) * ((fractional) ? constraints.maxWidth : 1),
               height: (areas[areaIndex].y1 - areas[areaIndex].y0) * ((fractional) ? constraints.maxHeight : 1),
               constraints: constraints,
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
  final BoxConstraints constraints;
  final BoxFit boxFit;
  final Widget widget;

  const LayoutGridChild({@required Key key, @required this.top, @required this.left, @required this.height, @required this.width, @required this.boxFit, 
                         @required this.widget, @required this.constraints}) : super(key: key);

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