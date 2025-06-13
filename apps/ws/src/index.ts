
/**
 * the project has a lot of
 * concurrency issues along with 
 * in-memory datahold
 * 
 * run exactly 1 instance for now
 */



import express from 'express';
import { Server } from 'socket.io';
import config from './config/config';
import cors from 'cors';
import { createServer } from 'http'
import { SocketManager } from './manager/SocketManager';

const app = express();
const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        credentials: true
    }
});

app.use(
    cors({
        origin: "*",
        credentials: true
    })
);

const socket_manager = new SocketManager();

io.on("connection", (socket) => {
    console.log(`user connected - ${socket.id}`);
    socket.emit('welcome', 'welcome to server');
    socket_manager.handleMessageChannel(socket);
    socket.on('disconnect', () => socket_manager.handleDisconnect(socket)); 
});

app.get('/', (req, res) => {
    res.send({
        message: "server running"
    })
});

server.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`)
});

