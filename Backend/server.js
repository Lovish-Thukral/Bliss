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

const server = express();

const __dirname = dirname(fileURLToPath(import.meta.url));

dotenv.config();
server.use(cookieParser());
server.use(express.json());
server.use(express.urlencoded({ extended: true }))
server.use("/posts", express.static(path.resolve(__dirname, "uploadedPosts")))



server.get('/', (req, res) => {
    res.send('Hello, World!');
});

server.use('/api/user', userRouter);
server.use("/api/post", postRouter)

server.listen(process.env.PORT || 8000, () => {
    console.log(`Server is running http://localhost:${process.env.PORT}`);
    connectDB();
    connectMedia();

});
