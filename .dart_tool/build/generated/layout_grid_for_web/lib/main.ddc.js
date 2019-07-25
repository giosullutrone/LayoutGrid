define(['dart_sdk', 'packages/flutter_web/animation', 'packages/flutter_web/material', 'packages/layout_grid_for_web/src/Util/ancestor_layout_grid', 'packages/flutter_web_ui/ui'], function(dart_sdk, animation, material, ancestor_layout_grid, ui) {
  'use strict';
  const core = dart_sdk.core;
  const _interceptors = dart_sdk._interceptors;
  const dart = dart_sdk.dart;
  const dartx = dart_sdk.dartx;
  const src__widgets__framework = animation.src__widgets__framework;
  const src__widgets__container = animation.src__widgets__container;
  const src__widgets__widget_inspector = animation.src__widgets__widget_inspector;
  const src__painting__box_decoration = animation.src__painting__box_decoration;
  const src__widgets__binding = animation.src__widgets__binding;
  const src__material__app = material.src__material__app;
  const src__material__scaffold = material.src__material__scaffold;
  const src__material__colors = material.src__material__colors;
  const src__layout_grid = ancestor_layout_grid.src__layout_grid;
  const src__Util__layout_grid_unit = ancestor_layout_grid.src__Util__layout_grid_unit;
  const src__Util__layout_grid_unit_classes = ancestor_layout_grid.src__Util__layout_grid_unit_classes;
  const src__layout_grid_couple = ancestor_layout_grid.src__layout_grid_couple;
  const src__Util__inherited_size_model = ancestor_layout_grid.src__Util__inherited_size_model;
  const ui$ = ui.ui;
  const main = Object.create(dart.library);
  let JSArrayOfLayoutUnit = () => (JSArrayOfLayoutUnit = dart.constFn(_interceptors.JSArray$(src__Util__layout_grid_unit_classes.LayoutUnit)))();
  let JSArrayOfString = () => (JSArrayOfString = dart.constFn(_interceptors.JSArray$(core.String)))();
  let ListOfString = () => (ListOfString = dart.constFn(core.List$(core.String)))();
  let JSArrayOfListOfString = () => (JSArrayOfListOfString = dart.constFn(_interceptors.JSArray$(ListOfString())))();
  let JSArrayOfLayoutGridCouple = () => (JSArrayOfLayoutGridCouple = dart.constFn(_interceptors.JSArray$(src__layout_grid_couple.LayoutGridCouple)))();
  main.MyApp = class MyApp extends src__widgets__framework.StatefulWidget {
    createState() {
      return new main._MyAppState.new();
    }
  };
  (main.MyApp.new = function(opts) {
    let key = opts && 'key' in opts ? opts.key : null;
    let $creationLocationd_0dea112b090073317d4 = opts && '$creationLocationd_0dea112b090073317d4' in opts ? opts.$creationLocationd_0dea112b090073317d4 : null;
    main.MyApp.__proto__.new.call(this, {key: key, $creationLocationd_0dea112b090073317d4: $creationLocationd_0dea112b090073317d4});
    ;
  }).prototype = main.MyApp.prototype;
  dart.addTypeTests(main.MyApp);
  dart.setMethodSignature(main.MyApp, () => ({
    __proto__: dart.getMethods(main.MyApp.__proto__),
    createState: dart.fnType(main._MyAppState, [])
  }));
  dart.setLibraryUri(main.MyApp, "package:layout_grid_for_web/main.dart");
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
  let const$14;
  let const$15;
  let const$16;
  let const$17;
  let const$18;
  let const$19;
  let const$20;
  let const$21;
  main._MyAppState = class _MyAppState extends src__widgets__framework.State$(main.MyApp) {
    build(context) {
      return new src__material__app.MaterialApp.new({debugShowCheckedModeBanner: false, home: new src__material__scaffold.Scaffold.new({body: new src__widgets__container.Container.new({child: new src__layout_grid.LayoutGrid.new({isAncestor: true, columns: JSArrayOfLayoutUnit().of([new src__Util__layout_grid_unit.LayoutMinMax.new({minUnit: new src__Util__layout_grid_unit.LayoutPixel.new({pixels: 200.0}), maxUnit: new src__Util__layout_grid_unit.LayoutPixel.new({pixels: 800.0})}), new src__Util__layout_grid_unit.LayoutMinMax.new({minUnit: new src__Util__layout_grid_unit.LayoutPixel.new({pixels: 200.0}), maxUnit: new src__Util__layout_grid_unit.LayoutPixel.new({pixels: 800.0})})]), rows: JSArrayOfLayoutUnit().of([new src__Util__layout_grid_unit.LayoutDependent.new({line: 1, multiplicator: 1.0}), new src__Util__layout_grid_unit.LayoutDependent.new({line: 1, multiplicator: 1.0})]), areas: JSArrayOfListOfString().of([JSArrayOfString().of(["top", "right"]), JSArrayOfString().of(["center", "right"])]), couples: JSArrayOfLayoutGridCouple().of([new src__layout_grid_couple.LayoutGridCouple.new({widget: new main.TestContainer.new({color: src__material__colors.Colors.amber, $creationLocationd_0dea112b090073317d4: const$1 || (const$1 = dart.const(new src__widgets__widget_inspector._Location.new({line: 35, column: 48, file: "org-dartlang-app:///packages/layout_grid_for_web/main.dart", parameterLocations: const$0 || (const$0 = dart.constList([const$ || (const$ = dart.const(new src__widgets__widget_inspector._Location.new({line: 35, column: 62, name: "color"})))], src__widgets__widget_inspector._Location))})))}), name: "center", sizeKey: "centerSize"}), new src__layout_grid_couple.LayoutGridCouple.new({widget: new main.TestContainer1.new({color: src__material__colors.Colors.amber, $creationLocationd_0dea112b090073317d4: const$4 || (const$4 = dart.const(new src__widgets__widget_inspector._Location.new({line: 36, column: 48, file: "org-dartlang-app:///packages/layout_grid_for_web/main.dart", parameterLocations: const$3 || (const$3 = dart.constList([const$2 || (const$2 = dart.const(new src__widgets__widget_inspector._Location.new({line: 36, column: 63, name: "color"})))], src__widgets__widget_inspector._Location))})))}), name: "top", sizeKey: "topSize"})]), $creationLocationd_0dea112b090073317d4: const$11 || (const$11 = dart.const(new src__widgets__widget_inspector._Location.new({line: 21, column: 18, file: "org-dartlang-app:///packages/layout_grid_for_web/main.dart", parameterLocations: const$10 || (const$10 = dart.constList([const$5 || (const$5 = dart.const(new src__widgets__widget_inspector._Location.new({line: 23, column: 13, name: "isAncestor"}))), const$6 || (const$6 = dart.const(new src__widgets__widget_inspector._Location.new({line: 25, column: 13, name: "columns"}))), const$7 || (const$7 = dart.const(new src__widgets__widget_inspector._Location.new({line: 28, column: 13, name: "rows"}))), const$8 || (const$8 = dart.const(new src__widgets__widget_inspector._Location.new({line: 31, column: 13, name: "areas"}))), const$9 || (const$9 = dart.const(new src__widgets__widget_inspector._Location.new({line: 35, column: 13, name: "couples"})))], src__widgets__widget_inspector._Location))})))}), $creationLocationd_0dea112b090073317d4: const$14 || (const$14 = dart.const(new src__widgets__widget_inspector._Location.new({line: 20, column: 15, file: "org-dartlang-app:///packages/layout_grid_for_web/main.dart", parameterLocations: const$13 || (const$13 = dart.constList([const$12 || (const$12 = dart.const(new src__widgets__widget_inspector._Location.new({line: 21, column: 11, name: "child"})))], src__widgets__widget_inspector._Location))})))}), $creationLocationd_0dea112b090073317d4: const$17 || (const$17 = dart.const(new src__widgets__widget_inspector._Location.new({line: 18, column: 13, file: "org-dartlang-app:///packages/layout_grid_for_web/main.dart", parameterLocations: const$16 || (const$16 = dart.constList([const$15 || (const$15 = dart.const(new src__widgets__widget_inspector._Location.new({line: 20, column: 9, name: "body"})))], src__widgets__widget_inspector._Location))})))}), $creationLocationd_0dea112b090073317d4: const$21 || (const$21 = dart.const(new src__widgets__widget_inspector._Location.new({line: 16, column: 12, file: "org-dartlang-app:///packages/layout_grid_for_web/main.dart", parameterLocations: const$20 || (const$20 = dart.constList([const$18 || (const$18 = dart.const(new src__widgets__widget_inspector._Location.new({line: 17, column: 7, name: "debugShowCheckedModeBanner"}))), const$19 || (const$19 = dart.const(new src__widgets__widget_inspector._Location.new({line: 18, column: 7, name: "home"})))], src__widgets__widget_inspector._Location))})))});
    }
  };
  (main._MyAppState.new = function() {
    main._MyAppState.__proto__.new.call(this);
    ;
  }).prototype = main._MyAppState.prototype;
  dart.addTypeTests(main._MyAppState);
  dart.setMethodSignature(main._MyAppState, () => ({
    __proto__: dart.getMethods(main._MyAppState.__proto__),
    build: dart.fnType(src__widgets__framework.Widget, [src__widgets__framework.BuildContext])
  }));
  dart.setLibraryUri(main._MyAppState, "package:layout_grid_for_web/main.dart");
  let const$22;
  let const$23;
  let const$24;
  let const$25;
  let const$26;
  main.TestContainer = class TestContainer extends src__widgets__framework.StatelessWidget {
    get color() {
      return this[color$];
    }
    set color(value) {
      super.color = value;
    }
    build(context) {
      let key = "centerSize";
      let sizeModel = src__Util__inherited_size_model.InheritedSizeModel.of(context, {sizeKey: key});
      return new src__widgets__container.Container.new({height: sizeModel.getWidth(key), width: sizeModel.getWidth(key), decoration: new src__painting__box_decoration.BoxDecoration.new({color: this.color}), $creationLocationd_0dea112b090073317d4: const$26 || (const$26 = dart.const(new src__widgets__widget_inspector._Location.new({line: 56, column: 12, file: "org-dartlang-app:///packages/layout_grid_for_web/main.dart", parameterLocations: const$25 || (const$25 = dart.constList([const$22 || (const$22 = dart.const(new src__widgets__widget_inspector._Location.new({line: 57, column: 7, name: "height"}))), const$23 || (const$23 = dart.const(new src__widgets__widget_inspector._Location.new({line: 58, column: 7, name: "width"}))), const$24 || (const$24 = dart.const(new src__widgets__widget_inspector._Location.new({line: 59, column: 7, name: "decoration"})))], src__widgets__widget_inspector._Location))})))});
    }
  };
  (main.TestContainer.new = function(opts) {
    let color = opts && 'color' in opts ? opts.color : null;
    let $creationLocationd_0dea112b090073317d4 = opts && '$creationLocationd_0dea112b090073317d4' in opts ? opts.$creationLocationd_0dea112b090073317d4 : null;
    this[color$] = color;
    main.TestContainer.__proto__.new.call(this, {$creationLocationd_0dea112b090073317d4: $creationLocationd_0dea112b090073317d4});
    ;
  }).prototype = main.TestContainer.prototype;
  dart.addTypeTests(main.TestContainer);
  const color$ = Symbol("TestContainer.color");
  dart.setMethodSignature(main.TestContainer, () => ({
    __proto__: dart.getMethods(main.TestContainer.__proto__),
    build: dart.fnType(src__widgets__framework.Widget, [src__widgets__framework.BuildContext])
  }));
  dart.setLibraryUri(main.TestContainer, "package:layout_grid_for_web/main.dart");
  dart.setFieldSignature(main.TestContainer, () => ({
    __proto__: dart.getFields(main.TestContainer.__proto__),
    color: dart.finalFieldType(ui$.Color)
  }));
  let const$27;
  let const$28;
  let const$29;
  let const$30;
  let const$31;
  main.TestContainer1 = class TestContainer1 extends src__widgets__framework.StatelessWidget {
    get color() {
      return this[color$0];
    }
    set color(value) {
      super.color = value;
    }
    build(context) {
      let key = "topSize";
      let sizeModel = src__Util__inherited_size_model.InheritedSizeModel.of(context, {sizeKey: key});
      return new src__widgets__container.Container.new({height: sizeModel.getWidth(key), width: sizeModel.getWidth(key), decoration: new src__painting__box_decoration.BoxDecoration.new({color: this.color}), $creationLocationd_0dea112b090073317d4: const$31 || (const$31 = dart.const(new src__widgets__widget_inspector._Location.new({line: 77, column: 12, file: "org-dartlang-app:///packages/layout_grid_for_web/main.dart", parameterLocations: const$30 || (const$30 = dart.constList([const$27 || (const$27 = dart.const(new src__widgets__widget_inspector._Location.new({line: 78, column: 7, name: "height"}))), const$28 || (const$28 = dart.const(new src__widgets__widget_inspector._Location.new({line: 79, column: 7, name: "width"}))), const$29 || (const$29 = dart.const(new src__widgets__widget_inspector._Location.new({line: 80, column: 7, name: "decoration"})))], src__widgets__widget_inspector._Location))})))});
    }
  };
  (main.TestContainer1.new = function(opts) {
    let color = opts && 'color' in opts ? opts.color : null;
    let $creationLocationd_0dea112b090073317d4 = opts && '$creationLocationd_0dea112b090073317d4' in opts ? opts.$creationLocationd_0dea112b090073317d4 : null;
    this[color$0] = color;
    main.TestContainer1.__proto__.new.call(this, {$creationLocationd_0dea112b090073317d4: $creationLocationd_0dea112b090073317d4});
    ;
  }).prototype = main.TestContainer1.prototype;
  dart.addTypeTests(main.TestContainer1);
  const color$0 = Symbol("TestContainer1.color");
  dart.setMethodSignature(main.TestContainer1, () => ({
    __proto__: dart.getMethods(main.TestContainer1.__proto__),
    build: dart.fnType(src__widgets__framework.Widget, [src__widgets__framework.BuildContext])
  }));
  dart.setLibraryUri(main.TestContainer1, "package:layout_grid_for_web/main.dart");
  dart.setFieldSignature(main.TestContainer1, () => ({
    __proto__: dart.getFields(main.TestContainer1.__proto__),
    color: dart.finalFieldType(ui$.Color)
  }));
  let const$32;
  let const$33;
  main.main = function() {
    return src__widgets__binding.runApp(new main.MyApp.new({$creationLocationd_0dea112b090073317d4: const$33 || (const$33 = dart.const(new src__widgets__widget_inspector._Location.new({line: 4, column: 23, file: "org-dartlang-app:///packages/layout_grid_for_web/main.dart", parameterLocations: const$32 || (const$32 = dart.constList([], src__widgets__widget_inspector._Location))})))}));
  };
  dart.trackLibraries("packages/layout_grid_for_web/main", {
    "package:layout_grid_for_web/main.dart": main
  }, {
  }, '{"version":3,"sourceRoot":"","sources":["org-dartlang-app:///packages/layout_grid_for_web/main.dart"],"names":[],"mappings":";;;;;;;;;;;;;;;;;;;;;;;;;;;;AAQ+B;IAAa;;;QAF/B;;AAAQ,8CAAW,GAAG;;EAAC;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;UAQR;AACxB,YAAO,qEACuB,aACtB,gDAEE,kDACG,iDAEO,eAEH,0BAAC,2DAAsB,yDAAoB,kBAAc,yDAAoB,WAC5E,2DAAsB,yDAAoB,kBAAc,yDAAoB,mBAEhF,0BAAC,2DAAsB,kBAAkB,OACxC,2DAAsB,kBAAkB,gBAEzC,4BAAC,sBAAC,OAAO,WACR,sBAAC,UAAU,sBAGT,gCAAC,0DAAyB,mCAA4B,seAAe,mBAAmB,gBACvF,0DAAyB,oCAA6B,weAAe,gBAAgB;IAMzG;;;;;EACF;;;;;;;;;;;;;IAGc;;;;;;UAKc;AAEX,gBAAM;AACM,sBAA+B,sDAAG,OAAO,YAAW,GAAG;AAEhF,YAAO,oDACG,AAAU,SAAD,UAAU,GAAG,UACvB,AAAU,SAAD,UAAU,GAAG,eACjB,4DACH;IAGb;;;QAf8B;;;AAA9B;;EAAqC;;;;;;;;;;;;;;;;;;IAmBzB;;;;;;UAKc;AAEX,gBAAM;AACM,sBAA+B,sDAAG,OAAO,YAAW,GAAG;AAEhF,YAAO,oDACG,AAAU,SAAD,UAAU,GAAG,UACvB,AAAU,SAAD,UAAU,GAAG,eACjB,4DACH;IAGb;;;QAf+B;;;AAA/B;;EAAsC;;;;;;;;;;;;;;;AAjEzB,wCAAO;EAAQ","file":"main.ddc.js"}');
  // Exports:
  return {
    main: main
  };
});

//# sourceMappingURL=main.ddc.js.map
