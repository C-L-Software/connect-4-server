import * as utils from '../utils/utils'
import type Game from './game'
import type Player from './player'

export default class Lobby {
    joinCode: string
    players: Player[]
    game: Game

    constructor(gameType: Game) {
        this.game = gameType
        this.game.lobby = this
        this.joinCode = utils.GenerateJoinCode()
        this.players = []
    }

    AddPlayer(player: Player): void {
        if (this.GetPlayer(player) !== undefined) { throw new Error(`Player with id ${player.id} is already in lobby with code ${this.joinCode}`) }

        if (this.players.length >= this.game.maxPlayers) { throw new Error(`This game only supports ${this.game.maxPlayers}`) }

        this.players.push(player)
        this.Broadcast('player_joined', { playerCount: this.players.length })
    }

    KickPlayer(player: Player): void {
        if (this.GetPlayer(player) === undefined) { throw new Error(`Player with id ${player.id} is not in this lobby`) }

        this.players = this.players.filter(p => p.id !== player.id)
    }

    GetPlayer(player: Player): Player | undefined {
        return this.players.find(p => p.id === player.id)
    }

    Start(): void {
        this.game.Start(this)
    }

    Broadcast(eventName: string, data: any): void {
        this.players.forEach(p => p.socket.emit(eventName, data))
    }
}
