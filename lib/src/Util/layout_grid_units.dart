import 'package:flutter_web/widgets.dart';

class LayoutUnit{

  LayoutUnit({this.priority = 0, this.subPriority = 0});

  int priority;
  int subPriority;
  int index = 0;
  Axis axis;
}

class LayoutPixel extends LayoutUnit {
  LayoutPixel({
    this.pixels = 0.0,
    int priority,
    int subPriority,
  }) : assert(
    pixels != null,
  ), super(priority: priority, subPriority: subPriority);

  double pixels;

  double getValue() {
    return pixels;
  }
}

class LayoutPercentage extends LayoutUnit {
  LayoutPercentage({
    this.percentage = 0.0,
    int priority,
    int subPriority,
  }) : assert(
    percentage >= 0.0,
  ), super(priority: priority, subPriority: subPriority);

  double percentage;

  double getValue(double space) {
    return percentage / 100 * space;
  }
}

class LayoutFraction extends LayoutUnit {
  LayoutFraction({
    this.fraction = 0,
    int priority,
    int subPriority,
  }) : assert(
    fraction != null,
  ), super(priority: priority, subPriority: subPriority);

  int fraction;

  double getValue(int sumOfFractions, double freeSpace) {
    return fraction / sumOfFractions * freeSpace;
  }
}

class LayoutMinMax extends LayoutUnit {
  LayoutMinMax({
    this.minUnit,
    this.maxUnit,
    int priority,
    int subPriority,
  }) : assert(
    !(minUnit is LayoutFraction && maxUnit is LayoutFraction),
  ), super(priority: priority, subPriority: subPriority);

  LayoutUnit minUnit, maxUnit;

  LayoutUnit getMinUnit() {
    return minUnit;
  }

  LayoutUnit getMaxUnit() {
    return maxUnit;
  }
}

class LayoutDependent extends LayoutUnit {
  LayoutDependent({
    this.line,
    this.multiplicator = 1.0,
    int priority,
    int subPriority,
  }) : assert(
    line != null,
    multiplicator != null,
  ), super(priority: priority, subPriority: subPriority);

  int line;
  double multiplicator;

  double getValue(List<double> list) {
    return list[line] * multiplicator;
  }
}