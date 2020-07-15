export default server => {
  return messageId => {
    server.broadcast.emit('read message', messageId)
  }
}
