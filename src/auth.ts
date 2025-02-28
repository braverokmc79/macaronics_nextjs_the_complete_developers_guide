// src/auth.ts
import NextAuth, { NextAuthConfig  } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import FacebookProvider from "next-auth/providers/facebook";
import AppleProvider from "next-auth/providers/apple";
import KakaoProvider from "next-auth/providers/kakao";
import NaverProvider from "next-auth/providers/naver";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { CredentialsProviderError } from "./utils/CredentialsProviderError";
import { UserType } from "./types/UserType";


import { User } from "./model/mongo/user-model";
import { dbConnect } from "./lib/mongo";
import prisma from "@/lib/prisma";
import { supabase } from "@/lib/supabaseClient";
import { authConfig } from "./auth.config";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,

  providers: [
    CredentialsProvider({
      name: "Credentials",
       credentials: {        
        //  email: { label: "Email", type: "email", required: true },
        //  password: { label: "Password", type: "password", required: true },
         email: {},
         password: {},
       },
   
      async authorize(credentials: Partial<Record<"email" | "password", unknown>>):Promise<UserType|null> {
    
        if (!credentials || !credentials.email || !credentials.password) {
          throw new CredentialsProviderError( "이메일과 비밀번호를 입력해주세요.", "email");
        }
    
        const email = credentials.email as string;
        const password = credentials.password as string;
        

        let user =null;
        const SERVER_ACTIONS_TYPE = process.env.NEXT_SERVER_ACTIONS_TYPE || "mongoose"; // 기본값: mongoose

        if(SERVER_ACTIONS_TYPE=== "mongoose"){//1.몽고 데이터베이스 연결
          await dbConnect();
          user = await User.findOne({email: email}) as UserType;
          
        }else if(SERVER_ACTIONS_TYPE === "prisma"){//2. prisama 데이터베이스 연결
          user=await prisma.user.findUnique({where: { email:email }}) as UserType;

        }else if(SERVER_ACTIONS_TYPE === "supabase"){//3. supabase 데이터베이스 연결            
           const { data: supabaseUser} = await supabase.from("users").select("*").eq("email", email).single();
           user = supabaseUser;
        }
        
        

        if (!user) throw new CredentialsProviderError("해당 이메일의 사용자를 찾을 수 없습니다.", "email");   

        const isMatch = await bcrypt.compare(password, user.password);       
        if (!isMatch) throw new CredentialsProviderError("비밀번호가 일치하지 않습니다.","password");
    
       
        return user;
      },
    }),
    
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
    }),
    AppleProvider({
      clientId: process.env.APPLE_CLIENT_ID as string,
      clientSecret: process.env.APPLE_CLIENT_SECRET as string,
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID as string,
      clientSecret: process.env.KAKAO_CLIENT_SECRET as string,
    }),
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID as string,
      clientSecret: process.env.NAVER_CLIENT_SECRET as string,
    }),
  ],

  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
    newUser: '/auth/new-user',
    
  },
  debug: false, // 디버그 로그 비활성화
} satisfies NextAuthConfig);
