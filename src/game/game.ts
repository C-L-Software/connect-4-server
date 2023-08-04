export default abstract class Game {
  gameName: string
  minPlayers: number
  maxPlayers: number

  constructor (gameName: string, minPlayers: number, maxPlayers: number) {
    this.gameName = gameName
    this.minPlayers = minPlayers
    this.maxPlayers = maxPlayers
  }

  public abstract Start (): void
}
