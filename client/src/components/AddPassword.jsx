import { useState } from "react";
import axios from "../axios/axios";
import { ClipLoader } from "react-spinners";
import { useSelector } from "react-redux";
import useLogout from "../hooks/useLogout";
import { toast } from "react-toastify";

function AddPassword({ onClose, fetchPasswords }) {
  const user = useSelector((state) => state.user);
  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(4);
  const [includeUppercase, setIncludeUpperCase] = useState(false);
  const [includeLowercase, setIncludeLowercase] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [appName, setAppName] = useState("");
  const [userName, setUserName] = useState("");
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
      toast.success("Password copied to clipboard");
    }
  };

  const handleSavePassword = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "/addPassword",
        { appName, userName, password },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      toast.success(response?.data?.message);
      setPassword("");
      setPasswordLength(6);
      setIncludeUpperCase(false);
      setIncludeLowercase(false);
      setIncludeNumbers(false);
      setIncludeSymbols(false);
      setAppName("");
      setUserName("");
      onClose();
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-white space-y-5">
        <h1 className="text-2xl font-bold">Add Password</h1>
        <div className="flex justify-between">
          <input
            className="w-full rounded-md"
            type="text"
            readOnly
            value={password}
          />
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleCopyClick}
            className="w-1/2 px-2 sm:px-3 py-2 rounded-md text-indigo-900 bg-white font-semibold uppsercase border border-indigo-900 text-sm sm:text-base"
          >
            Copy Password
          </button>
          <button
            onClick={handleGeneratePassword}
            className="w-1/2 px-2 sm:px-3 py-2 text-white bg-indigo-500 font-semibold active:bg-indigo-900 rounded-md text-sm sm:text-base"
          >
            Generate New
          </button>
        </div>
        <div>
          <label
            htmlFor="appName"
            className="text-sm font-medium text-gray-700"
          >
            App Name
          </label>
          <input
            className="w-full border-2 border-gray-300 p-2 rounded-md"
            type="text"
            id="appName"
            placeholder="App Name"
            value={appName}
            onChange={(e) => setAppName(e.target.value)}
          />
        </div>
        <div>
          <label
            htmlFor="userName"
            className="text-sm font-medium text-gray-700"
          >
            User Name
          </label>
          <input
            className="w-full border-2 border-gray-300 p-2 rounded-md"
            type="text"
            id="userName"
            placeholder="User Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
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
        <div className="flex gap-3">
          <button
            onClick={() => onClose()}
            className="w-1/2 px-2 sm:px-3 py-2 rounded-md text-indigo-900 bg-white font-semibold uppsercase border border-indigo-900 text-sm sm:text-base"
          >
            Cancel
          </button>
          <button
            onClick={handleSavePassword}
            disabled={loading || !password || !appName || !userName}
            className={`w-1/2 px-2 sm:px-3 py-2 rounded-md text-white font-semibold text-sm sm:text-base 
            ${
              !password || !appName || !userName
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-indigo-500 active:bg-indigo-900"
            }`}
          >
            {loading ? (
              <ClipLoader size={20} color={"#fff"} />
            ) : (
              "Save Password"
            )}
          </button>
        </div>
      </div>
    </>
  );
}

export default AddPassword;
