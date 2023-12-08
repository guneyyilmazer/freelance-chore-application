import React from "react";
import Cookies from "js-cookie";
import Auth from "./Auth";
const LogoutButton = () => {
  return (
    <button
      onClick={() => {
        Cookies.remove("Auth_Token");
        window.location.reload();
      }}
      className="mx-1"
    >
      Logout
    </button>
  );
};

export default Auth(LogoutButton);
