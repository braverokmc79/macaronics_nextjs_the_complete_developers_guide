import { deleteSnippetAction } from '@/app/actions/prisma/snippets/snippetsAction';
import { Button } from '@/components/ui/button';
import prisma from '@/lib/prisma';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react'
import SnippetDeleteButton from '../../components/snippets/SnippetDeleteButton';

interface SnippetShowPageProps {
    params: {
        snippetId: string;
    };
}
const SnippetShowPage:React.FC<SnippetShowPageProps> =async (props) => {
  await new Promise((r) =>setTimeout(r,3000));
  const { snippetId } = await props.params;
  const snippet = await prisma.snippet.findFirst({
    where: { id: parseInt(snippetId) },
  });    
  
  if(!snippet) {
    return notFound();
  }

  return (
    <div className='flex flex-col items-center justify-center pt-28 '>
      <h2 className=' w-full text-1xl font-bold flex flex-col justify-end'> 상세 페이지</h2>
      <h2 className='text-3xl font-bold'>제목 :{snippet?.title}</h2>
      
      <p className="mt-2 mb-2">코드 : </p>
      <textarea readOnly className="w-full h-40  rounded-lg p-2 resize-none"
       defaultValue={snippet.code}></textarea> 

       <div className='flex gap-2 mt-3'> 
          <Button asChild className="bg-green-500 hover:bg-green-600">
            <Link href={`/developers-guide/snippets/${snippet.id}/edit/`}>수정하기</Link>
          </Button>


          {/* 삭제 버튼 부분 수정 */}
          <SnippetDeleteButton snippetId={snippet.id} />
       </div>
    </div>
  )
}

export default SnippetShowPage;