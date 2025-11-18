import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    strapiToken?: string;
    user: {
      id?: string;
    } & DefaultSession["user"];
  }

  interface User {
    strapiToken?: string;
    strapiUserId?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    strapiToken?: string;
    strapiUserId?: string;
  }
}
