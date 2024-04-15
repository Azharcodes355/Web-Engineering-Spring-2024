const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const app = express();
app.use(bodyParser.json())

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  contact: Number,
});

const User = mongoose.model('User', UserSchema);

async function insertData(username,email,password,contact){
  
    const result= await User.create({
      name: username,
      email: email,
      password: password,
      contact: contact,
    })
    return result;
}

app.post("/signup",async (req,res) => {
  const username=req.body.username;
  const email = req.body.email;
  const password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync());
  const contact =  req.body.contact;
  const result =await insertData(username,email,password,contact);
  res.send(result);
})

app.post("/signin", async (req,res) => {
  // const {email,password} = req.body;
  const email = req.body.email;
  const password = req.body.password;
  const result = await User.findOne({
    email:email
  })
  if(result){
    const passwordMatch=bcrypt.compareSync(password, result.password)
    if(passwordMatch){
      return res.json({message: "You are logged in"})
    }else{
      return res.json({error: "You are not allowed"})
    }
  }else{
    return res.json({response: "User does not exists"})
  }
  
})
let hashedPassword="";
let doesPasswordMatch=null;

app.post("/password", (req,res) => {
  hashedPassword = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync());
  res.json({hashedPassword: hashedPassword});
})
app.post("/check-password",(req,res) => {
  doesPasswordMatch = bcrypt.compareSync(req.body.password, hashedPassword);
  res.json({passwordMatch: doesPasswordMatch});
})

async function connectDB() {
  await mongoose.connect('mongodb://127.0.0.1:27017/webengtest');
  console.log("Mongodb connected")
}

app.listen(8080, async() => {
  connectDB();
  console.log("Server is running");
});