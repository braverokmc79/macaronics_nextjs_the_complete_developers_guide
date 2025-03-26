import React from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger }from "@/components/ui/dropdown-menu";
import { PlusCircle } from "lucide-react";
import HeaderAuth from "@/components/header-auth";
import Link from "next/link";
import SearchInput from "./search-input";

const Header: React.FC = () => {


  return (
  <header className="w-full max-w-screen-2xl mx-auto  bg-white shadow-md flex 
      flex-col md:flex-row md:p-4 gap-2
      items-center justify-between">
        {/* 로고 */}
        <div className="text-xl font-bold pr-5">
          <Link href="/">Topics</Link>
        </div>
        
        {/* Topics Dropdown */}
        <div className="w-1/2  flex flex-col md:flex-row gap-2 justify-start">
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">토픽목록</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem  >
                  <Link href="/topics">토픽1</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>토픽2</DropdownMenuItem>
                <DropdownMenuItem>토픽3</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Create Topic Button */}
            <Button variant="outline" className="flex items-center gap-2">
              <PlusCircle className="w-4 h-4" /> 토픽생성
            </Button>
        </div>
  
        {/* Search Bar */}
        <SearchInput />

        
        {/* Authentication Buttons */}
        <div className="flex gap-2">
          <HeaderAuth />          
        </div>
  </header>
  );
};

export default Header;