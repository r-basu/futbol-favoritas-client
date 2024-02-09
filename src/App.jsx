import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from "react-router-dom";
import API from "./utils/API";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import AuthForm from "./pages/AuthForm";
import ClubPage from "./pages/ClubPage";
import NavBar from "./components/NavBar.jsx";
import logo from "./assets/logo.png";

function App() {
  const [token, setToken] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(0);

  useEffect(() => {
    const storedToken = localStorage.getItem("id_token");
    if (storedToken) {
      setToken(storedToken);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogin = async (loginObj) => {
    try {
      const loginData = await API.login(loginObj);
      setToken(loginData.token);
      localStorage.setItem("id_token", loginData.token);
      setIsLoggedIn(true);
      setUserId(loginData.user.id);
      return Promise.resolve();
    } catch (err) {
      console.log("Login Error", err);
      return Promise.reject(err);
    }
  };

  const handleSignup = async (signupObj) => {
    try {
      const loginData = await API.signup(signupObj);
      setToken(loginData.token);
      localStorage.setItem("id_token", loginData.token);
      setIsLoggedIn(true);
      setUserId(loginData.user.id);
      return Promise.resolve();
    } catch (err) {
      console.log("Login Error", err);
      return Promise.reject(err);
    }
  };

  const handleLogout = () => {
    const jwtToken = localStorage.getItem("id_token");
    API.logout(jwtToken)
      .then(() => {
        localStorage.removeItem("id_token");
        setToken("");
        setIsLoggedIn(false);
        setUserId(0);
        return <Navigate to="/login" />;
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  return (
    <>
      <Router>
        <NavBar
          isLoggedIn={isLoggedIn}
          handleLogout={handleLogout}
          logo={logo}
        />
        <Routes>
          <Route
            path="/"
            element={isLoggedIn ? <Home /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/clubs/:clubId/:competitionId"
            element={
              isLoggedIn ? <ClubPage /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/login"
            element={<AuthForm type="login" handleSubmit={handleLogin} />}
          />
          <Route
            path="/signup"
            element={<AuthForm type="signup" handleSubmit={handleSignup} />}
          />
          <Route path="*" element={<Navigate to="login" replace />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
