import React from "react";
import { user,post } from "../types";
import Link from "next/link";

const AuthButtons = ({ user, post }: { user: user; post: post }) => {
  return (
    <div>
      {user.userId != post.user && (
        <div className="my-5">
          <Link
            href="/messages"
            onClick={() => {
              localStorage.setItem("chattingWith", post.user);
            }}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Send A Message
          </Link>
        </div>
      )}
    </div>
  );
};

export default AuthButtons;
