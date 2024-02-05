import { Link } from "react-router-dom";


export default function NavBar({ isLoggedIn, handleLogout, logo }) {
  return (
    <div className="flex justify-end bg-gray-500 p-4">
      <img src={logo} alt="Logo" className="h-20" />
      <div className="ml-auto flex items-center">
        <Link to="/" className="text-lg mx-4 font-medium">Home</Link>
        <Link to="/login" className="text-lg mx-4 font-medium">Login</Link>
        {isLoggedIn ? (
          <Link to="/" onClick={handleLogout} className="text-lg mx-4 font-medium">
            Logout
          </Link>
        ) : (
          <Link to="/signup" className="text-lg mx-4 font-medium">
            Signup
          </Link>
        )}
      </div>
    </div>
  );
}
