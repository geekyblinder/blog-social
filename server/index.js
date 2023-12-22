const express = require('express');
const jwt =require ('jsonwebtoken');
const cors=require('cors');
const mongoose = require('mongoose');
const bcrypt= require("bcrypt");
const {z} = require("zod");
require('dotenv').config();
const {OpenAI}= require('openai');


const SECRET = process.env.SECRET_KEY;
const PASSWORD=process.env.PASSWORD;
const API_KEY = process.env.API;

const openai = new OpenAI({
    apiKey: API_KEY,
  });

async function gptResponse(topic) {
    const prompt = `
        tell me 5 ideas for a blog on the topic ${topic}. The response should contain the ideas separated by a asterik. 
    `;
  const response = await openai.completions.create({
    prompt: prompt,
    model: 'text-davinci-003',
    max_tokens: 2048,
	temperature: 1
  });
  var ans=response.choices[0].text;
  return (ans);
}

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

const blogSchema = new mongoose.Schema({
    title: String,
    desc: String,
    content: String,
    author:String
  });


const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    blogs:[blogSchema]
  });


  const User = mongoose.model('details', userSchema);
  const Blog = mongoose.model('blogdetails', blogSchema);
  const connectUrl=`mongodb+srv://mishrakartikey007:${encodeURIComponent(PASSWORD)}@clusterpk.n4nfhaf.mongodb.net/`;
  mongoose.connect(connectUrl, { useNewUrlParser: true, useUnifiedTopology: true, dbName: "courses" });


app.get('/userCheck',authenticateJwt,async (req,res)=>{
    const user_ = await User.findOne({ username: req.user.username });
    if (!user_) {
      res.status(403).json({msg: "User doesnt exist"})
      return;
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

app.post('/blogs',(req,res)=>{
    Blog.find({})
    .then((Blogs) => {
        const allBlogs = Blogs.map((blog) => ({
            id: blog._id.toString(),
            title: blog.title,
            desc:blog.desc,
            content:blog.content,
            author:blog.author
          }));
      res.send({allBlogs});
    })
    .catch((err) => { 
      res.send(err);
    });
})


app.post('/upload', (req,res)=>{
    var {title,description,content,username}=req.body;

    const obj = { title: title,
        desc: description,
        content: content,
        author:username  };

    const newBlog = new Blog(obj);
    newBlog.save();
    const updatedUser = User.findOneAndUpdate(
        { username: username },
        { $push: { blogs: newBlog } }, 
        { new: true }
      ).exec();

      if (updatedUser) {
        res.send('added!');
      } else {
        res.json({error:"an error occured!"})
      }
});

app.delete('/deleteblog',(req,res)=>{
    var blogId=req.body.id;
    Blog.findOneAndDelete({_id:blogId}).then((deletedDocument) => {
        if (deletedDocument) {
         res.send({messages:"Successfully deleted!"});
        } else {
          res.sendStatus(404);
        }
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(404);
      });
});



app.post('/getblog',(req,res)=>{
    var blogId=req.body.id;
    Blog.findById(blogId).then((resp)=>{
        res.send({
            author:resp.author,
            title:resp.title,
            desc:resp.desc,
            content:resp.content
        })
    }).catch((err)=>{
        res.status(404).send({error:"not found!"})
    })
});

app.post('/edit',(req,res)=>{
    const {id,title,desc,content}=req.body;
    const updateData = {
        title:title,
        desc:desc,
        content:content
      };
    Blog.findByIdAndUpdate(id,updateData,{new:true}).then((resp)=>{
        if(resp){
            res.send({message:"updated!"});
        } else {
            res.send({error:"cannot update right now"})
        }
    }).catch((err)=>{
        res.status(404).send({error:"not found!"})
    });
});

app.post('/askai',async (req,res)=>{
    var topic=req.body.topic;
    var ans = await gptResponse(topic);
    res.send({
        "answer":ans
        });
});


app.listen('5000',()=>{
    console.log('server running at port 5000');
});