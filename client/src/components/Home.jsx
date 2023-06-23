import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import PasswordGenerator from "./PasswordGenerator";
import AddPassword from "./AddPassword";
import { useSelector } from "react-redux";
import useLogout from "../hooks/useLogout";
import axios from "../axios/axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Loader from "./Loader";

function Home() {
  const [showSaverModal, setShowSaverModal] = useState(false);
  const [showGeneratorModal, setShowGeneratorModal] = useState(false);
  const [passwords, setPasswords] = useState([]);
  const [loader, setLoader] = useState(false);
  const user = useSelector((state) => state.user);
  const { logout } = useLogout();

  useEffect(() => {
    fetchPasswords();
  }, []);

  const fetchPasswords = async () => {
    setLoader(true);
    try {
      const response = await axios.get("/fetchPasswords", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setPasswords(response.data.passwords);
    } catch (err) {
      if (err?.response?.status === 401) {
        console.error(err);
        logout();
      } else {
        console.error(err);
      }
    } finally {
      setLoader(false);
    }
  };

  const openGenerator = () => {
    setShowGeneratorModal(true);
  };

  const openSaver = () => {
    setShowSaverModal(true);
  };

  const onClose = () => {
    setShowGeneratorModal(false);
    setShowSaverModal(false);
  };

  const passwordGeneratorModal = (
    <Modal onClose={onClose}>
      <PasswordGenerator onClose={onClose} />
    </Modal>
  );

  const addPasswordModal = (
    <Modal onClose={onClose}>
      <AddPassword onClose={onClose} fetchPasswords={fetchPasswords} />
    </Modal>
  );

  const handleCopyClick = (password) => {
    if (password.length > 0) {
      navigator.clipboard.writeText(password);
      toast.success("Password copied to clipboard");
    }
  };

  const confirmDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this password?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(id);
      }
    });
  };

  const handleDelete = async (id) => {
    try {
      console.log(id);
      const response = await axios.delete(`/deletePassword/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      toast.success(response?.data?.message);
      fetchPasswords();
    } catch (err) {
      if (err?.response?.status === 401) {
        // Handle 401 errors
        logout();
        console.error(err);
      } else {
        console.error(err);
        toast.error(err?.response?.data?.error) || "Something went wrong";
      }
    }
  };

  return (
    <>
      {showSaverModal && addPasswordModal}
      {showGeneratorModal && passwordGeneratorModal}
      {loader ? (
        <Loader />
      ) : (
        <div className="lg:mt-16">
          <div className="grid lg:grid-cols-2 2xl:grid-cols-5">
            <div className="px-8 py-12 max-w-md mx-auto sm:max-w-xl lg:px-12 lg:py-24 lg:max-w-full xl:mr-0 2xl:col-span-2">
              <div className="xl:max-w-xl">
                <img
                  className="rounded-lg shadow-xl sm:h-64 sm:w-full object-cover object-center lg:hidden"
                  src="https://res.cloudinary.com/dfiqqrico/image/upload/v1687371345/4826435_yjkwmw.jpg"
                  alt="Password manager"
                />
                <h1 className="mt-6 sm:mt-8 font-bold text-2xl text-gray-900 sm:text-4xl lg:text-3xl xl:text-4xl">
                  PassGenX - Create Strong and Secure Passwords with Ease.
                </h1>
                <p className="mt-2 text-gray-600 sm:mt-4 sm:text-xl">
                  Egestas pretium aenean pharetra magna ac. Et tortor consequat
                  id porta nibh venenatis cras sed. Vel turpis nunc eget lorem
                  dolor sed
                </p>
                <div className="mt-4 sm:mt-6">
                  <button
                    onClick={openGenerator}
                    className="w-full px-5 py-3 inline-block rounded-lg text-indigo-900 bg-white font-semibold 
                text-sm uppercase tracking-wider border border-indigo-900 sm:text-base"
                  >
                    Generate Password
                  </button>
                </div>
                <div className="mt-4 sm:mt-6">
                  <button
                    onClick={openSaver}
                    className="w-full px-5 py-3 inline-block rounded-lg text-white bg-indigo-500 font-semibold 
                text-sm uppercase tracking-wider sm:text-base"
                  >
                    Add Password
                  </button>
                </div>
              </div>
            </div>
            <div className="hidden lg:block relative 2xl:col-span-3">
              <img
                className="absolute inset-0 w-full h-full object-cover object-center"
                src="https://res.cloudinary.com/dfiqqrico/image/upload/v1687371345/4826435_yjkwmw.jpg"
                alt="Password manager"
              />
            </div>
          </div>

          <div className="px-8 py-12 lg:px-12 lg:py-24">
            <h1 className="text-center lg:text-left font-bold text-2xl text-gray-900 sm:text-4xl lg:text-3xl xl:text-4xl">
              Saved Passwords
            </h1>
            <div className="mt-6 grid max-w-sm mx-auto sm:max-w-lg lg:max-w-6xl xl:max-w-full lg:grid-cols-2 xl:grid-cols-4 gap-8">
              {passwords.map((password) => (
                <div className="shadow-xl p-6" key={password._id}>
                  <div className="flex gap-5">
                    <img
                      src="https://openclipart.org/image/2400px/svg_to_png/227975/Save-Icon.png"
                      width={58}
                    />
                    <div className="flex flex-col">
                      <h1 className="font-semibold text-lg text-gray-900">
                        {password.appName}
                      </h1>
                      <p className="text-gray-700">{password.userName}</p>
                    </div>
                  </div>
                  <div className="flex flex-col mt-5 gap-5 xl:gap-3">
                    <button
                      onClick={() => confirmDelete(password._id)}
                      className="w-full bg-blue-500 active:bg-blue-700 p-2 text-white rounded-md text-sm font-semibold"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleCopyClick(password.password)}
                      className="w-full bg-blue-500 active:bg-blue-700 p-2 text-white rounded-md text-sm font-semibold"
                    >
                      Copy Password
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
