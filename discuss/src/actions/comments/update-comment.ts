"use server";
import { auth } from "@/auth";
import { db } from "@/db";
import paths from "@/paths";
import type { Comment, Post } from "@prisma/client";
import { revalidatePath } from "next/cache";

import {z} from "zod";

const updateCommentSchema = z.object({
   id: z.string({required_error:"ID를 입력해 주세요."}),
   slug: z.string({required_error:"slug를 입력해 주세요."}),    
   content:z.string({required_error:"내용을 입력해 주세요."}).min(3,{message:"내용은 최소 3글자 이상이어야 합니다."}),
});

interface UpdateCommentFormStateProps {   
    success?: boolean; 
    errors: { 
        content?: string[];
        _form?: string[]; 
    };
}


export async function updateComment(formState: UpdateCommentFormStateProps, formData: FormData) 
:Promise<UpdateCommentFormStateProps>
{
    const session=await auth();
    if (!session?.user?.id) {
        return { success: false, errors: { _form: ["로그인 후 이용할 수 있습니다."] } };
    }

    const result=updateCommentSchema.safeParse({
        id: formData.get('id'),
        slug: formData.get('slug'),
        content: formData.get('content')}
    );

    if (!result.success) {
       return{
        success:false,
        errors:result.error.flatten().fieldErrors
       }
    }

    const { id, slug, content} =result.data;


    let getComment: Comment & { post: Post } | null = null;
    try {        

       await db.comment.update({
                where: {id: id},
                data: {
                    content,
                }
        });

        getComment=  await db.comment.findUnique({
            where:{id: result.data.id} ,
            include:{
                post:true,

            }       
        });

        if(getComment){
            revalidatePath("/");
            revalidatePath(paths.postShow(slug, getComment.postId));    
        }

        return{
            success:true,
            errors: {
                _form: []
            }
        }

    } catch (error) {
        console.log("댓글  생성 오류 :",error);
        if(error instanceof Error){
            return{
                success:false,
                errors: {
                    _form: [error.message]
                }
            }
        }

        console.error(error);
        return{
            success:false,
            errors: {
                _form: ["서버 에러가 발생했습니다. 다시 시도해 주세요."]
            }
        }
    }
  
   
   
 

}
