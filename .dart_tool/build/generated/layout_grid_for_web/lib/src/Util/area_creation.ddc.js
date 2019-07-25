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
  const src__Util__main_layout_grid = Object.create(dart.library);
  const src__Util__custom_scroll_behavior = Object.create(dart.library);
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
  src__Util__line_creation.calculateGridLines = function(list, space) {
    let _list = list;
    let _finalList = ListOfdouble().new(dart.notNull(list[$length]) + 1);
    let _sumOfFractions = src__Util__line_creation.getSumOfFractions(list);
    let _freeSpace = src__Util__line_creation.getFreeSpace(list, space);
    let _currentPosition = 0.0;
    for (let _i = 0; _i < dart.notNull(_list[$length]); _i = _i + 1) {
      let _maxValue = null;
      let _minValue = null;
      let _newLayoutPixel = new src__Util__layout_grid_unit.LayoutPixel.new();
      let _layoutMinMax = null;
      if (src__Util__layout_grid_unit.LayoutMinMax.is(_list[$_get](_i))) {
        _layoutMinMax = src__Util__layout_grid_unit.LayoutMinMax._check(_list[$_get](_i));
        if (src__Util__layout_grid_unit.LayoutPixel.is(_layoutMinMax.getMaxUnit()) || src__Util__layout_grid_unit.LayoutPercentage.is(_layoutMinMax.getMaxUnit())) {
          _maxValue = src__Util__line_creation.getValueFromLayoutUnit(_layoutMinMax.getMaxUnit(), space, _freeSpace, _sumOfFractions);
          _minValue = src__Util__line_creation.getValueFromLayoutUnit(_layoutMinMax.getMinUnit(), space, _freeSpace, _sumOfFractions);
          if (dart.notNull(_maxValue) < dart.notNull(_freeSpace)) {
            _freeSpace = dart.notNull(_freeSpace) - dart.notNull(_maxValue);
          } else {
            if (dart.notNull(_freeSpace) > dart.notNull(_minValue)) {
              _newLayoutPixel.pixels = _freeSpace;
              _freeSpace = 0.0;
            } else if (dart.notNull(_freeSpace) < dart.notNull(_minValue)) {
              _newLayoutPixel.pixels = _minValue;
              _freeSpace = 0.0;
            }
            _layoutMinMax.maxUnit = _newLayoutPixel;
            _list[$_set](_i, _layoutMinMax);
          }
        }
      }
    }
    for (let _i = 0; _i < dart.notNull(_list[$length]); _i = _i + 1) {
      let _maxValue = null;
      let _minValue = null;
      let _newLayoutPixel = new src__Util__layout_grid_unit.LayoutPixel.new();
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
            _newLayoutPixel.pixels = _minValue;
            _layoutMinMax.maxUnit = _newLayoutPixel;
            _list[$_set](_i, _layoutMinMax);
          }
        }
      }
    }
    for (let _i = 0; _i < dart.notNull(_list[$length]); _i = _i + 1) {
      let _layoutMinMax = null;
      let _value = 0.0;
      if (src__Util__layout_grid_unit_classes.SingleUnit.is(_list[$_get](_i))) {
        _value = src__Util__line_creation.getValueFromLayoutUnit(_list[$_get](_i), space, _freeSpace, _sumOfFractions);
        _finalList[$_set](_i + 1, dart.notNull(_value) + _currentPosition);
        _currentPosition = _currentPosition + dart.notNull(_value);
      } else {
        _layoutMinMax = src__Util__layout_grid_unit.LayoutMinMax._check(_list[$_get](_i));
        _value = src__Util__line_creation.getValueFromLayoutUnit(_layoutMinMax.getMaxUnit(), space, _freeSpace, _sumOfFractions);
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
  src__Util__line_creation.getFreeSpace = function(list, space) {
    let _freeSpace = space;
    for (let _i = 0; _i < dart.notNull(list[$length]); _i = _i + 1) {
      if (src__Util__layout_grid_unit.LayoutPixel.is(list[$_get](_i)) || src__Util__layout_grid_unit.LayoutPercentage.is(list[$_get](_i))) {
        _freeSpace = dart.notNull(_freeSpace) - dart.notNull(src__Util__line_creation.getValueFromLayoutUnit(list[$_get](_i), space, 0.0, 0));
      }
    }
    return _freeSpace;
  };
  src__Util__line_creation.getSumOfFractions = function(list) {
    let _layoutFraction = null;
    let _layoutMinMax = null;
    let _sumOfFractions = 0;
    for (let _i = 0; _i < dart.notNull(list[$length]); _i = _i + 1) {
      if (src__Util__layout_grid_unit.LayoutFraction.is(list[$_get](_i))) {
        _layoutFraction = src__Util__layout_grid_unit.LayoutFraction._check(list[$_get](_i));
        _sumOfFractions = _sumOfFractions + dart.notNull(_layoutFraction.fraction);
      } else if (src__Util__layout_grid_unit.LayoutMinMax.is(list[$_get](_i))) {
        _layoutMinMax = src__Util__layout_grid_unit.LayoutMinMax._check(list[$_get](_i));
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
  src__Util__layout_grid_unit_classes.SingleUnit = class SingleUnit extends src__Util__layout_grid_unit_classes.LayoutUnit {};
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
  src__Util__layout_grid_unit.LayoutMinMax = class LayoutMinMax extends src__Util__layout_grid_unit_classes.LayoutUnit {
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
  src__layout_grid._LayoutGridState = class _LayoutGridState extends src__widgets__framework.State$(src__layout_grid.LayoutGrid) {
    initState() {
      super.initState();
      if (this.widget.calculatedCouples == null) this.widget.calculatedCouples = src__Util__area_creation.getPositionedGridCoupleList(this.widget.areas, this.widget.couples);
      this[_couples] = this.widget.calculatedCouples;
    }
    build(context) {
      if (dart.test(this.widget.isAncestor)) {
        return new src__Util__main_layout_grid.AncestorLayoutGrid.new({columns: this.widget.columns, rows: this.widget.rows, couples: this[_couples], scrollDirection: this.widget.scrollDirection, $creationLocationd_0dea112b090073317d4: const$4 || (const$4 = dart.const(new src__widgets__widget_inspector._Location.new({line: 167, column: 14, file: "org-dartlang-app:///packages/layout_grid_for_web/src/layout_grid.dart", parameterLocations: const$3 || (const$3 = dart.constList([const$ || (const$ = dart.const(new src__widgets__widget_inspector._Location.new({line: 168, column: 9, name: "columns"}))), const$0 || (const$0 = dart.const(new src__widgets__widget_inspector._Location.new({line: 169, column: 9, name: "rows"}))), const$1 || (const$1 = dart.const(new src__widgets__widget_inspector._Location.new({line: 170, column: 9, name: "couples"}))), const$2 || (const$2 = dart.const(new src__widgets__widget_inspector._Location.new({line: 171, column: 9, name: "scrollDirection"})))], src__widgets__widget_inspector._Location))})))});
      } else {
        return new src__Util__nested_layout_grid.NestedLayoutGrid.new({columns: this.widget.columns, rows: this.widget.rows, couples: this[_couples], height: this.widget.height, width: this.widget.width, $creationLocationd_0dea112b090073317d4: const$11 || (const$11 = dart.const(new src__widgets__widget_inspector._Location.new({line: 174, column: 14, file: "org-dartlang-app:///packages/layout_grid_for_web/src/layout_grid.dart", parameterLocations: const$10 || (const$10 = dart.constList([const$5 || (const$5 = dart.const(new src__widgets__widget_inspector._Location.new({line: 175, column: 9, name: "columns"}))), const$6 || (const$6 = dart.const(new src__widgets__widget_inspector._Location.new({line: 176, column: 9, name: "rows"}))), const$7 || (const$7 = dart.const(new src__widgets__widget_inspector._Location.new({line: 177, column: 9, name: "couples"}))), const$8 || (const$8 = dart.const(new src__widgets__widget_inspector._Location.new({line: 178, column: 9, name: "height"}))), const$9 || (const$9 = dart.const(new src__widgets__widget_inspector._Location.new({line: 179, column: 9, name: "width"})))], src__widgets__widget_inspector._Location))})))});
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
  let const$12;
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
    let alignment = opts && 'alignment' in opts ? opts.alignment : const$12 || (const$12 = dart.const(new src__painting__alignment.Alignment.new(0.0, 0.0)));
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
  let const$13;
  let const$14;
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
            this[_height] = dart.notNull(this[_rows][$_get](this.couples[$_get](index).row1)) - dart.notNull(this[_rows][$_get](this.couples[$_get](index).row0));
            this[_width] = dart.notNull(this[_col][$_get](this.couples[$_get](index).col1)) - dart.notNull(this[_col][$_get](this.couples[$_get](index).col0));
            if (this.couples[$_get](index).sizeKey != null) {
              src__Util__inherited_size_model.InheritedSizeModel.of(context).updateSize(this.couples[$_get](index).sizeKey, new ui$.Size.new(this.width, this.height));
            }
            return new src__Util__layout_grid_child.LayoutGridChild.new({key: new src__widgets__framework.UniqueKey.new(), top: this[_top], left: this[_left], height: this[_height], width: this[_width], widget: this.couples[$_get](index).widget, boxFit: this.couples[$_get](index).boxFit, alignment: this.couples[$_get](index).alignment, $creationLocationd_0dea112b090073317d4: const$22 || (const$22 = dart.const(new src__widgets__widget_inspector._Location.new({line: 58, column: 18, file: "org-dartlang-app:///packages/layout_grid_for_web/src/Util/nested_layout_grid.dart", parameterLocations: const$21 || (const$21 = dart.constList([const$13 || (const$13 = dart.const(new src__widgets__widget_inspector._Location.new({line: 60, column: 13, name: "key"}))), const$14 || (const$14 = dart.const(new src__widgets__widget_inspector._Location.new({line: 62, column: 13, name: "top"}))), const$15 || (const$15 = dart.const(new src__widgets__widget_inspector._Location.new({line: 63, column: 13, name: "left"}))), const$16 || (const$16 = dart.const(new src__widgets__widget_inspector._Location.new({line: 65, column: 13, name: "height"}))), const$17 || (const$17 = dart.const(new src__widgets__widget_inspector._Location.new({line: 66, column: 13, name: "width"}))), const$18 || (const$18 = dart.const(new src__widgets__widget_inspector._Location.new({line: 68, column: 13, name: "widget"}))), const$19 || (const$19 = dart.const(new src__widgets__widget_inspector._Location.new({line: 70, column: 13, name: "boxFit"}))), const$20 || (const$20 = dart.const(new src__widgets__widget_inspector._Location.new({line: 71, column: 13, name: "alignment"})))], src__widgets__widget_inspector._Location))})))});
          }, intToLayoutGridChild())), $creationLocationd_0dea112b090073317d4: const$26 || (const$26 = dart.const(new src__widgets__widget_inspector._Location.new({line: 39, column: 14, file: "org-dartlang-app:///packages/layout_grid_for_web/src/Util/nested_layout_grid.dart", parameterLocations: const$25 || (const$25 = dart.constList([const$23 || (const$23 = dart.const(new src__widgets__widget_inspector._Location.new({line: 40, column: 9, name: "fit"}))), const$24 || (const$24 = dart.const(new src__widgets__widget_inspector._Location.new({line: 41, column: 9, name: "children"})))], src__widgets__widget_inspector._Location))})))}), $creationLocationd_0dea112b090073317d4: const$31 || (const$31 = dart.const(new src__widgets__widget_inspector._Location.new({line: 36, column: 12, file: "org-dartlang-app:///packages/layout_grid_for_web/src/Util/nested_layout_grid.dart", parameterLocations: const$30 || (const$30 = dart.constList([const$27 || (const$27 = dart.const(new src__widgets__widget_inspector._Location.new({line: 37, column: 7, name: "height"}))), const$28 || (const$28 = dart.const(new src__widgets__widget_inspector._Location.new({line: 38, column: 7, name: "width"}))), const$29 || (const$29 = dart.const(new src__widgets__widget_inspector._Location.new({line: 39, column: 7, name: "child"})))], src__widgets__widget_inspector._Location))})))});
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
    src__Util__nested_layout_grid.NestedLayoutGrid.__proto__.new.call(this, {$creationLocationd_0dea112b090073317d4: $creationLocationd_0dea112b090073317d4});
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
  let const$32;
  let const$33;
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
      return new src__widgets__basic.Positioned.new({top: this.top, left: this.left, child: new src__widgets__container.Container.new({height: this.height, width: this.width, child: new src__widgets__basic.FittedBox.new({fit: this.boxFit, child: this.widget, $creationLocationd_0dea112b090073317d4: const$35 || (const$35 = dart.const(new src__widgets__widget_inspector._Location.new({line: 28, column: 16, file: "org-dartlang-app:///packages/layout_grid_for_web/src/Util/layout_grid_child.dart", parameterLocations: const$34 || (const$34 = dart.constList([const$32 || (const$32 = dart.const(new src__widgets__widget_inspector._Location.new({line: 29, column: 11, name: "fit"}))), const$33 || (const$33 = dart.const(new src__widgets__widget_inspector._Location.new({line: 30, column: 11, name: "child"})))], src__widgets__widget_inspector._Location))})))}), $creationLocationd_0dea112b090073317d4: const$40 || (const$40 = dart.const(new src__widgets__widget_inspector._Location.new({line: 25, column: 14, file: "org-dartlang-app:///packages/layout_grid_for_web/src/Util/layout_grid_child.dart", parameterLocations: const$39 || (const$39 = dart.constList([const$36 || (const$36 = dart.const(new src__widgets__widget_inspector._Location.new({line: 26, column: 9, name: "height"}))), const$37 || (const$37 = dart.const(new src__widgets__widget_inspector._Location.new({line: 27, column: 9, name: "width"}))), const$38 || (const$38 = dart.const(new src__widgets__widget_inspector._Location.new({line: 28, column: 9, name: "child"})))], src__widgets__widget_inspector._Location))})))}), $creationLocationd_0dea112b090073317d4: const$45 || (const$45 = dart.const(new src__widgets__widget_inspector._Location.new({line: 22, column: 12, file: "org-dartlang-app:///packages/layout_grid_for_web/src/Util/layout_grid_child.dart", parameterLocations: const$44 || (const$44 = dart.constList([const$41 || (const$41 = dart.const(new src__widgets__widget_inspector._Location.new({line: 23, column: 7, name: "top"}))), const$42 || (const$42 = dart.const(new src__widgets__widget_inspector._Location.new({line: 24, column: 7, name: "left"}))), const$43 || (const$43 = dart.const(new src__widgets__widget_inspector._Location.new({line: 25, column: 7, name: "child"})))], src__widgets__widget_inspector._Location))})))});
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
  src__Util__inherited_size_model.InheritedSizeModel = class InheritedSizeModel extends src__widgets__inherited_model.InheritedModel$(core.String) {
    get sizeMap() {
      return this[sizeMap];
    }
    set sizeMap(value) {
      super.sizeMap = value;
    }
    updateShouldNotify(old) {
      src__Util__inherited_size_model.InheritedSizeModel._check(old);
      return !dart.equals(this.sizeMap, old.sizeMap);
    }
    updateShouldNotifyDependent(old, dependencies) {
      src__Util__inherited_size_model.InheritedSizeModel._check(old);
      SetOfString()._check(dependencies);
      return dart.test(this.sizeMap[$containsKey](dependencies)) && !dart.equals(this.sizeMap[$_get](dependencies), old.sizeMap[$_get](dependencies));
    }
    static of(context, opts) {
      let sizeKey = opts && 'sizeKey' in opts ? opts.sizeKey : null;
      return src__widgets__inherited_model.InheritedModel.inheritFrom(src__Util__inherited_size_model.InheritedSizeModel, context, {aspect: sizeKey});
    }
    updateSize(key, size) {
      this.sizeMap[$_set](key, size);
    }
  };
  (src__Util__inherited_size_model.InheritedSizeModel.new = function(opts) {
    let child = opts && 'child' in opts ? opts.child : null;
    let $creationLocationd_0dea112b090073317d4 = opts && '$creationLocationd_0dea112b090073317d4' in opts ? opts.$creationLocationd_0dea112b090073317d4 : null;
    this[sizeMap] = new (LinkedMapOfString$Size()).new();
    src__Util__inherited_size_model.InheritedSizeModel.__proto__.new.call(this, {child: child, $creationLocationd_0dea112b090073317d4: $creationLocationd_0dea112b090073317d4});
    ;
  }).prototype = src__Util__inherited_size_model.InheritedSizeModel.prototype;
  dart.addTypeTests(src__Util__inherited_size_model.InheritedSizeModel);
  const sizeMap = Symbol("InheritedSizeModel.sizeMap");
  dart.setMethodSignature(src__Util__inherited_size_model.InheritedSizeModel, () => ({
    __proto__: dart.getMethods(src__Util__inherited_size_model.InheritedSizeModel.__proto__),
    updateShouldNotify: dart.fnType(core.bool, [core.Object]),
    updateShouldNotifyDependent: dart.fnType(core.bool, [core.Object, core.Object]),
    updateSize: dart.fnType(dart.void, [core.String, ui$.Size])
  }));
  dart.setLibraryUri(src__Util__inherited_size_model.InheritedSizeModel, "package:layout_grid_for_web/src/Util/inherited_size_model.dart");
  dart.setFieldSignature(src__Util__inherited_size_model.InheritedSizeModel, () => ({
    __proto__: dart.getFields(src__Util__inherited_size_model.InheritedSizeModel.__proto__),
    sizeMap: dart.finalFieldType(core.Map$(core.String, ui$.Size))
  }));
  const _lastConstraints = dart.privateName(src__Util__main_layout_grid, "_lastConstraints");
  const _col$ = dart.privateName(src__Util__main_layout_grid, "_col");
  const _rows$ = dart.privateName(src__Util__main_layout_grid, "_rows");
  const _top$ = dart.privateName(src__Util__main_layout_grid, "_top");
  const _left$ = dart.privateName(src__Util__main_layout_grid, "_left");
  const _width$ = dart.privateName(src__Util__main_layout_grid, "_width");
  const _height$ = dart.privateName(src__Util__main_layout_grid, "_height");
  let const$46;
  let const$47;
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
  src__Util__main_layout_grid.AncestorLayoutGrid = class AncestorLayoutGrid extends src__widgets__framework.StatelessWidget {
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
              this.updateGrid(constraints);
              this[_lastConstraints] = constraints;
            }
            return new src__widgets__scroll_configuration.ScrollConfiguration.new({behavior: new src__Util__custom_scroll_behavior.CustomScrollBehavior.new(), child: new src__widgets__scroll_view.ListView.new({scrollDirection: this.scrollDirection, children: JSArrayOfWidget().of([new src__widgets__container.Container.new({height: this[_rows$][$last], width: this[_col$][$last], child: new src__widgets__basic.Stack.new({fit: src__rendering__stack.StackFit.expand, children: ListOfWidget().generate(this.couples[$length], dart.fn(index => {
                        this[_top$] = this[_rows$][$_get](this.couples[$_get](index).row0);
                        this[_left$] = this[_col$][$_get](this.couples[$_get](index).col0);
                        this[_height$] = dart.notNull(this[_rows$][$_get](this.couples[$_get](index).row1)) - dart.notNull(this[_rows$][$_get](this.couples[$_get](index).row0));
                        this[_width$] = dart.notNull(this[_col$][$_get](this.couples[$_get](index).col1)) - dart.notNull(this[_col$][$_get](this.couples[$_get](index).col0));
                        if (this.couples[$_get](index).sizeKey != null) {
                          src__Util__inherited_size_model.InheritedSizeModel.of(context).updateSize(this.couples[$_get](index).sizeKey, new ui$.Size.new(this[_width$], this[_height$]));
                        }
                        return new src__Util__layout_grid_child.LayoutGridChild.new({key: new src__widgets__framework.UniqueKey.new(), top: this[_top$], left: this[_left$], height: this[_height$], width: this[_width$], widget: this.couples[$_get](index).widget, boxFit: this.couples[$_get](index).boxFit, alignment: this.couples[$_get](index).alignment, $creationLocationd_0dea112b090073317d4: const$55 || (const$55 = dart.const(new src__widgets__widget_inspector._Location.new({line: 79, column: 28, file: "org-dartlang-app:///packages/layout_grid_for_web/src/Util/main_layout_grid.dart", parameterLocations: const$54 || (const$54 = dart.constList([const$46 || (const$46 = dart.const(new src__widgets__widget_inspector._Location.new({line: 80, column: 23, name: "key"}))), const$47 || (const$47 = dart.const(new src__widgets__widget_inspector._Location.new({line: 82, column: 23, name: "top"}))), const$48 || (const$48 = dart.const(new src__widgets__widget_inspector._Location.new({line: 83, column: 23, name: "left"}))), const$49 || (const$49 = dart.const(new src__widgets__widget_inspector._Location.new({line: 85, column: 23, name: "height"}))), const$50 || (const$50 = dart.const(new src__widgets__widget_inspector._Location.new({line: 86, column: 23, name: "width"}))), const$51 || (const$51 = dart.const(new src__widgets__widget_inspector._Location.new({line: 88, column: 23, name: "widget"}))), const$52 || (const$52 = dart.const(new src__widgets__widget_inspector._Location.new({line: 90, column: 23, name: "boxFit"}))), const$53 || (const$53 = dart.const(new src__widgets__widget_inspector._Location.new({line: 91, column: 23, name: "alignment"})))], src__widgets__widget_inspector._Location))})))});
                      }, intToLayoutGridChild())), $creationLocationd_0dea112b090073317d4: const$59 || (const$59 = dart.const(new src__widgets__widget_inspector._Location.new({line: 58, column: 24, file: "org-dartlang-app:///packages/layout_grid_for_web/src/Util/main_layout_grid.dart", parameterLocations: const$58 || (const$58 = dart.constList([const$56 || (const$56 = dart.const(new src__widgets__widget_inspector._Location.new({line: 60, column: 19, name: "fit"}))), const$57 || (const$57 = dart.const(new src__widgets__widget_inspector._Location.new({line: 62, column: 19, name: "children"})))], src__widgets__widget_inspector._Location))})))}), $creationLocationd_0dea112b090073317d4: const$64 || (const$64 = dart.const(new src__widgets__widget_inspector._Location.new({line: 53, column: 15, file: "org-dartlang-app:///packages/layout_grid_for_web/src/Util/main_layout_grid.dart", parameterLocations: const$63 || (const$63 = dart.constList([const$60 || (const$60 = dart.const(new src__widgets__widget_inspector._Location.new({line: 55, column: 17, name: "height"}))), const$61 || (const$61 = dart.const(new src__widgets__widget_inspector._Location.new({line: 56, column: 17, name: "width"}))), const$62 || (const$62 = dart.const(new src__widgets__widget_inspector._Location.new({line: 58, column: 17, name: "child"})))], src__widgets__widget_inspector._Location))})))})]), $creationLocationd_0dea112b090073317d4: const$68 || (const$68 = dart.const(new src__widgets__widget_inspector._Location.new({line: 51, column: 20, file: "org-dartlang-app:///packages/layout_grid_for_web/src/Util/main_layout_grid.dart", parameterLocations: const$67 || (const$67 = dart.constList([const$65 || (const$65 = dart.const(new src__widgets__widget_inspector._Location.new({line: 51, column: 29, name: "scrollDirection"}))), const$66 || (const$66 = dart.const(new src__widgets__widget_inspector._Location.new({line: 51, column: 63, name: "children"})))], src__widgets__widget_inspector._Location))})))}), $creationLocationd_0dea112b090073317d4: const$72 || (const$72 = dart.const(new src__widgets__widget_inspector._Location.new({line: 46, column: 18, file: "org-dartlang-app:///packages/layout_grid_for_web/src/Util/main_layout_grid.dart", parameterLocations: const$71 || (const$71 = dart.constList([const$69 || (const$69 = dart.const(new src__widgets__widget_inspector._Location.new({line: 49, column: 13, name: "behavior"}))), const$70 || (const$70 = dart.const(new src__widgets__widget_inspector._Location.new({line: 51, column: 13, name: "child"})))], src__widgets__widget_inspector._Location))})))});
          }, BuildContextAndBoxConstraintsToScrollConfiguration()), $creationLocationd_0dea112b090073317d4: const$75 || (const$75 = dart.const(new src__widgets__widget_inspector._Location.new({line: 36, column: 14, file: "org-dartlang-app:///packages/layout_grid_for_web/src/Util/main_layout_grid.dart", parameterLocations: const$74 || (const$74 = dart.constList([const$73 || (const$73 = dart.const(new src__widgets__widget_inspector._Location.new({line: 37, column: 9, name: "builder"})))], src__widgets__widget_inspector._Location))})))}), $creationLocationd_0dea112b090073317d4: const$78 || (const$78 = dart.const(new src__widgets__widget_inspector._Location.new({line: 34, column: 12, file: "org-dartlang-app:///packages/layout_grid_for_web/src/Util/main_layout_grid.dart", parameterLocations: const$77 || (const$77 = dart.constList([const$76 || (const$76 = dart.const(new src__widgets__widget_inspector._Location.new({line: 36, column: 7, name: "child"})))], src__widgets__widget_inspector._Location))})))});
    }
    updateGrid(constraints) {
      this[_col$] = src__Util__line_creation.calculateGridLines(this.columns, constraints.maxWidth);
      this[_rows$] = src__Util__line_creation.calculateGridLines(this.rows, constraints.maxHeight);
    }
  };
  (src__Util__main_layout_grid.AncestorLayoutGrid.new = function(opts) {
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
    if (!(couples != null)) dart.assertFailed(null, "org-dartlang-app:///packages/layout_grid_for_web/src/Util/main_layout_grid.dart", 19, 15, "couples != null");
    if (!(columns != null)) dart.assertFailed(null, "org-dartlang-app:///packages/layout_grid_for_web/src/Util/main_layout_grid.dart", 20, 15, "columns != null");
    if (!(rows != null)) dart.assertFailed(null, "org-dartlang-app:///packages/layout_grid_for_web/src/Util/main_layout_grid.dart", 21, 15, "rows != null");
    src__Util__main_layout_grid.AncestorLayoutGrid.__proto__.new.call(this, {key: key, $creationLocationd_0dea112b090073317d4: $creationLocationd_0dea112b090073317d4});
    ;
  }).prototype = src__Util__main_layout_grid.AncestorLayoutGrid.prototype;
  dart.addTypeTests(src__Util__main_layout_grid.AncestorLayoutGrid);
  const columns$1 = Symbol("AncestorLayoutGrid.columns");
  const rows$1 = Symbol("AncestorLayoutGrid.rows");
  const couples$1 = Symbol("AncestorLayoutGrid.couples");
  const scrollDirection$0 = Symbol("AncestorLayoutGrid.scrollDirection");
  dart.setMethodSignature(src__Util__main_layout_grid.AncestorLayoutGrid, () => ({
    __proto__: dart.getMethods(src__Util__main_layout_grid.AncestorLayoutGrid.__proto__),
    build: dart.fnType(src__widgets__framework.Widget, [src__widgets__framework.BuildContext]),
    updateGrid: dart.fnType(dart.void, [src__rendering__box.BoxConstraints])
  }));
  dart.setLibraryUri(src__Util__main_layout_grid.AncestorLayoutGrid, "package:layout_grid_for_web/src/Util/main_layout_grid.dart");
  dart.setFieldSignature(src__Util__main_layout_grid.AncestorLayoutGrid, () => ({
    __proto__: dart.getFields(src__Util__main_layout_grid.AncestorLayoutGrid.__proto__),
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
  src__Util__custom_scroll_behavior.CustomScrollBehavior = class CustomScrollBehavior extends src__widgets__scroll_configuration.ScrollBehavior {
    buildViewportChrome(context, child, axisDirection) {
      return child;
    }
  };
  (src__Util__custom_scroll_behavior.CustomScrollBehavior.new = function() {
    src__Util__custom_scroll_behavior.CustomScrollBehavior.__proto__.new.call(this);
    ;
  }).prototype = src__Util__custom_scroll_behavior.CustomScrollBehavior.prototype;
  dart.addTypeTests(src__Util__custom_scroll_behavior.CustomScrollBehavior);
  dart.setLibraryUri(src__Util__custom_scroll_behavior.CustomScrollBehavior, "package:layout_grid_for_web/src/Util/custom_scroll_behavior.dart");
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
  dart.trackLibraries("packages/layout_grid_for_web/src/Util/area_creation", {
    "package:layout_grid_for_web/src/Util/line_creation.dart": src__Util__line_creation,
    "package:layout_grid_for_web/src/Util/layout_grid_unit_classes.dart": src__Util__layout_grid_unit_classes,
    "package:layout_grid_for_web/src/Util/layout_grid_unit.dart": src__Util__layout_grid_unit,
    "package:layout_grid_for_web/src/layout_grid.dart": src__layout_grid,
    "package:layout_grid_for_web/src/layout_grid_couple.dart": src__layout_grid_couple,
    "package:layout_grid_for_web/src/Util/nested_layout_grid.dart": src__Util__nested_layout_grid,
    "package:layout_grid_for_web/src/Util/layout_grid_child.dart": src__Util__layout_grid_child,
    "package:layout_grid_for_web/src/Util/inherited_size_model.dart": src__Util__inherited_size_model,
    "package:layout_grid_for_web/src/Util/main_layout_grid.dart": src__Util__main_layout_grid,
    "package:layout_grid_for_web/src/Util/custom_scroll_behavior.dart": src__Util__custom_scroll_behavior,
    "package:layout_grid_for_web/src/Util/area_creation.dart": src__Util__area_creation
  }, {
  }, '{"version":3,"sourceRoot":"","sources":["org-dartlang-app:///packages/layout_grid_for_web/src/Util/line_creation.dart","org-dartlang-app:///packages/layout_grid_for_web/src/Util/layout_grid_unit_classes.dart","org-dartlang-app:///packages/layout_grid_for_web/src/Util/layout_grid_unit.dart","org-dartlang-app:///packages/layout_grid_for_web/src/layout_grid.dart","org-dartlang-app:///packages/layout_grid_for_web/src/layout_grid_couple.dart","org-dartlang-app:///packages/layout_grid_for_web/src/Util/nested_layout_grid.dart","org-dartlang-app:///packages/layout_grid_for_web/src/Util/layout_grid_child.dart","org-dartlang-app:///packages/layout_grid_for_web/src/Util/inherited_size_model.dart","org-dartlang-app:///packages/layout_grid_for_web/src/Util/main_layout_grid.dart","org-dartlang-app:///packages/layout_grid_for_web/src/Util/custom_scroll_behavior.dart","org-dartlang-app:///packages/layout_grid_for_web/src/Util/area_creation.dart"],"names":[],"mappings":"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","file":"area_creation.ddc.js"}');
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
    src__Util__main_layout_grid: src__Util__main_layout_grid,
    src__Util__custom_scroll_behavior: src__Util__custom_scroll_behavior,
    src__Util__area_creation: src__Util__area_creation
  };
});

//# sourceMappingURL=area_creation.ddc.js.map
