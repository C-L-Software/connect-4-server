import Game from '../game'
import type Player from '../player'
import * as ev from './events'

export default class Connect4 extends Game {
  readonly ROWS: number = 6
  readonly COLS: number = 7

  // Matrix describing which player_id has a chip in which cell
  gameBoard: string[][] = [
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '']
  ]

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

  AddListeners (player: Player): void {
    this.BroadcastState()

    player.socket.on(ev.EventType.DROP_CHIP, (e: ev.DropChipEventRequest, callback: ev.DropChipEventCallback) => {
      if (this.currentTurnPlayer !== player.id) { callback(`It is not your turn. Current turn is for player ${this.currentTurnPlayer}`); return }

      console.log(`Player ${player.id} dropped chip at column ${e.column}`)

      try {
        this.dropChip(e.column, player)
      } catch (e: any) {
        console.error(e)
        callback(e.message)
        return
      }

      this.SwitchTurns()
      this.BroadcastState()
      if (this.checkForWin(player)) { this.lobby?.End(player) }

      callback(null)
    })
  }

  private BroadcastState (): void {
    this.lobby?.Broadcast(ev.EventType.GAME_STATE, {
      gameBoard: this.gameBoard,
      turnPlayer: this.currentTurnPlayer
    })
  }

  private dropChip (column: number, player: Player): void {
    for (let r = this.ROWS - 1; r >= 0; r--) {
      if (this.gameBoard[r][column] === '') {
        this.gameBoard[r][column] = player.id
        return
      }
    }

    throw new Error('column is full')
  }

  private checkForWin (player: Player): boolean {
    // horizontalCheck
    for (let r = 0; r < this.ROWS; r++) {
      for (let c = 0; c < this.COLS - 3; c++) {
        if (this.gameBoard[r][c] === player.id &&
          this.gameBoard[r][c + 1] === player.id &&
          this.gameBoard[r][c + 2] === player.id &&
          this.gameBoard[r][c + 3] === player.id) {
          return true
        }
      }
    }

    // verticalCheck
    for (let r = 0; r < this.ROWS - 3; r++) {
      for (let c = 0; c < this.COLS; c++) {
        if (this.gameBoard[r][c] === player.id &&
          this.gameBoard[r + 1][c] === player.id &&
          this.gameBoard[r + 2][c] === player.id &&
          this.gameBoard[r + 3][c] === player.id) {
          return true
        }
      }
    }

    // ascendingDiagonalCheck
    for (let r = 3; r < this.ROWS; r++) {
      for (let c = 0; c < this.COLS - 3; c++) {
        if (this.gameBoard[r][c] === player.id &&
          this.gameBoard[r - 1][c + 1] === player.id &&
          this.gameBoard[r - 2][c + 2] === player.id &&
          this.gameBoard[r - 3][c + 3] === player.id) { return true }
      }
    }

    // descendingDiagonalCheck
    for (let r = 0; r < this.ROWS - 3; r++) {
      for (let c = 0; c < this.COLS - 3; c++) {
        if (this.gameBoard[r][c] === player.id &&
          this.gameBoard[r + 1][c + 1] === player.id &&
          this.gameBoard[r + 2][c + 2] === player.id &&
          this.gameBoard[r + 3][c + 3] === player.id) { return true }
      }
    }
    return false
  }
}
