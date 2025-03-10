"use client";
import React from 'react'
import MainMenu from './components/main-menu'
import MenuTitle from './components/menu-title'
import MobileMenu from './components/mobile-menu'
import { useMediaQuery } from '@/hooks/use-media-query';
import { Session } from 'next-auth';

interface UserSession extends Session {
    user: {
      name: string;
      email: string;
      image: string;
    };
  }
  

interface DashboardLayoutClientProps {
    children: React.ReactNode;
    username: string;
    session: UserSession
}


const DashboardLayoutClient: React.FC<DashboardLayoutClientProps> = ({ children, username,session }) => {
    const isDesktop = useMediaQuery("(min-width: 768px)");

    return (
        <div className='grid md:grid-cols-[250px_1fr] px-3 md:px-0 h-screen'>
            <MainMenu session={session} className="hidden md:flex" />
            {!isDesktop && (
                <div className='p-4 flex justify-between md:hidden sticky top-0 left-0 bg-background border-b border-border'>
                    <MenuTitle />
                    <MobileMenu   />
                </div>
            )}
            <div className='overflow-auto py-2 px-6 mt-5'>
                <h1 className='pb-4 text-2xl font-bold'>환영합니다. {username}님!</h1>
                {children}
            </div>
        </div>
    );
};

export default DashboardLayoutClient;
