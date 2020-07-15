import express from 'express'
import { MongoClient } from 'mongodb'
import assert from 'assert'
import config from './config'
import logger from './tools/log'
import Socket from './tools/socket.io'

import authentication from './events/authentication'
import createAccount from './events/createAccount'
import messages from './events/messages'
import userDisconected from './events/userDisconected'
import readMessage from './events/readMessage'

const log = logger(module)
const app = express()

const socket = new Socket(app)
let db = null

MongoClient.connect(
  'mongodb://localhost:27017',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  (err, client) => {
    assert.equal(null, err)
    log.info('Connected successfully to server')

    db = client.db('chat')

    socket.io.listen(config.get('port'))
    log.info('Listening on ' + config.get('port'))
  }
)

socket.connection(server => {
  log.info('User connected')

  server.on('authentication', authentication(server, socket, db))
  server.on('create account', createAccount(server, socket, db))
  server.on('message', messages(server, socket))
  server.on('read message', readMessage(server))
  server.on('disconnected user', userDisconected(server))

  server.on('disconnect', () => {
    log.info('User disconnect')
  })
})
