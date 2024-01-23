"use client";
import Link from "next/link";
import Auth from "../components/Auth";
import { setChattingWith } from "../features/appSlice";
import { useDispatch } from "react-redux";
const AuthButtons = ({ user, client }: any) => {
  const dispatch = useDispatch();

  return (
    <div className="mt-10 mb-12">
      <div>
        {user && user.userId != client.userId && (
          <div>
            <Link
              href="/messages"
              onClick={() => {
                dispatch(setChattingWith(user.userId));
              }}
              className="bg-green-600 px-10 py-4 hover:bg-green-700 text-white font-semibold rounded-lg"
            >
              Send A Message
            </Link>
          </div>
        )}
        {user && user.userId == client.userId && (
          <Link
            className="bg-green-600 px-10 py-4 hover:bg-green-700 text-white font-semibold rounded-lg"
            href={"/user/editprofile"}
          >
            Edit Profile
          </Link>
        )}
      </div>
    </div>
  );
};
export default Auth(AuthButtons);
