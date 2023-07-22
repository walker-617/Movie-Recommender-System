import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faFilm } from "@fortawesome/free-solid-svg-icons";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { auth, signOutUser } from "../../../auth";

function Navbar({ page, setpage, setPage }) {
  const user = auth.currentUser;
  const handlePage = (s) => {
    if (page !== s) {
      setpage(s);
    }
  };

  const handleLogout = () => {
    signOutUser().then(() => {
      setPage("opening");
    });
  };

  return (
    <>
      <div className="margin"></div>
      <div className="container">
        <div className="row">
          <div className="col-1 navbarhome" onClick={() => handlePage("home")}>
            <FontAwesomeIcon icon={faHome} /> Home
            {page === "home" ? (
              <UnderLine />
            ) : (
              <div
                style={{
                  height: "2px",
                }}
              ></div>
            )}
          </div>
          <div className="col-1 navbarlist" onClick={() => handlePage("list")}>
            <FontAwesomeIcon icon={faFilm} /> My list
            {page === "list" ? (
              <UnderLine />
            ) : (
              <div
                style={{
                  height: "2px",
                }}
              ></div>
            )}
          </div>
          {user ? (
            <div className="col-2 offset-7 logged-in-as" align="center">
              <b>{user.displayName}</b>
            </div>
          ) : (
            ""
          )}
          {user ? (
            <div className="col-1 navbarlogout" onClick={handleLogout}>
              <span>
                Logout <FontAwesomeIcon icon={faSignOutAlt} />
              </span>
            </div>
          ) : (
            <div
              className="col-2 offset-8"
              style={{ display: "flex", justifyContent: "end" }}
              onClick={handleLogout}
            >
              <div className="navbarlogin">
                Login / Signup <FontAwesomeIcon icon={faSignInAlt} />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function UnderLine() {
  return <div className="underline"></div>;
}

export default Navbar;
