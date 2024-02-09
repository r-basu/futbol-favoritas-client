import React, { useState } from "react";
import "./style.css";
import { Navigate } from "react-router-dom";

export default function AuthForm(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const subHandle = (e) => {
    e.preventDefault();
    props
      .handleSubmit({
        email,
        password,
      })
      .then(() => {
        setIsSubmitted(true);
      });
  };

  if (isSubmitted) {
    return <Navigate to="/" />;
  }

  return (
    <div className="AuthForm">
      <h3>{props.type}</h3>
      <form onSubmit={subHandle}>
        <input
          id="authUser"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          id="authPass"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>{props.type}</button>
      </form>
    </div>
  );
}
