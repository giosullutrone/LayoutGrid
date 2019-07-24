import 'package:flutter_web/material.dart';
import 'layout_grid.dart';

void main() => runApp(MyApp());

class MyApp extends StatefulWidget {
  MyApp({Key key}) : super(key: key);

  _MyAppState createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: Scaffold(
        
        body: Container(
          child: LayoutGrid(

            isAncestor: true,

            columns: [LayoutMinMax(minUnit: LayoutPixel(pixels: 200),maxUnit: LayoutPixel(pixels: 800)), 
                      LayoutMinMax(minUnit: LayoutPixel(pixels: 200),maxUnit: LayoutPixel(pixels: 800)),],

            rows: [LayoutDependent(line: 1, multiplicator: 1), 
                   LayoutDependent(line: 1, multiplicator: 1),],

            areas:[["top", "right"],
                   ["center", "right"],
                  ],

            couples: [LayoutGridCouple(widget: TestContainer(color: Colors.amber,), name: "center", sizeKey: "centerSize"),
                      LayoutGridCouple(widget: TestContainer1(color: Colors.amber,), name: "top", sizeKey: "topSize")],

          )
        ),
      ),
    );
  }
}

class TestContainer extends StatelessWidget {
  final Color color;

  TestContainer({@required this.color});

  @override
  Widget build(BuildContext context) {

    final String key = "centerSize";
    final InheritedSizeModel sizeModel = InheritedSizeModel.of(context, sizeKey: key);

    return Container(
      height: sizeModel.getWidth(key),
      width: sizeModel.getWidth(key),
      decoration: BoxDecoration(
        color: color,
      ),
    );
  }
}

class TestContainer1 extends StatelessWidget {
  final Color color;

  TestContainer1({@required this.color});

  @override
  Widget build(BuildContext context) {

    final String key = "topSize";
    final InheritedSizeModel sizeModel = InheritedSizeModel.of(context, sizeKey: key);

    return Container(
      height: sizeModel.getWidth(key),
      width: sizeModel.getWidth(key),
      decoration: BoxDecoration(
        color: color,
      ),
    );
  }
}