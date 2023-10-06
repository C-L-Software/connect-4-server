import type Lobby from './lobby'
import type Player from './player'
import * as ev from '../types/events'

export default abstract class Game {
  gameName: string
  minPlayers: number
  maxPlayers: number
  currentTurnPlayer: string | null = null
  lobby: Lobby | null = null

  constructor (gameName: string, minPlayers: number, maxPlayers: number) {
    this.gameName = gameName
    this.minPlayers = minPlayers
    this.maxPlayers = maxPlayers
  }

  public Start (lobby: Lobby): void {
    if (lobby.players.length < this.minPlayers || lobby.players.length > this.maxPlayers) { throw new Error(`This game only supports ${this.minPlayers} to ${this.maxPlayers} players`) }

    this.currentTurnPlayer = lobby.players[0].id
    this.lobby = lobby
    lobby.players.forEach(p => {
      p.socket.emit(ev.EventType.START_GAME, {})
      this.AddListeners(p)
    })

    console.log(`Started game ${this.gameName} with lobby code ${this.lobby.joinCode}`)
  }

  public SwitchTurns (): void {
    if (this.lobby === null) return

    // This will only work with 2 players
    // One day we can fix this to work with more
    for (const p of this.lobby.players) {
      if (p.id !== this.currentTurnPlayer) {
        this.currentTurnPlayer = p.id
        break
      }
    }
  }

  public abstract AddListeners (player: Player): void
}
