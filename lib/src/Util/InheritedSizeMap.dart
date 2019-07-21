import 'package:flutter_web/material.dart';

class SizeModel extends InheritedModel<String> {
  
  final Map<String, Size>  sizeMap = Map<String, Size>();
  
  SizeModel({
    @required Widget child,
  }) : super(child: child);

  @override
  bool updateShouldNotify(SizeModel old) {

    return (sizeMap != old.sizeMap);
  }

  @override
  bool updateShouldNotifyDependent(SizeModel old, Set<String> aspects) {

    return (sizeMap.containsKey(aspects)) && (sizeMap[aspects] != old.sizeMap[aspects]);
  }
  
  static SizeModel of(BuildContext context, {String aspect}) {
    return InheritedModel.inheritFrom<SizeModel>(context, aspect: aspect);
  }

  void updateSize(String key, Size size){
    sizeMap[key] = size;
  }
}