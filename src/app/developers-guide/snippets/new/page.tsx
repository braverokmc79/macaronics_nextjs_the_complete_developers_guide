import React from "react";

const SnippetCreatePage: React.FC = () => {
  return (
    <form>
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
