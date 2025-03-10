"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import LoginForm from "@/app/auth/components/login-form";
import SocialLogin from "@/app/auth/components/social-login";

const SignInPage: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  if (!isClient) return null;

  return (
    <div className="w-full max-w-sm mx-auto" suppressHydrationWarning>
      <Link  href="/"
        className="w-full block text-5xl text-center mb-5 font-bold text-pink-500"  >            
        M
      </Link>
      <Card className="w-full max-w-sm mx-auto" suppressHydrationWarning>
        <CardHeader>
          <CardTitle className="text-3xl text-center">로그인</CardTitle>
          <CardDescription className="text-right">계정에 로그인하세요.</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />

          <SocialLogin />
        </CardContent>
        <CardFooter className="flex justify-between">
          <small> 계정이 없으신가요?</small>
          <Button asChild variant="outline" size="sm">
            <Link href="/auth/new-user">회원가입</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
export default SignInPage;
