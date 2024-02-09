import { Link } from "react-router-dom";

export default function NavBar({ isLoggedIn, handleLogout, logo }) {
  return (
    <div className="flex justify-between items-center bg-dark-green px-8 w-full">
      <div className="w-2/12">
      <a href="/">
       <img src={logo} alt="Logo" className="h-20" />
      </a>
    </div>  
      <div className="NavBar flex justify-center items-center w-8/12">
        <Link to="/" className="text-lg mx-4 text-white-green">Home</Link>
        <Link to="/login" className="text-lg mx-4 text-white-green">Login</Link>
        {isLoggedIn ? (
          <Link to="/" onClick={handleLogout} className="text-lg mx-4 text-white-green">
            Logout
          </Link>
        ) : (
          <Link to="/signup" className="text-lg mx-4 text-white-green">
            Signup
          </Link>
        )}
      </div>
      <div className="w-2/12">
      </div>
    </div>
  );
}
