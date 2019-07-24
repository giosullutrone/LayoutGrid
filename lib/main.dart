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

            columns: [LayoutPixel(pixels: 100), LayoutMinMax(minUnit: LayoutPixel(pixels: 200),maxUnit: LayoutPixel(pixels: 400))],

            rows: [LayoutPixel(pixels: 100), LayoutMinMax(minUnit: LayoutPixel(pixels: 200),maxUnit: LayoutFraction(fraction: 1)), LayoutFraction(fraction: 2)],

            areas:[["left", "top", "right"],
                   ["left", "center", "right"],
                  ],

            couples: [LayoutGridCouple(widget: TestContainer(color: Colors.amber,), name: "center", sizeKey: "centerSize")],

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
      height: sizeModel.getHeight(key),
      width: sizeModel.getWidth(key),
      decoration: BoxDecoration(
        color: color,
      ),
    );
  }
}