import https from "https"
import fs from "fs"
import express from "express"
import cors from "cors"
import dotenv from "dotenv";
import mongoose from "mongoose"


import { userRouter } from "./routes/users.js"
import { postsRouter } from "./routes/posts.js"

dotenv.config();

const app = express();

const hostname = "127.0.0.1";
const port = 8080
const message = `The server is running at https://${hostname}:${port}`

mongoose.connect(`mongodb+srv://girik21:${process.env.MONGO_AUTH}@landlords.l4y7vbn.mongodb.net/landlords?retryWrites=true&w=majority`)

const db = mongoose.connection;

db.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});

db.once('open', () => {
    console.log('MongoDB connection successful');
});

const httpsOptions = {
    key: fs.readFileSync('certifications/key.pem'),
    cert: fs.readFileSync('certifications/cert.pem')
}

const server = https.createServer(httpsOptions, app);

app.use(express.json());
app.use(cors());
app.use("/auth", userRouter);
app.use("/posts", postsRouter);

app.get("/", async (req, res) => {
    res.send("Server is running here")
});

server.listen(port, () => {
    console.log(message)
})
