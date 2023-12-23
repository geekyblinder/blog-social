import React, { useState } from 'react';
import { IconButton, Dialog, DialogContent, Typography,Button } from '@mui/material';
import AiResponse from './aiResponse';

const ChatInterface = () => {
  const [isOpen, setIsOpen] = useState(false);

  const chatIconStyle = {
    position: 'fixed',
    boxShadow: "0px 0px 10px 2px rgba(0, 0, 0, 0.3)",
    backgroundColor:"black",
    padding:20,
    color:"white",
    bottom: '40px',
    right: '40px',
    zIndex: '1000',
  };

  const closeButtonStyle = {
    position: 'absolute',
    top: '8px',
    right: '8px',
    color: 'red',
  };

  const chatWindowStyle = {
    position: 'fixed',
    bottom: '80px',
    right: '40px',
    width: '300px',
    height: '400px',
    overflow: 'auto',
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <IconButton style={chatIconStyle} onClick={toggleChat}>
     <Typography> AI generator </Typography>
      </IconButton>
      <Dialog open={isOpen} onClose={toggleChat} PaperProps={{ style: chatWindowStyle }}>
        <DialogContent>
        <Button style={closeButtonStyle} onClick={toggleChat}></Button>
        <Typography>Blog Ideas Generator</Typography>
          <AiResponse />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ChatInterface;
