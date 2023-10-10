import express from "express"
import http from "http"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import compression from "compression"
import cors from "cors"
import mongoose from "mongoose"

import router from "./router"
const app = express()

app.use(cors({
    credentials:true
}))

app.use(compression())
app.use(cookieParser())
app.use(bodyParser.json())

const server = http.createServer(app)

server.listen(3090, ()=>{
    console.log("Server is connected to PORT 3090");
})




 const MONGODB_URL = "mongodb+srv://chibuezeonyenze123:LTkv0Gda4xbcqxNX@cluster0.2ndnq0m.mongodb.net/"

 mongoose.Promise = Promise
 mongoose.connect(MONGODB_URL)
 mongoose.connection.on("error", (error:Error)=>{console.log(error)});
 

app.use("/", router())