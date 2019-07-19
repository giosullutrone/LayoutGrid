/*import 'package:flutter_web/material.dart';
import 'layoutGrid_cleaned.dart';

class LayoutGridGuide extends StatelessWidget {
  

  List<Area> areas;
  List<int> gridColumns;
  List<int> gridRows;
  List<LayoutGridCouple> children;
  BoxFit boxFit;
  BoxConstraints constraints;
  bool adapt;

  double autoGap;

 LayoutGridGuide({@required this.areas, @required this.children,  @required this.gridColumns, 
                       @required this.gridRows, this.boxFit,this.adapt = true,this.constraints, this.autoGap = 0.0});

  List<double> _lineColumns = List<double>();
  List<double> _lineRows = List<double>();

  int _nZone = 0;
  List<Widget> widgetList = List<Widget>();


 @override
 Widget build(BuildContext context) {  

   return LayoutBuilder(
     builder: (BuildContext context, BoxConstraints _constraints) {

      if(adapt) {
        constraints = _constraints;
        
        _lineColumns = createLines(gridColumns, constraints.maxWidth);
        _lineRows = createLines(gridRows, constraints.maxHeight);

        _nZone = (_lineColumns.length - 1) * (_lineRows.length - 1);

        widgetList = createGuideChildList(_lineColumns, _lineRows, autoGap);

      }

       return Container(

         width: constraints.maxWidth,
         height: constraints.maxHeight,

         child: Stack(
           children: widgetList
         ),
       );
     },
   );
 }

  int listSum(List<int> list) {
    int _sum = 0;

    for (int _i=0; _i<list.length;_i++) {
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

    for (int _i=0; _i<list.length; _i++){
      
      _lineList.add((list[_i] * _size) + _lastPos);
      _lastPos += (list[_i] * _size);
    }

    return _lineList;
  }
}

List<Widget> createGuideChildList(List<double> xLines, List<double> yLines, double autoGap) {
  List<Widget> _list = List<Widget>();

  for (int _i = 0; _i< xLines.length - 1; _i++ ) {
    for (int _j = 0; _j< yLines.length - 1; _j++ ) {
      _list.add(
        GuideChild(
          top: yLines[_j],
          left: xLines[_i],
          height: yLines[_j+1] - yLines[_j],
          width: xLines[_i+1] - xLines[_i],
        )
      );
    }
  }

  return _list;
}

class GuideChild extends StatelessWidget {

  double top,width,height,left;

  GuideChild({Key key, this.width, this.left, this.top, this.height}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Positioned(
      top: top,
      left: left,

      child: Container(

        height: height,
        width: width,

        decoration: BoxDecoration(
          border: Border.all(
            color: Colors.deepPurple,
            style: BorderStyle.solid,
            width: 4.0
          )
        ),
      ),
    );
  }
} */