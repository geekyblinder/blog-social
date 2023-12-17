import {React,useState} from "react";
import {userState} from "../store/atoms/user.js";
import { useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import {Card, TextField, Typography } from "@mui/material";


function SignIn(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const setUser = useSetRecoilState(userState);
    const navigate=useNavigate();
return ( 
    <div >
        <div style={{ marginTop:100,marginBottom:20,display:'flex', justifyContent:"center"}}>
            <Typography variant="h6">Welcome Back ! Login below!</Typography> 
        </div>
            <div style={{display:'flex', justifyContent:"center"}}>
            <Card variant="outlined" style={{width:400}} >
            <div style={{margin:20}}>
                <TextField fullWidth id="outlined-basic" label="Username" variant="outlined" value={username} onChange={(e) => setUsername(e.target.value)}/>
                <br /><br />
                <TextField fullWidth id="outlined-basic" type="password"  label="Password" variant="outlined" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <br /><br />
            <Button 
             onClick={async ()=>{
            const res=await fetch("http://localhost:5000/login",{
            method: 'POST',
             headers: {
          'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),}
            )
            let data = await res.json();
            localStorage.setItem("token", data.token);
            setUser({userName: username});
            navigate('/blogs');
        }}
            variant="contained" 
            color="success">
            Sign In
        </Button>
    </div>

    </Card>
    </div>


</div>)
}

export default SignIn;