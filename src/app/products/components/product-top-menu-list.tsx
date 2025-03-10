"use client";
import Link from 'next/link';
import React from 'react'
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

interface ProductTopMenuListProps {
  className?: string;   
}

const ProductTopMenuList:React.FC<ProductTopMenuListProps> = ({className}) => {
   const pathname=usePathname();  
   const menuDeafultClass ="bg-gray-200 text-gray-700 hover:bg-gray-300 p-2 md:bg-white md:p-0 md:hover:bg-white md:hover:text-black" ;
   const menuActiveClass ="bg-pink-200 text-gray-700 hover:bg-pink-300 p-2 md:bg-white md:p-0 md:hover:bg-white md:hover:text-black" ;

  return (
      <div className={`${className} `}>
            <Link href="/"  className={cn(pathname==="/"? menuActiveClass:menuDeafultClass )}>
            홈
            </Link>
            <Link href="/products"  className={cn(pathname==="/products"? menuActiveClass:menuDeafultClass )}>
            상품목록
            </Link>  
            <Link href="/dashboard" className={cn(pathname==="/dashboard"? menuActiveClass:menuDeafultClass )} >
            대시보드
            </Link>  
      </div>  
  )
}

 

export default ProductTopMenuList;