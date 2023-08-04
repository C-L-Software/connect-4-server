export class DropChipEvent {
  public static readonly NAME = 'drop_chip'

  roomCode: string
  constructor (roomCode: string) {
    this.roomCode = roomCode
  }
}
