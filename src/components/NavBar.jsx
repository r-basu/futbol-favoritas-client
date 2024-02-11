import { Link } from "react-router-dom";

export default function NavBar({ isLoggedIn, handleLogout, logo }) {
  return (
    <div className="flex justify-between items-center bg-dark-green px-8 w-full">
      <div className="w-2/12">
        <a href="/">
          <img src={logo} alt="Logo" className="min-h-20 min-w-40" />
        </a>
      </div>
      <div className="NavBar lg:flex lg:justify-center lg:items-center lg:ml-0 lg:w-8/12 mb:flex mb:ml-28">
        <Link to="/" className="lg:text-xl lg:mx-4 mb:mx-2 text-white-green">
          Home
        </Link>
        {!isLoggedIn && (
          <>
            <Link to="/login" className="lg:text-xl lg:mx-4 mb:mx-2 text-white-green">
              Login
            </Link>
            <Link to="/signup" className="lg:text-xl lg:mx-4 mb:mx-2 text-white-green">
              Signup
            </Link>
          </>
        )}
        {isLoggedIn && (
          <Link
            to="/"
            onClick={handleLogout}
            className="lg:text-xl lg:mx-4 mb:mx-2 text-white-green"
          >
            Logout
          </Link>
        )}
      </div>
      <div className="w-2/12"></div>
    </div>
  );
}
