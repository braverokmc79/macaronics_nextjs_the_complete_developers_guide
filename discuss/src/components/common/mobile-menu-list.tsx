import React from "react";
import {cn} from "@/lib/utils";
import MenuItem from "./mobile-menu-item";
import MenuTitle from "./mobile-menu-title";
import LeftAccordionMenu from "./LeftAccordionMenu";


interface MainMenuProps {
  className?: string; 
}

const MenuList: React.FC<MainMenuProps> = ({className}) => {
  return (
    <nav className={cn(`bg-muted overflow-auto p-4 flex flex-col`,className)}  >

      <header className="border-b dark:border-b-black border-b-zinc-300  pb-4">
        <MenuTitle />
      </header>

      <ul className="py-4 grow flex flex-col gap-1">
      <MenuItem href="/dashboard" >대시보드</MenuItem>
        <MenuItem href="/dashboard/userInfo" >유저정보</MenuItem>   
        <MenuItem href="/dashboard/userInfo/update">시용자업데이트</MenuItem>
        <MenuItem href="/dashboard/teams">팀</MenuItem>
        <MenuItem href="/dashboard/employee">직원</MenuItem>
        <MenuItem href="/dashboard/account">시용자정보</MenuItem>
        <MenuItem href="/dashboard/settings">설정</MenuItem>
        <MenuItem href="/dashboard/nested-menu">3단메뉴</MenuItem>        
        <MenuItem href="/dashboard/payments">결제</MenuItem>
        <MenuItem href="/products">상품</MenuItem>
        <MenuItem href="/dashboard/daum-address">다음주소입력</MenuItem>

        
        <LeftAccordionMenu 
          title="팀"
          value="teams"
          basePath="/dashboard/teams"
          items={[
            { label: "팀 목록", href: "/dashboard/teams" },
            { label: "팀 추가", href: "/dashboard/teams/new" },
          ]}                
        />
      </ul>

    </nav>
  );
};

export default MenuList;
