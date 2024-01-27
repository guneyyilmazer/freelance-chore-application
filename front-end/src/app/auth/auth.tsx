"use client";
import Login from "../components/Login";
import Signup from "../components/Signup";
import { useState } from "react";
import SignupAsAFreelancer from "../components/SignupAsAFreelancer";
import { useSearchParams } from "next/navigation";
const AuthPage = () => {
  const searchParams = useSearchParams();

  const [showLogin, setShowLogin] = useState(false);
  const [showFreelancer, setShowFreelancer] = useState(
    searchParams.get("type") == "freelancer" ? true : false
  );
  return !showLogin && !showFreelancer ? (
    <div
      style={{ height: "100vh" }}
      className="flex flex-col justify-center items-center"
    >
      <Signup />
      <div className="flex gap-2">
        <button className="p-2 py-3" onClick={() => setShowLogin(!showLogin)}>
          Have an account already?
        </button>
        <button
          className="p-2 py-3"
          onClick={() => setShowFreelancer(!showFreelancer)}
        >
          Sign up as a freelancer
        </button>
      </div>
    </div>
  ) : showLogin ? (
    <div
      style={{ height: "100vh" }}
      className="flex justify-center items-center"
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
