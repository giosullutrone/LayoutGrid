
import 'package:flutter_web/material.dart';
import 'layoutGrid_mod.dart';

void main() => runApp(MyApp());

class MyApp extends StatefulWidget {
 MyApp({Key key}) : super(key: key);

 _MyAppState createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {

  final List<Area> bigAreas = [Area(name: "topLeft", x0: 0.0,x1: 0.5, y0: 0.0, y1: 0.33),
                               Area(name: "topRight", x0: 0.5,x1: 1.0, y0: 0.0, y1: 0.33),
                               Area(name: "center", x0: 0.0,x1: 1.0, y0: 0.33, y1: 0.66),
                               Area(name: "bottom", x0: 0.0,x1: 1.0, y0: 0.66, y1: 1.0),];

  final List<Area> smallAreas = [Area(name: "bottom", x0: 0.0,x1: 0.5, y0: 0.0, y1: 0.33),
                                 Area(name: "center", x0: 0.5,x1: 1.0, y0: 0.0, y1: 0.33),
                                 Area(name: "topRight", x0: 0.0,x1: 1.0, y0: 0.33, y1: 0.66),
                                 Area(name: "topLeft", x0: 0.0,x1: 1.0, y0: 0.66, y1: 1.0),];

 bool isBigLayout = true;

 @override
 Widget build(BuildContext context) {
   return MaterialApp(
     debugShowCheckedModeBanner: false,
     home: Scaffold(

       floatingActionButton: FloatingActionButton(

         child: Icon(Icons.color_lens),

         onPressed: () {
           isBigLayout = !isBigLayout;
           setState(() {});
         },
       ),

       body: Container(
         child: SafeArea(

           child: LayoutGrid(

             adapt: true,
             constraints: BoxConstraints(maxHeight: 500,maxWidth: 500),

             areas: (isBigLayout) ? bigAreas : smallAreas,
             
             children: [LayoutGridCouple(name: "topLeft", widget: TestContainer(color: Colors.red,)),
                        LayoutGridCouple(name: "topRight", widget: TestContainer(color: Colors.blue,)),
                        LayoutGridCouple(name: "center", widget: TestContainer(color: Colors.green,)),
                        LayoutGridCouple(name: "bottom", widget: TestContainer(color: Colors.orange,)),],

           ),
         ),
       ),
     ),
   );
 }
}

class TestContainer extends StatelessWidget {

 Color color;

 TestContainer({@required this.color});

 @override
 Widget build(BuildContext context) {
   return Container(
     height: 100,
     width: 100,
     decoration: BoxDecoration(
       color: color,
     ),
   );
 }
}