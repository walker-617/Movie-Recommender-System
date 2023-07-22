import React, { useState } from "react";
import { auth, signOutUser, DeleteUser } from "../../auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRefresh } from "@fortawesome/free-solid-svg-icons";

function VerifyEmail({ setPage, username, email }) {
  const gotoLogin = () => {
    signOutUser();
    setPage("login");
  };

  const [verify, setVerify] = useState("Not verified");

  const handleVerify = () => {
    setVerify("Loading...");
    fetch(`https://admin-sdk-for-recommender.onrender.com/checkUser/${email}`)
      .then((response) => response.json())
      .then((response) => {
        if (response.emailVerified) {
          setVerify("Verified");
        } else {
          setVerify("Not verified");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  return (
    <div className="container mycard">
      <span className="welcome" style={{ flex: "1" }}>
        Email verification
      </span>
      <div className="reset">
        <span>
          Seems like you forgot email verification back in the signup process
          for <b>'{username}'</b>. Don't worry you can do it now.
        </span>
        <br />
        <span>
          A verification mail has been sent to <b>'{email}'</b>. Click on the
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
      ></div>
      <div
        align="end"
        style={{ marginTop: "20px" }}
        className="gotoLogin"
        onClick={gotoLogin}
      >
        go to Login?
      </div>
    </div>
  );
}

export default VerifyEmail;
