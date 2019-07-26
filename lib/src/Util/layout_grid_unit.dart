import 'layout_grid_unit_classes.dart';

class LayoutPixel extends FreeSpaceIndependent {
  LayoutPixel({
    this.pixels = 0.0,
  }) : assert(
          pixels != null,
        );

  double pixels;

  double getValue() {
    return pixels;
  }
}

class LayoutPercentage extends FreeSpaceIndependent {
  LayoutPercentage({
    this.percentage = 0.0,
  }) : assert(
          percentage >= 0.0,
        );

  double percentage;

  double getValue(double size) {
    return percentage / 100 * size;
  }
}

class LayoutFraction extends SingleUnit {
  LayoutFraction({
    this.fraction = 0,
  }) : assert(
          fraction != null,
        );

  int fraction;

  double getValue(int sumOfFractions, double freeSpace) {
    return fraction / sumOfFractions * freeSpace;
  }
}

class LayoutMinMax extends OtherLayoutIndependent {
  LayoutMinMax({
    this.minUnit,
    this.maxUnit,
  }) : assert(
          minUnit != null,
          maxUnit != null,
        );

  FreeSpaceIndependent minUnit;
  SingleUnit maxUnit;

  FreeSpaceIndependent getMinUnit() {
    return minUnit;
  }

  SingleUnit getMaxUnit() {
    return maxUnit;
  }
}

class LayoutDependent extends OtherLayoutDependent {
  LayoutDependent({
    this.line,
    this.multiplicator = 1.0,
  }) : assert(
          line != null,
          multiplicator != null,
        );

  int line;
  double multiplicator;
}
