import React from 'react';
import {AppBar,Toolbar,Button} from '@mui/material';
import {Link,useNavigate} from "react-router-dom";
import {userState} from "../store/atoms/user.js";
import { useSetRecoilState,useRecoilValue } from "recoil";
import { userNameState } from "../store/selectors/userName"

function Appbar (){
    const userName = useRecoilValue(userNameState);
    const setUser = useSetRecoilState(userState);
    const navigate= useNavigate();
    if(userName){
  return (
    <AppBar component="nav" position="sticky" style={{ backgroundColor: 'black',marginTop:0 }}>
      <Toolbar >
        <div style={{ flexGrow: 1, textAlign: 'left' }}>
        <Button 
            style={{textDecoration:"none"}} 
            onClick={()=>{
                navigate('/blogs')
            }}>Blog it Out</Button>
        </div>
             <Button
             style={{color:"green"}}
             >{userName}</Button>
             <Button
             onClick={()=>{
                navigate('/blogs/upload');
             }}
             >Create a Blog!</Button>
             <Button
             style={{color:"red"}}
             onClick={()=>{
                localStorage.setItem("token", null);
                navigate('/signin');
                            setUser({
                                userName: null
                            })
             }}
             >Logout</Button>
      </Toolbar>
    </AppBar>
  )
    } else {
        return(
        <AppBar position="static" style={{ backgroundColor: 'black',marginTop:0 }}>
      <Toolbar>
        <div style={{ flexGrow: 1, textAlign: 'left' }}>
        <Button 
            style={{textDecoration:"none"}}>
            Blog it Out</Button>
        </div>
          <Button color="inherit">
          <Link to="/" 
          style={{textDecoration:"none",color:"white"}}>
          Sign Up</Link>
          </Button>
          <Button color="inherit">
          <Link to="/signin" 
          style={{textDecoration:"none",color:"white"}} >
          Sign In</Link>
          </Button>
      </Toolbar>
    </AppBar>
   ) }
};

export default Appbar;