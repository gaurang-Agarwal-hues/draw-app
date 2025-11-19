import express from "express";
const app = express();
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config";
import { middelware } from "./middleware";
app.post("/signup",(req,res) => {

})
app.post("/signup",(req,res) => {
const userId=1;
const token = jwt.sign({
  userId  
},JWT_SECRET);
res.json({
    token
})
})
app.post("/rooms",middelware,(req,res) => {
res.json({
  
})
})
app.listen(3000);