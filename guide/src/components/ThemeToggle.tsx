'use client';
import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function ThemeToggle({className}: {className?: string}) {
  const { setTheme } = useTheme();

// ✅ 밝은 테마, 어두운 테마, 기기 테마는 설정 안 해도 자동으로 적용됨
// ✅ 커스텀 테마(sepia, blue 등)는 CSS에서 직접 스타일을 설정해야 적용됨
return (
  <div className={className}>
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant='outline' size='icon'>
        <Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
        <Moon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
        <span className='sr-only'>Toggle theme</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align='end'>
      <DropdownMenuItem onClick={() => setTheme('light')}>☀️ 밝은 테마</DropdownMenuItem>
      <DropdownMenuItem onClick={() => setTheme('zinc')}>🌙 어두운 테마</DropdownMenuItem>
      <DropdownMenuItem onClick={() => setTheme('yellow')}> 🟡 옐로우 테마</DropdownMenuItem>
      <DropdownMenuItem onClick={() => setTheme('blue')}>🔵 블루 테마</DropdownMenuItem>
      <DropdownMenuItem onClick={() => setTheme('green')}>🟢 그린 테마</DropdownMenuItem> 
    </DropdownMenuContent>
  </DropdownMenu>
  </div>
);
}
