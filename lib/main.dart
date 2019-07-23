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

            columns: [LayoutFraction(fraction: 1),
                      LayoutFraction(fraction: 2), 
                      LayoutMinMax(minUnit: LayoutPixel(pixels: 100), maxUnit: LayoutPixel(pixels: 300)), 
                      LayoutMinMax(minUnit: LayoutPixel(pixels: 100), maxUnit: LayoutPixel(pixels: 300)), 
                      LayoutFraction(fraction: 2), 
                      LayoutFraction(fraction: 1)],

            rows: [LayoutPercentage(percentage: 100), 
                   LayoutPixel(pixels: 50) ,  
                   LayoutMinMax(minUnit: LayoutPixel(pixels: 200), maxUnit: LayoutPixel(pixels: 600)), 
                   LayoutPixel(pixels: 50), 
                   LayoutPercentage(percentage: 15), 
                   LayoutPercentage(percentage: 50), 
                   LayoutPixel(pixels: 50), 
                   LayoutPercentage(percentage: 10)],

            areas:[["......", ".....",  "....." , "....." , ".....", "....."],
                    [".....", ".....", "......","......", ".....","....."],
                    [".....", ".....", "aboutMe","aboutMe", ".....", "....."],
                    [".....", ".....", ".......",".......", ".....", "....."],
                    [".....", ".....",  "label" , "label" , ".....", "....."],
                    [".....", "info0",  "info0" , "info1" , "info1", "....."],
                    [".....", ".....", "......","......",  ".....",   "....."],
                    ["footer","footer", "footer", "footer","footer", "footer"]
                  ],

            couples: [LayoutGridCouple(widget: MainImage(), col0: 0, col1: 6, row0: 0, row1: 1, boxFit: BoxFit.cover),
                      LayoutGridCouple(widget: TopSection(),col0: 0,col1: 6,row0: 0, row1: 1, boxFit: BoxFit.cover, sizeKey: "topSection"),

                      LayoutGridCouple(widget: AboutMeSection(), name: "aboutMe", sizeKey: "aboutMe"),
                      LayoutGridCouple(widget: TestContainer(color: Colors.teal,), name: "label"),
                      LayoutGridCouple(widget: TestContainer(color: Colors.teal,), name: "info0"),
                      LayoutGridCouple(widget: TestContainer(color: Colors.teal,), name: "info1"),
                      LayoutGridCouple(widget: TestContainer(color: Colors.teal,), name: "footer")],

          )
        ),
      ),
    );
  }
}

class MainImage extends StatelessWidget {
  const MainImage({Key key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      foregroundDecoration: BoxDecoration(
        color: Color.fromRGBO(38, 38, 38, 0.95),
      ),

      child: Image.network(
        "https://images.pexels.com/photos/276374/pexels-photo-276374.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
      ),
    );
  }
}

class MainText extends StatelessWidget {
  const MainText({Key key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(
      children:<Widget> [
        Container(
          child: Text("Layout Grid",style: TextStyle(fontSize: 196.0,color: Color.fromRGBO(245, 245, 245, 0.75)),),
        ),
      ]
    );
  }
}

class ScrollText extends StatelessWidget {
  const ScrollText({Key key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Column(
        children:<Widget> [
          Text(
            "Scroll Down",
            style: TextStyle(
              color: Color.fromRGBO(245, 245, 245, 0.5),
              fontSize: 52.0,
              fontWeight: FontWeight.w100,
            ),
          ),
          Icon(Icons.keyboard_arrow_down, color: Color.fromRGBO(245, 245, 245, 0.75),size: 48.0,)
        ]
      ),
    );
  }
}

class TopSection extends StatelessWidget {
  const TopSection({Key key}) : super(key: key);

  @override
  Widget build(BuildContext context) {

    final String id = "topSection";
    final InheritedSizeModel sizeModel = InheritedSizeModel.of(context, sizeKey: id);

    return LayoutGrid(

      width:sizeModel.sizeMap[id].width,
      height:sizeModel.sizeMap[id].height,

      columns: List<LayoutFraction>.generate(5,(int index) => LayoutFraction(fraction: 1)),
      rows: [LayoutFraction(fraction: 1), LayoutPercentage(percentage: 1), LayoutFraction(fraction: 2), LayoutPercentage(percentage: 1), LayoutFraction(fraction: 1)],

      couples: [
                LayoutGridCouple(widget: TestContainer(color: Color.fromRGBO(245, 245, 245, 0.75),), col0: 0, col1: 5, row0: 1, row1: 2, boxFit: BoxFit.fitWidth),
                LayoutGridCouple(widget: MainText(), col0: 1, col1: 4, row0: 2, row1: 3, boxFit: BoxFit.scaleDown),
                LayoutGridCouple(widget: TestContainer(color: Color.fromRGBO(245, 245, 245, 0.75),), col0: 0, col1: 5, row0: 3, row1: 4, boxFit: BoxFit.fitWidth),
                LayoutGridCouple(widget: ScrollText(), col0: 2, col1: 3, row0: 4, row1: 5, boxFit: BoxFit.scaleDown),],
      
    );
  }
}

class AboutMeSection extends StatelessWidget {
  const AboutMeSection({Key key}) : super(key: key);

  @override
  Widget build(BuildContext context) {

    final String id = "aboutMe";
    final InheritedSizeModel sizeModel = InheritedSizeModel.of(context, sizeKey: id);

    return LayoutGrid(

      columns: [LayoutPixel(pixels: 10),LayoutFraction(fraction: 2), LayoutPixel(pixels: 300), LayoutFraction(fraction: 2), LayoutPixel(pixels: 10)],
      rows: [LayoutPixel(pixels: 10),LayoutPixel(pixels: 300), LayoutPixel(pixels: 10), LayoutFraction(fraction: 1), LayoutPixel(pixels: 10)],

      width: sizeModel.sizeMap[id].width,
      height: sizeModel.sizeMap[id].height,

      couples: [LayoutGridCouple(widget: AboutMeImage(), col0: 2,col1: 3, row0: 1, row1: 2),
                LayoutGridCouple(widget: AboutMeText(), col0: 1,col1: 4, row0: 3, row1: 4, boxFit: BoxFit.scaleDown, alignment: Alignment(-1.0, -1.0)),
                LayoutGridCouple(widget: BorderContainer(), col0: 0,col1: 5, row0: 0, row1: 5, boxFit: BoxFit.none,sizeKey: "cont")],
    );
  }
}

class AboutMeText extends StatelessWidget {
  const AboutMeText({Key key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(
      children:<Widget> [
        Container(

          padding: EdgeInsets.all(16.0),

          child: Text("""I'm a flutter enthusiast and young developer
that is trying to fill this container with text""",style: TextStyle(fontSize: 28.0,color: Color.fromRGBO(38, 38, 38, 0.75,), fontWeight: FontWeight.w200),),
        ),
      ]
    );
  }
}

class AboutMeImage extends StatelessWidget {
  const AboutMeImage({Key key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(

      width: 300,
      height: 300,
      
      decoration: BoxDecoration(
        shape: BoxShape.circle,

        image: DecorationImage(
          
          image: NetworkImage("https://pbs.twimg.com/profile_images/942158813259583488/muclNKDf_400x400.jpg"),
        ),
      ),
    );
  }
}

class BorderContainer extends StatelessWidget {

  @override
  Widget build(BuildContext context) {

    final String id = "cont";
    final InheritedSizeModel sizeModel = InheritedSizeModel.of(context, sizeKey: id);

    return Container(

      width: sizeModel.sizeMap[id].width,
      height: sizeModel.sizeMap[id].height,

      decoration: BoxDecoration(
        border: Border.all(
          color: Color.fromRGBO(38, 38, 38, 0.75),
          width: 3.0,
        )
      ),
    );
  }
}

class TestContainer extends StatelessWidget {
  final Color color;

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