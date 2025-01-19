import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

const Githublogin = process.env.NEXT_PUBLIC_BASE_GITUSER;
const Githubpass = process.env.NEXT_PUBLIC_BASE_GITPASS;
const secretnextkey = process.env.NEXT_PUBLIC_BASE_SECRET;
if (!Githublogin || !Githubpass || !secretnextkey) {
  throw new Error(
    "Missing required environment variables. Check your .env file."
  );
}

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: Githublogin,
      clientSecret: Githubpass,
    }),
  ],
  secret: secretnextkey,
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
  callbacks: {
    async signOut({ token }) {
      console.log(`User ${token?.email} has logged out.`);
      return true;
    },
  },
  debug: true,
};

export default NextAuth(authOptions);
