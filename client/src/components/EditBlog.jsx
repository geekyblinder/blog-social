import React,{useState, useEffect} from 'react';
import { TextField, Button, Container, Grid } from '@mui/material';
import { userNameState } from "../store/selectors/userName";
import { useNavigate, useParams } from "react-router-dom";
import {useRecoilValue } from "recoil"; 

 function EditBlogForm (){
    const {id}=useParams();
    const userName = useRecoilValue(userNameState);
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [content, setContent] = useState('');
    const navigate=useNavigate();

    const populateEditBlog = async() => {
        const response= await fetch("http://localhost:5000/getblog",{
                  method: 'POST',
                  body: JSON.stringify({id:id}),
                   headers: {
                'Content-Type': 'application/json',
                  }})
                  let data=await response.json();
                  setTitle(data.title);
                  setDesc(data.desc);
                  setContent(data.content.replace(/<br\s*\/?>/gi,'\r\n'));
      };
      useEffect(() => {
        populateEditBlog();
      }, []);  

  if(userName){
  return (

    <Container maxWidth="md" style={{marginTop:"20px"}}>
      <form>
        <div>
          <Grid container spacing={3}>
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
              onClick={
                 ()=>{
                fetch("http://localhost:5000/edit",{
                    method:"POST",
                    body: JSON.stringify({id:id,title:title,desc:desc,content:content.replace(/(?:\r\n|\r|\n)/g, '<br>')}),
                    headers:{
                        'Content-Type': 'application/json',
                    },
                });
                navigate(`/blogs/${id}`);
              }}
              >
                Save Changes
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

export default EditBlogForm;
