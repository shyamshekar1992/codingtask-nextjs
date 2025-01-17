import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.NEXT_SECRET,
      clientSecret: process.env.NEXT_CLIENT,
    }),
  ],
  secret: process.env.NEXT_AUTHSECRET, // Add a secret for signing cookies
};

export default NextAuth(authOptions);
