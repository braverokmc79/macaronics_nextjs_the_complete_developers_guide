"use client";
import React, { useState } from "react";
import { Toaster } from "@/components/ui/custom-toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface ProvidersProps {
  children: React.ReactNode;
}
 
const Providers: React.FC<ProvidersProps> = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <ThemeProvider
      attribute="data-theme"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
     <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>; 
      <Toaster />
    </ThemeProvider>
  );
};
 
export default Providers;