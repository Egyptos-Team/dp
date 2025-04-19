import NextAuth, { DefaultSession } from "next-auth";

// توسيع تعريفات NextAuth لإضافة firstName و lastName و accessToken
declare module "next-auth" {
  interface User {
    firstName?: string;
    lastName?: string;
    accessToken?: string;
  }

  interface Session extends DefaultSession {
    user: User & DefaultSession["user"];
    accessToken?: string;
  }
}
