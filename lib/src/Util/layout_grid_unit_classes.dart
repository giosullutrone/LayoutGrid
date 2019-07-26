abstract class LayoutUnit {}

abstract class OtherLayoutDependent extends LayoutUnit {}

abstract class OtherLayoutIndependent extends LayoutUnit {}

abstract class SingleUnit extends OtherLayoutIndependent {}

abstract class FreeSpaceIndependent extends SingleUnit {}
