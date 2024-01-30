import React from 'react'
import { Link } from 'react-router-dom'

export default function NavBar({isLoggedIn, handleLogout}) {
    
    return (
        <div className="NavBar">
            <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      {isLoggedIn ? (
        <Link to="/" onClick={handleLogout}>Logout</Link>
      ) : (
        <Link to="/signup">Signup</Link>
      )}
        </div>
    )
}
