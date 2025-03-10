"use client";
import { createSnippet } from "@/app/actions/prisma/snippets/snippetsAction";
import React, { useActionState ,startTransition  } from "react";

const SnippetCreatePage: React.FC = () => {

  const [formState, action] =useActionState(createSnippet, {message: ""});

  /**
   * 전송전 유효성 체크 방법
   * @param event 
   */
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const title=formData.get("title");
    if (!title) {
      alert("제목을 입력해 주세요.");
    }
  
    startTransition(() => {
      action(formData);
    });
  }


  return (
    <div className="max-w-screen-2xl mx-auto h-screen ">
     

    <form onSubmit={handleSubmit}  className=" w-1/2 mx-auto pt-32">
      
        {formState.message 
        ?(
          <div className="my-2 p-2 bg-red-200 border rounded border-red-50">
            {formState.message}          
          </div>
        ):null
        
        }

      <h3 className="font-bold text-2xl mb-3">스니펫 생성하기</h3>
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
    </div>
  );
};

export default SnippetCreatePage;
