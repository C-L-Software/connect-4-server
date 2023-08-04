export class JoinGameEvent {
  public static readonly NAME = 'join_game'

  roomCode: string

  constructor (roomCode: string) {
    this.roomCode = roomCode
  }
}

export class LeaveGameEvent {
  public static readonly NAME = 'leave_game'

  roomCode: string

  constructor (roomCode: string) {
    this.roomCode = roomCode
  }
}
