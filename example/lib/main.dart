import 'package:flutter/material.dart';
import 'package:layout_grid/layout_grid.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {

  @override
  Widget build(BuildContext context) {
    return MaterialApp(

      home: MyHomePage(),
    );
  }
}

class MyHomePage extends StatefulWidget {
  MyHomePage({Key key}) : super(key: key);

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {

  @override
  Widget build(BuildContext context) {

    return Scaffold(

      body: InheritedLayoutModel(
        child: LayoutBuilder(
          builder: (BuildContext context, BoxConstraints constraints) {

            bool isSmall = false;

            if(constraints.maxWidth < 600) isSmall = true;

            return LayoutGrid(

              key: UniqueKey(),

              maxWidth: constraints.maxWidth,
              maxHeight: constraints.maxHeight,

              layoutModel: InheritedLayoutModel.of(context),

              columns: (!isSmall) ? [
                LayoutPixel(pixels: 0),
                LayoutMinMax(minUnit: LayoutPixel(pixels: 100), unit: LayoutFraction(fraction: 1), priority: 1),
                LayoutMinMax(minUnit: LayoutPixel(pixels: 200), unit: LayoutFraction(fraction: 2), priority: 1),
                LayoutMinMax(minUnit: LayoutPixel(pixels: 200), unit: LayoutFraction(fraction: 2), priority: 1),
                LayoutMinMax(minUnit: LayoutPixel(pixels: 100), unit: LayoutFraction(fraction: 1), priority: 1),
              ] : [
                LayoutPixel(pixels: 0),
                LayoutFraction(fraction: 1),
              ],

              rows: (!isSmall) ? [
                LayoutPixel(pixels: 0),
                LayoutMinMax(minUnit: LayoutPixel(pixels: 100), unit: LayoutFraction(fraction: 1)),
                LayoutMinMax(minUnit: LayoutPixel(pixels: 200), unit: LayoutFraction(fraction: 2)),
                LayoutMinMax(minUnit: LayoutPixel(pixels: 100), unit: LayoutFraction(fraction: 1)),
              ] : [
                LayoutPixel(pixels: 0),
                LayoutMinMax(minUnit: LayoutPixel(pixels: 100), unit: LayoutFraction(fraction: 1)),
                LayoutMinMax(minUnit: LayoutPixel(pixels: 100), unit: LayoutFraction(fraction: 1)),
                LayoutMinMax(minUnit: LayoutPixel(pixels: 200), unit: LayoutFraction(fraction: 4)),
                LayoutMinMax(minUnit: LayoutPixel(pixels: 100), unit: LayoutFraction(fraction: 1)),
                LayoutMinMax(minUnit: LayoutPixel(pixels: 100), unit: LayoutFraction(fraction: 1)),
              ],

              areas: (!isSmall) ? [
                ["Header",   "Header","Header","Header"],
                ["SideBar1", "Content", "Content", "SideBar2"],
                ["Footer",   "Footer","Footer","Footer"],
              ] : [
                ["Header"],
                ["SideBar1"],
                ["Content"],
                ["SideBar2"],
                ["Footer"],
              ],

              couples: [
                LayoutGridCouple(
                  widget: Section(text: "Header", color: Color.fromRGBO(98, 98, 98, 1.0), modelKey: "Header",),
                  name: "Header",
                  modelKey: "Header"
                ),
                LayoutGridCouple(
                  widget: Section(text: "SideBar1", color: Color.fromRGBO(98, 98, 98, 1.0), modelKey: "SideBar1",),
                  name: "SideBar1",
                  modelKey: "SideBar1"
                ),
                LayoutGridCouple(
                  widget: Section(text: "Content", color: Color.fromRGBO(98, 98, 98, 1.0), modelKey: "Content",),
                  name: "Content",
                  modelKey: "Content"
                ),
                LayoutGridCouple(
                  widget: Section(text: "SideBar2", color: Color.fromRGBO(98, 98, 98, 1.0), modelKey: "SideBar2",),
                  name: "SideBar2",
                  modelKey: "SideBar2"
                ),
                LayoutGridCouple(
                  widget: Section(text: "Footer", color: Color.fromRGBO(98, 98, 98, 1.0), modelKey: "Footer",),
                  name: "Footer",
                  modelKey: "Footer"
                ),
              ],
            );
          },
        ),
      ),
    );
  }
}

class Section extends StatelessWidget {
  Section({Key key, @required this.text, @required this.modelKey, @required this.color}) : super(key: key);

  final String text, modelKey;
  Color color;

  InheritedLayoutModel model;

  @override
  Widget build(BuildContext context) {

    model = InheritedLayoutModel.of(context);

    return Container(

      decoration: BoxDecoration(
        border: Border.all(
          color: Colors.white
        ),
        color: Color.fromRGBO(38, 38, 38, 1.0),
      ),

      width: model.getWidth(modelKey),
      height: model.getHeight(modelKey),

      alignment: Alignment(0.0, 0.0),

      child: Text(
        text,
        style: TextStyle(
          color: Colors.white,
          fontSize: 64,
        ),
      ),
    );
  }
}