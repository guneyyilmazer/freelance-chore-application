import React from "react";
import { useRef } from "react";
import Cookies from "js-cookie";
import { BACKEND_SERVER_IP } from "../layout";

const Signup = () => {
  const toAPI = async () => {
    if (
      usernameRef.current?.value &&
      emailRef.current?.value &&
      passwordRef.current?.value
    ) {
      const res = await fetch(`${BACKEND_SERVER_IP}/user/signup`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          username: usernameRef.current!.value,
          email: emailRef.current!.value,
          password: passwordRef.current!.value,
          type: { hirer: true },
        }),
      });
      const response = await res.json();
      if (!response.error) {
        Cookies.set("Auth_Token", response.AuthValidation, { expires: 5 });
        window.location.replace("/");
      } else alert(response.error);
    } else alert("All credentials must be filled.");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toAPI();
  };
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  return (
    <form
      className="flex flex-col h-[70vh] md:w-[50vw] shadow p-5 px-12 justify-center"
      onSubmit={handleSubmit}
    >
      <h2 className="text-center font-semibold my-4 text-xl">
        Signup as a hirer account
      </h2>
      <label className="text-lg" htmlFor="username">
        Username
      </label>
      <input
        type="text"
        ref={usernameRef}
        className="my-2"
        placeholder="Enter username"
        name=""
        id="username"
      />
      <label className="text-lg" htmlFor="email">
        Email
      </label>

      <input
        type="email"
        ref={emailRef}
        className="my-2"
        placeholder="Enter email"
        name=""
        id="email"
      />
      <label className="text-lg" htmlFor="password">
        Password
      </label>

      <input
        type="password"
        ref={passwordRef}
        className="my-2"
        placeholder="Enter password"
        name=""
        id="password"
      />
      <div className="my-2 text-center">
        <button
          className="p-2 py-3 rounded-lg text-white bg-green-600"
          type="submit"
        >
          Signup
        </button>
      </div>
    </form>
  );
};

export default Signup;
