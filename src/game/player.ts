import type * as socketio from 'socket.io'

export default class Player {
  constructor (
    public socket: socketio.Socket
  ) { }

  get id (): string { return this.socket.id }
}
