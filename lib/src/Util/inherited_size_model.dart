import 'package:flutter_web/material.dart';

///Used to store and access the Size of [LayoutGrid]'s children
///
///A key has to be provided via [LayoutGridCouple],
///that tells the [LayoutGrid] to store the Size inside the sizeMap for later use
class InheritedSizeModel extends InheritedModel<String> {
  final Map<String, Size> _sizeMap = Map<String, Size>();

  InheritedSizeModel({
    @required Widget child,
  }) : super(child: child);

  @override
  bool updateShouldNotify(InheritedSizeModel old) {
    return (_sizeMap != old._sizeMap);
  }

  @override
  bool updateShouldNotifyDependent(
      InheritedSizeModel old, Set<String> dependencies) {
    return (_sizeMap.containsKey(dependencies)) &&
        (_sizeMap[dependencies] != old._sizeMap[dependencies]);
  }

  static InheritedSizeModel of(BuildContext context, {String sizeKey}) {
    return InheritedModel.inheritFrom<InheritedSizeModel>(context,
        aspect: sizeKey);
  }

  //Used to store or update the size inside the _sizeMap of the InheritedSizeModel
  void updateSize(String sizeKey, Size size) {
    _sizeMap[sizeKey] = size;
  }

  ///Used to get the width associated to the sizeKey provided
  double getWidth(String sizeKey) {
    return _sizeMap[sizeKey].width;
  }

  ///Used to the height associated to the sizeKey provided
  double getHeight(String sizeKey) {
    return _sizeMap[sizeKey].height;
  }
}
