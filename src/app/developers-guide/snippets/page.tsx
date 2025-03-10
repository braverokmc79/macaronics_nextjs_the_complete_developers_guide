
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import Link from "next/link";
import React from "react";

const SnippetsPage = async () => {
  await new Promise((r) =>setTimeout(r,8000)); 
  const snippets = await prisma.snippet.findMany();
  
  //console.log("snippets ",  snippets);
  return (
    <div className="flex flex-col items-center  min-h-screen pt-10">
        <h1 className="text-4xl font-bold my-5">코드 스니펫 홈</h1>
      <h3 className="text-2xl font-bold my-5">다음 프로젝트에 유용한 코드 조각은 다음과 같습니다.</h3>
      <Button asChild className="bg-pink-500 hover:bg-pink-600">
        <Link href="/developers-guide/snippets/new">스니펫 생성페이지 </Link>
      </Button>

     <div className="mt-10 w-full  mx-auto">
        
      {snippets&& snippets.map((snippet: { id: number; title: string; code: string; }, index: number) => (
              <div key={snippet.id} className="max-w-lg mx-auto  mb-4 border border-gray-300 rounded-lg p-4 ">
                <h3 className="text-xl font-bold">{index+1}.제목 :
                <Link href={`/developers-guide/snippets/${snippet.id}`}>{snippet.title}</Link>               
               </h3>
                {/*              */}
              </div>
      ))} 
      </div>

    </div>
  );
};

export default SnippetsPage;
