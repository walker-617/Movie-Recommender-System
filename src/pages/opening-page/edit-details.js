import React, { useState, useRef } from "react";

import {
  auth,
  getEmails,
  getUsernames,
  registerWithUsernameAndPassword,
  sendEmailVerification,
  signOutUser,
} from "../../auth";
import Password from "../home-page/reuse/password";

function EditDetails({
  setPage,
  setUsername,
  setPass,
  setEmail,
  username,
  email,
  pass,
}) {
  const gotoLogin = () => {
    setPage("login");
  };

  const emailRef = useRef(null);
  const usernameRef = useRef(null);
  const [password, setPassword] = useState(pass);
  const [confirmPassword, setConfirmPassword] = useState(pass);
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
          Edit Details
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
        {display === "passNoMatch" ? (
          <span className="error">Passwords do not match</span>
        ) : (
          ""
        )}
        {display === "userLengthError" ? (
          <span className="error">
            Username should be 6<br />
            characters atleast
          </span>
        ) : (
          ""
        )}
        {display === "userSpecialError" ? (
          <span className="error">
            Username contains special
            <br />
            characters
          </span>
        ) : (
          ""
        )}
        {display === "userFirstError" ? (
          <span className="error">
            Username should start with an
            <br />
            alphabet
          </span>
        ) : (
          ""
        )}
        {display === "passLengthError" ? (
          <span className="error">
            Password should be 8<br />
            characters atleast
          </span>
        ) : (
          ""
        )}
        {display === "passSpecialError" ? (
          <span className="error">
            Password contains special <br />
            characters
          </span>
        ) : (
          ""
        )}
        {display === "passFirstError" ? (
          <span className="error">
            Password should start with <br />
            an alphabet
          </span>
        ) : (
          ""
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          ref={emailRef}
          type="email"
          defaultValue={email}
          placeholder={
            display === "email" ? "email for password recovery" : "email"
          }
          required
          className="input"
        />
        <input
          ref={usernameRef}
          type="text"
          defaultValue={username}
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
          pass={pass}
        />
        <div style={{ height: "5px" }}></div>
        <Password
          placeholder={"confirm password"}
          setPassword={setConfirmPassword}
          handleDisplay={handleDisplay}
          pass={pass}
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
  if (text?.length < k) {
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

export default EditDetails;
