import React from "react";
import Cookies from "js-cookie";
import Auth from "./Auth";
const LogoutButton = () => {
  return (
    <button
      onClick={() => {
        Cookies.remove("Auth_Token");
        Cookies.remove("user");
        window.location.reload();
      }}
      className="block py-2 pr-4 pl-3 text-white border-gray-700 lg:border-0 p-0 hover:bg-transparent"
    >
      Logout
    </button>
  );
};

export default Auth(LogoutButton);
