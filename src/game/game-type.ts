/**
 * This file defines the basic archetypes of games in the website e.g.
 * - Connect4
 * - TicTacToe
 * - etc.
 */

export class GameType {
  minPlayers: number
  maxPlayers: number

  constructor (minPlayers: number, maxPlayers: number) {
    this.minPlayers = minPlayers
    this.maxPlayers = maxPlayers
  }
}

export class Connect4 extends GameType {
  constructor () {
    super(2, 2)
  }
}
