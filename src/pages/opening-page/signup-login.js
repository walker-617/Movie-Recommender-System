import React, { useState } from "react";

import Login from "./login";
import Signup from "./signup";
import Verify from "./verfiy";
import ResetPass from "./reset-password";
import VerifyEmail from "./verify-email";
import EditDetails from "./edit-details";
import { signOutUser } from "../../auth";

function SignupLogin({ setExplore }) {
  const [page, setPage] = useState("login");
  const [user, setUser] = useState();
  const [email, setEmail] = useState();
  const [username, setUsername] = useState();
  const [pass, setPass] = useState();

  if (page === "login") {
    return (
      <Login
        setExplore={setExplore}
        setPage={setPage}
        setUsername={setUsername}
        setPass={setPass}
        setEmail={setEmail}
      />
    );
  } else if (page === "signup") {
    return (
      <Signup
        setPage={setPage}
        setUser={setUser}
        setUsername={setUsername}
        setPass={setPass}
        setEmail={setEmail}
      />
    );
  } else if (page === "verify") {
    return (
      <Verify setPage={setPage} user={user} username={username} pass={pass} />
    );
  } else if (page === "verifyEmail") {
    return (
      <VerifyEmail
        user={user}
        setPage={setPage}
        username={username}
        email={email}
      />
    );
  } else if (page === "editDetails") {
    return (
      <EditDetails
        setPage={setPage}
        setUsername={setUsername}
        setPass={setPass}
        setEmail={setEmail}
        username={username}
        email={email}
        pass={pass}
      />
    );
  }
  return <ResetPass setPage={setPage} />;
}

export default SignupLogin;
