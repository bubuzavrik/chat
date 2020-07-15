import uniqid from 'uniqid'

export default (server, socket) => {
  return (text, user) => {
    socket.io.emit('message', { text, user, id: uniqid() })
  }
}
