import React, { useState } from "react";
import { auth, DeleteUser, isVerified, signOutUser } from "../../auth";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRefresh } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function Verify({ setPage, username, pass }) {
  const user = auth.currentUser;
  const gotoLogin = () => {
    signOutUser();
    setPage("login");
    return;
  };

  const gotoEditDetails = () => {
    DeleteUser().then(() => {
      setPage("editDetails");
    });
    return;
  };

  const hidePass = "\u2022 ".repeat(pass.length);

  const [showPass, setShowPass] = useState(false);
  const [verify, setVerify] = useState("Not verified");
  const handlePass = () => {
    setShowPass(!showPass);
  };

  const handleVerify = () => {
    setVerify("Loading...");
    fetch(
      `https://admin-sdk-for-recommender.onrender.com/checkUser/${user.uid}`
    )
      .then((response) => response.json())
      .then((response) => {
        if (response.emailVerified) {
          setVerify("Verified");
        } else {
          setVerify("Not verified");
        }
      })
      .catch((error) => {
        console.error("Error fetching verification");
      });
  };

  return (
    <div className="container mycard">
      <span className="welcome" style={{ flex: "1" }}>
        Email verification
      </span>
      <div className="reset">
        <span>Successfully created account with</span>
        <div>
          Username : <span style={{ fontWeight: "bold" }}>{username}</span>
          <br />
          <div style={{ display: "flex" }}>
            Password :&nbsp;
            <span style={{ fontWeight: "bold", flex: "1" }}>
              {showPass ? pass : hidePass}
            </span>
            <span style={{ cursor: "pointer" }} onClick={handlePass}>
              <FontAwesomeIcon icon={!showPass ? faEye : faEyeSlash} />
            </span>
          </div>
        </div>
        <span>
          A verification mail has been sent to <b>{user.email}</b>. Click on the
          link to get verified. Remember that this link expires in 3 days.
        </span>
        <br />
        <div style={{ display: "flex" }}>
          <span>Currently : &nbsp;</span>
          <span
            className={
              verify === "Verified"
                ? "success"
                : verify === "Not verified"
                ? "error"
                : ""
            }
            style={{ flex: "1" }}
          >
            {verify}
          </span>
          {verify !== "Verified" ? (
            <FontAwesomeIcon
              className="refresh"
              icon={faRefresh}
              onClick={handleVerify}
            />
          ) : (
            ""
          )}
        </div>
      </div>
      <div
        style={
          verify !== "Verified" ? { display: "flex", alignItems: "center" } : {}
        }
      >
        {verify !== "Verified" ? (
          <div style={{ flex: "1" }}>
            <input
              type="submit"
              value="edit details?"
              onClick={gotoEditDetails}
            />
            <br></br>
            <span style={{ color: "rgb(192, 192, 192)", fontSize: "13px" }}>
              &nbsp;&nbsp;* when clicked old record will be deleted.
            </span>
          </div>
        ) : (
          ""
        )}
        <div align="end" className="gotoLogin" onClick={gotoLogin}>
          go to Login?
        </div>
      </div>
    </div>
  );
}

export default Verify;
