import './App.css';
import {useState,useEffect} from "react";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Navbar from './components/Navbar';
import SignIn from './components/Signin';
import SignUp from './components/Signup';
import {RecoilRoot, useSetRecoilState} from 'recoil';
import { userState } from "./store/atoms/user.js";
import Blogs from './components/Blogs.jsx';
import BlogPage from './components/BlogPage.jsx';

function App() {
  return (
    <RecoilRoot>
<Router>
<Navbar />
<InitUser />
<Routes>
  <Route path="/" element={<SignUp />} />
  <Route path="/blogs" element={<Blogs />} />
  <Route path="/signin" element={<SignIn />} />
  <Route path="/blogs/:id" element={<BlogPage />} />
</Routes>
</Router>
</RecoilRoot>
    
  );
}

function InitUser() {
    const setUser = useSetRecoilState(userState);
    const init = async() => {
        try {
            const response = await fetch("http://localhost:5000/signup", {
                method:"GET",
                headers: {
                    'Content-Type': 'application/json',
                      },
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            })

            if (response.data.username) {
                setUser({
                    userName: response.data.username
                })
            } else {
                setUser({
                    userName: null
                })
            }
        } catch (e) {

            setUser({
                userName: null
            })
        }
    };

    useEffect(() => {
        init();
    }, []);

    return <></>
}


export default App;
