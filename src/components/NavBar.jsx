import { Link, useNavigate } from "react-router-dom";


export default function NavBar({ isLoggedIn, handleLogout }) {
//   const navigate = useNavigate();
  return (
    <div className="NavBar">
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      {isLoggedIn ? (
        <Link to="/" onClick={handleLogout}>
          Logout
        </Link>
      ) : (
        <Link to="/signup">Signup</Link>
      )}
    </div>
  );
}
