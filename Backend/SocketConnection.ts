import { Server } from "node:http";
import jwt from "jsonwebtoken"
import cookieParser from "cookie-parser";
const myMap = new Map()
export const connectSocket = (io:any)=>{

    // console.log("hello boy");
    io.use((socket:any,next:any)=>{
        cookieParser()(socket.request,socket.request.res,async(err)=>{
            const token = socket.request.cookies.token;
            if(!token)return next(new Error("Authentication Error"))
            const decode:any = await jwt.verify(token,process.env.SECRET_KEY as string)
            socket.userid = decode.userid
            const id = decode.userid
            myMap.set(id,socket.id)
            // console.log("userid is",id);
            // console.log(myMap.get(id));
            
            next()
        })
    })

    io.on("connection",(socket:any)=>{
        
        socket.on("chat-msg",(obj:any)=>{
            const text = obj.text
            const userId = obj.userid
            const socketId = myMap.get(userId)
            // console.log("i am the userid",userId);
            // console.log("i am the msg socket id",socketId);
            // console.log("sending msg",text);
            socket.to(socketId).emit("recieve",text);
        })
    })
}