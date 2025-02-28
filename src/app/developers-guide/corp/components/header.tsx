import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { auth } from "@/auth";

const DevelopersGuideHeader: React.FC =async () => {
  const session=await auth();  
  console.log(" 현재 로그인된 사용자 세션 정보 가져오기  : " ,session);

  return (
    <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row  items-center justify-center relative z-10  gap-3 pt-3 ">
      <nav className="w-full grid  md:grid-cols-[20%_1fr_1fr] ">
        
        <Link href="/developers-guide/corp" 
            className="flex text-3xl px-3 md:px-0 items-center font-bold text-white hover:text-pink-500" >
            Corp Home
        </Link>


        <div className="flex flex-col p-3 items-center md:flex-row gap-6 justify-center  ">
              <Link href="/dashboard" 
                className="text-1xl font-bold text-yellow-500 hover:text-white" >            
                대시보드
              </Link>

              <Link href="/products" 
                className="text-1xl font-bold text-yellow-500 hover:text-white" >            
                제품
              </Link>

              
              <Link href="/developers-guide" 
                className="text-1xl font-bold text-yellow-500 hover:text-white" >            
                개발가이드
              </Link>
        </div>


        <div className="flex flex-col p-3 items-center md:flex-row gap-4 justify-end">
        
          <Link href="/developers-guide/corp/performance"
            className="text-1xl font-bold text-white hover:text-pink-500" >            
            성능
          </Link>

          <Link href="/developers-guide/corp/reliability"
            className="text-1xl font-bold text-white hover:text-pink-500" >            
            신뢰
          </Link>

          <Link  href="/developers-guide/corp/scale"
            className="text-1xl font-bold text-white hover:text-pink-500"   >
            규모
          </Link>


         <div className="flex gap-2">
            {(!session || !session.user  || !session.user.name) && 
            (<>
              <Button variant="outline" asChild className="h-10">
                <Link href="/auth/signin">로그인</Link>
              </Button>
              <Button asChild className="h-10">
                <Link href="/auth/new-user">회원가입</Link>
              </Button>
              </>
            )
              }
            {/* 로그아웃 버튼: 추후 인증 상태 체크 후 조건부 렌더링 가능 */}
            {(session &&  session.user  && session.user.name) && 
              <Button asChild  variant="destructive" className="h-10">
                <Link href="/auth/signout">로그아웃</Link>
              </Button>
            }
        </div>

        </div>
      </nav>
    </div>
  );
};

export default DevelopersGuideHeader;
