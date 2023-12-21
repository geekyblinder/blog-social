import React,{useEffect, useState} from 'react';
import { Link} from 'react-router-dom';
import {useRecoilValue } from "recoil";
import {Button, Card,  Grid,  Typography, CardContent,CardActions} from "@mui/material";
import { userNameState } from "../store/selectors/userName"

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
    <Grid container spacing={4} style={{marginTop:"20px"}} >
    {blogs.map((blog,index) => (
    <Grid item xs={6} md={4} lg={3}>
    <Card sx={{ maxWidth: 345 }}>
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
       {blog.title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {blog.desc}
      </Typography>
    </CardContent>
    <CardActions>
    <Button 
         variant="text" 
         color="primary"
         >
         <Link to={`/blogs/${blog.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
             Read more
           </Link>
         </Button>
    </CardActions>
  </Card>
  </Grid>
    ))}
    </Grid>
  )
    }
    else{
        return (
            <Typography>Error: Not Authorised</Typography>
        )
    }
}

export default Blogs;
