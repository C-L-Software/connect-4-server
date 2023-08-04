export class DropChipEvent {
  public static readonly NAME = 'drop_chip'

  column: number
  constructor (column: number) {
    this.column = column
  }
}
