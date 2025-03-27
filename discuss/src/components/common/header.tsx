"use client";
import React, { Suspense } from "react";

import HeaderAuth from "@/components/common/header-menu-auth";
import Link from "next/link";
import SearchInput from "./header-search-input";
import MobileMenu from "./mobile-menu";
import HeaderMenu from "./header-menu";
import { useMediaQuery } from '@/hooks/use-media-query'

const Header: React.FC = () => {

  const isDesktop = useMediaQuery("(min-width: 768px)");

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
            <HeaderMenu />                  
        </div>
  
        {/* Search Bar */}
        <Suspense fallback={<div>로딩 중...</div>}>
          <SearchInput />
        </Suspense>

        
        {/* Authentication Buttons */}
        <div className="flex gap-2">
          <HeaderAuth />          
        </div>


        {!isDesktop && <MobileMenu  /> }
        
  </header>
  );
};

export default Header;