import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {  Search } from "lucide-react";
import Link from "next/link";
import { auth } from "@/auth";


export default async function SearchBar() {
  // 현재 로그인된 사용자 세션 정보 가져오기
  const session=await auth();
  console.log(" 현재 로그인된 사용자 세션 정보 가져오기  : " ,session);

  return (
    <header className="flex flex-col gap-3 md:gap-0  md:flex-row p-0 md:p-4  items-center justify-between  bg-white shadow-sm">
      
      <div className="flex items-center">  
        <Link href="/products" className="flex items-center">
          <span className="text-4xl font-bold text-pink-500 mr-2">M</span>        
          <div className="text-xl font-bold"> Macaronics.net</div>
        </Link>    
      </div>         
     
      {/* 검색창 */}
      <div className="relative w-full  md:w-1/3">
        <Input 
          type="text" 
          placeholder="새해 커리어 레벨업도 마카로닉스 캠퍼스에서!" 
          className="pl-10 pr-4 py-2 w-full rounded-lg border"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
      </div>
      
        {/* 로그인, 회원가입, 로그아웃 버튼 */}

        
        <div className="flex gap-2">
          {(!session || !session.user  || !session.user.name) && 
          (<>
            <Button variant="outline" asChild>
              <Link href="/auth/signin">로그인</Link>
            </Button>
            <Button asChild>
              <Link href="/auth/new-user">회원가입</Link>
            </Button>
            </>
          )
            }
          {/* 로그아웃 버튼: 추후 인증 상태 체크 후 조건부 렌더링 가능 */}
          {(session &&  session.user  && session.user.name) && 
            <Button asChild  variant="destructive">
               <Link href="/auth/signout">로그아웃</Link>
            </Button>
          }
      </div>
    </header>
  );
}
