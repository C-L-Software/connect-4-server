import * as utils from '../utils/utils'
import { type GameType } from './game-type'
import type Player from './player'

export default class Lobby {
  joinCode: string
  players: Player[]
  gameType: GameType

  constructor (gameType: GameType) {
    this.gameType = gameType
    this.joinCode = utils.GenerateJoinCode()
    this.players = []
  }

  async AddPlayer (player: Player): Promise<void> {
    if (player.socket.rooms.has(this.joinCode)) { throw new Error(`Player with id ${player.id} is already in lobby with code ${this.joinCode}`) }

    if (this.players.length >= this.gameType.maxPlayers) { throw new Error(`This game only supports ${this.gameType.maxPlayers}`) }

    await player.socket.join(this.joinCode)
    this.players.push(player)
  }

  async KickPlayer (player: Player): Promise<void> {
    if (this.players.find(p => p.id === player.id) == null) { throw new Error(`Player with id ${player.id} is not in this lobby`) }

    if (!player.socket.rooms.has(this.joinCode)) { throw new Error(`Player with id ${player.id} is not in room ${this.joinCode}`) }

    await player.socket.leave(this.joinCode)
    this.players = this.players.filter(p => p.id !== player.id)
  }
}
