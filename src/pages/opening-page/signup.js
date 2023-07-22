import React, { useState, useRef } from "react";

import {
  auth,
  getEmails,
  checkGoogleSignin,
  getUsernames,
  registerWithUsernameAndPassword,
  sendEmailVerification,
  signOutUser,
} from "../../auth";
import Password from "../home-page/reuse/password";

function Signup({ setPage, setUsername, setPass, setEmail }) {
  const gotoLogin = () => {
    signOutUser();
    setPage("login");
  };

  const formRef = useRef(null);
  const emailRef = useRef(null);
  const usernameRef = useRef(null);
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [display, setDisplay] = useState();

  const handleDisplay = (s) => {
    setDisplay(s);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setDisplay("Loading");

    const email = emailRef.current.value;
    const username = usernameRef.current.value;
    if (password !== confirmPassword) {
      setDisplay("passNoMatch");
      return;
    }
    const checkUsernameError = checkText(username, 6);
    if (checkUsernameError === "specialError") {
      setDisplay("userSpecialError");
      return;
    }
    if (checkUsernameError === "lengthError") {
      setDisplay("userLengthError");
      return;
    }
    if (checkUsernameError === "firstError") {
      setDisplay("userFirstError");
      return;
    }

    const checkPasswordError = checkText(password, 8);
    if (checkPasswordError === "specialError") {
      setDisplay("passSpecialError");
      return;
    }
    if (checkPasswordError === "lengthError") {
      setDisplay("passLengthError");
      return;
    }
    if (checkPasswordError === "firstError") {
      setDisplay("passFirstError");
      return;
    }

    const res2 = await getEmails();
    const emails = res2?.emails;
    if (emails) {
      if (emails?.includes(email)) {
        setDisplay("emailExists");
        return;
      }
    }

    const res1 = await getUsernames();
    const usernames = res1?.usernames;
    if (usernames) {
      if (usernames?.includes(username)) {
        setDisplay("usernameTaken");
        return;
      }
    }

    registerWithUsernameAndPassword(username, email, password).then(() => {
      setEmail(email);
      setUsername(username);
      setPass(password);
      setPage("verify");
    });
    return;
  };

  return (
    <div className="container mycard">
      <div className="signup-error">
        <span className="welcome" style={{ flex: "1" }}>
          Signup
        </span>
        {display === "Loading" ? (
          <span style={{ color: "rgb(192, 192, 192)" }}>Loading...</span>
        ) : (
          ""
        )}
        {display === "emailExists" ? (
          <span className="error">Email already in use</span>
        ) : (
          ""
        )}
        {display === "usernameTaken" ? (
          <span className="error">Username already taken</span>
        ) : (
          ""
        )}
        {display === "passNoMatch" ? (
          <span className="error">Passwords didn't match</span>
        ) : (
          ""
        )}
        {display === "email" ? (
          <span className="display">This will be used in verification</span>
        ) : (
          ""
        )}
        {display === "username" || display === "password" ? (
          <span className="display">
            Alphanumerics starting with an alphabet
          </span>
        ) : (
          ""
        )}
        {display === "userLengthError" ? (
          <span className="error">Username should be 6 characters atleast</span>
        ) : (
          ""
        )}
        {display === "userSpecialError" ? (
          <span className="error">Username contains special characters</span>
        ) : (
          ""
        )}
        {display === "userFirstError" ? (
          <span className="error">Username should start with an alphabet</span>
        ) : (
          ""
        )}
        {display === "passLengthError" ? (
          <span className="error">Password should be 8 characters atleast</span>
        ) : (
          ""
        )}
        {display === "passSpecialError" ? (
          <span className="error">Password contains special characters</span>
        ) : (
          ""
        )}
        {display === "passFirstError" ? (
          <span className="error">Password should start with an alphabet</span>
        ) : (
          ""
        )}
      </div>
      <form ref={formRef} onSubmit={handleSubmit}>
        <input
          ref={emailRef}
          type="email"
          onFocus={() => handleDisplay("email")}
          onBlur={() => handleDisplay("")}
          placeholder={display === "email" ? "email for verification" : "email"}
          required
          className="input"
        />
        <input
          ref={usernameRef}
          type="text"
          onFocus={() => handleDisplay("username")}
          onBlur={() => handleDisplay("")}
          placeholder={
            display === "username" ? "should be 6 characters" : "username"
          }
          required
          className="input"
        />
        <Password
          placeholder={"password"}
          setPassword={setPassword}
          handleDisplay={handleDisplay}
        />
        <div style={{ height: "5px" }}></div>
        <Password
          placeholder={"confirm password"}
          setPassword={setConfirmPassword}
          handleDisplay={handleDisplay}
        />
        <div className="login">
          <input type="submit" value="Signup" className="signup" />
          <div className="gotoLogin" onClick={gotoLogin}>
            go to Login?
          </div>
        </div>
      </form>
    </div>
  );
}

function checkText(text, k) {
  if (text.length < k) {
    return "lengthError";
  }
  const alphanumericRegex = /^[a-zA-Z0-9]+$/;
  if (!alphanumericRegex.test(text)) {
    return "specialError";
  }
  if (!/^[a-zA-Z]/.test(text[0])) {
    return "firstError";
  }
}

export default Signup;
