import * as express from "express";
import * as http from "http";
import * as socketio from "socket.io";
import * as path from "path";

const app = express.default();

app.get("/", (_req, res) => {
  res.send({ uptime: process.uptime() });
});

app.get('/test', (_req, res) => {
    res.sendFile(path.resolve("./src/test_page/index.html"));
});

const server = http.createServer(app);
const io = new socketio.Server(server);

io.on("connection", (...params) => {
    console.log(params);
});

io.on("message", (...params) => {
    console.log(params);
});

server.listen(3000, () => {
  console.log("Running at localhost:3000");
});