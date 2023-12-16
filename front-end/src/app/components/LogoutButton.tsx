import React from "react";
import Cookies from "js-cookie";
import Auth from "./Auth";
const LogoutButton = () => {
  return (
    <button
      onClick={() => {
        Cookies.remove("Auth_Token");
        Cookies.remove("user")
        window.location.reload();
      }}
      className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
    >
      Logout
    </button>
  );
};

export default Auth(LogoutButton);
