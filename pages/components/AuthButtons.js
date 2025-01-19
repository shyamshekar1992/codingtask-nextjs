"use client";

import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";

function AuthButtons() {
  const { data: session } = useSession(); // Fetch session data

  return (
    <div className="mb-4 text-center">
      {session ? (
        // Logged-in view
        <LoggedInView
          name={session.user.name}
          image={session.user.image}
          onSignOut={() => signOut({ callbackUrl: "/" })}
        />
      ) : (
        // Logged-out view
        <LoggedOutView
          onSignIn={() =>
            signIn("github", {
              redirect: true,
              callbackUrl: process.env.NEXT_PUBLIC_BASE_URL6,
            })
          }
        />
      )}
    </div>
  );
}

// Component for the logged-in view
const LoggedInView = ({ name , onSignOut }) => (
  <div>
    <h1 className="text-xl font-bold text-gray-800">Welcome, {name}!</h1>
    
    <button
      onClick={onSignOut}
      className="mt-4 py-2 px-4 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
    >
      Logout
    </button>
  </div>
);

// Component for the logged-out view
const LoggedOutView = ({ onSignIn }) => (
  <div>
    <h1 className="text-xl font-bold text-gray-800">Welcome, Guest!</h1>
    <button
      onClick={onSignIn}
      className="mt-4 py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      Sign In with GitHub
    </button>
  </div>
);

export default AuthButtons;
