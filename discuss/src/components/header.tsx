import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger }from "@/components/ui/dropdown-menu";
import { Search, PlusCircle } from "lucide-react";
import HeaderAuth from "@/components/header-auth";
import Link from "next/link";

const Header: React.FC = () => {


  return (
  <header className="w-full max-w-screen-2xl mx-auto  p-4 bg-white shadow-md flex items-center justify-between">
        {/* 로고 */}
        <div className="text-xl font-bold">
          <Link href="/">Topics</Link>
        </div>
        
        {/* Topics Dropdown */}
        <div className="flex flex-col md:flex-row gap-2">
            
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
        <div className="relative w-64">
          <Input type="search" placeholder="검색..." className="pl-10" />
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
        </div>
        
        {/* Authentication Buttons */}
        <div className="flex gap-2">
          <HeaderAuth />          
        </div>
  </header>
  );
};

export default Header;