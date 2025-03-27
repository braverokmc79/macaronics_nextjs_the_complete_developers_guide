import React, { useState } from "react";
 
import { Button } from "@/components/ui/button";
import { Drawer, DrawerClose, DrawerContent,DrawerHeader, DrawerDescription, DrawerFooter,
     DrawerTitle, DrawerTrigger } from "@/components/ui/drawer-100";
import { MenuIcon, X } from "lucide-react";
import MenuList from "./mobile-menu-list";

 
const MobileMenu:React.FC = () => {
    
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
 
 
  return (
    <Drawer direction="right"
            open={mobileMenuOpen} 
            onClose={() => setMobileMenuOpen(false)}
            onOpenChange={(open)=>setMobileMenuOpen(open)}>
        <DrawerTrigger asChild  className="cursor-pointer">
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
 
            <MenuList  className="md:flex"   />        
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
 