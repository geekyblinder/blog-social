import React,{useEffect} from 'react';
import { useParams } from 'react-router-dom';
import {Button} from "@mui/material"
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { userNameState } from "../store/selectors/userName"
import {useRecoilValue } from "recoil"; 
import DeleteIcon from '@mui/icons-material/Delete';

let blogPost;

function BlogPage() {
const userName = useRecoilValue(userNameState);
  const { id } = useParams();
  const init = async() => {
    const response= await fetch("http://localhost:5000/getblog",{
              method: 'POST',
              body:
                JSON.stringify({ id})
              ,
               headers: {
            'Content-Type': 'application/json',
              }})
              let data=await response.json();
              blogPost=data;
  };
  useEffect(() => {
    init();
  }, []);


  if (!blogPost || !userName) {
    return <div>Blog post not found!</div>;
  }

 var { title, desc, content,author } = blogPost;
  if (!author)
  author="Anonymous";



  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          {title}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          {desc} -by {author}
          <br></br>
          {(author===userName)?(<><Button
    variant="contained"
    color="error" 
    startIcon={<DeleteIcon />} 
      >
    Delete
  </Button>&nbsp;&nbsp;&nbsp;
  <Button variant="contained" style={{ backgroundColor: 'yellow', color: 'black' }}>
    Edit
  </Button></>):(<></>)}
  
        </Typography>
        <Divider />
        <Typography variant="body1" paragraph>
          {content}
        </Typography>
      </Box>
    </Container>
  );
}




export default BlogPage;
