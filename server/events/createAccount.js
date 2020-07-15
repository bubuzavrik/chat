import bcrypt from 'bcrypt'

export default (server, socket, db) => {
  return (nickname, firstname, lastname, password) => {
    db.collection('users').findOne({ nickname }, (err, checkResult) => {
      if (err) throw err
      if (!checkResult) {
        db.collection('users').insertOne({ nickname, firstname, lastname, password: bcrypt.hashSync(password, 10) }, (err, res) => {
          if (err) {
            socket.io.emit('create account', null)
            return
          }
          socket.io.emit('create account', res.ops[0])
          server.broadcast.emit('connect user', { text: null, user: res.ops[0], connect: true })
        })
      } else socket.io.emit('create account', null)
    })
  }
}
