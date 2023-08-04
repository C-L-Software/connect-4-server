import type * as socketio from 'socket.io'

export default abstract class Game {
  gameName: string
  minPlayers: number
  maxPlayers: number

  constructor (gameName: string, minPlayers: number, maxPlayers: number) {
    this.gameName = gameName
    this.minPlayers = minPlayers
    this.maxPlayers = maxPlayers
  }

  public abstract AddListeners (socket: socketio.Socket): void
}
