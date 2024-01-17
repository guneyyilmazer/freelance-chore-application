"use client";
import React, { useState, useEffect, useMemo } from "react";
import Cookies from "js-cookie";
import { setUser, setIsLoggedIn } from "../features/appSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { BACKEND_SERVER_IP } from "../layout";
import Signup from "./Signup";
type verified = {
  valid: boolean;
  userId: string;
  username: string;
};
type notVerified = {
  valid: boolean;
  error: string;
};
const logUserIn = async (dispatch: any) => {
  const res = await fetch(`${BACKEND_SERVER_IP}/user/loadUser`, {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${Cookies.get("Auth_Token")}`,
    },

    method: "POST",
    body: JSON.stringify({
      token: Cookies.get("Auth_Token"),
    }),
  });
  const user = await res.json();
  dispatch(setUser(user));

  Cookies.set("userId", user.userId, { expires: 5 });

  dispatch(setIsLoggedIn(true));
};
const verify = async () => {
  const token = Cookies.get("Auth_Token");
  const res = await fetch(`${BACKEND_SERVER_IP}/verify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token,
    }),
  });
  return (await res.json()) as verified | notVerified;
};

const withAuth = (HocComponent: any) => {
  return (props: any) => {
    const [state, setState] = useState(0);
    const router = useRouter();
    const dispatch = useDispatch();
    useMemo(async () => {
      const res = await verify();
      if (!res.valid) {
        setState(1);
        /* router.push("/auth"); */
      } else {
        await logUserIn(dispatch);

        setState(2);
      }
    }, []);
    return state == 2 ? (
      // Using a count state prevents the Auth Page flashing up on reload. Because it returns with inital state value first time this function gets run.
      <HocComponent {...props} />
    ) : state == 1 ? (
      router.replace("/auth")
    ) : (
      <></>
    );
  };
};
export default withAuth;
