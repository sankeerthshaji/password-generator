import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import { toast } from "react-toastify";
import useLogout from "../../hooks/useLogout";

function Navbar() {
  //to store current state of user
  const user = useSelector((state) => state.user);
  const { logout } = useLogout();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Logout successfully");
    navigate("/login");
    setOpen(false);
  };

  return (
    <div className="shadow-md w-full top-0 left-0">
      <div className="flex items-center justify-between bg-white py-5 lg:px-20 px-5">
        <div className="font-black text-3xl cursor-pointer flex items-center font-mono text-blue-900">
          <Link to="/">PassGenX</Link>
        </div>
        {user && <Button onClick={handleLogout}>Logout</Button>}
        {!user && (
          <Link to="/login">
            <Button>Login</Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;
