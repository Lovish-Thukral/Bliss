import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import userRouter from './routes/user.router.js';
import connectDB from './config/dbconfig.js';
import postRouter from './routes/post.router.js';
import path from 'path'
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import connectMedia from './config/mediaServerConfig.js';
import Chatrouter from './routes/chat.route.js';
import { Server } from 'socket.io';
import { createServer } from 'node:http';
import { Socket } from 'node:dgram';


const server = express();

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = createServer(server)

const io = new Server(app, {
    cors: {
        origin: '*',
        methods: ["GET", "POST"]
    }
})

const onlineuser = new Map();

io.on('connection', (Socket) => {
    Socket.on("register", (userId) => {
        onlineuser.set(userId, Socket.id);
    })

    Socket.on('privatemsg', ({ from, toString, text }) => {
        const target = onlineuser.get(toString);
        if (target) {
            io.to(target).emit('privatemsg', { from, text })
        }
    })

    Socket.on('disconnect', () => {
        for (const [userId, sockId] of onlineuser.entries()) {
            if (sockId === Socket.id) {
                onlineuser.delete(userId);
                break;
            }
        }
    })
})

server.use(cookieParser());
server.use(express.json());
server.use(express.urlencoded({ extended: true }))



server.get('/', (req, res) => {
    res.send('Hello, World!');
});
server.use('/api/user', userRouter);
server.use("/api/post", postRouter);
server.use("/api/chat", Chatrouter)

app.listen(process.env.PORT || 8000, () => {
    console.log(`Server is running http://localhost:${process.env.PORT}`);
    connectDB();
    connectMedia();
});
