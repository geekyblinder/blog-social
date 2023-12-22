import React, { useState } from 'react';
import {Button,TextField,Card,CardContent, Typography} from "@mui/material";
import {useNavigate} from 'react-router-dom';

function AiResponse() {
    const [topic,setTopic] = useState('');
    const [answer,setAnswer] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
  return (
<Card>
      <CardContent>
        <TextField
          label="Topic Ideas"
          variant="outlined"
          value= {topic}
          onChange={(e) => setTopic(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button 
        variant="contained" 
        color="primary" 
        onClick={async ()=>{
            setLoading(true);
            const response = await fetch("http://localhost:5000/askai",{
                method:"POST",
                body:JSON.stringify({topic}),
                headers:{
                    'Content-Type': 'application/json'
                }
            });
            setLoading(false);
            var data= await response.json();

            setAnswer(data.answer);
        }}>
          Magic!
        </Button>
      </CardContent>
      <Typography>{answer.split('*').map((element,index)=>(
            <Button 
            onClick={()=>{
                console.log(element);
                navigate('/blogs/upload');
            }}
            >{element}</Button>
      ))}</Typography>
    </Card>
  )
}

export default AiResponse;
