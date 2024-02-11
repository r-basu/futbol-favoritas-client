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
    <div className="AuthForm bg-gray-100 p-6 rounded-lg shadow-md mt-10">
      <h3 className="text-xl font-semibold mb-4">{props.type}</h3>
      <form onSubmit={subHandle} className="flex flex-col gap-4">
        <input
          id="authUser"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="border rounded-lg px-4 py-2 focus:outline-none focus:border-dark-green"
        />
        <input
          id="authPass"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="border rounded-lg px-4 py-2 focus:outline-none focus:border-dark-green"
        />
        <button
          type="submit"
          className="bg-dark-green text-white-green font-bold py-2 px-4 rounded hover:bg-black-green"
        >
          {props.type}
        </button>
      </form>
    </div>
  )};
  
