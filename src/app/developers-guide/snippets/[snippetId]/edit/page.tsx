import prisma from '@/lib/prisma';

import { notFound } from 'next/navigation';
import React from 'react'
import SnippetEditForm from '../../components/snippet-edit-form';

//export const dynamic ="force-dynamic";
//export const revalidate = 0;


interface SnippetEditPageProps{
 params : Promise<{ snippetId?: string }>;
}

const SnippetEditPage:React.FC<SnippetEditPageProps> =async ({params}) => {
  const resolvedParams  = await params ;
  if (!resolvedParams ) return notFound(); 

  const snippet = await prisma.snippet.findFirst({where:{id:1}});  
  if((!snippet)) return notFound();


  return (

    <div className="max-w-screen-2xl mx-auto h-screen ">
      
       <SnippetEditForm snippet={snippet} />  
    </div>

  )
}

export default SnippetEditPage;