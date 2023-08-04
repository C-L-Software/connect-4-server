import type * as socketio from 'socket.io'
import Game from '../game'

export default class Connect4 extends Game {
  public static AddListeners (socket: socketio.Socket): void {
    // socket.on()
  }

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

  Start (): void {

  }
}
