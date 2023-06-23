import React from "react";
import { useDispatch } from "react-redux";

function useLogout() {
  const dispatch = useDispatch();
  const logout = () => {
    localStorage.removeItem("user");
    dispatch({ type: "USER_LOGOUT" });
  };
  return { logout };
}

export default useLogout;
