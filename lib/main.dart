
import 'package:flutter_web/material.dart';
import 'layoutGrid_mod.dart';

void main() => runApp(MyApp());

class MyApp extends StatefulWidget {
 MyApp({Key key}) : super(key: key);

 _MyAppState createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {

  final List<Area> bigAreas = [Area(name: "topLeft", x0: 0 ,x1: 1, y0: 0, y1: 1),
                               Area(name: "topRight", x0: 1,x1: 2, y0: 0, y1: 1),
                               Area(name: "center", x0: 0  ,x1: 2, y0: 1, y1: 2),
                               Area(name: "bottom", x0: 0  ,x1: 2, y0: 2, y1: 3),];

  final List<Area> smallAreas = [Area(name: "bottom", x0: 0,x1: 1, y0: 0, y1: 1),
                                 Area(name: "center", x0: 0,x1: 2, y0: 0, y1: 1),
                                 Area(name: "topRight", x0: 0,x1: 2, y0: 1, y1: 2),
                                 Area(name: "topLeft", x0: 0,x1: 2, y0: 2, y1: 3),];

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

           child: LayoutGrid.pixel(

             adapt: true,
             gridColumns: [0.0,200,1000],
             gridRows: [0.0,333,666,1000],

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