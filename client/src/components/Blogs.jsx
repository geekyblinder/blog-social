import React,{useEffect, useState} from 'react';
import { Link} from 'react-router-dom';
import {useRecoilValue } from "recoil";
import {Button, Card,  Grid,  Typography, CardContent,CardActions, Box,CardMedia, Toolbar} from "@mui/material";
import { userNameState } from "../store/selectors/userName"
import ChatInterface from './ChatInterface';

let blogs=[];

function Blogs() {
  const [refresh,setRefresh]= useState(true);
    const userName = useRecoilValue(userNameState);
    const populateBlogs = async() => {
      const response= await fetch("http://localhost:5000/blogs",{
                method: 'POST',
                 headers: {
              'Content-Type': 'application/json',
                }})
                let data=await response.json();
                blogs=data.allBlogs;
                setRefresh(!refresh);
    };
    useEffect(() => {
      populateBlogs();
    }, []);
    if(userName){
  return (
    <>
    <Box style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1604933762023-7213af7ff7a7?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
    height: "500px",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    fontSize: "4rem",
    }}>
     <Box><i>Blog it Out!</i></Box>
    </Box>
    <Typography variant="h4" style={{fontWeight: 800, marginTop:10}}>
          User Blogs
        </Typography>
    <Grid container spacing={4} style={{marginTop:"20px", justifyContent:"center"}} >
    {blogs.map((blog,index) => (
    <Grid item xs={6} md={4} lg={3} style={{marginLeft:"20px"}}>
    <Card sx={{ maxWidth: 345 }}>
    <CardMedia style={{height:240}}
                  image={blog.imgUrl}
                />
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
       {blog.title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {blog.desc} 
        <Button 
         variant="text" 
         color="primary"
         >
         <Link to={`/blogs/${blog.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
             Read more..
           </Link>
         </Button>
      </Typography>
    </CardContent>
    <CardActions>
    <Box >
                  <Box ml={2}>
                    <Typography variant="subtitle2" component="p">
                      {blog.author}
                    </Typography>
                    <Typography variant="subtitle2" color="textSecondary" component="p">
                      May 14, 2020
                    </Typography>
                  </Box>
                </Box>
    </CardActions>
  </Card>
  </Grid>
    ))}
    <ChatInterface />
    </Grid>
    </>
  )
    }
    else{
        return (
            <Typography>Error: Not Authorised</Typography>
        )
    }
}

export default Blogs;
