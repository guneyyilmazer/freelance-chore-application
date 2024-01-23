import Link from "next/link";
import React from "react";
import Auth from './Auth'

const MessagesButton = () => {
  return (
      <Link
        href="/messages"
        className="text-center text-white text-base font-normal font-['Helvetica Neue'] leading-normal"
      >
        Messages
      </Link>
  );
};

export default Auth(MessagesButton);
