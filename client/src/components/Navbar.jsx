import { Button, Typography } from "@mui/material";
import {Link,useNavigate} from "react-router-dom";
import {userState} from "../store/atoms/user.js";
import { useSetRecoilState,useRecoilValue } from "recoil";
import { userNameState } from "../store/selectors/userName"

function Navbar(){
    const userName = useRecoilValue(userNameState);
    const setUser = useSetRecoilState(userState);
    const navigate= useNavigate();
    if(userName){
        return (
            <div style={{display:'flex', justifyContent:"space-between",backgroundColor:"white",padding:4}}>
            <div><Typography variant="h6">Social Media App</Typography></div> 
             <div style={{display:'flex'}}><Typography>{userName}</Typography>
             <Button
             onClick={()=>{
                localStorage.setItem("token", null);
                navigate('/signin');
                            setUser({
                                userName: null
                            })
             }}
             >Logout</Button>
             </div>
             </div>
        )
    }
    else{
    return (
        <div style={{display:'flex', justifyContent:"space-between",backgroundColor:"white",padding:4}}>
       <div><Typography variant="h6">Social Media App</Typography></div> 
        <div style={{display:'flex'}}><Button><Link to="/" style={{textDecoration:"none",color:"black"}}>Sign Up</Link></Button>
        <Button
        ><Link to="/signin" style={{textDecoration:"none",color:"black"}} >Sign In</Link></Button>
        </div>
        </div>
    )
    }
}

export default Navbar;