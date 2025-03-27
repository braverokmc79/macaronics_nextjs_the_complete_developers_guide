"use client";

import { DrawerContext } from '@/components/ui/drawer-100';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import React, { useContext } from 'react'


interface MenuItemProps {
    children: React.ReactNode,
    href: string
}

const MenuItem:React.FC<MenuItemProps> = ({children, href}) => {
  const {onClose} = useContext(DrawerContext);

  const pathname=usePathname();
  const isActive = pathname === href;

  return (
    <li>
      <Link href={href}  onClick={onClose}
          className={cn("block p-2 hover:bg-white dark:hover:bg-zinc-700  rounded-md text-muted-foreground  text-sm font-medium",
                          isActive && 
                          "bg-primary hover:bg-primary dark:hover:bg-primary hover:text-primary-foreground text-primary-foreground ")}
                        >
          {children}
      </Link>
    </li>
  )

}

export default MenuItem;