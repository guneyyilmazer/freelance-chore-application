import Link from "next/link";
import Auth from "../components/Auth";
const AuthButtons = ({ user, client }: any) => {
  return (
    <div>
      <div>
        {user && user.userId != client.userId && (
          <div>
            <Link
              href="/messages"
              onClick={() => {
                localStorage.setItem("chattingWith", user.userId);
              }}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Send A Message
            </Link>
          </div>
        )}
        {user && user.userId == client.userId && (
          <Link
            className="bg-green-900 p-2 rounded-md text-white"
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
