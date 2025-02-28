import React from "react";
import MenuTitle from "./menu-title";
import MenuItem from "./menu-item";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import {cn} from "@/lib/utils";
import { doLogout } from "@/app/actions/auth/loginActions";
import { signOut } from "next-auth/react";
import Image from "next/image";

interface MainMenuProps {
  className?: string; 
  setMobileMenuOpen?: React.Dispatch<React.SetStateAction<boolean>>
  session?: any
}

const MainMenu: React.FC<MainMenuProps> = ({className, setMobileMenuOpen ,session}) => {
  return (
    <nav className={cn(`bg-muted overflow-auto p-4 flex flex-col`,className)}  >

      <header className="border-b dark:border-b-black border-b-zinc-300  pb-4">
        <MenuTitle />
      </header>

      <ul className="py-4 grow flex flex-col gap-1">
        <MenuItem href="/dashboard" >대시보드</MenuItem>
        <MenuItem href="/dashboard/teams">팀</MenuItem>
        <MenuItem href="/dashboard/employee">직원</MenuItem>
        <MenuItem href="/dashboard/account">시용자정보</MenuItem>
        <MenuItem href="/dashboard/settings">설정</MenuItem>
        <MenuItem href="/dashboard/payments">결제</MenuItem>
        <MenuItem href="/products">상품</MenuItem>
        <MenuItem href="/developers-guide">개발가이드</MenuItem>
      </ul>


      <footer className="flex gap-2 items-center">
       
      { (session && session.user.image && session.user.name) && <Image
              src={session.user.image as string}
              alt={session.user.name as string}
              width={48}
              height={48}
              className="rounded-full"
            /> }
            
        {!(session && session.user.image && session.user.name) && 
               <Avatar  className="w-12 h-12">
                    <AvatarFallback className="bg-pink-300 dark:bg-pink-800">
                      {" "}
                      MA{" "}
                    </AvatarFallback>
              </Avatar>
         }        
        <Link href="#" onClick={doLogout}     className="hover:underline">
          로그아웃
        </Link>
        <ThemeToggle className="ml-auto" />
      </footer>
    </nav>
  );
};

export default MainMenu;
