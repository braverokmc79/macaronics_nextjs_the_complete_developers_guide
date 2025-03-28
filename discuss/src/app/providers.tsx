"use client";

import { HeroUIProvider } from "@heroui/system";
import React, { useState } from "react";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

interface ProvidersProps {
  children: React.ReactNode;
}


const Providers: React.FC<ProvidersProps> = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient());

  
  return (
    <SessionProvider>
      <HeroUIProvider>
        <QueryClientProvider client={queryClient}>
          <main className="text-foreground bg-background">{children}</main>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </HeroUIProvider>
    </SessionProvider>
  );
};

export default Providers;
