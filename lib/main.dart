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

            columns: ["1fr", "2fr", "300px", "300px", "2fr", "1fr"],
            rows: ["100%", "50px" , "600px", "50px", "15%", "50%", "50px", "10%"],

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
                      LayoutGridCouple(widget: TopSection(),col0: 0,col1: 6,row0: 0, row1: 1, boxFit: BoxFit.cover, isNested: true),

                      LayoutGridCouple(widget: AboutMeSection(), name: "aboutMe", isNested: true),
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

NestedLayoutGrid TopSection(){

  return NestedLayoutGrid(
    columns: ["1fr","1fr","1fr","1fr","1fr"],
    rows: ["1fr", "1%", "2fr", "1%", "1fr"],

    couples: [
              LayoutGridCouple(widget: TestContainer(color: Color.fromRGBO(245, 245, 245, 0.75),), col0: 0, col1: 5, row0: 1, row1: 2, boxFit: BoxFit.fitWidth),
              LayoutGridCouple(widget: MainText(), col0: 1, col1: 4, row0: 2, row1: 3, boxFit: BoxFit.scaleDown),
              LayoutGridCouple(widget: TestContainer(color: Color.fromRGBO(245, 245, 245, 0.75),), col0: 0, col1: 5, row0: 3, row1: 4, boxFit: BoxFit.fitWidth),
              LayoutGridCouple(widget: ScrollText(), col0: 2, col1: 3, row0: 4, row1: 5, boxFit: BoxFit.scaleDown),],
    
  );
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


NestedLayoutGrid AboutMeSection() {
  return NestedLayoutGrid(
    columns: ["10px","2fr", "300px", "2fr", "10px"],
    rows: ["300px", "10px", "auto", "10px"],

    couples: [LayoutGridCouple(widget: AboutMeImage(), col0: 2,col1: 3, row0: 0, row1: 1),
              LayoutGridCouple(widget: AboutMeText(), col0: 1,col1: 4, row0: 2, row1: 3, boxFit: BoxFit.scaleDown, alignment: Alignment(-1.0, -1.0)),
              LayoutGridCouple(widget: BorderContainer(), col0: 0,col1: 5, row0: 0, row1: 4, boxFit: BoxFit.none,)],
  );
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
  const BorderContainer({Key key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return IntrinsicHeight(
      child: Container(
        decoration: BoxDecoration(

          border: Border.all(
            color: Color.fromRGBO(38, 38, 38, 0.75),
            width: 3.0,
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
    return Container(
      height: 100,
      width: 100,
      decoration: BoxDecoration(
        color: color,
      ),
    );
  }
}