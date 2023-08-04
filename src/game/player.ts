import type * as socketio from 'socket.io'

export default class Player {
  socket: socketio.Socket

  constructor (socket: socketio.Socket) {
    this.socket = socket
  }

  get id (): string { return this.socket.id }
}
