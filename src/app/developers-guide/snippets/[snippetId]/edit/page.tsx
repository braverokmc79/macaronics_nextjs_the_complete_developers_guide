import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import React from 'react'
import SnippetEditForm from '../../components/snippet-edit-form';

interface SnippetEditPage{
  params: { snippetId: string };
}

const SnippetEditPage:React.FC<SnippetEditPage> =async ({params}) => {
 
  const {snippetId} = await params;

  const snippet = await prisma.snippet.findFirst({where:{id:parseInt(snippetId)}});
  
  if((!snippet)) return notFound();


  return (

    <div className="max-w-screen-2xl mx-auto h-screen ">
      
        <SnippetEditForm snippet={snippet} />
    </div>

  )
}

export default SnippetEditPage;