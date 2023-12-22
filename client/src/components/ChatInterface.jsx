import React, { useState } from 'react';
import { IconButton, Dialog, DialogContent, Typography,Button } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import AiResponse from './aiResponse';

const ChatInterface = () => {
  const [isOpen, setIsOpen] = useState(false);

  const chatIconStyle = {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
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
        <ChatIcon />
      </IconButton>
      <Dialog open={isOpen} onClose={toggleChat} PaperProps={{ style: chatWindowStyle }}>
        <DialogContent>
        <Button style={closeButtonStyle} onClick={toggleChat}>close</Button>
        <Typography>Blog Ideas Generator</Typography>
          <AiResponse />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ChatInterface;
