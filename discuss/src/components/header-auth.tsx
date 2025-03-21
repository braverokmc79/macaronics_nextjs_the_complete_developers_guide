"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {  LogIn, LogOut,  } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { signIn, signUp,signOut } from "@/actions/auth";
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover";
import { useSession } from "next-auth/react";

const HeaderAuth: React.FC = () => {
  const session =useSession();
  

  let authContent:React.ReactNode;
  if(session.status === "loading"){
    
      authContent=null;

  } else if (session.data?.user) {
    authContent =
     <>
     <div className="relative">
     <Popover >
      <PopoverTrigger asChild>
          <Avatar className="cursor-pointer">
            <AvatarImage src={session.data.user.image || 'https://i.pravatar.cc/150?u=a042581f4e29026024d'} />
            <AvatarFallback>{session.data.user.name?.toUpperCase().slice(0, 2)}</AvatarFallback>
          </Avatar>
      </PopoverTrigger>
      <PopoverContent className="w-40 relative right-21 ">
        <div className="grid gap-4  justify-center" >          
          <form action={signOut}>
          <Button variant="outline" className="flex items-center gap-2 focus:outline-none cursor-pointer">
                <LogOut className="w-4 h-4" /> 로그아웃
          </Button>
        </form>
        </div>
      </PopoverContent>
      </Popover>

    </div>
    </>
    ;             
  }else{
    authContent=<>
      <form action={signIn}>
        <Button type="submit"  variant="outline" className="flex items-center gap-2 cursor-pointer">
              <LogIn className="w-4 h-4" /> 로그인
        </Button>
      </form>

      <form action={signUp}>
        <Button type="submit"  variant="outline" className="flex items-center gap-2 cursor-pointer">
              <LogIn className="w-4 h-4" /> 회원가입
        </Button>
      </form>
    </>
  }

  return (
    <>
      {authContent}
    </>
  );
};

export default HeaderAuth;