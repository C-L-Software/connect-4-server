/**
 * This file defines the basic archetypes of games in the website e.g.
 * - Connect4
 * - TicTacToe
 * - etc.
 */

export class GameType {
    gameName: string
    minPlayers: number
    maxPlayers: number

    constructor(gameName: string, minPlayers: number, maxPlayers: number) {
        this.gameName = gameName
        this.minPlayers = minPlayers
        this.maxPlayers = maxPlayers
    }
}

export class Connect4 extends GameType {
    constructor() {
        super('Connect4', 2, 2)
    }
}
