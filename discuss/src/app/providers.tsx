"use client";

import { HeroUIProvider } from "@heroui/system";
import React from "react";
import { SessionProvider } from 'next-auth/react';

interface ProvidersProps {
  children: React.ReactNode;
}
 
const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <SessionProvider>
      <HeroUIProvider>    
        <main className="text-foreground bg-background">
          {children}      
        </main>
      </HeroUIProvider>
    </SessionProvider>
  );
};
 
export default Providers;