import 'package:flutter_web/material.dart';

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
  bool updateShouldNotifyDependent(InheritedSizeModel old, Set<String> aspects) {

    return (sizeMap.containsKey(aspects)) && (sizeMap[aspects] != old.sizeMap[aspects]);
  }
  
  static InheritedSizeModel of(BuildContext context, {String aspect}) {
    return InheritedModel.inheritFrom<InheritedSizeModel>(context, aspect: aspect);
  }

  void updateSize(String key, Size size){
    sizeMap[key] = size;
  }
}