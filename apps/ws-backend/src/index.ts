// import { WebSocketServer } from "ws";

// const wss = new WebSocketServer({ port: 8080 });

// wss.on("connection", (ws) => {
//   console.log("Client connected");

//   ws.on("message", (data) => {
//     console.log("Received:", data.toString());
//     ws.send("pong");
//   });
// });

// console.log("WebSocket server running on ws://localhost:8080");
// THE  ABOVE LOGIC IS THE CORE LOGIC OF WS BUT WE HAVE TO ALSO NOW GAURD OUR WS BACKEND LIKE HTTP WE WILL GET URL IN REQUEST , THE WAY TO DO IT IS THROUGH QUERY PARAMS AND EXTRACT TOKEN FROM URL
import { WebSocketServer } from "ws";
import { JWT_SECRET } from "@repo/backend-common/config";
import jwt, { Jwt, JwtPayload } from "jsonwebtoken";
const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (ws,request) => {
  const url = request.url;
  if(!url){
    return;
  }
  console.log("Client connected");
const queryParams = new URLSearchParams(url.split('?')[1]);
const token = queryParams.get('token') || "";
const decoded = jwt.verify(token,JWT_SECRET);
// this below if condition is because decoded is always in
// the form of object for typescript to not give errors we have to mark this condition separately because there was a red squeegly in user.id 
if (typeof decoded == "string"){
  ws.close();
  return;
}
if (!decoded || !decoded.userId) {
  ws.close();
  return;
}
  ws.on("message", (data) => {
    console.log("Received:", data.toString());
    ws.send("pong");
  });
});