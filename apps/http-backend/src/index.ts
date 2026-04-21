import express from "express";
const app = express();
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { middelware } from "./middleware";
import {CreateUserSchema,SigninSchema,CreateRoomSchema} from "@repo/common/types";
app.post("/signup",(req,res) => {
  //at every endpoint we are checking the correctness of recieved data by zod
const data = CreateUserSchema.safeParse(req.body);
if(!data.success){
  res.json({
    "message": "Incorrect Inputs"
  })
  return 
}
})
app.post("/signin",(req,res) => {
  const data = SigninSchema.safeParse(req.body);
if(!data.success){
  res.json({
    "message": "Incorrect Inputs"
  })
  return 
}
const userId=1;
const token = jwt.sign({
  userId  
},JWT_SECRET);
res.json({
    token
})
})
app.post("/rooms",middelware,(req,res) => {
  const data = CreateRoomSchema.safeParse(req.body);
if(!data.success){
  res.json({
    "message": "Incorrect Inputs"
  })
  return 
}
res.json({
  
})
})
app.listen(3000);