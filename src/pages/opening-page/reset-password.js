import React, { useRef, useState } from "react";
import {
  auth,
  signOutUser,
  getUsernames,
  getEmails,
  sendPasswordResetEmail,
} from "../../auth";

function ResetPass({ setPage }) {
  const gotoLogin = () => {
    signOutUser();
    setPage("login");
  };

  const [error, setError] = useState();
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState("");
  const usernameRef = useRef();

  const handleSent = async (event) => {
    event.preventDefault();
    setError("LD");
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
    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log("reset link sent");
        setError("");
        setSent(true);
      })
      .catch((error) => {
        if (error.code === "auth/too-many-requests") {
          setError("TMR");
          return;
        }
        console.log("error sending reset link");
      });
  };

  return (
    <div className="container mycard">
      <div className="signup-error">
        <span className="welcome" style={{ flex: "1" }}>
          Reset Password
        </span>
        {error === "TMR" ? (
          <span className="error">Too many requests. Try again</span>
        ) : (
          ""
        )}
        {error === "LD" ? (
          <span style={{ color: "rgb(192, 192, 192)" }}>Loading...</span>
        ) : (
          ""
        )}
        {error === "NF" ? <span className="error">User not found</span> : ""}
      </div>

      <form onSubmit={handleSent}>
        <input
          ref={usernameRef}
          type="text"
          className="input"
          placeholder="Enter username"
          required
        />
        {sent ? (
          <div align="center" className="reset">
            reset link is sent to {email}
          </div>
        ) : (
          <input
            type="submit"
            value="Send reset link to registered email"
            className="signup"
          />
        )}
        <div
          className="gotoLogin"
          align="center"
          style={{ marginTop: "15px" }}
          onClick={gotoLogin}
        >
          go to Login?
        </div>
      </form>
    </div>
  );
}

export default ResetPass;
