import React, { useState, useRef } from "react";

import Password from "../home-page/reuse/password";

import {
  auth,
  signOutUser,
  getUsernames,
  getEmails,
  signInWithEmailPassword,
  sendEmailVerification,
} from "../../auth";

function Login({ setExplore, setPage, setUsername, setEmail }) {
  const gotoSignup = () => {
    setPage("signup");
  };

  const gotoReset = () => {
    setPage("resetPass");
  };

  const usernameRef = useRef(null);
  const [user, setUser] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  const gotoVerifyEmail = async () => {
    sendEmailVerification(user)
      .then(() => {
        setPage("verifyEmail");
        setUsername(usernameRef.current.value);
      })
      .catch((error) => {
        if (error.code === "auth/too-many-requests") {
          setError("TMR");
          return;
        }
        console.log("error");
      });
  };

  const handleSubmit = async (event) => {
    setError("LD");
    event.preventDefault();
    const username = usernameRef.current.value;

    const res1 = await getUsernames();
    const usernames = res1?.usernames;
    if (usernames) {
      if (!usernames?.includes(username)) {
        setError("NF");
        return;
      }
    }
    var email = "";

    const res2 = await getEmails();
    const emails = res2?.emails;
    if (emails) {
      const i = usernames.indexOf(username);
      email = emails[i];
    }
    setEmail(email);
    signInWithEmailPassword(email, password)
      .then((user) => {
        if (user === "auth/wrong-password") {
          setError("WP");
          return;
        } else if (user === "auth/network-request-failed") {
          setError("NE");
          return;
        } else if (user === "auth/too-many-requests") {
          setError("TMR");
          return;
        } else if (!user.emailVerified) {
          setError("NV");
          setUser(user);
          return;
        }
        setExplore("explore");
      })
      .catch((error) => {
        if (error === "auth/too-many-requests") {
          setError("TMR");
          return;
        }
        setError("NE");
      });
    return;
  };

  return (
    <div className="container mycard">
      <div className="signup-error">
        <span className="welcome" style={{ flex: "1" }}>
          Login
        </span>
        {error === "LD" ? (
          <span style={{ color: "rgb(192, 192, 192)" }}>Loading...</span>
        ) : (
          ""
        )}
        {error === "NE" ? <span className="error">Network error</span> : ""}
        {error === "SWW" ? (
          <span className="error">Something went wrong</span>
        ) : (
          ""
        )}
        {error === "S" ? <span className="success">Success</span> : ""}
        {error === "NF" ? <span className="error">User not found</span> : ""}
        {error === "WP" ? <span className="error">Wrong password</span> : ""}
        {error === "TMR" ? (
          <span className="error">Too many requests. Try again</span>
        ) : (
          ""
        )}
        {error === "TA" ? (
          <span className="error">Something went wrong</span>
        ) : (
          ""
        )}
        {error === "NV" ? (
          <span className="error">Email not verified</span>
        ) : (
          ""
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          ref={usernameRef}
          type="username"
          placeholder="username"
          required
          className="input"
        />
        <Password
          placeholder={"password "}
          setPassword={setPassword}
          handleDisplay={() => {}}
        />
        <div className="login">
          <input
            type="submit"
            value={error === "NE" || error === "SWW" ? "Try Again" : "Login"}
          />
          {error === "NV" || error === "TMR" ? (
            <input
              type="submit"
              value="Verify email?"
              onClick={gotoVerifyEmail}
            />
          ) : (
            <span className="forgot-reset" onClick={gotoReset}>
              {}
            </span>
          )}
        </div>
      </form>
      <div className="newuser">
        <span className="welcome">New user?</span>
        <div className="signup" onClick={gotoSignup}>
          Sign up
        </div>
      </div>
    </div>
  );
}

export default Login;
