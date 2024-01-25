"use client";
import { BACKEND_SERVER_IP } from "@/app/layout";
import React, { useRef, useState } from "react";
import Cookies from "js-cookie";
import { useSearchParams } from "next/navigation";

const Form = () => {
  const searchParams = useSearchParams();
  const textRef = useRef<HTMLTextAreaElement>(null);
  const [star, setStar] = useState(5);
  const leaveReview = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`${BACKEND_SERVER_IP}/post/leaveReview`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${Cookies.get("Auth_Token")}`,
      },
      body: JSON.stringify({
        id: searchParams.get("id"),
        text: textRef.current?.value,
        star,
      }),
      method: "POST",
    });
    const response = await res.json();
    if (!response.error) alert(response.msg);
    else alert(response.error);
  };
  return (
    <div>
      <form>
        <h3>Leave Review</h3>
        <textarea ref={textRef} />
        <div>
          <input onChange={() => setStar(1)} type="radio" name="star" id="1" />
          <label htmlFor="1">1</label>
          <input onChange={() => setStar(2)} type="radio" name="star" id="2" />
          <label htmlFor="2">2</label>

          <input onChange={() => setStar(3)} type="radio" name="star" id="3" />
          <label htmlFor="3">3</label>

          <input onChange={() => setStar(4)} type="radio" name="star" id="4" />
          <label htmlFor="4">4</label>

          <input onChange={() => setStar(5)} type="radio" name="star" id="5" />
          <label htmlFor="5">5</label>
        </div>
        <button onClick={leaveReview}>Send</button>
      </form>
    </div>
  );
};

export default Form;
