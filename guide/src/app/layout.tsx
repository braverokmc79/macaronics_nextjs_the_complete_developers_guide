import type { Metadata } from "next";
import {  Poppins, Geist } from "next/font/google";
import { cn } from "@/lib/utils";;
import { cookies } from "next/headers"; 
 
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import Providers from "./provders";

// 폰트 설정
// const notoSansKR = Noto_Sans_KR({
//   subsets: ["latin"], 
//   weight: ["400", "500", "600", "700", "800", "900"],
//   variable: "--font-noto-sans-kr",
// });
 
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});
 
const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});
 
export const metadata: Metadata = {
  title: "Create Next App",
  description: "macaronics.net Next Auth 샘플",
};
 
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
   // 서버에서 다크 모드 쿠키 가져오기
   const darkModeCookie = (await cookies()).get("dark-mode")?.value;
   const isDarkMode = darkModeCookie === "true"; 

  return (
  //  ${notoSansKR.variable},
    <html lang="ko"  suppressHydrationWarning>
      <body
        className={cn(
          `antialiased,      
          ${poppins.variable},
          ${geistSans.variable},
          ${isDarkMode ? "dark" : ""}
        `)}
      >
    
       <SessionProvider>
          <Providers>        
            {children}
          </Providers>
        </SessionProvider>
      </body>
    </html>
  );
}