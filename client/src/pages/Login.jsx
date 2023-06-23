import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import useLogin from "../hooks/useLogin";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading } = useLogin();

  const handleLogin = async () => {
    await login(email, password);
  };
  return (
    <div className="flex items-center h-screen bg-gray-50 px-6 sm:px-0">
      <div className="w-96 max-w-full mx-auto bg-white shadow-2xl p-6">
        <h1 className="font-bold text-2xl">Welcome back</h1>
        <p className="font-light text-gray-500 text-sm mt-2">
          Welcome back! Please enter your details
        </p>
        <div className="mt-6">
          <input
            className="w-full border-2 border-gray-300 p-2 rounded-md"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mt-6">
          <input
            className="w-full border-2 border-gray-300 p-2 rounded-md"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mt-6">
          <button
            onClick={handleLogin}
            type="button"
            className="w-full px-5 py-3 text-center inline-block rounded-lg text-white bg-indigo-500 font-semibold 
          text-sm uppercase tracking-wider hover:bg-indigo-400 sm:text-base hover:-translate-y-0.5 
          transform transition focus:outline-none focus:ring focus:ring-offset-2 focus:ring-indigo-500 
          focus:ring-opacity-50 active:bg-indigo-600"
          >
            {loading ? <ClipLoader size={20} color={"#fff"} /> : "Login"}
          </button>
        </div>
        <div className="mt-6 flex justify-center items-center">
          <p className="text-gray-700 font-light">Don't have an account?</p>
          <Link className="ml-1 text-indigo-500 underline text-sm" to="/signup">
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
