import { useEffect, useState } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./components/Loader";
import HomePage from "./pages/HomePage";

function App() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: "USER_LOGIN", payload: user });
    }
    setLoader(false);
  }, [dispatch]);

  if (loader) {
    return <Loader />;
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={user ? <HomePage /> : <Navigate to="/login" />}
          />
          <Route
            path="/signup"
            element={!user ? <Signup /> : <Navigate to="/" />}
          />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </>
  );
}

export default App;
