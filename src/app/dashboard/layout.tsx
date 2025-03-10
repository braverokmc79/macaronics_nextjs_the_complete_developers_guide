import React from "react";
import { auth } from "@/auth";
import DashboardLayoutClient from "./layoutClient";
import { redirect } from "next/navigation";
import { Session } from "next-auth";
interface UserSession extends Session {
    user: {
      name: string;
      email: string;
      image: string;
    };
  }
  

interface DashboardLayoutProps {
    children: React.ReactNode;
}

const DashboardLayout = async ({ children }: DashboardLayoutProps) => {
    const session  = await auth();
    const username = session?.user?.name;
    if(!username)redirect("/");

    return <DashboardLayoutClient username={username} session={session as UserSession}>{children}</DashboardLayoutClient>;
};

export default DashboardLayout;
