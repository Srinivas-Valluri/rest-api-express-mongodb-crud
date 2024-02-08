import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import subscriberRouter from './routes/subscribers.js'
dotenv.config();

const app = express();

mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', (err)=>console.error(err))
db.once('open', (err)=>console.log("Connected to DB"))

app.use(express.json())

app.use('/subscribers', subscriberRouter)

app.listen(3000, ()=>{
    console.log("Server has started")
})

