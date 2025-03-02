import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import React from "react";

const SnippetCreatePage: React.FC = () => {

  async function createSnippet(formData: FormData) {
    //서버 액션이 필요
    "use server";

    //form 데이터 가져오기 및 유효성 검사
    const title = formData.get("title") as string;
    const code = formData.get("code") as string;
    console.log(title, code);

    //데이터 베이스에 기록
    await prisma.snippet.create({ data: { title, code } });

    // 성공시 리다이렉트 처리
    redirect("/developers-guide/snippets/");
  }


  return (
    <form action={createSnippet}>
      <h3 className="font-bold m-3">스니펫 생성하기</h3>
      <div className="flex flex-col gap-4">

        <div className="flex gap-4">
          <label className="w-12" htmlFor="title">
            제목
          </label>
          <input name="title" className="border rounded p-2 w-full" id="title"/>
        </div>

        <div className="flex gap-4">
          <label className="w-12" htmlFor="code">
            코드
          </label>
          <textarea  name="code" className="border rounded p-2 w-full" id="code"/>
        </div>

        <button type="submit" className="rounded p-2 bg-blue-200">
          생성하기
        </button>
      </div>
    </form>
  );
};

export default SnippetCreatePage;
