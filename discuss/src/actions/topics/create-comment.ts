"use server";
import { auth } from "@/auth";
import { db } from "@/db";
import {z} from "zod";

const createCommentSchema = z.object({
   content:z.string({required_error:"내용을 입력해 주세요."})
   .min(3,{message:"내용은 최소 3글자 이상이어야 합니다."}),
});

interface CreateCommentFormStateProps {   
    success: boolean; 
    errors: { 
        content?: string[];
        _form?: string[]; 
    };
}





export async function createComment(formState: CreateCommentFormStateProps, formData: FormData) 
:Promise<CreateCommentFormStateProps>
{
    const session=await auth();
    if (!session?.user?.id) {
        return { success: false, errors: { _form: ["로그인 후 이용할 수 있습니다."] } };
    }

    const result=createCommentSchema.safeParse({
        content: formData.get('content')});

    if (!result.success) {
       return{
        success:false,
        errors:result.error.flatten().fieldErrors
       }
    }


    try {
        
        const postId = formData.get("postId") as string;
        const parentId = formData.get("parentId") as string | undefined;
        const content = formData.get("content") as string;
  
       await db.comment.create({
                data: {
                    content,
                    postId,
                    userId: session.user.id?.toString(),                   
                    parentId
                }
        });

    
        return { success: true, errors: {} };

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
