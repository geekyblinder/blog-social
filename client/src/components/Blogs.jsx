import React from 'react';
import blogs from '../assets/blogs';
import { useNavigate, Link} from 'react-router-dom';
import {useRecoilValue } from "recoil";
import {Button, Card,  Grid,  Typography, CardContent,CardActions} from "@mui/material";
import { userNameState } from "../store/selectors/userName"

function Blogs() {
    const userName = useRecoilValue(userNameState);
    if(userName){
  return (
    <div style={{ marginTop:100,marginBottom:20,display:'flex', justifyContent:"center"}}>
    {blogs.map((blog) => (
        <Grid xs={12} sm={6} md={6} lg={4} >
        <Card>
      <CardContent>
        <h2>{blog.title}</h2>
        <p>{blog.description}</p>
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
    </div>
  )
    }
    else{
        return (
            <Typography>Error: Not Authorised</Typography>
        )
    }
}

export default Blogs
