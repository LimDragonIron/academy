import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Kakao from "next-auth/providers/kakao";
import { LoginSchema } from "@/schemas";
import { getUserByEmail, getUserById } from "@/data/user";
import { UserRole } from "@prisma/client";
import { getAccountByUserId } from "./data/account";
import { getTwoFactorConfirmationByUserId } from "./data/twoFactorConfirmation";
import { db } from "./lib/prisma";

export default {
    providers: [
        Google,
        GitHub,
        Kakao,
        Credentials({
            async authorize(credentials) {
                const validatedFields = LoginSchema.safeParse(credentials);
                
                if (validatedFields.success) {
                    const { email, password } = validatedFields.data;
                    
                    const user = await getUserByEmail(email);
                    if (!user || !user.password) return null;
          
                    const passwordsMatch = await bcrypt.compare(
                      password,
                      user.password,
                    );
          
                    if (passwordsMatch) return user;
                }
                return null;
            }
        })
    ],
    callbacks: {
        async signIn({ user, account }) {
            if (account?.provider !== "credentials") return true;

            if(!user.id) return false

            const existingUser = await getUserById(user.id);

            // Prevent sign in without email verification
            if (!existingUser?.emailVerified) return false;

            if (existingUser.isTwoFactorEnabled) {
                const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);
        
                if (!twoFactorConfirmation) return false;
        
                // Delete two factor confirmation for next sign in
                await db.twoFactorConfirmation.delete({
                  where: { id: twoFactorConfirmation.id }
                });
            }

            return true
        },
        async jwt({ token }) {
            if (!token.sub) return token;
      
            const existingUser = await getUserById(token.sub);
      
            if (!existingUser) return token;
      
            const existingAccount = await getAccountByUserId(
              existingUser.id
            );
      
            token.isOAuth = !!existingAccount;
            token.name = existingUser.name;
            token.email = existingUser.email;
            token.role = existingUser.role;
            token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;
      
            return token;
        },
        async session({ token, session }) {

            if (token.sub && session.user) {
              session.user.id = token.sub;
            }
      
            if (token.role && session.user) {
              session.user.role = token.role as UserRole;
            }
      
            if (session.user) {
              session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
            }
      
            if (session.user) {
              session.user.name = token.name;
              session.user.email = token.email as string;
              session.user.isOAuth = token.isOAuth as boolean;
            }
            return session;
        },
    },
} satisfies NextAuthConfig