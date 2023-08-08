import { useState } from "react";
import "./App.css";
import { styled } from "styled-components";
import Typewriter from "typewriter-effect";
import * as YUP from "yup";
import { Formik } from "formik";
function App() {
  const [password, setPassword] = useState("");

  // const [passwordLength, setPasswordLength] = useState("");
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

  const PasswordScheme = YUP.object({
    passwordLength: YUP.number()
      .required("Length is required")
      .min(4, "must be greather than 4")
      .max(12, "must be less than or equal to 12"),
  });

  function Reset() {
    setIsPassword(false);
    setPassword("");
    setDigitCase(false);
    setUpperCase(false);
    setLowerCase(!false);
    setSymbol(false);
  }

  return (
    <AppCont>
      <h3 className="header">Password Generator</h3>

      <Formik
        initialValues={{ passwordLength: "" }}
        validationSchema={PasswordScheme}
        onSubmit={(values) => {
          CreatePasswordString(values.passwordLength);
        }}
      >
        {({ values, errors, handleChange, handleBlur, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div className="form">
              <p>Password Length</p>
              <input
                type="number"
                name="passwordLength"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.passwordLength}
              />
            </div>
            <span className="error"> {errors.passwordLength}</span>
            <div className="check">
              <div>
                <p>include upperCase </p>
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
              <button className="generate" type="submit">
                Generate
              </button>
              <button className="reset" type="button" onClick={() => Reset()}>
                Reset
              </button>
            </div>
          </form>
        )}
      </Formik>

      {isPassword && (
        <div className="passwordDiv">
          <div className="char">
            {" "}
            <Typewriter
              options={{
                strings: password,
                autoStart: isPassword,
              }}
            />
          </div>
        </div>
      )}
    </AppCont>
  );
}

export default App;

const AppCont = styled.div`
  width: 300px;
  margin: 100px auto;
  .header {
    color: #1b98f5;
  }
  .error {
    text-align: right;
    display: block;
    color: red;
    font-size: small;
  }
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
    background-color: #eac767;
    color: #000;
    border-radius: 4px;
    /* box-shadow: inset 1px 1px 1px 1px lightgray; */
    font-size: 24px;
  }
  @media screen and (max-width: 400px) {
    width: 90%;
  }
`;
