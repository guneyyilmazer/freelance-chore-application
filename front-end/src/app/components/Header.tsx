"use client"
import React from "react";
import Auth from '../components/Auth'
const Header = () => {
  return (
    <nav className="flex justify-between">
      <div>
        <button className="mx-1">Home</button>
        <button className="mx-1">Jobs</button>
      </div>
      <div>
        <button className="mx-1">Login</button>
        <button className="mx-1">Logout</button>
      </div>
    </nav>
  );
};

export default Auth(Header);
