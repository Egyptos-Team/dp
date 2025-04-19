import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

interface UserResponse {
  name: string;
  email: string;
  token: string;
} 

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(
        credentials: Record<"email" | "password", string> | undefined
      ): Promise<any> {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("❌ الرجاء إدخال البريد الإلكتروني وكلمة المرور!");
        }
      
        try {
          const res = await fetch("https://egyptos.runasp.net/api/Auth/Login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
          });
      
          const user = await res.json();
      
          if (!res.ok || !user.token) {
            throw new Error(user.message || "تسجيل الدخول فشل!");
          }
      
          return { ...user, accessToken: user.token };
        } catch (error: any) {
          throw new Error(error.message || "خطأ في تسجيل الدخول!");
        }
      }      
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],

  session: { strategy: "jwt", maxAge: 24 * 60 * 60 },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = (user as any).accessToken || ""; // التأكد من وجود accessToken
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },

    async session({ session, token }) {
      if (token.accessToken) {
        session.accessToken = token.accessToken as string; // تأكيد أن القيمة موجودة
      }
      return session;
    }
  },

  secret: process.env.NEXTAUTH_SECRET,

  pages: { signIn: "/auth/signin" },
};

export default NextAuth(authOptions);
