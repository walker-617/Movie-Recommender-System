import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

function AboutIcon({ showAbout, setShowAbout }) {
  const [hover, setHover] = useState(false);

  const handleAbout = () => {
    setShowAbout(!showAbout);
  };

  const handleMouseEnter = () => {
    if (!hover) {
      setHover(true);
    }
  };

  const handleMouseLeave = () => {
    if (hover) {
      setHover(false);
    }
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      align="center"
      onClick={handleAbout}
    >
      {hover ? (
        <div className="about">About</div>
      ) : (
        <FontAwesomeIcon className="about" icon={faInfoCircle} />
      )}
    </div>
  );
}

export default AboutIcon;
