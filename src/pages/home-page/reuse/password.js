import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function Password({ placeholder, setPassword, handleDisplay, pass }) {
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [showPassword, setshowPassword] = useState(false);
  const [focus, setFocus] = useState(false);

  const handleFocus = (s) => {
    handleDisplay(s);
    setFocus(!focus);
  };

  const handleInput = () => {
    setPasswordFocus(!passwordFocus);
  };

  const handlePasswordValue = (event) => {
    setPassword(event.target.value);
  };

  const handleShowPassword = () => {
    setshowPassword(!showPassword);
  };

  return (
    <div
      tabIndex={0}
      className={!passwordFocus ? "password-box" : "password-box-alt"}
      onFocus={handleInput}
      onBlur={handleInput}
    >
      <input
        type={showPassword ? "text" : "password"}
        defaultValue={pass ? pass : ""}
        onFocus={() => handleFocus("password")}
        onBlur={() => handleFocus("")}
        placeholder={
          focus && placeholder === "password"
            ? "should be 8 characters"
            : placeholder
        }
        className={!passwordFocus ? "password" : "password-alt"}
        onChange={handlePasswordValue}
        required
      />
      {passwordFocus ? (
        <FontAwesomeIcon
          icon={!showPassword ? faEye : faEyeSlash}
          className="view"
          onMouseDown={handleShowPassword}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default Password;
