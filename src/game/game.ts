import type Player from './player'
import { type GameType } from './game-type'

export default class Game {
  gameType: GameType
  players: Player[]

  constructor (gameType: GameType) {
    this.gameType = gameType
    this.players = []
  }

  AddPlayer (player: Player): void {
    if (this.players.length >= this.gameType.maxPlayers) { throw new Error(`This game only supports ${this.gameType.maxPlayers}`) }

    this.players.push(player)
  }
}
