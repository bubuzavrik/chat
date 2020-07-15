import bcrypt from 'bcrypt'

export default (server, socket, db) => {
  return (nickname, password) => {
    db.collection('users').findOne({ nickname }, (err, result) => {
      if (err || !bcrypt.compareSync(password, result.password)) {
        socket.io.emit('authentication', null)
        return
      }

      delete result.password

      socket.io.emit('authentication', result)
      server.broadcast.emit('connect user', { text: null, user: result, connect: true })
    })
  }
}
