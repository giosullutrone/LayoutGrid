import 'package:flutter_web/material.dart';

class SizePositionCouple {
  SizePositionCouple({this.size = const Size(0.0, 0.0),this.position = const Offset(0.0, 0.0)});

  Size size;
  Offset position;
}

///Used to store and access the Size of [LayoutGrid]'s children
///
///A key has to be provided via [LayoutGridCouple],
///that tells the [LayoutGrid] to store the Size inside the sizeMap for later use
class InheritedLayoutModel extends InheritedModel<String> {
  final Map<String, SizePositionCouple> _modelMap = Map<String, SizePositionCouple>();

  InheritedLayoutModel({
    @required Widget child,
  }) : super(child: child);

  @override
  bool updateShouldNotify(InheritedLayoutModel old) {
    return (_modelMap != old._modelMap);
  }

  @override
  bool updateShouldNotifyDependent(InheritedLayoutModel old, Set<String> dependencies) {
    return (_modelMap.containsKey(dependencies)) && (_modelMap[dependencies] != old._modelMap[dependencies]);
  }

  static InheritedLayoutModel of(BuildContext context, {String modelKey}) {
    return InheritedModel.inheritFrom<InheritedLayoutModel>(context,aspect: modelKey);
  }

  //Used to store or update the size inside the _sizeMap of the InheritedSizeModel
  void updateModel(String modelKey, Size size, Offset position) {
    print("$modelKey $size $position");

    if (_modelMap.containsKey(modelKey)) {   

    _modelMap[modelKey] = SizePositionCouple(size: size, position: position);
    }else {
      
      _modelMap.putIfAbsent(modelKey, () => SizePositionCouple(size: size, position: position));
    }
  }

  ///Used to get the width associated to the sizeKey provided
  double getWidth(String modelKey) {
    return _modelMap[modelKey].size.width;
  }

  ///Used to the height associated to the sizeKey provided
  double getHeight(String modelKey) {
    return _modelMap[modelKey].size.height;
  }

  ///Used to get the dx associated to the sizeKey provided
  double getDx(String modelKey) {
    return _modelMap[modelKey].position.dx;
  }

  ///Used to the dy associated to the sizeKey provided
  double getDy(String modelKey) {
    return _modelMap[modelKey].position.dy;
  }
}
