import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import InstagramProvider from "next-auth/providers/instagram"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "@/lib/prisma"
import NextAuth from "next-auth"
import { authOptions } from "@/lib/auth"

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }


export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    InstagramProvider({
      clientId: process.env.INSTAGRAM_CLIENT_ID,
      clientSecret: process.env.INSTAGRAM_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      session.user.role = user.role;
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }