
"use client";
import React from "react";
import ProductTopMenuList from "./product-top-menu-list";
import MobileMenu from "./mobile-menu";
import { useMediaQuery } from "@/hooks/use-media-query";

const ProductsNavMenu = () => {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <nav className="relative container mx-auto p-6">

      {/* 모든 항목을 위한 플렉스 컨테이너  */}
      <div className="flex items-center justify-between">
        {/* 로고/메뉴를 위한 플렉스 컨테이너 */}
        <div className="flex items-center space-x-20">
                 
          <ProductTopMenuList  className="hidden md:flex space-x-8 font-bold lg:flex"   />          
        </div>


        {!isDesktop &&  <MobileMenu /> }


      </div>      
    </nav>
  );
};

export default ProductsNavMenu;
