import { Route, BrowserRouter as Router, Routes, useNavigate } from "react-router-dom";
import API from "./utils/API";
import { useState } from "react";
import Home from "./pages/Home";
import AuthForm from "./pages/AuthForm";
import ClubPage from "./pages/ClubPage";
import NavBar from "./components/NavBar.jsx";
import logo from "./assets/logo.png";

function App() {
  const [token, setToken] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(0);

  const handleLogin = (loginObj) => {
    API.login(loginObj)
      .then((loginData) => {
        setToken(loginData.token);
        console.log(loginData.token);
        localStorage.setItem("id_token", loginData.token);
        setIsLoggedIn(true);
        setUserId(loginData.user.id);
      })
      .catch((err) => {
        console.log("Login Error", err);
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
    // const navigate = useNavigate();
    const jwtToken = localStorage.getItem("id_token");
    API.logout(jwtToken)
      .then(() => {
        localStorage.removeItem("id_token");
        setToken("");
        setIsLoggedIn(false);
        setUserId(0);
        window.location.href = "/login"
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  return (
    <>
      <Router>
        <NavBar isLoggedIn={isLoggedIn} handleLogout={handleLogout}logo={logo} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/clubs/:clubId/:competitionId" element={<ClubPage />} />
          <Route
            path="/login"
            element={<AuthForm type="login" handleSubmit={handleLogin} />}
          />
          <Route
            path="/signup"
            element={<AuthForm type="signup" handleSubmit={handleSignup} />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
