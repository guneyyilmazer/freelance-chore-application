"use client"
import Login from "../components/Login";
import Signup from "../components/Signup";
import { useState } from "react";
const AuthPage = () => {
  const [haveAnAccount, setHaveAnAccount] = useState(true);
  return (
      haveAnAccount ? (
        <div style={{height:"100svh"}} className="flex flex-col justify-center items-center">
          <Signup />
          <button className="mt-3 bg-black w-50 h-20 text-white" onClick={() => setHaveAnAccount(!haveAnAccount)}>
            Have an account already?
          </button>
        </div>
      ) : (
        <div style={{height:"100svh"}} className="flex justify-center align-center">
          <Login />
        </div>
      )
  );
};

export default AuthPage;
