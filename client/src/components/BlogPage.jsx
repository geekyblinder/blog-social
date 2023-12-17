import React from 'react';
import { useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import blogs from '../assets/blogs';
import { userNameState } from "../store/selectors/userName"
import {useRecoilValue } from "recoil"; 


function BlogPage() {
const userName = useRecoilValue(userNameState);
  const { id } = useParams();
  const blogPost = blogs.find((blog) => blog.id === parseInt(id));

  if (!blogPost || !userName) {
    return <div>Blog post not found!</div>;
  }

  const { title, description, content } = blogPost;

  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          {title}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          {description}
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
