import React, { useState } from "react";
import { Link } from "react-router-dom";
import useSignup from "../hooks/useSignup";
import { ClipLoader } from "react-spinners";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, loading } = useSignup();

  const handleSignup = async () => {
    await signup(email, password);
  };
  return (
    <div className="flex items-center h-screen bg-gray-50 px-6 sm:px-0">
      <div className="w-96 max-w-full mx-auto bg-white shadow-2xl p-6">
        <h1 className="font-bold text-2xl">Let's get Started</h1>
        <p className="font-light text-gray-500 text-sm mt-2">
          Create a new account
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
            onClick={handleSignup}
            className="w-full px-5 py-3 text-center inline-block rounded-lg text-white bg-indigo-500 font-semibold 
          text-sm uppercase tracking-wider hover:bg-indigo-400 sm:text-base hover:-translate-y-0.5 
          transform transition focus:outline-none focus:ring focus:ring-offset-2 focus:ring-indigo-500 
          focus:ring-opacity-50 active:bg-indigo-600"
          >
            {loading ? <ClipLoader size={20} color={"#fff"} /> : "Sign Up"}
          </button>
        </div>
        <div className="mt-6 flex justify-center items-center">
          <p className="text-gray-700 font-light">Already have an account?</p>
          <Link className="ml-1 text-indigo-500 underline text-sm" to="/login">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
