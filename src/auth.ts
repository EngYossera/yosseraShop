import { UserInerface } from "@/inrerfaces/AuthInterfaces";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Route",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "user@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const response = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signin", {
          method: "POST",
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const payload = await response.json();

        if (!response.ok) {
          throw new Error(payload.message || "Email or password is incorrect");
        }

        return {
          id: payload.user.email,
          userRes: payload.user as UserInerface,
          tokenRes: payload.token as string,
        };
      },
    }),
  ],
  pages: {
    signIn: "/pages/login",
    error: "/pages/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.userRes = user.userRes;
        token.tokenRes = user.tokenRes;
      }

      return token;
    },
    async session({ session, token }) {
      if (token.userRes) {
        session.user = token.userRes;
      }

      session.token = token.tokenRes || "";
      return session;
    },
  },
};
