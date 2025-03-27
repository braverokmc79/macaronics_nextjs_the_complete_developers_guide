"use client";

import { usePathname } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useEffect, useState } from "react";
import MenuItem from "./mobile-menu-item";


interface AccordionMenuItem {
  label: string;
  href: string;
}

interface LeftAccordionMenuProps {
  title: string;
  value: string; // 고유 ID
  basePath: string; // 기준 경로 (pathname.startsWith)
  items: AccordionMenuItem[];
}

const LeftAccordionMenu: React.FC<LeftAccordionMenuProps> = ({
  title,
  value,
  basePath,
  items,
}) => {
  const pathname = usePathname();
  const [openValue, setOpenValue] = useState<string | undefined>(undefined);
 // const isActive = pathname.startsWith(basePath);

    // pathname이 바뀔 때마다 상태 갱신
    useEffect(() => {
     if (pathname.startsWith(basePath)) {        
        setOpenValue(value); 
      } else {
        setOpenValue(undefined); // 닫기
      }
   }, [pathname, basePath, value]);


  return (
    <Accordion
      type="single"
      collapsible      
      value={openValue}
      //defaultValue={isActive ? value : undefined}
      className="w-full ml-2"
      onValueChange={(val) => setOpenValue(val)}
    >
      <AccordionItem value={value}>
        <AccordionTrigger>{title}</AccordionTrigger>
        <AccordionContent className="flex flex-col pl-4">
          {items.map((item) => (
            <MenuItem key={item.href} href={item.href}>
              {item.label}
            </MenuItem>
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default LeftAccordionMenu;
