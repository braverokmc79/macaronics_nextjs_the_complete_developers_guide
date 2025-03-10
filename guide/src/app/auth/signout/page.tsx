"use client";

import { signOut } from "next-auth/react";
import { useEffect } from "react";

export default function SignOutPage() {

  useEffect (() => {
    signOut({ callbackUrl: "/" });
  }, []);

  return null;

  // return (
  //   <div className="flex flex-col items-center justify-center min-h-screen">
  //     <h1 className="text-2xl font-bold">로그아웃</h1>
  //     <button 
  //       onClick={() => signOut({ callbackUrl: "/" })} 
  //       className="mt-4 p-2 bg-red-500 text-white rounded"
  //     >
  //       로그아웃하기
  //     </button>
  //   </div>
  // );
}
