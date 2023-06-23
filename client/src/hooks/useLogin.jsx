import { useState } from "react";
import axios from "../axios/axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

function useLogin() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await axios.post("/login", { email, password });
      // save token to local storage
      localStorage.setItem("user", JSON.stringify(response?.data));
      // update the store
      dispatch({ type: "USER_LOGIN", payload: response?.data });
    } catch (err) {
      toast.error(err?.response?.data?.error);
    } finally {
      setLoading(false);
    }
  };
  return { login, loading };
}

export default useLogin