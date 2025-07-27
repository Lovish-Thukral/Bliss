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


const server = express();

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = createServer(server)

const io = new Server(app, {
    cors: {
        origin: "http://localhost:5173",
        credentials: true
    }
})

io.on("connection", (socket) => {
    console.log("User is Connected...", socket.id)
    // console.log("socket : ",socket)

    socket.on("message", (message) => {
        // console.log("Message : ",message, socket.id)

        // socket.emit("received","Message received")

        // socket.broadcast.emit("message",message)
        io.emit("message", message)

        io.to('').emit()
    })

    // socket.on

    socket.to()



    socket.on('disconnect', () => {
        console.log("User Disconnected...", socket.id)
    })
})


server.use(cookieParser());
server.use(express.json());
server.use(express.urlencoded({ extended: true }))
server.use("/posts", express.static(path.resolve(__dirname, "uploadedPosts")))



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
