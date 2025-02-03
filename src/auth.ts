import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./lib/prisma";
import authConfig from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
    pages: {
        signIn: "/auth/login",
        error: "/auth/error"
    },
    events: {
      async linkAccount({ user }) {
        await db.user.update({
          where: { id: user.id },
          data: { emailVerified: new Date() }
        })
      }
    },
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    ...authConfig,
  });