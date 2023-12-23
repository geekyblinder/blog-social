import React,{useState} from 'react';
import { TextField, Button, Container, Grid } from '@mui/material';
import { userNameState } from "../store/selectors/userName";
import { useNavigate } from "react-router-dom";
import {useRecoilValue } from "recoil"; 

 function BlogForm (){
  const userName = useRecoilValue(userNameState);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [content, setContent] = useState('');
  const navigate=useNavigate();
  if(userName){
  return (

    <Container maxWidth="md" style={{marginTop:"20px"}}>
      <form>
        <div>
          <Grid container spacing={3}>
          <Grid item xs={12}>
              <TextField
                fullWidth
                label="Blog Image Url"
                variant="outlined"
                value={imgUrl} 
                onChange={(e) => setImgUrl(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Blog Title"
                variant="outlined"
                value={title} 
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Blog Description"
                variant="outlined"
                value={desc} 
                onChange={(e) => setDesc(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Blog Content"
                variant="outlined"
                multiline
                rows={6}
                value={content} 
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary"
              onClick={()=>{
                fetch('http://localhost:5000/upload',{
                method:"POST",
                headers: {
                            'Content-Type': 'application/json',
                        },
            body: JSON.stringify({title:title,description:desc,content:content.replace(/(?:\r\n|\r|\n)/g, '<br>'),username:userName,imgUrl:imgUrl })}
                )
              alert('Blog Added Succesfully!')
              navigate('/blogs');
              }
             
              }
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </div>
      </form>
    </Container>);
  } else{
    return (<div>
      Not Authorised!
    </div>);
  }
};

export default BlogForm;
