import { Link } from "react-router-dom";

export default function NavBar({ isLoggedIn, handleLogout, logo }) {
  return (
    <div className="flex justify-end bg-gray-400 p-4">
      <img src={logo} alt="Logo" className="h-20" />
      <div className="NavBar ml-auto flex items-center">
        <Link to="/" className="text-lg mx-4">
          Home
        </Link>
        {!isLoggedIn && (
          <>
            <Link to="/login" className="text-lg mx-4">
              Login
            </Link>
            <Link to="/signup" className="text-lg mx-4">
              Signup
            </Link>
          </>
        )}
        {isLoggedIn && (
          <Link to="/" onClick={handleLogout} className="text-lg mx-4">
            Logout
          </Link>
        )}
      </div>
    </div>
  );
}
