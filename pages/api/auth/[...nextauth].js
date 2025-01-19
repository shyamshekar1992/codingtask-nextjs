import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
// const Githublogin = "Ov23liGBWLqW6dubedw0";
// const Githubpass = "7d7420262b3c3b2705cc4abd3e376ee00063432e";
// const secretnextkey = "f2e4a1d8c6f04b2a85c7e1d6c7e4b5a8f1d2c3e4f5a7c9e0d1b6f4e3c2a5d8b1";


const Githublogin = process.env.NEXT_PUBLIC_BASE_URL2
;
const Githubpass = process.env.NEXT_PUBLIC_BASE_URL3
;
const secretnextkey = process.env.NEXT_PUBLIC_BASE_URL1
;

if (!Githublogin || !Githubpass || !secretnextkey) {
  throw new Error("Missing required environment variables. Check your .env file.");
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
