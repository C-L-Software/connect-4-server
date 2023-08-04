export type EventCallback = (error: Error | null, response: any) => void

export class NewGameEvent {
  public static readonly NAME = 'new_game'
}

export class JoinGameEvent {
  public static readonly NAME = 'join_game'

  roomCode: string
  constructor (roomCode: string) {
    this.roomCode = roomCode
  }
}

export class StartGameEvent {
  public static readonly NAME = 'start_game'
}
