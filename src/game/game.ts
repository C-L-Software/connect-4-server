import Lobby from './lobby'
import Player from './player'

export default abstract class Game {
  gameName: string
  minPlayers: number
  maxPlayers: number
  lobby: Lobby | null = null

  constructor (gameName: string, minPlayers: number, maxPlayers: number) {
    this.gameName = gameName
    this.minPlayers = minPlayers
    this.maxPlayers = maxPlayers
  }

  public Start(lobby: Lobby): void {
    this.lobby = lobby

    lobby.players.forEach(p => this.AddListeners(p))
  }

  public abstract AddListeners (player: Player): void
}
