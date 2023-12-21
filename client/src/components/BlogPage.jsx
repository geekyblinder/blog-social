import React,{useEffect} from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import {Button,Typography,Container,Box,Divider} from "@mui/material";
import { userNameState } from "../store/selectors/userName"
import {useRecoilValue } from "recoil"; 
import DeleteIcon from '@mui/icons-material/Delete';

let blogPost;

function BlogPage() {
const userName = useRecoilValue(userNameState);
const navigate = useNavigate();
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
    onClick={async()=>{
      await fetch('http://localhost:5000/deleteblog',{
        method:"DELETE",
        headers: {
                    'Content-Type': 'application/json',
                },
        body: JSON.stringify({id:id})
      });

      navigate('/blogs');
    }} 
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
