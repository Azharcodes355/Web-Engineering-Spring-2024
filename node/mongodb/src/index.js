const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json())

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  contact: Number,
});

const User = mongoose.model('User', UserSchema);

User.findBy

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
  const password = req.body.password;
  const contact =  req.body.contact;
  const result =await insertData(username,email,password,contact);
  res.send(result);
})

app.post("/signin", async (req,res) => {
  const {email,password} = req.body;
  const result = await User.findOne({
    email:email,
    password:password
  })
  if(result){
    res.send({response: result});
  }else{
    res.json({response: "Incorrect email and password"})
  }
})

// ASSIGNMENT
/*
Create a post route and name it delete
it will get a variable in body named account_email
you will have to delete the record that has the email
*/

async function connectDB() {
  await mongoose.connect('mongodb://127.0.0.1:27017/webengtest');
  console.log("Mongodb connected")
}

app.listen(8080, async() => {
  connectDB();
  console.log("Server is running");
});