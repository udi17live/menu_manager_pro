import NextAuth, { AuthError, CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { strapiClient } from "./strapiClient";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        console.log(credentials);
        try {
          const response = await strapiClient
            .fetch("/auth/local", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                identifier: credentials.email,
                password: credentials.password,
              }),
            })
            .catch(() => null);

          const data = await response?.json().catch(() => null);

          if (!response?.ok) {
            const message =
              data?.error?.message ||
              data?.message ||
              "Invalid email or password. Please try again.";
            throw new CredentialsSignin(message);
          }

          const user = {
            id: data.user.id.toString(),
            email: data.user.email,
            name: data.user.name,
            strapiToken: data.jwt,
            ...data.user,
          };

          return user;
        } catch (err: any) {
          const message =
            err instanceof Error && err.message
              ? err.message
              : "Unable to sign in. Please try again.";

          throw new CredentialsSignin(message);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.strapiToken = user.strapiToken;
        token.strapiUserId = user.id;
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.strapiToken = token.strapiToken as string;
        session.user.id = token.strapiUserId as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt",
  },
});
