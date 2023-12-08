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
    <form onSubmit={handleSubmit} className="flex flex-col justify-center">
      <h2 className="text-white text-center">Login</h2>
      <input
        type="text"
        ref={usernameRef}
        className="mt-3 py-2"
        placeholder="Enter username"
        name=""
        id=""
      />
      <input
        type="password"
        ref={passwordRef}
        className="mt-2 py-2"
        placeholder="Enter password"
        name=""
        id=""
      />
      <div className="mt-4 flex justify-center">
        <button className="py-2" type="submit">
          Login
        </button>
      </div>
    </form>
  );
};

export default Login;
