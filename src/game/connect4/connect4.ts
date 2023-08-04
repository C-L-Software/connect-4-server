import type * as socketio from 'socket.io'
import Game from '../game'
import * as gameEvents from './events'
import type * as events from '../../types/events'

export default class Connect4 extends Game {
  // Matrix describing which player_id has a chip in which cell
  gameBoard: string[][] = [
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '']
  ]

  // Whose turn is it?
  currentTurn: string = ''

  gameOver: boolean = false

  // FE -> BE:
  // playerId: id, columnNumber: number
  //
  // BE -> FE
  // gameBoard: Array<Array>>    # state of board
  // currentTurn: string    # whose (id) turn it is
  // gameOver: boolean

  constructor () {
    super('Connect4', 2, 2)
  }

  AddListeners (socket: socketio.Socket): void {
    socket.on(gameEvents.DropChipEvent.NAME, (e: gameEvents.DropChipEvent, callback: events.EventCallback) => {
      // drop chip
    })
  }
}
