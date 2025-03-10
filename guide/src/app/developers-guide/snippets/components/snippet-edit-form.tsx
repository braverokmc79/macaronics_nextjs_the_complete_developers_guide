"use client";
import React, {  useState } from 'react'
import Editor from '@monaco-editor/react';
import { snippetsUpdateAction } from '@/app/actions/prisma/snippets/snippetsAction';


interface Snippet {
  id: number; 
  title: string;
  code: string;
 
}


interface SnippetEditFormProps {
  snippet: Snippet;
}

const SnippetEditForm: React.FC<SnippetEditFormProps> = ({snippet}) => {
  const [code, setCode] = useState(snippet.code);
  //const [formState, action] = useActionState(action);

  const action=snippetsUpdateAction.bind(null,snippet.id, code);

  const handleEditorChange = (value: string="") => {
    console.log(value);
    setCode(value);
  };



  return (
    <form  action={action}    className=" w-1/2 mx-auto pt-32">
      
    <h3 className="font-bold text-2xl mb-3">스니펫 수정하기  </h3>
    <div className="flex flex-col gap-4">

      <div className="flex gap-4">
        <label className="w-12" htmlFor="title">
          제목
        </label>
        <input name="title" className="border rounded p-2 w-full" id="title"
          defaultValue={snippet.title}
        />
      </div>

      <div className="flex gap-4">
        <label className="w-12" htmlFor="code">
          코드
        </label>
        <Editor 
         
          height="40vh"
          defaultLanguage="javascript"
          theme='vs-dark'
          defaultValue={code}
          options={
            {
            minimap:{enabled:false},
          }}
          onChange={handleEditorChange}
        />
      </div>


      <button type="submit" className="rounded p-2 bg-blue-200">
        수정하기
      </button>
    </div>
  </form>
  )
}

export default SnippetEditForm;