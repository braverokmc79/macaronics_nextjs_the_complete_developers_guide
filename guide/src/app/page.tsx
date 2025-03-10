"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState, useEffect } from "react";

const RootPage: React.FC = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  if (!isClient) return null;

  return (
    <>
      <div className="w-full  flex flex-col gap-4 min-h-screen p-2 md:p-24  items-center justify-center">
        <h1 className="flex gap-2 items-center  ">
        <span className="text-5xl font-bold text-pink-500">M</span>
          Macaronics.net
        </h1>

        <div className="flex gap-2 items-center mb-10">
          <Button asChild className="bg-pink-500 hover:bg-pink-600">
            <Link href="/dashboard">대시보드</Link>
          </Button> 

          <Button asChild className="bg-pink-500 hover:bg-pink-600">
            <Link href="/products">상품목록</Link>
          </Button> 

          <Button asChild className="bg-pink-500 hover:bg-pink-600">
            <Link href="/developers-guide">개발 가이드</Link>
          </Button>        
        </div>


        <div className="flex gap-2 items-center">
          <Button asChild>
            <Link href="/auth/signin">로그인</Link>
          </Button>
          <small>또는</small>
          <Button asChild variant="outline">
            <Link href="/auth/new-user">회원가입</Link>
          </Button>
        </div>
      </div>
    </>
  );
};
export default RootPage;
