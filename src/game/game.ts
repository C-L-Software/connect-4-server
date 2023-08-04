import type * as socketio from 'socket.io'
import Connect4 from './connect4/connect4'

export default abstract class Game {
  gameName: string
  minPlayers: number
  maxPlayers: number

  constructor (gameName: string, minPlayers: number, maxPlayers: number) {
    this.gameName = gameName
    this.minPlayers = minPlayers
    this.maxPlayers = maxPlayers
  }

  public abstract Start (): void
}

// This method adds the specific event listeners for each game type
export function AddGameSocketHooks (socket: socketio.Socket): void {
  Connect4.AddListeners(socket)
}
