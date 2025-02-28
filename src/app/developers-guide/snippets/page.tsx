import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const SnippetsPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold my-5">코드 스니펫 홈</h1>
      <h3 className="text-2xl font-bold my-5">다음 프로젝트에 유용한 코드 조각은 다음과 같습니다.</h3>
      <Button asChild className="bg-pink-500 hover:bg-pink-600">
        <Link href="/developers-guide/snippets/new">스니펫 생성페이지 </Link>
      </Button>
    </div>
  );
};

export default SnippetsPage;
