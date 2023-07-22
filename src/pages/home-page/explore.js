import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import Navbar from "./reuse/navbar";
import Home from "./home";
import List from "./my-list";

function Explore({ setPage }) {
  const [page, setpage] = useState("home");
  const [showBG, setSHowBG] = useState(false);

  const handleShowBG = () => {
    setSHowBG(!showBG);
  };

  return (
    <div className="background-explore">
      <div className="container">
        {showBG ? (
          <div className="eye" onClick={handleShowBG}>
            <FontAwesomeIcon icon={faEyeSlash} />
          </div>
        ) : (
          <>
            <Navbar page={page} setpage={setpage} setPage={setPage} />
            {page === "home" ? <Home /> : page === "list" ? <List /> : ""}
            <div className="eye" onClick={handleShowBG}>
              <FontAwesomeIcon icon={faEye} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Explore;
