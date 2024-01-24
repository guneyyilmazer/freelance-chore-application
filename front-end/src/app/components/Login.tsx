import { useRef } from "react";
import Cookies from "js-cookie";
import { BACKEND_SERVER_IP } from "../layout";
const Login = () => {
  const toAPI = async () => {
    if (usernameRef.current?.value && passwordRef.current?.value) {
      const res = await fetch(`${BACKEND_SERVER_IP}/user/login`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          username: usernameRef.current!.value,
          password: passwordRef.current!.value,
        }),
      });
      const response = await res.json();
      if (!response.error) {
        Cookies.set("Auth_Token", response.AuthValidation, { expires: 5 });
        window.location.replace("/");
      } else {
        alert(response.error);
      }
    } else {
      alert("All credentials must be filled.");
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toAPI();
  };
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  return (
    <div className="flex flex-col h-[40vh] md:w-[50vw] shadow p-5 px-12 justify-center">
      <form onSubmit={handleSubmit} className="flex flex-col justify-center">
        <h2 className="text-xl font-semibold text-center my-5">Login</h2>
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
        <div className="mt-4 flex justify-center">
          <button
            className="bg-green-600 px-5 py-3 text-white rounded-lg"
            type="submit"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
