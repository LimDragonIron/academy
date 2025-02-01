import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import { Adapter } from "next-auth/adapters";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Kakao from "next-auth/providers/kakao";
import prisma from "./lib/prisma";
import { getUserById } from "./data/user";
import { UserRole } from "@prisma/client";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Google,
        GitHub,
        Kakao,
    ],
    trustHost: true,
    pages: {
        signIn: "/auth/login",
        error: "/auth/error"
    },
    adapter: PrismaAdapter(prisma) as Adapter,
    events: {
        async linkAccount({ user}) {
            try{
                await prisma.user.update({
                    where: { id: user.id},
                    data: {emailVerified: new Date()}
                })
            }
            catch(error) {
                console.error("Error in linkAccount", error)
            }
        },
        async createUser({ user }) {
            try  {
                if(user?.id) {
                    await prisma.user.update({
                        where: {id: user.id},
                        data: { role: user.role as UserRole }
                    })
                }
            }catch(error) {
                console.error("Error in createUser event:", error)
            }
        }
    },
    callbacks: {
        async signIn({ user, account }) {
            if (account?.provider !== "credentials") return true;
            if(user.id){
                const existingUser = await getUserById(user.id);
                if(!existingUser?.emailVerified) return false
            }else {
                return false
            }
            return true
        },
        async session({session, user}) {
            try{
                session.user.role = user.role || UserRole.USER
                return session
            }catch(error) {
                session.user.role = UserRole.USER
                return session
            }
        }
    },
  });