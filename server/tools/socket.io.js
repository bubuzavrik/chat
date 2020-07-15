import http from 'http'
import socketio from 'socket.io'

export default class Socket {
  constructor (httpServer) {
    this.socket = socketio(http.Server(httpServer))
  }
  get io () {
    return this.socket
  }
  connection = callBack => {
    this.socket.on('connection', callBack)
  }
}
