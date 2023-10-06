import * as express from 'express'
import * as http from 'http'
import * as socketio from 'socket.io'
import * as path from 'path'
import GameManager from './game/game-manager'

const app = express.default()

app.get('/', (_req, res) => {
  res.send({ uptime: process.uptime() })
})

app.get('/test', (_req, res) => {
  res.sendFile(path.resolve('./src/test_page/index.html'))
})

const server = http.createServer(app)
const io = new socketio.Server(server, {
  cors: {
    origin: 'http://jlemon.org:4533',
    methods: ['GET', 'POST']
  }
})
const gameManager = new GameManager()

io.on('connection', (socket: socketio.Socket) => { gameManager.onConnection(socket) })

server.listen(4533, () => {
  console.log('Running at localhost:4533')
})
