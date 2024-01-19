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
