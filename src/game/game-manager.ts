import type * as socketio from 'socket.io'
import * as e from '../types/events'
import Connect4 from './connect4/connect4'
import Lobby from './lobby'
import Player from './player'

export default class GameManager {
  lobbies: Lobby[]

  constructor () {
    this.lobbies = []
  }

  onConnection (socket: socketio.Socket): void {
    const player = new Player(socket)
    console.log(`Player with id ${player.id} has connected`)

    // Let FE know it's connected
    socket.emit('ack', 'hello world')

    socket.on(e.EventType.NEW_GAME, (e: e.NewGameEventRequest, callback: e.NewGameEventCallback) => {
      // Don't let a player create a new game if they are already in a game
      const currentLobby = this.getPlayerLobby(player.id)
      if (currentLobby !== undefined) { callback(new Error(`Player ${player.id} is already in lobby ${currentLobby?.joinCode}`), null); return }

      // TODO: in another game jam we'll let the player choose the game type.
      // For now, we default to Connect4!
      const lobby = new Lobby(new Connect4())
      lobby.AddPlayer(player)
      this.lobbies.push(lobby)

      console.log(`Player ${player.id} has created a ${lobby.game.gameName} lobby with code ${lobby.joinCode}`)

      callback(null, { joinCode: lobby.joinCode })
    })

    socket.on(e.EventType.JOIN_GAME, (e: e.JoinGameEventRequest, callback: e.JoinGameEventCallback) => {
      // Don't let a player join a game if they are already in one
      const currentLobby = this.getPlayerLobby(player.id)
      if (currentLobby !== undefined) { callback(new Error(`Player ${player.id} is already in lobby ${currentLobby?.joinCode}`)); return }

      const lobby = this.findLobby(e.joinCode)
      if (lobby === undefined) { callback(new Error(`Could not find lobby with code ${e.joinCode}`)); return }

      lobby.AddPlayer(player)
      console.log(`Player ${player.id} has joined room ${lobby.joinCode}`)

      callback(null)
    })

    socket.on(e.EventType.START_GAME, (e: e.StartGameEventRequest, callback: e.StartGameEventCallback) => {
      // Don't let a player start a game if they are not in a lobby
      const currentLobby = this.getPlayerLobby(player.id)
      if (currentLobby === undefined) { callback(new Error(`Player ${player.id} is not in a lobby to start a game`)); return }

      currentLobby.Start()
      console.log(`Player ${player.id} has started game lobby ${currentLobby.joinCode}`)

      callback(null)
    })

    socket.on('disconnect', (reason: socketio.DisconnectReason) => {
      console.log(`Socket with id ${socket.id} has disconnected with reason: ${reason}`)

      const currentLobby = this.getPlayerLobby(player.id)
      if (currentLobby === undefined) return

      currentLobby.KickPlayer(player)
      if (currentLobby.players.length === 0) {
        this.lobbies = this.lobbies.filter(l => l.joinCode !== currentLobby.joinCode)
        console.log(`Deleting lobby ${currentLobby.joinCode} since it has no players`)
      }
    })
  }

  findLobby (joinCode: string): Lobby | undefined {
    return this.lobbies.find(l => l.joinCode === joinCode)
  }

  getPlayerLobby (playerId: string): Lobby | undefined {
    return this.lobbies.find(l => l.players.find(p => p.id === playerId) !== undefined)
  }
}
