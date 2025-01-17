import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
const githubuser = "Ov23liGBWLqW6dubedw0";
const gitsecret = "7d7420262b3c3b2705cc4abd3e376ee00063432e";
const mysecret = "f2e4a1d8c6f04b2a85c7e1d6c7e4b5a8f1d2c3e4f5a7c9e0d1b6f4e3c2a5d8b1";



export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: githubuser,
      clientSecret: gitsecret,
    }),
  ],
  secret: mysecret, // Add a secret for signing cookies
};

export default NextAuth(authOptions);
