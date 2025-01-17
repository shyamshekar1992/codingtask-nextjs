import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function LoginPage() {
  const { data: session } = useSession(); // Get session data

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      {!session ? (
        // If not signed in
        <button
          onClick={() => signIn("github", { callbackUrl: "/" })}
          className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Sign in with GitHub
        </button>
      ) : (
        // If signed in
        <div className="text-center">
          <h1 className="text-2xl mb-4">
            Welcome, <span className="font-bold">{session.user.name}</span>!
          </h1>
          <img
            src={session.user.image}
            alt="User Avatar"
            className="w-20 h-20 rounded-full mx-auto mb-4"
          />
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
