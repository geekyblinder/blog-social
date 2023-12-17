const express = require('express');
const jwt =require ('jsonwebtoken');
const cors=require('cors');
const mongoose = require('mongoose');
const bcrypt= require("bcrypt");
const {z} = require("zod");
require('dotenv').config();


const SECRET = process.env.SECRET_KEY;
const PASSWORD=process.env.PASSWORD;

const authenticateJwt = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(' ')[1];
      jwt.verify(token, SECRET, (err, user) => {
        if (err) {
          return res.sendStatus(403);
        }
        req.user = user;
        next();
      });
    } else {
      res.sendStatus(401);
    }
  };

let authenInputProps=z.object({
    username:z.string().min(1),
    password:z.string().min(1)
})

const app=express();
app.use(cors());
app.use(express.json());

//Mongodb Schema

const userSchema = new mongoose.Schema({
    username: String,
    password: String
  });

  const User = mongoose.model('details', userSchema);
  const connectUrl=`mongodb+srv://mishrakartikey007:${encodeURIComponent(PASSWORD)}@clusterpk.n4nfhaf.mongodb.net/`;
  mongoose.connect(connectUrl, { useNewUrlParser: true, useUnifiedTopology: true, dbName: "courses" });


app.get('/userCheck',authenticateJwt,async (req,res)=>{
    const user_ = await User.findOne({ username: req.user.username });
    if (!user_) {
      res.status(403).json({msg: "User doesnt exist"})
      return
    }
    res.json({
        username: user_.username
    })
});

app.post('/signup',(req,res)=>{
    const parsedInput=authenInputProps.safeParse(req.body);
    if(!parsedInput.success){
        return res.status(411).json({
            error:parsedInput.error
        })
    }
    var username=parsedInput.data.username;
    var password=parsedInput.data.password;
    User.findOne({username}).then(async (user)=>{
        if(user){
            res.status(403).send({
                error:"Username already exists!"
            });
        } else{
            const obj = { username: username, password: password };
            const newUser = new User(obj);
            newUser.save();
            const token = jwt.sign({ username}, SECRET, { expiresIn: '1h' });
            console.log(token);
            res.json({ message: 'Created successfully', token });
        }
    });
});

app.post('/login',async (req,res)=>{
    var {username,password}=req.body;
    User.findOne({username,password}).then((user)=>{
        if(user){
            const token = jwt.sign({ username}, SECRET, { expiresIn: '1h' });
            res.json({ message: 'Logged in successfully', token });
        } else{
            res.status(403).send({
                error:"Wrong username or password entered! "
            });
        }
    });
});



app.listen('5000',()=>{
    console.log('server running at port 5000');
});