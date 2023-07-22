import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import SignupLogin from "./signup-login";
import AboutIcon from "./about-icon";
import About from "./about-page";
import { signOutUser } from "../../auth";

function Opening({ setPage }) {
  const [showBG, setSHowBG] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

  const handleAbout = () => {
    setShowAbout(!showAbout);
  };

  const handleShowBG = () => {
    setSHowBG(!showBG);
  };

  const gotoExplore = () => {
    signOutUser().then(() => {
      setPage("explore");
    });
  };

  return (
    <div className="background-open">
      <div className="container">
        {showBG ? (
          <div className="eye" onClick={handleShowBG}>
            <FontAwesomeIcon icon={faEyeSlash} />
          </div>
        ) : showAbout ? (
          <About showAbout={showAbout} setShowAbout={setShowAbout} />
        ) : (
          <>
            <div className="row">
              <div className="col-9" id="welcome-title">
                <span className="welcome">
                  Welcome to
                  <br />
                </span>
                <span className="name-title">Movie Recommender</span>
              </div>
              <div className="col-1 offset-2" onClick={handleAbout}>
                <AboutIcon showAbout={showAbout} setShowAbout={setShowAbout} />
              </div>
            </div>
            <div className="row">
              <div className="col-7">
                <div className="container description mycard">
                  <span className="card-text">
                    With the Movie Recommender, discovering new movies that
                    align with your interests has never been easier. Whether
                    you're a fan of action-packed thrillers, heartwarming
                    dramas, captivating documentaries, or laugh-out-loud
                    comedies, this recommender system has got you covered.
                  </span>
                </div>
                <div className="explore mycard">
                  <div className="explore-free welcome">New visitor?</div>
                  <div className="description">
                    With our user-friendly platform, you can freely explore and
                    navigate the website without the need to create an account
                    or log in. We believe in providing a seamless and
                    hassle-free experience to all our users, including new
                    visitors like you.
                  </div>
                  <div className="row">
                    <div
                      className="col-2 offset-10"
                      style={{ marginTop: "15px" }}
                    >
                      <div
                        style={{ textDecoration: "none", cursor: "pointer" }}
                        onClick={gotoExplore}
                      >
                        <span className="explore-button">
                          Explore{" "}
                          <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-4 offset-1">
                <SignupLogin setExplore={setPage} />
              </div>
            </div>
            <div className="eye" onClick={handleShowBG}>
              <FontAwesomeIcon icon={faEye} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Opening;
