// src/auth.config.ts
import { NextAuthConfig } from "next-auth";

export const authConfig: Partial<NextAuthConfig> = {
    session: {
      strategy: "jwt",
    },
    providers: [],
};
  
