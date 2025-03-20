import NextAuth from "next-auth";
import Github from "next-auth/providers/github";
import { PrismaAdapter } from '@auth/prisma-adapter';
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "./db";


const GITHUB_ID = process.env.GITHUB_ID;
const GITHUB_SECRET = process.env.GITHUB_SECRET;

if(!GITHUB_ID || !GITHUB_SECRET) {
    throw new Error("Missing GITHUB_CLIENT_ID or GITHUB_CLIENT_SECRET");
}

export const {
    handlers: { GET, POST },
    auth,
    signOut,
    signIn,
  } = NextAuth({
    adapter: PrismaAdapter(db),

    providers: [

      CredentialsProvider({
        name: "Credentials",
         credentials: {            
           username: {label: "username", type: "text", required: true},
           password: {label: "password", type: "password", required: true },
         },   
         async authorize(credentials) {
          if (credentials?.username === "admin" && credentials?.password === "password") {
            return { id: "1", name: "Admin User" };
          }
          return null;
        }      
      }),
  
      Github({
        clientId: GITHUB_ID as string,
        clientSecret: GITHUB_SECRET as string,
        authorization: {
          params: {
            prompt: "consent",
            access_type: "offline",
            response_type: "code",
          },
        },
      }),
    ],
    callbacks: {
      // Usually not needed, here we are fixing a bug in nextauth
      async session({ session, user }) {
        if (session && user) {
          session.user.id = user.id;
        }
        return session;
      },
    },    
    secret: process.env.NEXTAUTH_SECRET,
});
  

