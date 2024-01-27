import {Route,BrowserRouter as Router, Routes} from "react-router-dom";
import API from "./utils/API";
import { useState } from "react";
import Home from "./pages/Home";
import AuthForm from "./pages/AuthForm"
import ClubPage from "./pages/ClubPage"
import NavBar from "./components/NavBar.jsx";

function App() {
  const [token, setToken] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userId, setUserId] = useState(0);
  const handleLogin = loginObj=>{
    API.login(loginObj).then(loginData=>{
      setToken(loginData.token);
      console.log(loginData.token)
      localStorage.setItem('id_token', loginData.token)
      console.log("token from app.jsx")
      setIsLoggedIn(true);
      setUserId(loginData.user.id)
    }).catch(err=>{
      console.log('err', err)
    })
  }
  const handleSignup = signupObj=>{
    API.signup(signupObj).then(loginData=>{
      setToken(loginData.token);
      localStorage.setItem('id_token', loginData.token)
      setIsLoggedIn(true);
      setUserId(loginData.user.id)
    }).catch(err=>{
      console.log('err', err)
    })
  }

  return (
    // <div>
    //   <h1> hello</h1>
    //   <DropdownForm />
    // {/* </div> */}

<>
{/* TODO: navbar */}
<Router>
<NavBar/>
  <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/clubs/:id" element={<ClubPage/>}/>
    <Route path="/login" element={<AuthForm type="login" handleSubmit={handleLogin}/>}/>
    <Route path="/signup" element={<AuthForm type="signup" handleSubmit={handleSignup}/>}/>
  </Routes>
</Router>
</>
  );
}

export default App;
