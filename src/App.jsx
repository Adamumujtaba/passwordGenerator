import { useState } from "react";
import "./App.css";
import { styled } from "styled-components";
import Typewriter from "typewriter-effect";
function App() {
  const [password, setPassword] = useState("");

  const [passwordLength, setPasswordLength] = useState("");
  const [isPassword, setIsPassword] = useState(false);
  const [upperCase, setUpperCase] = useState(false);
  const [lowerCase, setLowerCase] = useState(true);
  const [digitCase, setDigitCase] = useState(false);
  const [symbol, setSymbol] = useState(false);

  function CreatePasswordString(passwordLength) {
    let passwordString = "";

    let upperCaseChar = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let lowerCaseChar = "abcdefghijklmnopqrstuvwxyz";
    let numbersChar = "0123456789";
    let symbolsChar = "!@#$%^&*()_+";
    if (upperCase) {
      passwordString += upperCaseChar;
    }
    if (lowerCase) {
      passwordString += lowerCaseChar;
    }
    if (symbol) {
      passwordString += symbolsChar;
    }
    if (digitCase) {
      passwordString += numbersChar;
    }

    let result = GeneratePassword(passwordString, passwordLength);
    setIsPassword(true);
    setPassword(result);
  }

  function GeneratePassword(cha, passL) {
    let result = "";
    for (let i = 0; i < passL; i++) {
      let charIndex = Math.round(Math.random() * cha.length);
      result += cha.charAt(charIndex);
    }
    return result;
  }

  return (
    <AppCont>
      <h3>Password Generator</h3>
      <div className="form">
        <p>Password Length</p>
        <input
          type="text"
          placeholder="Ex: 8"
          onChange={(e) => setPasswordLength(e.target.value)}
        />
      </div>

      <div className="check">
        <div>
          <p>include upperCase {upperCase ? "true" : "false"}</p>
          <p>
            <input
              type="checkbox"
              checked={upperCase}
              onChange={() => setUpperCase(!upperCase)}
            />
          </p>
        </div>
        <div>
          <p>include lowerCase</p>
          <p>
            <input
              type="checkbox"
              checked={lowerCase}
              onChange={() => setLowerCase(!lowerCase)}
            />
          </p>
        </div>
        <div>
          <p>include Numbers</p>
          <p>
            <input
              type="checkbox"
              checked={digitCase}
              onChange={() => setDigitCase(!digitCase)}
            />
          </p>
        </div>
        <div>
          <p>include symbols</p>
          <p>
            <input
              type="checkbox"
              checked={symbol}
              onChange={() => setSymbol(!symbol)}
            />
          </p>
        </div>
      </div>
      <div className="btnDiv">
        <button
          className="generate"
          onClick={() => CreatePasswordString(passwordLength)}
        >
          Generate
        </button>
        <button className="reset">Reset</button>
      </div>
      {isPassword && (
        <div className="passwordDiv">
          <p className="char">
            {" "}
            <Typewriter
              options={{
                strings: password,
                autoStart: isPassword,
              }}
            />
          </p>
        </div>
      )}
    </AppCont>
  );
}

export default App;

const AppCont = styled.div`
  width: 300px;
  margin: 100px auto;
  .form {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0px;
  }
  .form input {
    width: 45px;
    padding: 5px;
    background: none;
    border: 1px solid #ccc;
    color: #fff;
    border-radius: 3px;
    outline: none;
  }
  .check div {
    display: flex;
    justify-content: space-between;
  }
  .btnDiv {
    /* border: 1px solid #000; */
    display: flex;
    justify-content: space-between;
    align-items: center;
    button {
      background: none;
      border: none;
      padding: 10px;
      border-radius: 5px;
      cursor: pointer;
    }
    .generate {
      background: #55b587;
      color: #fff;
    }
    .reset {
      background: red;
      color: #fff;
    }
  }
  .passwordDiv {
    border: none;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px 0px;
    background-color: #a77b06;
    color: #000;
    border-radius: 4px;
    box-shadow: inset 1px 1px 1px 1px lightgray;
    font-size: 24px;
  }
`;
