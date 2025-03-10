"use client";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Drawer, DrawerClose, DrawerContent,DrawerHeader, DrawerDescription, DrawerFooter, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { MenuIcon, X } from "lucide-react";
import ProductTopMenuList from "./product-top-menu-list";




const MobileMenu:React.FC = () => {
   
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);


  return (
    <Drawer direction="right" 
            open={mobileMenuOpen} 
            onClose={() => setMobileMenuOpen(false)}
            onOpenChange={(open)=>setMobileMenuOpen(open)}>
        <DrawerTrigger asChild>
        <MenuIcon/>
        </DrawerTrigger>
        <DrawerContent>
        <DrawerHeader className="hidden">
            <DrawerTitle>
            </DrawerTitle>
            <DrawerDescription></DrawerDescription>
        </DrawerHeader>

        <div className="p-0 h-full bg-muted">
            <DrawerClose asChild className="absolute top-4 right-4">
                <Button variant="ghost"  className="w-10 h-10 p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-all">
                    <X className="w-5 h-5" />
                </Button>
            </DrawerClose>


            <div className="p-3">
            <h4 className='flex items-center text-2xl'>
                <span className="text-4xl font-bold text-pink-500 mr-2">M</span>  Macaronics.net
            </h4>
             <ProductTopMenuList  className="mt-5 flex flex-col font-bold gap-3" />        
            </div>
        </div>

        <DrawerFooter  className="hidden">
            <DrawerClose asChild>
            <Button variant="secondary">닫기</Button>
            </DrawerClose>
        </DrawerFooter>
        </DrawerContent>
  </Drawer>
  )
}

export default MobileMenu;