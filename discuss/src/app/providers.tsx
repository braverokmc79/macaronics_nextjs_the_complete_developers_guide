"use client";

import { HeroUIProvider } from "@heroui/system";
import React from "react";


interface ProvidersProps {
  children: React.ReactNode;
}
 
const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <HeroUIProvider>    
       <main className="text-foreground bg-background">
         {children}      
      </main>
    </HeroUIProvider>
  );
};
 
export default Providers;