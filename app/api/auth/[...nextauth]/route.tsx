import NextAuth from "next-auth";
import { authOptions } from "@/app/lib/nextauth";

const handler = NextAuth(authOptions); // ✅ التأكد من استخدام الاسم الصحيح

export { handler as GET, handler as POST };
