import React, { useState } from "react";
import { toast } from "react-toastify";

function PasswordGenerator({ onClose }) {
  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(4);
  const [includeUppercase, setIncludeUpperCase] = useState(false);
  const [includeLowercase, setIncludeLowercase] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false);

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

  const handleClose = () => {
    onClose();
  };
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Password Generator</h1>
      <div>
        <input
          className="w-full rounded-md"
          type="text"
          readOnly
          value={password}
        />
      </div>
      <div>
        <button
          onClick={handleGeneratePassword}
          className="w-full px-3 py-2 text-white bg-indigo-500 font-semibold active:bg-indigo-900 rounded-md text-sm sm:text-base"
        >
          Generate New Password
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
      <div className="flex gap-3">
        <button
          onClick={handleClose}
          className="w-1/2 px-2 sm:px-3 py-2 rounded-md text-indigo-900 bg-white font-semibold uppsercase border border-indigo-900 text-sm sm:text-base"
        >
          Cancel
        </button>
        <button
          onClick={handleCopyClick}
          className="w-1/2 px-2 sm:px-3 py-2 rounded-md text-white bg-indigo-500 font-semibold active:bg-indigo-900 text-sm sm:text-base"
        >
          Copy to Clipboard
        </button>
      </div>
    </div>
  );
}

export default PasswordGenerator;
