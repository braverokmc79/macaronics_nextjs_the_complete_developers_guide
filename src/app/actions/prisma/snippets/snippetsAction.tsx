"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


export async function snippetsAction( id:number,  code : string, data: FormData ) {


    // Get form data
    const title = data.get('title') as string;
 
    console.log("액션 :" ,id, code,title);
    
    await prisma.snippet.update({
      where: {
        id: id,
      },
      data: {
        title: title,
        code: code,
      },
    });

    redirect("/developers-guide/snippets/");
}


export async function deleteSnippetAction(id: number) {
   if(!id) return;
   console.log( "삭제할아이디", id);
  await prisma.snippet.delete({
    where: {
      id: id,
    },
  });

  revalidatePath("/developers-guide/snippets/");
  redirect("/developers-guide/snippets/");
}
