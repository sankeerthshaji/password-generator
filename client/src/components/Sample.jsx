import { useState } from "react";
import Modal from "./modal";
import axios from "../axios/axios";
import { ClipLoader } from "react-spinners";
import { useSelector } from "react-redux";
import useLogout from "../hooks/useLogout";
import { toast } from "react-toastify";

function Sample() {
  const user = useSelector((state) => state.user);
  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(4);
  const [includeUppercase, setIncludeUpperCase] = useState(false);
  const [includeLowercase, setIncludeLowercase] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [passwordTitle, setPasswordTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const { logout } = useLogout();

  const numbers = "0123456789";
  const upperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz";
  const specialCharacters = "!@#$%^&*-_=~`|/:;,.";

  const handleGeneratePassword = (e) => {
    let characterList = "";
    if (includeUppercase) {
      characterList = characterList + upperCaseLetters;
    }

    if (includeLowercase) {
      characterList = characterList + lowerCaseLetters;
    }

    if (includeNumbers) {
      characterList = characterList + numbers;
    }

    if (includeSymbols) {
      characterList = characterList + specialCharacters;
    }
    setPassword(createRandomPassword(characterList));
  };

  function createRandomPassword(characterList) {
    let password = "";
    let characterListLength = characterList.length;
    for (let i = 0; i < passwordLength; i++) {
      let randomIndex = Math.round(Math.random() * characterListLength);
      password = password + characterList.charAt(randomIndex);
    }
    return password;
  }

  const handleCopyClick = () => {
    if (password.length > 0) {
      navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  };

  const onClick = () => {
    setShowModal(true);
  };

  const onClose = () => {
    setShowModal(false);
  };

  const handleSavePassword = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "/savePassword",
        { passwordTitle, password },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      toast.success(response?.data?.message);
      setPasswordTitle("");
      setPassword("");
      setPasswordLength(6);
      setIncludeUpperCase(false);
      setIncludeLowercase(false);
      setIncludeNumbers(false);
      setIncludeSymbols(false);
      onClose();
    } catch (err) {
      if (err?.response?.status === 401) {
        // Handle 401 errors
        logout();
        console.error(err);
      } else {
        console.error(err);
        toast.error(err?.response?.data?.error) || "Something went wrong";
      }
    } finally {
      setLoading(false);
    }
  };

  const modal = (
    <Modal onClose={onClose}>
      <div className="space-y-5">
        <h1 className="font-bold text-xl">Save Password For</h1>
        <input
          className="w-full border-2 border-gray-300 p-2 rounded-md"
          type="text"
          placeholder="Eg: Instagram"
          value={passwordTitle}
          onChange={(e) => setPasswordTitle(e.target.value)}
        />
        <button
          onClick={handleSavePassword}
          type="button"
          className="w-full px-5 py-3 inline-block rounded-lg text-white bg-indigo-500 font-semibold
           hover:-translate-y-0.5 transform transition active:bg-indigo-600"
        >
          {loading ? <ClipLoader size={20} color={"#fff"} /> : "Save Password"}
        </button>
      </div>
    </Modal>
  );

  return (
    <>
      {showModal && modal}
      <div className="bg-[#201f1f] h-screen flex items-center">
        <div className="bg-white w-[26rem] max-w-full mx-auto p-7 space-y-6">
          <h1 className="text-2xl font-bold">Password Generator</h1>
          <div className="flex justify-between">
            <input
              className="w-9/12 mr-2.5"
              type="text"
              readOnly
              value={password}
            />
            <button
              onClick={handleCopyClick}
              className="w-3/12 inline-block rounded-lg text-white bg-indigo-500 font-semibold 
            text-sm hover:-translate-y-0.5 transform transition active:bg-indigo-600"
            >
              {copied ? "Copied!" : "Copy text"}
            </button>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <label htmlFor="length" className="font-semibold">
                Password length
              </label>
            </div>
            <div>
              <input
                id="length"
                className="w-16 h-6"
                value={passwordLength}
                min={4}
                max={20}
                type="number"
                onChange={(e) => {
                  setPasswordLength(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <label htmlFor="uppercase" className="font-semibold">
                Include uppercase letters
              </label>
            </div>
            <div>
              <input
                id="uppercase"
                className="w-5 h-5"
                type="checkbox"
                checked={includeUppercase}
                onChange={(e) => {
                  setIncludeUpperCase(e.target.checked);
                }}
              />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <label htmlFor="lowercase" className="font-semibold">
                Include lowercase letters
              </label>
            </div>
            <div>
              <input
                id="lowercase"
                className="w-5 h-5"
                type="checkbox"
                checked={includeLowercase}
                onChange={(e) => {
                  setIncludeLowercase(e.target.checked);
                }}
              />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <label htmlFor="number" className="font-semibold">
                Include numbers
              </label>
            </div>
            <div>
              <input
                id="number"
                className="w-5 h-5"
                type="checkbox"
                checked={includeNumbers}
                onChange={(e) => {
                  setIncludeNumbers(e.target.checked);
                }}
              />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <label htmlFor="symbol" className="font-semibold">
                Include symbols
              </label>
            </div>
            <div>
              <input
                id="symbol"
                className="w-5 h-5"
                type="checkbox"
                checked={includeSymbols}
                onChange={(e) => {
                  setIncludeSymbols(e.target.checked);
                }}
              />
            </div>
          </div>
          <div>
            <button
              onClick={handleGeneratePassword}
              className="mt-2 w-full px-5 py-3 inline-block rounded-lg text-white bg-indigo-500 font-semibold 
            text-sm uppercase tracking-wider sm:text-base active:bg-indigo-600"
            >
              Generate Password
            </button>
          </div>
          {password && (
            <div>
              <button
                onClick={onClick}
                className="w-full px-5 py-3 inline-block rounded-lg text-white bg-green-500 font-semibold 
            text-sm uppercase tracking-wider sm:text-base active:bg-green-600"
              >
                Save Password
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Sample;
