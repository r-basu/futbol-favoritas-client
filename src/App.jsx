import {Route,BrowserRouter as Router, Routes} from "react-router-dom";
import ClubPage from "./pages/ClubPage";
// import API from "./utils/API";
// import { useState } from "react";
import DropdownForm from "./components/DropdownForm";

function App() {
  const [token, setToken] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userId, setUserId] = useState(0);
  const handleLogin = loginObj=>{
    API.login(loginObj).then(loginData=>{
      setToken(loginData.token);
      setIsLoggedIn(true);
      setUserId(loginData.user.id)
    }).catch(err=>{
      console.log('err', err)
    })
  }
  const handleSignup = signupObj=>{
    API.signup(signupObj).then(loginData=>{
      setToken(loginData.token);
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
{/* <NavBar/> */}
  <Routes>
    <Route path="/" element={<DropdownForm/>}/>
    <Route path="/account" element={<Account/>}/>
    <Route path="/clubs" element={<ClubPage/>}/>
    <Route path="/competitions" element={<CompetitionPageLogin/>}/>
    <Route path="/login" element={<AuthForm type="login" handleSubmit={handleLogin}/>}/>
    <Route path="/signup" element={<AuthForm type="signup" handleSubmit={handleSignup}/>}/>
    <Route path="/players" element={<PlayerPage/>}/>
  </Routes>
</Router>
</>
  );
}

export default App;
