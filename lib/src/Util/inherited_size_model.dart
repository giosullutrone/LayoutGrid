import 'package:flutter_web/material.dart';


///Used to store and access the Size of [LayoutGrid]'s children
///
///A key has to be provided via [LayoutGridCouple], 
///that tells the [LayoutGrid] to store the Size inside the sizeMap for later use
class InheritedSizeModel extends InheritedModel<String> {
  
  final Map<String, Size>  sizeMap = Map<String, Size>();
  
  InheritedSizeModel({
    @required Widget child,
  }) : super(child: child);

  @override
  bool updateShouldNotify(InheritedSizeModel old) {

    return (sizeMap != old.sizeMap);
  }

  @override
  bool updateShouldNotifyDependent(InheritedSizeModel old, Set<String> dependencies) {

    return (sizeMap.containsKey(dependencies)) && (sizeMap[dependencies] != old.sizeMap[dependencies]);
  }
  
  static InheritedSizeModel of(BuildContext context, {String sizeKey}) {
    return InheritedModel.inheritFrom<InheritedSizeModel>(context, aspect: sizeKey);
  }

  void updateSize(String key, Size size){
    sizeMap[key] = size;
  }
}