"use client";
import Login from "../components/Login";
import Signup from "../components/Signup";
import { useState } from "react";
import SignupAsAFreelancer from "../components/SignupAsAFreelancer";
import { useSearchParams } from "next/navigation";
const AuthPage = () => {
  const searchParams = useSearchParams();

  const [showLogin, setShowLogin] = useState(false);
  const [showFreelancer, setShowFreelancer] = useState(searchParams.get("type")=="freelancer"?true:false);
  return !showLogin && !showFreelancer ? (
    <div
      style={{ height: "100svh" }}
      className="flex flex-col justify-center items-center"
    >
      <Signup />
      <div>
        <button
          className="mt-3 bg-black w-50 h-20 text-white"
          onClick={() => setShowLogin(!showLogin)}
        >
          Have an account already?
        </button>
        <button
          className="mt-3 mx-2 bg-black w-50 h-20 text-white"
          onClick={() => setShowFreelancer(!showFreelancer)}
        >
          Sign up as a freelancer
        </button>
      </div>
    </div>
  ) : showLogin ? (
    <div
      style={{ height: "100svh" }}
      className="flex justify-center align-center"
    >
      <Login />
    </div>
  ) : showFreelancer ? (
    <SignupAsAFreelancer />
  ) : (
    <></>
  );
};

export default AuthPage;
