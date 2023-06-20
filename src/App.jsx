import { useState } from "react";

function App() {
  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(6);
  const [includeUppercase, setIncludeUpperCase] = useState(false);
  const [includeLowercase, setIncludeLowercase] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [copied, setCopied] = useState(false);

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

    function createRandomPassword(characterList) {
      let password = "";
      let characterListLength = characterList.length;
      for (let i = 0; i < passwordLength; i++) {
        let randomIndex = Math.round(Math.random() * characterListLength);
        password = password + characterList.charAt(randomIndex);
      }
      return password;
    }
  };

  return (
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
            onClick={() => {
              if (password.length > 0) {
                navigator.clipboard.writeText(password);
                setCopied(true);
                setInterval(() => {
                  setCopied(false);
                }, 2000);
              }
            }}
            className="bg-blue-500 text-white cursor-pointer w-3/12 text-sm font-medium lg:font-semibold rounded-md"
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
              defaultValue={passwordLength}
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
            className="mt-2 w-full bg-blue-500 text-white p-3 rounded-md font-bold text-lg"
          >
            Generate Password
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
