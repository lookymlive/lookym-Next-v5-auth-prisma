import NextAuth, { AuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import { Session } from "next-auth";
import { User } from "@prisma/client";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  
  callbacks: {
    async session({ session, user }: { session: Session; user: User }) {
      if (session.user) {
        session.user = {
          ...session.user,
          id: user.id,
        };
      }
      return session;
    },
  },
  pages: {
    signIn: '/signin',
  },
};

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }