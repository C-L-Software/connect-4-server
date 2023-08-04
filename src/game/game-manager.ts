import type * as socketio from 'socket.io'
import * as events from '../types/events'
import { Connect4 } from './game-type'
import Lobby from './lobby'
import Player from './player'

export default class GameManager {
    lobbies: Lobby[]

    constructor() {
        this.lobbies = []
    }

    onConnection(socket: socketio.Socket): void {
        let player = new Player(socket)
        console.log(`Player with id ${player.id} has connected`)

        socket.on(events.NewGameEvent.NAME, (e: events.NewGameEvent, callback: events.EventCallback) => {
            // Don't let a player create a new game if they are already in a game
            let currentLobby = this.getPlayerLobby(player.id)
            if (currentLobby !== undefined)
                return callback(false, `Player ${player.id} is already in lobby ${currentLobby?.joinCode}`)

            // TODO: in another game jam we'll let the player choose the game type.
            // For now, we default to Connect4!
            let lobby = new Lobby(new Connect4())
            lobby.AddPlayer(player)
            this.lobbies.push(lobby)

            console.log(`Player ${player.id} has created a ${lobby.gameType.gameName} lobby with code ${lobby.joinCode}`)

            return callback(true, lobby.joinCode)
        })

        socket.on(events.JoinGameEvent.NAME, (e: events.JoinGameEvent, callback: events.EventCallback) => {
            // Don't let a player join a game if they are already in one
            let currentLobby = this.getPlayerLobby(player.id)
            if (currentLobby !== undefined)
                return callback(false, `Player ${player.id} is already in lobby ${currentLobby?.joinCode}`)

            let lobby = this.findLobby(e.roomCode)
            if (lobby === undefined)
                return callback(false, `Could not find lobby with code ${e.roomCode}`)

            lobby.AddPlayer(player)
            console.log(`Player ${player.id} has joined room ${lobby.joinCode}`)

            return callback(true, `Joined lobby with code ${lobby.joinCode}`)
        })

        socket.on('disconnect', (reason: socketio.DisconnectReason) => {
            console.log(`Socket with id ${socket.id} has disconnected with reason: ${reason}`)
        })
    }

    findLobby(joinCode: string): Lobby | undefined {
        return this.lobbies.find(l => l.joinCode === joinCode)
    }

    getPlayerLobby(playerId: string): Lobby | undefined {
        console.log('Search lobbies', this.lobbies, 'for player id', playerId)
        return this.lobbies.find(l => l.players.find(p => p.id === playerId) !== undefined)
    }
}
