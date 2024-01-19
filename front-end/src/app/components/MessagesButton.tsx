import Link from "next/link";
import React from "react";
import Auth from './Auth'

const MessagesButton = () => {
  return (
    <div className="justify-center items-center gap-1 flex">
      <Link
        href="/messages/dms"
        className="text-center text-white text-base font-normal font-['Helvetica Neue'] leading-normal"
      >
        Messages
      </Link>
    </div>
  );
};

export default Auth(MessagesButton);
