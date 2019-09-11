import 'package:flutter/material.dart';

import 'layout_grid_private_units.dart';

class LayoutPixel extends LayoutUnit {
  LayoutPixel({
    this.pixels = 0.0,
    int priority = 0,
  }) : assert(
    pixels != null,
  ), super(priority: priority);

  double pixels;

  double getValue() {
    return pixels;
  }
}

class LayoutPercentage extends LayoutUnit {
  LayoutPercentage({
    this.percentage = 0.0,
    int priority = 0,
  }) : assert(
    percentage >= 0.0,
  ), super(priority: priority);

  double percentage;

  double getValue(double space) {
    return percentage / 100 * space;
  }
}

class LayoutFraction extends LayoutUnit {
  LayoutFraction({
    this.fraction = 0,
    int priority = 0,
  }) : assert(
    fraction != null,
  ), super(priority: priority);

  int fraction;

  double getValue(int sumOfFractions, double freeSpace) {
    return fraction / sumOfFractions * freeSpace;
  }
}

class LayoutMinMax extends LayoutUnit {
  LayoutMinMax({
    this.minUnit,
    this.maxUnit,
    this.unit,
    int priority = 0,
    this.subPriority = 0,
  }) : assert(
    !(minUnit is LayoutFraction && maxUnit is LayoutFraction),
  ), super(priority: priority);

  LayoutUnit unit,minUnit, maxUnit;
  int subPriority;
}

class LayoutDependent extends LayoutUnit {
  LayoutDependent({
    @required this.line,
    this.lineAxis = Axis.vertical,
    @required this.function,
    int priority = 0,
  }) : assert(
    line != null,
  ), super(priority: priority);

  int line;
  double Function(double) function;
  Axis lineAxis;

  double getValue(List<double> list) {
    return function(list[line]);
  }
}