export default server => {
  return user => {
    server.broadcast.emit('connect user', { text: null, user, connect: false })
  }
}
