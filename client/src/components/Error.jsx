import { Typography } from '@mui/material'
import React from 'react';
import { useParams } from 'react-router-dom';

function Error() {
    const {id}=useParams();
    let error_msg;
    if(id === '1'){
        error_msg="Username already exists try using another one.";
    } else if(id === '2') {
        error_msg="Wrong Username or Password entered!";
    } else{
        error_msg="Unexpected Error Occurred!";
    }
  return (
    <div>
      <Typography>{error_msg}</Typography>
    </div>
  )
}

export default Error
