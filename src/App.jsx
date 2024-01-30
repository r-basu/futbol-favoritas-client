import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import API from "./utils/API";
import { useState } from "react";
import Home from "./pages/Home";
import AuthForm from "./pages/AuthForm";
import ClubPage from "./pages/ClubPage";
import NavBar from "./components/NavBar.jsx";

function App() {
  const [token, setToken] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(0);

  const handleLogin = (loginObj) => {
    API.login(loginObj)
      .then((loginData) => {
        setToken(loginData.token);
        console.log(loginData.token);
        console.log("token from app.jsx, saved to localstorage");
        localStorage.setItem("id_token", loginData.token);
        setIsLoggedIn(true);
        setUserId(loginData.user.id);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const handleSignup = (signupObj) => {
    API.signup(signupObj)
      .then((loginData) => {
        setToken(loginData.token);
        localStorage.setItem("id_token", loginData.token);
        setIsLoggedIn(true);
        setUserId(loginData.user.id);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const handleLogout = () => {

    API.logout()
      .then(() => {
        localStorage.removeItem("id_token");
        setToken("");
        setIsLoggedIn(false);
        setUserId(0);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  return (
    <>
      <Router>
        <NavBar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/clubs/:id" 
          element={<ClubPage />} />
          <Route
            path="/login"
            element={<AuthForm type="login" handleSubmit={handleLogin} />}
          />
          <Route
            path="/signup"
            element={<AuthForm type="signup" handleSubmit={handleSignup} />}
          />
          <Route path="/logout" element={<handleLogout/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
