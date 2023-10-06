import * as fs from 'fs'
import * as express from 'express'
import * as https from 'https'
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

const server = https.createServer({
  key: fs.readFileSync('/etc/letsencrypt/live/jlemon.org/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/jlemon.org/fullchain.pem')
}, app)
const io = new socketio.Server(server, {
  cors: {
    origin: 'https://jlemon.org',
    methods: ['GET', 'POST']
  }
})
const gameManager = new GameManager()

io.on('connection', (socket: socketio.Socket) => { gameManager.onConnection(socket) })

server.listen(4533, () => {
  console.log('Running at localhost:4533')
})
