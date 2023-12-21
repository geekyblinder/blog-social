import './App.css';
import {useEffect} from "react";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Navbar from './components/Navbar';
import SignIn from './components/Signin';
import SignUp from './components/Signup';
import {RecoilRoot, useSetRecoilState} from 'recoil';
import { userState } from "./store/atoms/user.js";
import Blogs from './components/Blogs.jsx';
import BlogPage from './components/BlogPage.jsx';
import BlogForm from './components/BlogForm.jsx';
import Error from './components/Error.jsx';
import EditBlogForm from './components/EditBlog.jsx';

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
  <Route path='/error/:id' element={<Error />} />
  <Route path="/blogs/upload" element={<BlogForm />} />
  <Route path="/blogs/:id" element={<BlogPage />} />
  <Route path='blogs/edit/:id' element={<EditBlogForm />} />
</Routes>
</Router>
</RecoilRoot>
    
  );
}

function InitUser() {
    const setUser = useSetRecoilState(userState);
    const init = async() => {
        try {
            const response = await fetch("http://localhost:5000/userCheck", {
                method:"GET",
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }

            })
            let data= await response.json();
            
            if (data.username) {
                setUser({
                    userName: data.username
                });
            } else {
                setUser({
                    userName: null
                });
            }
        } catch (e) {

            setUser({
                userName: null
            });
        }
    };

    useEffect(() => {
        init();
    }, []);

    return <></>
}


export default App;
