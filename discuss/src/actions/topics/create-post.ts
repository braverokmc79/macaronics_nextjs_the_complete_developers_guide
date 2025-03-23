"use server";
import { revalidatePath } from "next/cache";
import {redirect} from "next/navigation";
import {z} from "zod";
import {auth} from "@/auth";
import {db} from "@/db";
import paths from "@/paths";
import { Post } from "@prisma/client";


const createPostSchema = z.object({
    title: z.string({required_error: '제목을 입력해주세요.'}).min(3,{message: '제목은 최소 3글자 이상이어야 합니다.'}),
    content: z.string({required_error: '내용을 입력해주세요'}).min(3, {message: '내용은 최소 3글자 이상이어야 합니다.'}),
});


interface CreatePostFormStateProps{
    errors:{
        title?: string[];
        content?: string[];
        _form?: string[]; 
    }
}



export async function createPost(
    slug: string,
    formState:CreatePostFormStateProps, 
    formData: FormData) :Promise<CreatePostFormStateProps> {


    const sesssion=await auth();
    if(!sesssion?.user?.id){
        return{
            errors: {
                _form: ["로그인 후 이용할 수 있습니다."],
            }
        }
    }
    const result=createPostSchema.safeParse({
        title: formData.get('title'),
        content: formData.get('content'),
    });
      
    const topic = await db.topic.findUnique({ where: { slug } });
    if(!topic){
        return{
            errors: {
                _form: ["topic을 찾을 수 없습니다."],
            }
        }
    }

    if(!result.success){
        return{
            errors:result.error.flatten().fieldErrors   
        }
    }

    let post:Post;
    
    try {
         post=await db.post.create({
            data: {
                title: result.data.title,
                content: result.data.content,
                userId: sesssion.user.id,
                topicId: topic?.id, 
            }
        });
    
    } catch (error:unknown) {
        console.log("포스트 생성 오류 :",error);
        if(error instanceof Error){
            return{
                errors: {
                    _form: [error.message]
                }
            }
        }

        console.error(error);
        return{
            errors: {
                _form: ["서버 에러가 발생했습니다. 다시 시도해 주세요."]
            }
        }

    }


 
    revalidatePath("/");
    redirect(paths.postShow(slug, post.id));

}

