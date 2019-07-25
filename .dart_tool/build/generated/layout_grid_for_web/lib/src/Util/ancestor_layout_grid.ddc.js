define(['dart_sdk', 'packages/flutter_web/src/animation/animation', 'packages/flutter_web/animation', 'packages/flutter_web_ui/ui'], function(dart_sdk, animation, animation$, ui) {
  'use strict';
  const core = dart_sdk.core;
  const _js_helper = dart_sdk._js_helper;
  const _interceptors = dart_sdk._interceptors;
  const dart = dart_sdk.dart;
  const dartx = dart_sdk.dartx;
  const src__painting__basic_types = animation.src__painting__basic_types;
  const src__painting__box_fit = animation.src__painting__box_fit;
  const src__painting__alignment = animation.src__painting__alignment;
  const src__widgets__framework = animation$.src__widgets__framework;
  const src__widgets__widget_inspector = animation$.src__widgets__widget_inspector;
  const src__widgets__container = animation$.src__widgets__container;
  const src__widgets__basic = animation$.src__widgets__basic;
  const src__rendering__stack = animation$.src__rendering__stack;
  const src__widgets__inherited_model = animation$.src__widgets__inherited_model;
  const src__widgets__layout_builder = animation$.src__widgets__layout_builder;
  const src__widgets__scroll_configuration = animation$.src__widgets__scroll_configuration;
  const src__widgets__scroll_view = animation$.src__widgets__scroll_view;
  const src__rendering__box = animation$.src__rendering__box;
  const ui$ = ui.ui;
  const src__Util__line_creation = Object.create(dart.library);
  const src__Util__layout_grid_unit_classes = Object.create(dart.library);
  const src__Util__layout_grid_unit = Object.create(dart.library);
  const src__layout_grid = Object.create(dart.library);
  const src__layout_grid_couple = Object.create(dart.library);
  const src__Util__nested_layout_grid = Object.create(dart.library);
  const src__Util__layout_grid_child = Object.create(dart.library);
  const src__Util__inherited_size_model = Object.create(dart.library);
  const src__Util__ancestor_layout_grid = Object.create(dart.library);
  const src__Util__custom_layout_grid_scroll_behavior = Object.create(dart.library);
  const src__Util__area_creation = Object.create(dart.library);
  const $length = dartx.length;
  const $_get = dartx._get;
  const $_set = dartx._set;
  const $last = dartx.last;
  const $containsKey = dartx.containsKey;
  let ListOfdouble = () => (ListOfdouble = dart.constFn(core.List$(core.double)))();
  let ListOfWidget = () => (ListOfWidget = dart.constFn(core.List$(src__widgets__framework.Widget)))();
  let intToLayoutGridChild = () => (intToLayoutGridChild = dart.constFn(dart.fnType(src__Util__layout_grid_child.LayoutGridChild, [core.int])))();
  let LinkedMapOfString$Size = () => (LinkedMapOfString$Size = dart.constFn(_js_helper.LinkedMap$(core.String, ui$.Size)))();
  let SetOfString = () => (SetOfString = dart.constFn(core.Set$(core.String)))();
  let JSArrayOfWidget = () => (JSArrayOfWidget = dart.constFn(_interceptors.JSArray$(src__widgets__framework.Widget)))();
  let BuildContextAndBoxConstraintsToScrollConfiguration = () => (BuildContextAndBoxConstraintsToScrollConfiguration = dart.constFn(dart.fnType(src__widgets__scroll_configuration.ScrollConfiguration, [src__widgets__framework.BuildContext, src__rendering__box.BoxConstraints])))();
  src__Util__line_creation.calculateGridLines = function(_list, space) {
    let _listOfMinMaxValues = ListOfdouble().filled(_list[$length], 0.0);
    let _finalList = ListOfdouble().new(dart.notNull(_list[$length]) + 1);
    let _sumOfFractions = src__Util__line_creation.getSumOfFractions(_list);
    let _freeSpace = src__Util__line_creation.getFreeSpace(_list, space);
    let _currentPosition = 0.0;
    for (let _i = 0; _i < dart.notNull(_list[$length]); _i = _i + 1) {
      let _maxValue = 0.0;
      let _minValue = 0.0;
      let _layoutMinMax = null;
      if (src__Util__layout_grid_unit.LayoutMinMax.is(_list[$_get](_i))) {
        _layoutMinMax = src__Util__layout_grid_unit.LayoutMinMax._check(_list[$_get](_i));
        if (src__Util__layout_grid_unit.LayoutPixel.is(_layoutMinMax.getMaxUnit()) || src__Util__layout_grid_unit.LayoutPercentage.is(_layoutMinMax.getMaxUnit())) {
          _maxValue = src__Util__line_creation.getValueFromLayoutUnit(_layoutMinMax.getMaxUnit(), space, _freeSpace, _sumOfFractions);
          _minValue = src__Util__line_creation.getValueFromLayoutUnit(_layoutMinMax.getMinUnit(), space, _freeSpace, _sumOfFractions);
          if (dart.notNull(_maxValue) < dart.notNull(_freeSpace)) {
            _listOfMinMaxValues[$_set](_i, _maxValue);
            _freeSpace = dart.notNull(_freeSpace) - dart.notNull(_maxValue);
          } else {
            if (dart.notNull(_freeSpace) > dart.notNull(_minValue)) {
              _listOfMinMaxValues[$_set](_i, _freeSpace);
              _freeSpace = 0.0;
            } else if (dart.notNull(_freeSpace) < dart.notNull(_minValue)) {
              _listOfMinMaxValues[$_set](_i, _minValue);
              _freeSpace = 0.0;
            }
          }
        }
      }
    }
    for (let _i = 0; _i < dart.notNull(_list[$length]); _i = _i + 1) {
      let _maxValue = 0.0;
      let _minValue = 0.0;
      let _layoutFraction = null;
      let _layoutMinMax = null;
      if (src__Util__layout_grid_unit.LayoutMinMax.is(_list[$_get](_i))) {
        _layoutMinMax = src__Util__layout_grid_unit.LayoutMinMax._check(_list[$_get](_i));
        if (src__Util__layout_grid_unit.LayoutFraction.is(_layoutMinMax.getMaxUnit())) {
          _maxValue = src__Util__line_creation.getValueFromLayoutUnit(_layoutMinMax.getMaxUnit(), space, _freeSpace, _sumOfFractions);
          _minValue = src__Util__line_creation.getValueFromLayoutUnit(_layoutMinMax.getMinUnit(), space, _freeSpace, _sumOfFractions);
          if (dart.notNull(_minValue) > dart.notNull(_maxValue)) {
            _layoutFraction = src__Util__layout_grid_unit.LayoutFraction._check(_layoutMinMax.getMaxUnit());
            _sumOfFractions = dart.notNull(_sumOfFractions) - dart.notNull(_layoutFraction.fraction);
            _freeSpace = dart.notNull(_freeSpace) - dart.notNull(_minValue);
            _listOfMinMaxValues[$_set](_i, _minValue);
          } else {
            _listOfMinMaxValues[$_set](_i, _maxValue);
          }
        }
      }
    }
    for (let _i = 0; _i < dart.notNull(_list[$length]); _i = _i + 1) {
      let _value = 0.0;
      if (src__Util__layout_grid_unit_classes.SingleUnit.is(_list[$_get](_i))) {
        _value = src__Util__line_creation.getValueFromLayoutUnit(_list[$_get](_i), space, _freeSpace, _sumOfFractions);
        _finalList[$_set](_i + 1, dart.notNull(_value) + _currentPosition);
        _currentPosition = _currentPosition + dart.notNull(_value);
      } else {
        _value = _listOfMinMaxValues[$_get](_i);
        _finalList[$_set](_i + 1, dart.notNull(_value) + _currentPosition);
        _currentPosition = _currentPosition + dart.notNull(_value);
      }
    }
    _finalList[$_set](0, 0.0);
    return _finalList;
  };
  src__Util__line_creation.calculateGridLinesWithDependetUnit = function(_list, space, _listOfDoubles) {
    let _listOfMinMaxValues = ListOfdouble().filled(_list[$length], 0.0);
    let _finalList = ListOfdouble().new(dart.notNull(_list[$length]) + 1);
    let _sumOfFractions = src__Util__line_creation.getSumOfFractions(_list);
    let _freeSpace = src__Util__line_creation.getFreeSpaceWithDependentUnit(_list, space, _listOfDoubles);
    let _currentPosition = 0.0;
    for (let _i = 0; _i < dart.notNull(_list[$length]); _i = _i + 1) {
      let _maxValue = 0.0;
      let _minValue = 0.0;
      let _layoutMinMax = null;
      if (src__Util__layout_grid_unit.LayoutMinMax.is(_list[$_get](_i))) {
        _layoutMinMax = src__Util__layout_grid_unit.LayoutMinMax._check(_list[$_get](_i));
        if (src__Util__layout_grid_unit.LayoutPixel.is(_layoutMinMax.getMaxUnit()) || src__Util__layout_grid_unit.LayoutPercentage.is(_layoutMinMax.getMaxUnit())) {
          _maxValue = src__Util__line_creation.getValueFromLayoutUnit(_layoutMinMax.getMaxUnit(), space, _freeSpace, _sumOfFractions);
          _minValue = src__Util__line_creation.getValueFromLayoutUnit(_layoutMinMax.getMinUnit(), space, _freeSpace, _sumOfFractions);
          if (dart.notNull(_maxValue) < dart.notNull(_freeSpace)) {
            _listOfMinMaxValues[$_set](_i, _maxValue);
            _freeSpace = dart.notNull(_freeSpace) - dart.notNull(_maxValue);
          } else {
            if (dart.notNull(_freeSpace) > dart.notNull(_minValue)) {
              _listOfMinMaxValues[$_set](_i, _freeSpace);
              _freeSpace = 0.0;
            } else if (dart.notNull(_freeSpace) < dart.notNull(_minValue)) {
              _listOfMinMaxValues[$_set](_i, _minValue);
              _freeSpace = 0.0;
            }
          }
        }
      }
    }
    for (let _i = 0; _i < dart.notNull(_list[$length]); _i = _i + 1) {
      let _maxValue = 0.0;
      let _minValue = 0.0;
      let _layoutFraction = null;
      let _layoutMinMax = null;
      if (src__Util__layout_grid_unit.LayoutMinMax.is(_list[$_get](_i))) {
        _layoutMinMax = src__Util__layout_grid_unit.LayoutMinMax._check(_list[$_get](_i));
        if (src__Util__layout_grid_unit.LayoutFraction.is(_layoutMinMax.getMaxUnit())) {
          _maxValue = src__Util__line_creation.getValueFromLayoutUnit(_layoutMinMax.getMaxUnit(), space, _freeSpace, _sumOfFractions);
          _minValue = src__Util__line_creation.getValueFromLayoutUnit(_layoutMinMax.getMinUnit(), space, _freeSpace, _sumOfFractions);
          if (dart.notNull(_minValue) > dart.notNull(_maxValue)) {
            _layoutFraction = src__Util__layout_grid_unit.LayoutFraction._check(_layoutMinMax.getMaxUnit());
            _sumOfFractions = dart.notNull(_sumOfFractions) - dart.notNull(_layoutFraction.fraction);
            _freeSpace = dart.notNull(_freeSpace) - dart.notNull(_minValue);
            _listOfMinMaxValues[$_set](_i, _minValue);
          } else {
            _listOfMinMaxValues[$_set](_i, _maxValue);
          }
        }
      }
    }
    for (let _i = 0; _i < dart.notNull(_list[$length]); _i = _i + 1) {
      let _value = 0.0;
      if (src__Util__layout_grid_unit_classes.SingleUnit.is(_list[$_get](_i))) {
        _value = src__Util__line_creation.getValueFromLayoutUnit(_list[$_get](_i), space, _freeSpace, _sumOfFractions);
        _finalList[$_set](_i + 1, dart.notNull(_value) + _currentPosition);
        _currentPosition = _currentPosition + dart.notNull(_value);
      } else if (src__Util__layout_grid_unit.LayoutDependent.is(_list[$_get](_i))) {
        _value = src__Util__line_creation.getDependentLineValue(src__Util__layout_grid_unit.LayoutDependent._check(_list[$_get](_i)), _listOfDoubles);
        _finalList[$_set](_i + 1, dart.notNull(_value) + _currentPosition);
        _currentPosition = _currentPosition + dart.notNull(_value);
      } else {
        _value = _listOfMinMaxValues[$_get](_i);
        _finalList[$_set](_i + 1, dart.notNull(_value) + _currentPosition);
        _currentPosition = _currentPosition + dart.notNull(_value);
      }
    }
    _finalList[$_set](0, 0.0);
    return _finalList;
  };
  src__Util__line_creation.getValueFromLayoutUnit = function(layoutUnit, space, freeSpace, sumOfFractions) {
    let _value = 0.0;
    if (src__Util__layout_grid_unit.LayoutPixel.is(layoutUnit)) {
      _value = layoutUnit.pixels;
    } else if (src__Util__layout_grid_unit.LayoutPercentage.is(layoutUnit)) {
      _value = layoutUnit.getValue(space);
    } else if (src__Util__layout_grid_unit.LayoutFraction.is(layoutUnit)) {
      _value = layoutUnit.getValue(sumOfFractions, freeSpace);
    }
    return _value;
  };
  src__Util__line_creation.getFreeSpace = function(listToGetSpaceFrom, space) {
    let _freeSpace = space;
    for (let _i = 0; _i < dart.notNull(listToGetSpaceFrom[$length]); _i = _i + 1) {
      if (src__Util__layout_grid_unit.LayoutPixel.is(listToGetSpaceFrom[$_get](_i)) || src__Util__layout_grid_unit.LayoutPercentage.is(listToGetSpaceFrom[$_get](_i))) {
        _freeSpace = dart.notNull(_freeSpace) - dart.notNull(src__Util__line_creation.getValueFromLayoutUnit(listToGetSpaceFrom[$_get](_i), space, 0.0, 0));
      }
    }
    return _freeSpace;
  };
  src__Util__line_creation.getFreeSpaceWithDependentUnit = function(listToGetSpaceFrom, space, _listOfDoubles) {
    let _freeSpace = space;
    for (let _i = 0; _i < dart.notNull(listToGetSpaceFrom[$length]); _i = _i + 1) {
      if (src__Util__layout_grid_unit.LayoutPixel.is(listToGetSpaceFrom[$_get](_i)) || src__Util__layout_grid_unit.LayoutPercentage.is(listToGetSpaceFrom[$_get](_i))) {
        _freeSpace = dart.notNull(_freeSpace) - dart.notNull(src__Util__line_creation.getValueFromLayoutUnit(listToGetSpaceFrom[$_get](_i), space, 0.0, 0));
      } else if (src__Util__layout_grid_unit.LayoutDependent.is(listToGetSpaceFrom[$_get](_i))) {
        _freeSpace = dart.notNull(_freeSpace) - dart.notNull(src__Util__line_creation.getDependentLineValue(src__Util__layout_grid_unit.LayoutDependent._check(listToGetSpaceFrom[$_get](_i)), _listOfDoubles));
      }
    }
    return _freeSpace;
  };
  src__Util__line_creation.getDependentLineValue = function(_layoutDependent, _listOfDoubles) {
    let _value = 0.0;
    _value = dart.notNull(_listOfDoubles[$_get](_layoutDependent.line)) * dart.notNull(_layoutDependent.multiplicator);
    return _value;
  };
  src__Util__line_creation.getSumOfFractions = function(listToSumFunctionOf) {
    let _layoutFraction = null;
    let _layoutMinMax = null;
    let _sumOfFractions = 0;
    for (let _i = 0; _i < dart.notNull(listToSumFunctionOf[$length]); _i = _i + 1) {
      if (src__Util__layout_grid_unit.LayoutFraction.is(listToSumFunctionOf[$_get](_i))) {
        _layoutFraction = src__Util__layout_grid_unit.LayoutFraction._check(listToSumFunctionOf[$_get](_i));
        _sumOfFractions = _sumOfFractions + dart.notNull(_layoutFraction.fraction);
      } else if (src__Util__layout_grid_unit.LayoutMinMax.is(listToSumFunctionOf[$_get](_i))) {
        _layoutMinMax = src__Util__layout_grid_unit.LayoutMinMax._check(listToSumFunctionOf[$_get](_i));
        if (src__Util__layout_grid_unit.LayoutFraction.is(_layoutMinMax.getMaxUnit())) {
          _layoutFraction = src__Util__layout_grid_unit.LayoutFraction._check(_layoutMinMax.getMaxUnit());
          _sumOfFractions = _sumOfFractions + dart.notNull(_layoutFraction.fraction);
        }
      }
    }
    return _sumOfFractions;
  };
  src__Util__layout_grid_unit_classes.LayoutUnit = class LayoutUnit extends core.Object {};
  (src__Util__layout_grid_unit_classes.LayoutUnit.new = function() {
    ;
  }).prototype = src__Util__layout_grid_unit_classes.LayoutUnit.prototype;
  dart.addTypeTests(src__Util__layout_grid_unit_classes.LayoutUnit);
  dart.setLibraryUri(src__Util__layout_grid_unit_classes.LayoutUnit, "package:layout_grid_for_web/src/Util/layout_grid_unit_classes.dart");
  src__Util__layout_grid_unit_classes.OtherLayoutDependent = class OtherLayoutDependent extends src__Util__layout_grid_unit_classes.LayoutUnit {};
  (src__Util__layout_grid_unit_classes.OtherLayoutDependent.new = function() {
    ;
  }).prototype = src__Util__layout_grid_unit_classes.OtherLayoutDependent.prototype;
  dart.addTypeTests(src__Util__layout_grid_unit_classes.OtherLayoutDependent);
  dart.setLibraryUri(src__Util__layout_grid_unit_classes.OtherLayoutDependent, "package:layout_grid_for_web/src/Util/layout_grid_unit_classes.dart");
  src__Util__layout_grid_unit_classes.OtherLayoutIndependent = class OtherLayoutIndependent extends src__Util__layout_grid_unit_classes.LayoutUnit {};
  (src__Util__layout_grid_unit_classes.OtherLayoutIndependent.new = function() {
    ;
  }).prototype = src__Util__layout_grid_unit_classes.OtherLayoutIndependent.prototype;
  dart.addTypeTests(src__Util__layout_grid_unit_classes.OtherLayoutIndependent);
  dart.setLibraryUri(src__Util__layout_grid_unit_classes.OtherLayoutIndependent, "package:layout_grid_for_web/src/Util/layout_grid_unit_classes.dart");
  src__Util__layout_grid_unit_classes.SingleUnit = class SingleUnit extends src__Util__layout_grid_unit_classes.OtherLayoutIndependent {};
  (src__Util__layout_grid_unit_classes.SingleUnit.new = function() {
    ;
  }).prototype = src__Util__layout_grid_unit_classes.SingleUnit.prototype;
  dart.addTypeTests(src__Util__layout_grid_unit_classes.SingleUnit);
  dart.setLibraryUri(src__Util__layout_grid_unit_classes.SingleUnit, "package:layout_grid_for_web/src/Util/layout_grid_unit_classes.dart");
  src__Util__layout_grid_unit_classes.FreeSpaceIndependent = class FreeSpaceIndependent extends src__Util__layout_grid_unit_classes.SingleUnit {};
  (src__Util__layout_grid_unit_classes.FreeSpaceIndependent.new = function() {
    ;
  }).prototype = src__Util__layout_grid_unit_classes.FreeSpaceIndependent.prototype;
  dart.addTypeTests(src__Util__layout_grid_unit_classes.FreeSpaceIndependent);
  dart.setLibraryUri(src__Util__layout_grid_unit_classes.FreeSpaceIndependent, "package:layout_grid_for_web/src/Util/layout_grid_unit_classes.dart");
  src__Util__layout_grid_unit.LayoutPixel = class LayoutPixel extends src__Util__layout_grid_unit_classes.FreeSpaceIndependent {
    get pixels() {
      return this[pixels$];
    }
    set pixels(value) {
      this[pixels$] = value;
    }
    getValue() {
      return this.pixels;
    }
  };
  (src__Util__layout_grid_unit.LayoutPixel.new = function(opts) {
    let pixels = opts && 'pixels' in opts ? opts.pixels : 0.0;
    this[pixels$] = pixels;
    if (!(pixels != null)) dart.assertFailed(null, "org-dartlang-app:///packages/layout_grid_for_web/src/Util/layout_grid_unit.dart", 8, 5, "pixels != null");
    ;
  }).prototype = src__Util__layout_grid_unit.LayoutPixel.prototype;
  dart.addTypeTests(src__Util__layout_grid_unit.LayoutPixel);
  const pixels$ = Symbol("LayoutPixel.pixels");
  dart.setMethodSignature(src__Util__layout_grid_unit.LayoutPixel, () => ({
    __proto__: dart.getMethods(src__Util__layout_grid_unit.LayoutPixel.__proto__),
    getValue: dart.fnType(core.double, [])
  }));
  dart.setLibraryUri(src__Util__layout_grid_unit.LayoutPixel, "package:layout_grid_for_web/src/Util/layout_grid_unit.dart");
  dart.setFieldSignature(src__Util__layout_grid_unit.LayoutPixel, () => ({
    __proto__: dart.getFields(src__Util__layout_grid_unit.LayoutPixel.__proto__),
    pixels: dart.fieldType(core.double)
  }));
  src__Util__layout_grid_unit.LayoutPercentage = class LayoutPercentage extends src__Util__layout_grid_unit_classes.FreeSpaceIndependent {
    get percentage() {
      return this[percentage$];
    }
    set percentage(value) {
      this[percentage$] = value;
    }
    getValue(size) {
      return dart.notNull(this.percentage) / 100 * dart.notNull(size);
    }
  };
  (src__Util__layout_grid_unit.LayoutPercentage.new = function(opts) {
    let percentage = opts && 'percentage' in opts ? opts.percentage : 0.0;
    this[percentage$] = percentage;
    if (!(dart.notNull(percentage) >= 0.0)) dart.assertFailed(null, "org-dartlang-app:///packages/layout_grid_for_web/src/Util/layout_grid_unit.dart", 23, 5, "percentage >= 0.0");
    ;
  }).prototype = src__Util__layout_grid_unit.LayoutPercentage.prototype;
  dart.addTypeTests(src__Util__layout_grid_unit.LayoutPercentage);
  const percentage$ = Symbol("LayoutPercentage.percentage");
  dart.setMethodSignature(src__Util__layout_grid_unit.LayoutPercentage, () => ({
    __proto__: dart.getMethods(src__Util__layout_grid_unit.LayoutPercentage.__proto__),
    getValue: dart.fnType(core.double, [core.double])
  }));
  dart.setLibraryUri(src__Util__layout_grid_unit.LayoutPercentage, "package:layout_grid_for_web/src/Util/layout_grid_unit.dart");
  dart.setFieldSignature(src__Util__layout_grid_unit.LayoutPercentage, () => ({
    __proto__: dart.getFields(src__Util__layout_grid_unit.LayoutPercentage.__proto__),
    percentage: dart.fieldType(core.double)
  }));
  src__Util__layout_grid_unit.LayoutFraction = class LayoutFraction extends src__Util__layout_grid_unit_classes.SingleUnit {
    get fraction() {
      return this[fraction$];
    }
    set fraction(value) {
      this[fraction$] = value;
    }
    getValue(sumOfFractions, freeSpace) {
      return dart.notNull(this.fraction) / dart.notNull(sumOfFractions) * dart.notNull(freeSpace);
    }
  };
  (src__Util__layout_grid_unit.LayoutFraction.new = function(opts) {
    let fraction = opts && 'fraction' in opts ? opts.fraction : 0;
    this[fraction$] = fraction;
    if (!(fraction != null)) dart.assertFailed(null, "org-dartlang-app:///packages/layout_grid_for_web/src/Util/layout_grid_unit.dart", 38, 5, "fraction != null");
    ;
  }).prototype = src__Util__layout_grid_unit.LayoutFraction.prototype;
  dart.addTypeTests(src__Util__layout_grid_unit.LayoutFraction);
  const fraction$ = Symbol("LayoutFraction.fraction");
  dart.setMethodSignature(src__Util__layout_grid_unit.LayoutFraction, () => ({
    __proto__: dart.getMethods(src__Util__layout_grid_unit.LayoutFraction.__proto__),
    getValue: dart.fnType(core.double, [core.int, core.double])
  }));
  dart.setLibraryUri(src__Util__layout_grid_unit.LayoutFraction, "package:layout_grid_for_web/src/Util/layout_grid_unit.dart");
  dart.setFieldSignature(src__Util__layout_grid_unit.LayoutFraction, () => ({
    __proto__: dart.getFields(src__Util__layout_grid_unit.LayoutFraction.__proto__),
    fraction: dart.fieldType(core.int)
  }));
  src__Util__layout_grid_unit.LayoutMinMax = class LayoutMinMax extends src__Util__layout_grid_unit_classes.OtherLayoutIndependent {
    get minUnit() {
      return this[minUnit$];
    }
    set minUnit(value) {
      this[minUnit$] = value;
    }
    get maxUnit() {
      return this[maxUnit$];
    }
    set maxUnit(value) {
      this[maxUnit$] = value;
    }
    getMinUnit() {
      return this.minUnit;
    }
    getMaxUnit() {
      return this.maxUnit;
    }
  };
  (src__Util__layout_grid_unit.LayoutMinMax.new = function(opts) {
    let minUnit = opts && 'minUnit' in opts ? opts.minUnit : null;
    let maxUnit = opts && 'maxUnit' in opts ? opts.maxUnit : null;
    this[minUnit$] = minUnit;
    this[maxUnit$] = maxUnit;
    if (!(minUnit != null)) dart.assertFailed(maxUnit != null, "org-dartlang-app:///packages/layout_grid_for_web/src/Util/layout_grid_unit.dart", 54, 5, "minUnit != null");
    ;
  }).prototype = src__Util__layout_grid_unit.LayoutMinMax.prototype;
  dart.addTypeTests(src__Util__layout_grid_unit.LayoutMinMax);
  const minUnit$ = Symbol("LayoutMinMax.minUnit");
  const maxUnit$ = Symbol("LayoutMinMax.maxUnit");
  dart.setMethodSignature(src__Util__layout_grid_unit.LayoutMinMax, () => ({
    __proto__: dart.getMethods(src__Util__layout_grid_unit.LayoutMinMax.__proto__),
    getMinUnit: dart.fnType(src__Util__layout_grid_unit_classes.FreeSpaceIndependent, []),
    getMaxUnit: dart.fnType(src__Util__layout_grid_unit_classes.SingleUnit, [])
  }));
  dart.setLibraryUri(src__Util__layout_grid_unit.LayoutMinMax, "package:layout_grid_for_web/src/Util/layout_grid_unit.dart");
  dart.setFieldSignature(src__Util__layout_grid_unit.LayoutMinMax, () => ({
    __proto__: dart.getFields(src__Util__layout_grid_unit.LayoutMinMax.__proto__),
    minUnit: dart.fieldType(src__Util__layout_grid_unit_classes.FreeSpaceIndependent),
    maxUnit: dart.fieldType(src__Util__layout_grid_unit_classes.SingleUnit)
  }));
  src__Util__layout_grid_unit.LayoutDependent = class LayoutDependent extends src__Util__layout_grid_unit_classes.OtherLayoutDependent {
    get line() {
      return this[line$];
    }
    set line(value) {
      this[line$] = value;
    }
    get multiplicator() {
      return this[multiplicator$];
    }
    set multiplicator(value) {
      this[multiplicator$] = value;
    }
  };
  (src__Util__layout_grid_unit.LayoutDependent.new = function(opts) {
    let line = opts && 'line' in opts ? opts.line : null;
    let multiplicator = opts && 'multiplicator' in opts ? opts.multiplicator : 1.0;
    this[line$] = line;
    this[multiplicator$] = multiplicator;
    if (!(line != null)) dart.assertFailed(multiplicator != null, "org-dartlang-app:///packages/layout_grid_for_web/src/Util/layout_grid_unit.dart", 75, 5, "line != null");
    ;
  }).prototype = src__Util__layout_grid_unit.LayoutDependent.prototype;
  dart.addTypeTests(src__Util__layout_grid_unit.LayoutDependent);
  const line$ = Symbol("LayoutDependent.line");
  const multiplicator$ = Symbol("LayoutDependent.multiplicator");
  dart.setLibraryUri(src__Util__layout_grid_unit.LayoutDependent, "package:layout_grid_for_web/src/Util/layout_grid_unit.dart");
  dart.setFieldSignature(src__Util__layout_grid_unit.LayoutDependent, () => ({
    __proto__: dart.getFields(src__Util__layout_grid_unit.LayoutDependent.__proto__),
    line: dart.fieldType(core.int),
    multiplicator: dart.fieldType(core.double)
  }));
  src__layout_grid.LayoutGrid = class LayoutGrid extends src__widgets__framework.StatefulWidget {
    get columns() {
      return this[columns$];
    }
    set columns(value) {
      super.columns = value;
    }
    get rows() {
      return this[rows$];
    }
    set rows(value) {
      super.rows = value;
    }
    get couples() {
      return this[couples$];
    }
    set couples(value) {
      super.couples = value;
    }
    get areas() {
      return this[areas$];
    }
    set areas(value) {
      super.areas = value;
    }
    get width() {
      return this[width$];
    }
    set width(value) {
      super.width = value;
    }
    get height() {
      return this[height$];
    }
    set height(value) {
      super.height = value;
    }
    get scrollDirection() {
      return this[scrollDirection$];
    }
    set scrollDirection(value) {
      super.scrollDirection = value;
    }
    get isAncestor() {
      return this[isAncestor$];
    }
    set isAncestor(value) {
      super.isAncestor = value;
    }
    get calculatedCouples() {
      return this[calculatedCouples];
    }
    set calculatedCouples(value) {
      this[calculatedCouples] = value;
    }
    createState() {
      return new src__layout_grid._LayoutGridState.new();
    }
  };
  (src__layout_grid.LayoutGrid.new = function(opts) {
    let columns = opts && 'columns' in opts ? opts.columns : null;
    let rows = opts && 'rows' in opts ? opts.rows : null;
    let couples = opts && 'couples' in opts ? opts.couples : null;
    let areas = opts && 'areas' in opts ? opts.areas : null;
    let width = opts && 'width' in opts ? opts.width : null;
    let height = opts && 'height' in opts ? opts.height : null;
    let scrollDirection = opts && 'scrollDirection' in opts ? opts.scrollDirection : src__painting__basic_types.Axis.vertical;
    let isAncestor = opts && 'isAncestor' in opts ? opts.isAncestor : false;
    let key = opts && 'key' in opts ? opts.key : null;
    let $creationLocationd_0dea112b090073317d4 = opts && '$creationLocationd_0dea112b090073317d4' in opts ? opts.$creationLocationd_0dea112b090073317d4 : null;
    this[calculatedCouples] = null;
    this[columns$] = columns;
    this[rows$] = rows;
    this[couples$] = couples;
    this[areas$] = areas;
    this[width$] = width;
    this[height$] = height;
    this[scrollDirection$] = scrollDirection;
    this[isAncestor$] = isAncestor;
    src__layout_grid.LayoutGrid.__proto__.new.call(this, {key: key, $creationLocationd_0dea112b090073317d4: $creationLocationd_0dea112b090073317d4});
    ;
  }).prototype = src__layout_grid.LayoutGrid.prototype;
  dart.addTypeTests(src__layout_grid.LayoutGrid);
  const columns$ = Symbol("LayoutGrid.columns");
  const rows$ = Symbol("LayoutGrid.rows");
  const couples$ = Symbol("LayoutGrid.couples");
  const areas$ = Symbol("LayoutGrid.areas");
  const width$ = Symbol("LayoutGrid.width");
  const height$ = Symbol("LayoutGrid.height");
  const scrollDirection$ = Symbol("LayoutGrid.scrollDirection");
  const isAncestor$ = Symbol("LayoutGrid.isAncestor");
  const calculatedCouples = Symbol("LayoutGrid.calculatedCouples");
  dart.setMethodSignature(src__layout_grid.LayoutGrid, () => ({
    __proto__: dart.getMethods(src__layout_grid.LayoutGrid.__proto__),
    createState: dart.fnType(src__layout_grid._LayoutGridState, [])
  }));
  dart.setLibraryUri(src__layout_grid.LayoutGrid, "package:layout_grid_for_web/src/layout_grid.dart");
  dart.setFieldSignature(src__layout_grid.LayoutGrid, () => ({
    __proto__: dart.getFields(src__layout_grid.LayoutGrid.__proto__),
    columns: dart.finalFieldType(core.List$(src__Util__layout_grid_unit_classes.LayoutUnit)),
    rows: dart.finalFieldType(core.List$(src__Util__layout_grid_unit_classes.LayoutUnit)),
    couples: dart.finalFieldType(core.List$(src__layout_grid_couple.LayoutGridCouple)),
    areas: dart.finalFieldType(core.List$(core.List$(core.String))),
    width: dart.finalFieldType(core.double),
    height: dart.finalFieldType(core.double),
    scrollDirection: dart.finalFieldType(src__painting__basic_types.Axis),
    isAncestor: dart.finalFieldType(core.bool),
    calculatedCouples: dart.fieldType(core.List$(src__layout_grid_couple.LayoutGridCouple))
  }));
  const _couples = dart.privateName(src__layout_grid, "_couples");
  let const$;
  let const$0;
  let const$1;
  let const$2;
  let const$3;
  let const$4;
  let const$5;
  let const$6;
  let const$7;
  let const$8;
  let const$9;
  let const$10;
  let const$11;
  let const$12;
  let const$13;
  src__layout_grid._LayoutGridState = class _LayoutGridState extends src__widgets__framework.State$(src__layout_grid.LayoutGrid) {
    initState() {
      super.initState();
      if (this.widget.calculatedCouples == null) this.widget.calculatedCouples = src__Util__area_creation.getPositionedGridCoupleList(this.widget.areas, this.widget.couples);
      this[_couples] = this.widget.calculatedCouples;
    }
    build(context) {
      if (dart.test(this.widget.isAncestor)) {
        return new src__Util__ancestor_layout_grid.AncestorLayoutGrid.new({key: new src__widgets__framework.UniqueKey.new(), columns: this.widget.columns, rows: this.widget.rows, couples: this[_couples], scrollDirection: this.widget.scrollDirection, $creationLocationd_0dea112b090073317d4: const$5 || (const$5 = dart.const(new src__widgets__widget_inspector._Location.new({line: 166, column: 14, file: "org-dartlang-app:///packages/layout_grid_for_web/src/layout_grid.dart", parameterLocations: const$4 || (const$4 = dart.constList([const$ || (const$ = dart.const(new src__widgets__widget_inspector._Location.new({line: 167, column: 9, name: "key"}))), const$0 || (const$0 = dart.const(new src__widgets__widget_inspector._Location.new({line: 168, column: 9, name: "columns"}))), const$1 || (const$1 = dart.const(new src__widgets__widget_inspector._Location.new({line: 169, column: 9, name: "rows"}))), const$2 || (const$2 = dart.const(new src__widgets__widget_inspector._Location.new({line: 170, column: 9, name: "couples"}))), const$3 || (const$3 = dart.const(new src__widgets__widget_inspector._Location.new({line: 171, column: 9, name: "scrollDirection"})))], src__widgets__widget_inspector._Location))})))});
      } else {
        return new src__Util__nested_layout_grid.NestedLayoutGrid.new({key: new src__widgets__framework.UniqueKey.new(), columns: this.widget.columns, rows: this.widget.rows, couples: this[_couples], height: this.widget.height, width: this.widget.width, $creationLocationd_0dea112b090073317d4: const$13 || (const$13 = dart.const(new src__widgets__widget_inspector._Location.new({line: 174, column: 14, file: "org-dartlang-app:///packages/layout_grid_for_web/src/layout_grid.dart", parameterLocations: const$12 || (const$12 = dart.constList([const$6 || (const$6 = dart.const(new src__widgets__widget_inspector._Location.new({line: 175, column: 9, name: "key"}))), const$7 || (const$7 = dart.const(new src__widgets__widget_inspector._Location.new({line: 176, column: 9, name: "columns"}))), const$8 || (const$8 = dart.const(new src__widgets__widget_inspector._Location.new({line: 177, column: 9, name: "rows"}))), const$9 || (const$9 = dart.const(new src__widgets__widget_inspector._Location.new({line: 178, column: 9, name: "couples"}))), const$10 || (const$10 = dart.const(new src__widgets__widget_inspector._Location.new({line: 179, column: 9, name: "height"}))), const$11 || (const$11 = dart.const(new src__widgets__widget_inspector._Location.new({line: 180, column: 9, name: "width"})))], src__widgets__widget_inspector._Location))})))});
      }
    }
  };
  (src__layout_grid._LayoutGridState.new = function() {
    this[_couples] = null;
    src__layout_grid._LayoutGridState.__proto__.new.call(this);
    ;
  }).prototype = src__layout_grid._LayoutGridState.prototype;
  dart.addTypeTests(src__layout_grid._LayoutGridState);
  dart.setMethodSignature(src__layout_grid._LayoutGridState, () => ({
    __proto__: dart.getMethods(src__layout_grid._LayoutGridState.__proto__),
    build: dart.fnType(src__widgets__framework.Widget, [src__widgets__framework.BuildContext])
  }));
  dart.setLibraryUri(src__layout_grid._LayoutGridState, "package:layout_grid_for_web/src/layout_grid.dart");
  dart.setFieldSignature(src__layout_grid._LayoutGridState, () => ({
    __proto__: dart.getFields(src__layout_grid._LayoutGridState.__proto__),
    [_couples]: dart.fieldType(core.List$(src__layout_grid_couple.LayoutGridCouple))
  }));
  let const$14;
  src__layout_grid_couple.LayoutGridCouple = class LayoutGridCouple extends core.Object {
    get widget() {
      return this[widget$];
    }
    set widget(value) {
      super.widget = value;
    }
    get col0() {
      return this[col0$];
    }
    set col0(value) {
      this[col0$] = value;
    }
    get col1() {
      return this[col1$];
    }
    set col1(value) {
      this[col1$] = value;
    }
    get row0() {
      return this[row0$];
    }
    set row0(value) {
      this[row0$] = value;
    }
    get row1() {
      return this[row1$];
    }
    set row1(value) {
      this[row1$] = value;
    }
    get name() {
      return this[name$];
    }
    set name(value) {
      super.name = value;
    }
    get boxFit() {
      return this[boxFit$];
    }
    set boxFit(value) {
      super.boxFit = value;
    }
    get alignment() {
      return this[alignment$];
    }
    set alignment(value) {
      super.alignment = value;
    }
    get sizeKey() {
      return this[sizeKey$];
    }
    set sizeKey(value) {
      super.sizeKey = value;
    }
  };
  (src__layout_grid_couple.LayoutGridCouple.new = function(opts) {
    let widget = opts && 'widget' in opts ? opts.widget : null;
    let name = opts && 'name' in opts ? opts.name : null;
    let col0 = opts && 'col0' in opts ? opts.col0 : -1;
    let col1 = opts && 'col1' in opts ? opts.col1 : -1;
    let row0 = opts && 'row0' in opts ? opts.row0 : -1;
    let row1 = opts && 'row1' in opts ? opts.row1 : -1;
    let boxFit = opts && 'boxFit' in opts ? opts.boxFit : src__painting__box_fit.BoxFit.none;
    let alignment = opts && 'alignment' in opts ? opts.alignment : const$14 || (const$14 = dart.const(new src__painting__alignment.Alignment.new(0.0, 0.0)));
    let sizeKey = opts && 'sizeKey' in opts ? opts.sizeKey : null;
    this[widget$] = widget;
    this[name$] = name;
    this[col0$] = col0;
    this[col1$] = col1;
    this[row0$] = row0;
    this[row1$] = row1;
    this[boxFit$] = boxFit;
    this[alignment$] = alignment;
    this[sizeKey$] = sizeKey;
    ;
  }).prototype = src__layout_grid_couple.LayoutGridCouple.prototype;
  dart.addTypeTests(src__layout_grid_couple.LayoutGridCouple);
  const widget$ = Symbol("LayoutGridCouple.widget");
  const col0$ = Symbol("LayoutGridCouple.col0");
  const col1$ = Symbol("LayoutGridCouple.col1");
  const row0$ = Symbol("LayoutGridCouple.row0");
  const row1$ = Symbol("LayoutGridCouple.row1");
  const name$ = Symbol("LayoutGridCouple.name");
  const boxFit$ = Symbol("LayoutGridCouple.boxFit");
  const alignment$ = Symbol("LayoutGridCouple.alignment");
  const sizeKey$ = Symbol("LayoutGridCouple.sizeKey");
  dart.setLibraryUri(src__layout_grid_couple.LayoutGridCouple, "package:layout_grid_for_web/src/layout_grid_couple.dart");
  dart.setFieldSignature(src__layout_grid_couple.LayoutGridCouple, () => ({
    __proto__: dart.getFields(src__layout_grid_couple.LayoutGridCouple.__proto__),
    widget: dart.finalFieldType(src__widgets__framework.Widget),
    col0: dart.fieldType(core.int),
    col1: dart.fieldType(core.int),
    row0: dart.fieldType(core.int),
    row1: dart.fieldType(core.int),
    name: dart.finalFieldType(core.String),
    boxFit: dart.finalFieldType(src__painting__box_fit.BoxFit),
    alignment: dart.finalFieldType(src__painting__alignment.Alignment),
    sizeKey: dart.finalFieldType(core.String)
  }));
  const _col = dart.privateName(src__Util__nested_layout_grid, "_col");
  const _rows = dart.privateName(src__Util__nested_layout_grid, "_rows");
  const _top = dart.privateName(src__Util__nested_layout_grid, "_top");
  const _left = dart.privateName(src__Util__nested_layout_grid, "_left");
  const _width = dart.privateName(src__Util__nested_layout_grid, "_width");
  const _height = dart.privateName(src__Util__nested_layout_grid, "_height");
  let const$15;
  let const$16;
  let const$17;
  let const$18;
  let const$19;
  let const$20;
  let const$21;
  let const$22;
  let const$23;
  let const$24;
  let const$25;
  let const$26;
  let const$27;
  let const$28;
  let const$29;
  let const$30;
  let const$31;
  let const$32;
  let const$33;
  src__Util__nested_layout_grid.NestedLayoutGrid = class NestedLayoutGrid extends src__widgets__framework.StatelessWidget {
    get columns() {
      return this[columns$0];
    }
    set columns(value) {
      super.columns = value;
    }
    get rows() {
      return this[rows$0];
    }
    set rows(value) {
      super.rows = value;
    }
    get couples() {
      return this[couples$0];
    }
    set couples(value) {
      super.couples = value;
    }
    get width() {
      return this[width$0];
    }
    set width(value) {
      super.width = value;
    }
    get height() {
      return this[height$0];
    }
    set height(value) {
      super.height = value;
    }
    build(context) {
      this.updateGrid(this.width, this.height);
      return new src__widgets__container.Container.new({height: this[_rows][$last], width: this[_col][$last], child: new src__widgets__basic.Stack.new({fit: src__rendering__stack.StackFit.expand, children: ListOfWidget().generate(this.couples[$length], dart.fn(index => {
            this[_top] = this[_rows][$_get](this.couples[$_get](index).row0);
            this[_left] = this[_col][$_get](this.couples[$_get](index).col0);
            this[_height] = dart.notNull(this[_rows][$_get](this.couples[$_get](index).row1)) - dart.notNull(this[_rows][$_get](this.couples[$_get](index).row0)) >= 0.0 ? dart.notNull(this[_rows][$_get](this.couples[$_get](index).row1)) - dart.notNull(this[_rows][$_get](this.couples[$_get](index).row0)) : 0.0;
            this[_width] = dart.notNull(this[_col][$_get](this.couples[$_get](index).col1)) - dart.notNull(this[_col][$_get](this.couples[$_get](index).col0)) >= 0.0 ? dart.notNull(this[_col][$_get](this.couples[$_get](index).col1)) - dart.notNull(this[_col][$_get](this.couples[$_get](index).col0)) : 0.0;
            if (this.couples[$_get](index).sizeKey != null) {
              src__Util__inherited_size_model.InheritedSizeModel.of(context).updateSize(this.couples[$_get](index).sizeKey, new ui$.Size.new(this.width, this.height));
            }
            return new src__Util__layout_grid_child.LayoutGridChild.new({key: new src__widgets__framework.UniqueKey.new(), top: this[_top], left: this[_left], height: this[_height], width: this[_width], widget: this.couples[$_get](index).widget, boxFit: this.couples[$_get](index).boxFit, alignment: this.couples[$_get](index).alignment, $creationLocationd_0dea112b090073317d4: const$24 || (const$24 = dart.const(new src__widgets__widget_inspector._Location.new({line: 59, column: 18, file: "org-dartlang-app:///packages/layout_grid_for_web/src/Util/nested_layout_grid.dart", parameterLocations: const$23 || (const$23 = dart.constList([const$15 || (const$15 = dart.const(new src__widgets__widget_inspector._Location.new({line: 61, column: 13, name: "key"}))), const$16 || (const$16 = dart.const(new src__widgets__widget_inspector._Location.new({line: 63, column: 13, name: "top"}))), const$17 || (const$17 = dart.const(new src__widgets__widget_inspector._Location.new({line: 64, column: 13, name: "left"}))), const$18 || (const$18 = dart.const(new src__widgets__widget_inspector._Location.new({line: 66, column: 13, name: "height"}))), const$19 || (const$19 = dart.const(new src__widgets__widget_inspector._Location.new({line: 67, column: 13, name: "width"}))), const$20 || (const$20 = dart.const(new src__widgets__widget_inspector._Location.new({line: 69, column: 13, name: "widget"}))), const$21 || (const$21 = dart.const(new src__widgets__widget_inspector._Location.new({line: 71, column: 13, name: "boxFit"}))), const$22 || (const$22 = dart.const(new src__widgets__widget_inspector._Location.new({line: 72, column: 13, name: "alignment"})))], src__widgets__widget_inspector._Location))})))});
          }, intToLayoutGridChild())), $creationLocationd_0dea112b090073317d4: const$28 || (const$28 = dart.const(new src__widgets__widget_inspector._Location.new({line: 40, column: 14, file: "org-dartlang-app:///packages/layout_grid_for_web/src/Util/nested_layout_grid.dart", parameterLocations: const$27 || (const$27 = dart.constList([const$25 || (const$25 = dart.const(new src__widgets__widget_inspector._Location.new({line: 41, column: 9, name: "fit"}))), const$26 || (const$26 = dart.const(new src__widgets__widget_inspector._Location.new({line: 42, column: 9, name: "children"})))], src__widgets__widget_inspector._Location))})))}), $creationLocationd_0dea112b090073317d4: const$33 || (const$33 = dart.const(new src__widgets__widget_inspector._Location.new({line: 37, column: 12, file: "org-dartlang-app:///packages/layout_grid_for_web/src/Util/nested_layout_grid.dart", parameterLocations: const$32 || (const$32 = dart.constList([const$29 || (const$29 = dart.const(new src__widgets__widget_inspector._Location.new({line: 38, column: 7, name: "height"}))), const$30 || (const$30 = dart.const(new src__widgets__widget_inspector._Location.new({line: 39, column: 7, name: "width"}))), const$31 || (const$31 = dart.const(new src__widgets__widget_inspector._Location.new({line: 40, column: 7, name: "child"})))], src__widgets__widget_inspector._Location))})))});
    }
    updateGrid(width, height) {
      this[_col] = src__Util__line_creation.calculateGridLines(this.columns, width);
      this[_rows] = src__Util__line_creation.calculateGridLines(this.rows, height);
    }
  };
  (src__Util__nested_layout_grid.NestedLayoutGrid.new = function(opts) {
    let columns = opts && 'columns' in opts ? opts.columns : null;
    let rows = opts && 'rows' in opts ? opts.rows : null;
    let couples = opts && 'couples' in opts ? opts.couples : null;
    let height = opts && 'height' in opts ? opts.height : null;
    let width = opts && 'width' in opts ? opts.width : null;
    let key = opts && 'key' in opts ? opts.key : null;
    let $creationLocationd_0dea112b090073317d4 = opts && '$creationLocationd_0dea112b090073317d4' in opts ? opts.$creationLocationd_0dea112b090073317d4 : null;
    this[_col] = null;
    this[_rows] = null;
    this[_top] = null;
    this[_left] = null;
    this[_width] = null;
    this[_height] = null;
    this[columns$0] = columns;
    this[rows$0] = rows;
    this[couples$0] = couples;
    this[height$0] = height;
    this[width$0] = width;
    if (!(couples != null)) dart.assertFailed(null, "org-dartlang-app:///packages/layout_grid_for_web/src/Util/nested_layout_grid.dart", 22, 15, "couples != null");
    if (!(columns != null)) dart.assertFailed(null, "org-dartlang-app:///packages/layout_grid_for_web/src/Util/nested_layout_grid.dart", 23, 15, "columns != null");
    if (!(rows != null)) dart.assertFailed(null, "org-dartlang-app:///packages/layout_grid_for_web/src/Util/nested_layout_grid.dart", 24, 15, "rows != null");
    if (!(dart.notNull(width) >= 0)) dart.assertFailed(dart.notNull(height) >= 0, "org-dartlang-app:///packages/layout_grid_for_web/src/Util/nested_layout_grid.dart", 25, 16, "width >= 0");
    src__Util__nested_layout_grid.NestedLayoutGrid.__proto__.new.call(this, {key: key, $creationLocationd_0dea112b090073317d4: $creationLocationd_0dea112b090073317d4});
    ;
  }).prototype = src__Util__nested_layout_grid.NestedLayoutGrid.prototype;
  dart.addTypeTests(src__Util__nested_layout_grid.NestedLayoutGrid);
  const columns$0 = Symbol("NestedLayoutGrid.columns");
  const rows$0 = Symbol("NestedLayoutGrid.rows");
  const couples$0 = Symbol("NestedLayoutGrid.couples");
  const width$0 = Symbol("NestedLayoutGrid.width");
  const height$0 = Symbol("NestedLayoutGrid.height");
  dart.setMethodSignature(src__Util__nested_layout_grid.NestedLayoutGrid, () => ({
    __proto__: dart.getMethods(src__Util__nested_layout_grid.NestedLayoutGrid.__proto__),
    build: dart.fnType(src__widgets__framework.Widget, [src__widgets__framework.BuildContext]),
    updateGrid: dart.fnType(dart.void, [core.double, core.double])
  }));
  dart.setLibraryUri(src__Util__nested_layout_grid.NestedLayoutGrid, "package:layout_grid_for_web/src/Util/nested_layout_grid.dart");
  dart.setFieldSignature(src__Util__nested_layout_grid.NestedLayoutGrid, () => ({
    __proto__: dart.getFields(src__Util__nested_layout_grid.NestedLayoutGrid.__proto__),
    columns: dart.finalFieldType(core.List$(src__Util__layout_grid_unit_classes.LayoutUnit)),
    rows: dart.finalFieldType(core.List$(src__Util__layout_grid_unit_classes.LayoutUnit)),
    couples: dart.finalFieldType(core.List$(src__layout_grid_couple.LayoutGridCouple)),
    width: dart.finalFieldType(core.double),
    height: dart.finalFieldType(core.double),
    [_col]: dart.fieldType(core.List$(core.double)),
    [_rows]: dart.fieldType(core.List$(core.double)),
    [_top]: dart.fieldType(core.double),
    [_left]: dart.fieldType(core.double),
    [_width]: dart.fieldType(core.double),
    [_height]: dart.fieldType(core.double)
  }));
  let const$34;
  let const$35;
  let const$36;
  let const$37;
  let const$38;
  let const$39;
  let const$40;
  let const$41;
  let const$42;
  let const$43;
  let const$44;
  let const$45;
  let const$46;
  let const$47;
  src__Util__layout_grid_child.LayoutGridChild = class LayoutGridChild extends src__widgets__framework.StatelessWidget {
    get top() {
      return this[top$];
    }
    set top(value) {
      super.top = value;
    }
    get left() {
      return this[left$];
    }
    set left(value) {
      super.left = value;
    }
    get height() {
      return this[height$1];
    }
    set height(value) {
      super.height = value;
    }
    get width() {
      return this[width$1];
    }
    set width(value) {
      super.width = value;
    }
    get boxFit() {
      return this[boxFit$0];
    }
    set boxFit(value) {
      super.boxFit = value;
    }
    get widget() {
      return this[widget$0];
    }
    set widget(value) {
      super.widget = value;
    }
    get alignment() {
      return this[alignment$0];
    }
    set alignment(value) {
      super.alignment = value;
    }
    build(context) {
      return new src__widgets__basic.Positioned.new({top: this.top, left: this.left, child: new src__widgets__container.Container.new({height: this.height, width: this.width, child: new src__widgets__basic.FittedBox.new({fit: this.boxFit, child: this.widget, $creationLocationd_0dea112b090073317d4: const$37 || (const$37 = dart.const(new src__widgets__widget_inspector._Location.new({line: 28, column: 16, file: "org-dartlang-app:///packages/layout_grid_for_web/src/Util/layout_grid_child.dart", parameterLocations: const$36 || (const$36 = dart.constList([const$34 || (const$34 = dart.const(new src__widgets__widget_inspector._Location.new({line: 29, column: 11, name: "fit"}))), const$35 || (const$35 = dart.const(new src__widgets__widget_inspector._Location.new({line: 30, column: 11, name: "child"})))], src__widgets__widget_inspector._Location))})))}), $creationLocationd_0dea112b090073317d4: const$42 || (const$42 = dart.const(new src__widgets__widget_inspector._Location.new({line: 25, column: 14, file: "org-dartlang-app:///packages/layout_grid_for_web/src/Util/layout_grid_child.dart", parameterLocations: const$41 || (const$41 = dart.constList([const$38 || (const$38 = dart.const(new src__widgets__widget_inspector._Location.new({line: 26, column: 9, name: "height"}))), const$39 || (const$39 = dart.const(new src__widgets__widget_inspector._Location.new({line: 27, column: 9, name: "width"}))), const$40 || (const$40 = dart.const(new src__widgets__widget_inspector._Location.new({line: 28, column: 9, name: "child"})))], src__widgets__widget_inspector._Location))})))}), $creationLocationd_0dea112b090073317d4: const$47 || (const$47 = dart.const(new src__widgets__widget_inspector._Location.new({line: 22, column: 12, file: "org-dartlang-app:///packages/layout_grid_for_web/src/Util/layout_grid_child.dart", parameterLocations: const$46 || (const$46 = dart.constList([const$43 || (const$43 = dart.const(new src__widgets__widget_inspector._Location.new({line: 23, column: 7, name: "top"}))), const$44 || (const$44 = dart.const(new src__widgets__widget_inspector._Location.new({line: 24, column: 7, name: "left"}))), const$45 || (const$45 = dart.const(new src__widgets__widget_inspector._Location.new({line: 25, column: 7, name: "child"})))], src__widgets__widget_inspector._Location))})))});
    }
  };
  (src__Util__layout_grid_child.LayoutGridChild.new = function(opts) {
    let key = opts && 'key' in opts ? opts.key : null;
    let top = opts && 'top' in opts ? opts.top : null;
    let left = opts && 'left' in opts ? opts.left : null;
    let height = opts && 'height' in opts ? opts.height : null;
    let width = opts && 'width' in opts ? opts.width : null;
    let widget = opts && 'widget' in opts ? opts.widget : null;
    let boxFit = opts && 'boxFit' in opts ? opts.boxFit : src__painting__box_fit.BoxFit.fill;
    let alignment = opts && 'alignment' in opts ? opts.alignment : null;
    let $creationLocationd_0dea112b090073317d4 = opts && '$creationLocationd_0dea112b090073317d4' in opts ? opts.$creationLocationd_0dea112b090073317d4 : null;
    this[top$] = top;
    this[left$] = left;
    this[height$1] = height;
    this[width$1] = width;
    this[widget$0] = widget;
    this[boxFit$0] = boxFit;
    this[alignment$0] = alignment;
    src__Util__layout_grid_child.LayoutGridChild.__proto__.new.call(this, {key: key, $creationLocationd_0dea112b090073317d4: $creationLocationd_0dea112b090073317d4});
    ;
  }).prototype = src__Util__layout_grid_child.LayoutGridChild.prototype;
  dart.addTypeTests(src__Util__layout_grid_child.LayoutGridChild);
  const top$ = Symbol("LayoutGridChild.top");
  const left$ = Symbol("LayoutGridChild.left");
  const height$1 = Symbol("LayoutGridChild.height");
  const width$1 = Symbol("LayoutGridChild.width");
  const boxFit$0 = Symbol("LayoutGridChild.boxFit");
  const widget$0 = Symbol("LayoutGridChild.widget");
  const alignment$0 = Symbol("LayoutGridChild.alignment");
  dart.setMethodSignature(src__Util__layout_grid_child.LayoutGridChild, () => ({
    __proto__: dart.getMethods(src__Util__layout_grid_child.LayoutGridChild.__proto__),
    build: dart.fnType(src__widgets__framework.Widget, [src__widgets__framework.BuildContext])
  }));
  dart.setLibraryUri(src__Util__layout_grid_child.LayoutGridChild, "package:layout_grid_for_web/src/Util/layout_grid_child.dart");
  dart.setFieldSignature(src__Util__layout_grid_child.LayoutGridChild, () => ({
    __proto__: dart.getFields(src__Util__layout_grid_child.LayoutGridChild.__proto__),
    top: dart.finalFieldType(core.double),
    left: dart.finalFieldType(core.double),
    height: dart.finalFieldType(core.double),
    width: dart.finalFieldType(core.double),
    boxFit: dart.finalFieldType(src__painting__box_fit.BoxFit),
    widget: dart.finalFieldType(src__widgets__framework.Widget),
    alignment: dart.finalFieldType(src__painting__alignment.Alignment)
  }));
  const _sizeMap = dart.privateName(src__Util__inherited_size_model, "_sizeMap");
  src__Util__inherited_size_model.InheritedSizeModel = class InheritedSizeModel extends src__widgets__inherited_model.InheritedModel$(core.String) {
    updateShouldNotify(old) {
      src__Util__inherited_size_model.InheritedSizeModel._check(old);
      return !dart.equals(this[_sizeMap], old[_sizeMap]);
    }
    updateShouldNotifyDependent(old, dependencies) {
      src__Util__inherited_size_model.InheritedSizeModel._check(old);
      SetOfString()._check(dependencies);
      return dart.test(this[_sizeMap][$containsKey](dependencies)) && !dart.equals(this[_sizeMap][$_get](dependencies), old[_sizeMap][$_get](dependencies));
    }
    static of(context, opts) {
      let sizeKey = opts && 'sizeKey' in opts ? opts.sizeKey : null;
      return src__widgets__inherited_model.InheritedModel.inheritFrom(src__Util__inherited_size_model.InheritedSizeModel, context, {aspect: sizeKey});
    }
    updateSize(sizeKey, size) {
      this[_sizeMap][$_set](sizeKey, size);
    }
    getWidth(sizeKey) {
      return this[_sizeMap][$_get](sizeKey).width;
    }
    getHeight(sizeKey) {
      return this[_sizeMap][$_get](sizeKey).height;
    }
  };
  (src__Util__inherited_size_model.InheritedSizeModel.new = function(opts) {
    let child = opts && 'child' in opts ? opts.child : null;
    let $creationLocationd_0dea112b090073317d4 = opts && '$creationLocationd_0dea112b090073317d4' in opts ? opts.$creationLocationd_0dea112b090073317d4 : null;
    this[_sizeMap] = new (LinkedMapOfString$Size()).new();
    src__Util__inherited_size_model.InheritedSizeModel.__proto__.new.call(this, {child: child, $creationLocationd_0dea112b090073317d4: $creationLocationd_0dea112b090073317d4});
    ;
  }).prototype = src__Util__inherited_size_model.InheritedSizeModel.prototype;
  dart.addTypeTests(src__Util__inherited_size_model.InheritedSizeModel);
  dart.setMethodSignature(src__Util__inherited_size_model.InheritedSizeModel, () => ({
    __proto__: dart.getMethods(src__Util__inherited_size_model.InheritedSizeModel.__proto__),
    updateShouldNotify: dart.fnType(core.bool, [core.Object]),
    updateShouldNotifyDependent: dart.fnType(core.bool, [core.Object, core.Object]),
    updateSize: dart.fnType(dart.void, [core.String, ui$.Size]),
    getWidth: dart.fnType(core.double, [core.String]),
    getHeight: dart.fnType(core.double, [core.String])
  }));
  dart.setLibraryUri(src__Util__inherited_size_model.InheritedSizeModel, "package:layout_grid_for_web/src/Util/inherited_size_model.dart");
  dart.setFieldSignature(src__Util__inherited_size_model.InheritedSizeModel, () => ({
    __proto__: dart.getFields(src__Util__inherited_size_model.InheritedSizeModel.__proto__),
    [_sizeMap]: dart.finalFieldType(core.Map$(core.String, ui$.Size))
  }));
  const _lastConstraints = dart.privateName(src__Util__ancestor_layout_grid, "_lastConstraints");
  const _col$ = dart.privateName(src__Util__ancestor_layout_grid, "_col");
  const _rows$ = dart.privateName(src__Util__ancestor_layout_grid, "_rows");
  const _top$ = dart.privateName(src__Util__ancestor_layout_grid, "_top");
  const _left$ = dart.privateName(src__Util__ancestor_layout_grid, "_left");
  const _width$ = dart.privateName(src__Util__ancestor_layout_grid, "_width");
  const _height$ = dart.privateName(src__Util__ancestor_layout_grid, "_height");
  let const$48;
  let const$49;
  let const$50;
  let const$51;
  let const$52;
  let const$53;
  let const$54;
  let const$55;
  let const$56;
  let const$57;
  let const$58;
  let const$59;
  let const$60;
  let const$61;
  let const$62;
  let const$63;
  let const$64;
  let const$65;
  let const$66;
  let const$67;
  let const$68;
  let const$69;
  let const$70;
  let const$71;
  let const$72;
  let const$73;
  let const$74;
  let const$75;
  let const$76;
  let const$77;
  let const$78;
  let const$79;
  let const$80;
  src__Util__ancestor_layout_grid.AncestorLayoutGrid = class AncestorLayoutGrid extends src__widgets__framework.StatelessWidget {
    get columns() {
      return this[columns$1];
    }
    set columns(value) {
      super.columns = value;
    }
    get rows() {
      return this[rows$1];
    }
    set rows(value) {
      super.rows = value;
    }
    get couples() {
      return this[couples$1];
    }
    set couples(value) {
      super.couples = value;
    }
    get scrollDirection() {
      return this[scrollDirection$0];
    }
    set scrollDirection(value) {
      super.scrollDirection = value;
    }
    build(context) {
      return new src__Util__inherited_size_model.InheritedSizeModel.new({child: new src__widgets__layout_builder.LayoutBuilder.new({builder: dart.fn((context, constraints) => {
            if (!dart.equals(this[_lastConstraints], constraints)) {
              this.updateGrid(constraints, this.scrollDirection);
              this[_lastConstraints] = constraints;
            }
            return new src__widgets__scroll_configuration.ScrollConfiguration.new({behavior: new src__Util__custom_layout_grid_scroll_behavior.CustomLayoutGridScrollBehavior.new(), child: new src__widgets__scroll_view.ListView.new({scrollDirection: this.scrollDirection, children: JSArrayOfWidget().of([new src__widgets__container.Container.new({height: this[_rows$][$last], width: this[_col$][$last], child: new src__widgets__basic.Stack.new({fit: src__rendering__stack.StackFit.expand, children: ListOfWidget().generate(this.couples[$length], dart.fn(index => {
                        this[_top$] = this[_rows$][$_get](this.couples[$_get](index).row0);
                        this[_left$] = this[_col$][$_get](this.couples[$_get](index).col0);
                        this[_height$] = dart.notNull(this[_rows$][$_get](this.couples[$_get](index).row1)) - dart.notNull(this[_rows$][$_get](this.couples[$_get](index).row0)) >= 0.0 ? dart.notNull(this[_rows$][$_get](this.couples[$_get](index).row1)) - dart.notNull(this[_rows$][$_get](this.couples[$_get](index).row0)) : 0.0;
                        this[_width$] = dart.notNull(this[_col$][$_get](this.couples[$_get](index).col1)) - dart.notNull(this[_col$][$_get](this.couples[$_get](index).col0)) >= 0.0 ? dart.notNull(this[_col$][$_get](this.couples[$_get](index).col1)) - dart.notNull(this[_col$][$_get](this.couples[$_get](index).col0)) : 0.0;
                        if (this.couples[$_get](index).sizeKey != null) {
                          src__Util__inherited_size_model.InheritedSizeModel.of(context).updateSize(this.couples[$_get](index).sizeKey, new ui$.Size.new(this[_width$], this[_height$]));
                        }
                        return new src__Util__layout_grid_child.LayoutGridChild.new({key: new src__widgets__framework.UniqueKey.new(), top: this[_top$], left: this[_left$], height: this[_height$], width: this[_width$], widget: this.couples[$_get](index).widget, boxFit: this.couples[$_get](index).boxFit, alignment: this.couples[$_get](index).alignment, $creationLocationd_0dea112b090073317d4: const$57 || (const$57 = dart.const(new src__widgets__widget_inspector._Location.new({line: 81, column: 28, file: "org-dartlang-app:///packages/layout_grid_for_web/src/Util/ancestor_layout_grid.dart", parameterLocations: const$56 || (const$56 = dart.constList([const$48 || (const$48 = dart.const(new src__widgets__widget_inspector._Location.new({line: 82, column: 23, name: "key"}))), const$49 || (const$49 = dart.const(new src__widgets__widget_inspector._Location.new({line: 84, column: 23, name: "top"}))), const$50 || (const$50 = dart.const(new src__widgets__widget_inspector._Location.new({line: 85, column: 23, name: "left"}))), const$51 || (const$51 = dart.const(new src__widgets__widget_inspector._Location.new({line: 87, column: 23, name: "height"}))), const$52 || (const$52 = dart.const(new src__widgets__widget_inspector._Location.new({line: 88, column: 23, name: "width"}))), const$53 || (const$53 = dart.const(new src__widgets__widget_inspector._Location.new({line: 90, column: 23, name: "widget"}))), const$54 || (const$54 = dart.const(new src__widgets__widget_inspector._Location.new({line: 92, column: 23, name: "boxFit"}))), const$55 || (const$55 = dart.const(new src__widgets__widget_inspector._Location.new({line: 93, column: 23, name: "alignment"})))], src__widgets__widget_inspector._Location))})))});
                      }, intToLayoutGridChild())), $creationLocationd_0dea112b090073317d4: const$61 || (const$61 = dart.const(new src__widgets__widget_inspector._Location.new({line: 59, column: 24, file: "org-dartlang-app:///packages/layout_grid_for_web/src/Util/ancestor_layout_grid.dart", parameterLocations: const$60 || (const$60 = dart.constList([const$58 || (const$58 = dart.const(new src__widgets__widget_inspector._Location.new({line: 61, column: 19, name: "fit"}))), const$59 || (const$59 = dart.const(new src__widgets__widget_inspector._Location.new({line: 63, column: 19, name: "children"})))], src__widgets__widget_inspector._Location))})))}), $creationLocationd_0dea112b090073317d4: const$66 || (const$66 = dart.const(new src__widgets__widget_inspector._Location.new({line: 52, column: 15, file: "org-dartlang-app:///packages/layout_grid_for_web/src/Util/ancestor_layout_grid.dart", parameterLocations: const$65 || (const$65 = dart.constList([const$62 || (const$62 = dart.const(new src__widgets__widget_inspector._Location.new({line: 56, column: 17, name: "height"}))), const$63 || (const$63 = dart.const(new src__widgets__widget_inspector._Location.new({line: 57, column: 17, name: "width"}))), const$64 || (const$64 = dart.const(new src__widgets__widget_inspector._Location.new({line: 59, column: 17, name: "child"})))], src__widgets__widget_inspector._Location))})))})]), $creationLocationd_0dea112b090073317d4: const$70 || (const$70 = dart.const(new src__widgets__widget_inspector._Location.new({line: 50, column: 20, file: "org-dartlang-app:///packages/layout_grid_for_web/src/Util/ancestor_layout_grid.dart", parameterLocations: const$69 || (const$69 = dart.constList([const$67 || (const$67 = dart.const(new src__widgets__widget_inspector._Location.new({line: 50, column: 29, name: "scrollDirection"}))), const$68 || (const$68 = dart.const(new src__widgets__widget_inspector._Location.new({line: 50, column: 63, name: "children"})))], src__widgets__widget_inspector._Location))})))}), $creationLocationd_0dea112b090073317d4: const$74 || (const$74 = dart.const(new src__widgets__widget_inspector._Location.new({line: 45, column: 18, file: "org-dartlang-app:///packages/layout_grid_for_web/src/Util/ancestor_layout_grid.dart", parameterLocations: const$73 || (const$73 = dart.constList([const$71 || (const$71 = dart.const(new src__widgets__widget_inspector._Location.new({line: 48, column: 13, name: "behavior"}))), const$72 || (const$72 = dart.const(new src__widgets__widget_inspector._Location.new({line: 50, column: 13, name: "child"})))], src__widgets__widget_inspector._Location))})))});
          }, BuildContextAndBoxConstraintsToScrollConfiguration()), $creationLocationd_0dea112b090073317d4: const$77 || (const$77 = dart.const(new src__widgets__widget_inspector._Location.new({line: 35, column: 14, file: "org-dartlang-app:///packages/layout_grid_for_web/src/Util/ancestor_layout_grid.dart", parameterLocations: const$76 || (const$76 = dart.constList([const$75 || (const$75 = dart.const(new src__widgets__widget_inspector._Location.new({line: 36, column: 9, name: "builder"})))], src__widgets__widget_inspector._Location))})))}), $creationLocationd_0dea112b090073317d4: const$80 || (const$80 = dart.const(new src__widgets__widget_inspector._Location.new({line: 33, column: 12, file: "org-dartlang-app:///packages/layout_grid_for_web/src/Util/ancestor_layout_grid.dart", parameterLocations: const$79 || (const$79 = dart.constList([const$78 || (const$78 = dart.const(new src__widgets__widget_inspector._Location.new({line: 35, column: 7, name: "child"})))], src__widgets__widget_inspector._Location))})))});
    }
    updateGrid(constraints, scrollDirection) {
      if (dart.equals(scrollDirection, src__painting__basic_types.Axis.vertical)) {
        this[_col$] = src__Util__line_creation.calculateGridLines(this.columns, constraints.maxWidth);
        this[_rows$] = src__Util__line_creation.calculateGridLinesWithDependetUnit(this.rows, constraints.maxHeight, this[_col$]);
      } else if (dart.equals(scrollDirection, src__painting__basic_types.Axis.horizontal)) {
        this[_rows$] = src__Util__line_creation.calculateGridLines(this.columns, constraints.maxWidth);
        this[_col$] = src__Util__line_creation.calculateGridLinesWithDependetUnit(this.rows, constraints.maxHeight, this[_rows$]);
      }
    }
  };
  (src__Util__ancestor_layout_grid.AncestorLayoutGrid.new = function(opts) {
    let couples = opts && 'couples' in opts ? opts.couples : null;
    let columns = opts && 'columns' in opts ? opts.columns : null;
    let rows = opts && 'rows' in opts ? opts.rows : null;
    let scrollDirection = opts && 'scrollDirection' in opts ? opts.scrollDirection : src__painting__basic_types.Axis.vertical;
    let key = opts && 'key' in opts ? opts.key : null;
    let $creationLocationd_0dea112b090073317d4 = opts && '$creationLocationd_0dea112b090073317d4' in opts ? opts.$creationLocationd_0dea112b090073317d4 : null;
    this[_lastConstraints] = null;
    this[_col$] = null;
    this[_rows$] = null;
    this[_top$] = null;
    this[_left$] = null;
    this[_width$] = null;
    this[_height$] = null;
    this[couples$1] = couples;
    this[columns$1] = columns;
    this[rows$1] = rows;
    this[scrollDirection$0] = scrollDirection;
    if (!(couples != null)) dart.assertFailed(null, "org-dartlang-app:///packages/layout_grid_for_web/src/Util/ancestor_layout_grid.dart", 18, 15, "couples != null");
    if (!(columns != null)) dart.assertFailed(null, "org-dartlang-app:///packages/layout_grid_for_web/src/Util/ancestor_layout_grid.dart", 19, 15, "columns != null");
    if (!(rows != null)) dart.assertFailed(null, "org-dartlang-app:///packages/layout_grid_for_web/src/Util/ancestor_layout_grid.dart", 20, 15, "rows != null");
    src__Util__ancestor_layout_grid.AncestorLayoutGrid.__proto__.new.call(this, {key: key, $creationLocationd_0dea112b090073317d4: $creationLocationd_0dea112b090073317d4});
    ;
  }).prototype = src__Util__ancestor_layout_grid.AncestorLayoutGrid.prototype;
  dart.addTypeTests(src__Util__ancestor_layout_grid.AncestorLayoutGrid);
  const columns$1 = Symbol("AncestorLayoutGrid.columns");
  const rows$1 = Symbol("AncestorLayoutGrid.rows");
  const couples$1 = Symbol("AncestorLayoutGrid.couples");
  const scrollDirection$0 = Symbol("AncestorLayoutGrid.scrollDirection");
  dart.setMethodSignature(src__Util__ancestor_layout_grid.AncestorLayoutGrid, () => ({
    __proto__: dart.getMethods(src__Util__ancestor_layout_grid.AncestorLayoutGrid.__proto__),
    build: dart.fnType(src__widgets__framework.Widget, [src__widgets__framework.BuildContext]),
    updateGrid: dart.fnType(dart.void, [src__rendering__box.BoxConstraints, src__painting__basic_types.Axis])
  }));
  dart.setLibraryUri(src__Util__ancestor_layout_grid.AncestorLayoutGrid, "package:layout_grid_for_web/src/Util/ancestor_layout_grid.dart");
  dart.setFieldSignature(src__Util__ancestor_layout_grid.AncestorLayoutGrid, () => ({
    __proto__: dart.getFields(src__Util__ancestor_layout_grid.AncestorLayoutGrid.__proto__),
    columns: dart.finalFieldType(core.List$(src__Util__layout_grid_unit_classes.LayoutUnit)),
    rows: dart.finalFieldType(core.List$(src__Util__layout_grid_unit_classes.LayoutUnit)),
    couples: dart.finalFieldType(core.List$(src__layout_grid_couple.LayoutGridCouple)),
    scrollDirection: dart.finalFieldType(src__painting__basic_types.Axis),
    [_lastConstraints]: dart.fieldType(src__rendering__box.BoxConstraints),
    [_col$]: dart.fieldType(core.List$(core.double)),
    [_rows$]: dart.fieldType(core.List$(core.double)),
    [_top$]: dart.fieldType(core.double),
    [_left$]: dart.fieldType(core.double),
    [_width$]: dart.fieldType(core.double),
    [_height$]: dart.fieldType(core.double)
  }));
  src__Util__custom_layout_grid_scroll_behavior.CustomLayoutGridScrollBehavior = class CustomLayoutGridScrollBehavior extends src__widgets__scroll_configuration.ScrollBehavior {
    buildViewportChrome(context, child, axisDirection) {
      return child;
    }
  };
  (src__Util__custom_layout_grid_scroll_behavior.CustomLayoutGridScrollBehavior.new = function() {
    src__Util__custom_layout_grid_scroll_behavior.CustomLayoutGridScrollBehavior.__proto__.new.call(this);
    ;
  }).prototype = src__Util__custom_layout_grid_scroll_behavior.CustomLayoutGridScrollBehavior.prototype;
  dart.addTypeTests(src__Util__custom_layout_grid_scroll_behavior.CustomLayoutGridScrollBehavior);
  dart.setLibraryUri(src__Util__custom_layout_grid_scroll_behavior.CustomLayoutGridScrollBehavior, "package:layout_grid_for_web/src/Util/custom_layout_grid_scroll_behavior.dart");
  src__Util__area_creation.getPositionedGridCoupleList = function(areas, couples) {
    let _couples = couples;
    let _name = null;
    for (let _i = 0; _i < dart.notNull(_couples[$length]); _i = _i + 1) {
      _name = _couples[$_get](_i).name;
      if (_name != null) {
        _couples[$_set](_i, src__Util__area_creation.getPositionededGridCouple(areas, _couples[$_get](_i)));
      }
    }
    return _couples;
  };
  src__Util__area_creation.getPositionededGridCouple = function(areas, couple) {
    let _child = couple;
    for (let _i = 0; _i < dart.notNull(areas[$length]); _i = _i + 1) {
      for (let _j = 0; _j < dart.notNull(areas[$_get](_i)[$length]); _j = _j + 1) {
        if (areas[$_get](_i)[$_get](_j) == _child.name) {
          if (dart.notNull(_child.col0) > _j || _child.col0 === -1) {
            _child.col0 = _j;
          }
          if (dart.notNull(_child.col1) < _j + 1 || _child.col1 === -1) {
            _child.col1 = _j + 1;
          }
          if (dart.notNull(_child.row0) > _i || _child.row0 === -1) {
            _child.row0 = _i;
          }
          if (dart.notNull(_child.row1) < _i + 1 || _child.row1 === -1) {
            _child.row1 = _i + 1;
          }
        }
      }
    }
    if (_child.col0 === -1) {
      dart.throw("Could not find the area specified by the LayoutGridCouple, did you write it correctly?");
    }
    return _child;
  };
  dart.trackLibraries("packages/layout_grid_for_web/src/Util/ancestor_layout_grid", {
    "package:layout_grid_for_web/src/Util/line_creation.dart": src__Util__line_creation,
    "package:layout_grid_for_web/src/Util/layout_grid_unit_classes.dart": src__Util__layout_grid_unit_classes,
    "package:layout_grid_for_web/src/Util/layout_grid_unit.dart": src__Util__layout_grid_unit,
    "package:layout_grid_for_web/src/layout_grid.dart": src__layout_grid,
    "package:layout_grid_for_web/src/layout_grid_couple.dart": src__layout_grid_couple,
    "package:layout_grid_for_web/src/Util/nested_layout_grid.dart": src__Util__nested_layout_grid,
    "package:layout_grid_for_web/src/Util/layout_grid_child.dart": src__Util__layout_grid_child,
    "package:layout_grid_for_web/src/Util/inherited_size_model.dart": src__Util__inherited_size_model,
    "package:layout_grid_for_web/src/Util/ancestor_layout_grid.dart": src__Util__ancestor_layout_grid,
    "package:layout_grid_for_web/src/Util/custom_layout_grid_scroll_behavior.dart": src__Util__custom_layout_grid_scroll_behavior,
    "package:layout_grid_for_web/src/Util/area_creation.dart": src__Util__area_creation
  }, {
  }, '{"version":3,"sourceRoot":"","sources":["org-dartlang-app:///packages/layout_grid_for_web/src/Util/line_creation.dart","org-dartlang-app:///packages/layout_grid_for_web/src/Util/layout_grid_unit_classes.dart","org-dartlang-app:///packages/layout_grid_for_web/src/Util/layout_grid_unit.dart","org-dartlang-app:///packages/layout_grid_for_web/src/layout_grid.dart","org-dartlang-app:///packages/layout_grid_for_web/src/layout_grid_couple.dart","org-dartlang-app:///packages/layout_grid_for_web/src/Util/nested_layout_grid.dart","org-dartlang-app:///packages/layout_grid_for_web/src/Util/layout_grid_child.dart","org-dartlang-app:///packages/layout_grid_for_web/src/Util/inherited_size_model.dart","org-dartlang-app:///packages/layout_grid_for_web/src/Util/ancestor_layout_grid.dart","org-dartlang-app:///packages/layout_grid_for_web/src/Util/custom_layout_grid_scroll_behavior.dart","org-dartlang-app:///packages/layout_grid_for_web/src/Util/area_creation.dart"],"names":[],"mappings":"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","file":"ancestor_layout_grid.ddc.js"}');
  // Exports:
  return {
    src__Util__line_creation: src__Util__line_creation,
    src__Util__layout_grid_unit_classes: src__Util__layout_grid_unit_classes,
    src__Util__layout_grid_unit: src__Util__layout_grid_unit,
    src__layout_grid: src__layout_grid,
    src__layout_grid_couple: src__layout_grid_couple,
    src__Util__nested_layout_grid: src__Util__nested_layout_grid,
    src__Util__layout_grid_child: src__Util__layout_grid_child,
    src__Util__inherited_size_model: src__Util__inherited_size_model,
    src__Util__ancestor_layout_grid: src__Util__ancestor_layout_grid,
    src__Util__custom_layout_grid_scroll_behavior: src__Util__custom_layout_grid_scroll_behavior,
    src__Util__area_creation: src__Util__area_creation
  };
});

//# sourceMappingURL=ancestor_layout_grid.ddc.js.map
