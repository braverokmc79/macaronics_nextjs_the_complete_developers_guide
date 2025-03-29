"use server";
import { z } from "zod";
import {auth} from '@/auth';
import { revalidatePath } from "next/cache";
import paths from "@/paths";
import type {Topic} from "@prisma/client";
import { db } from "@/db";
import { redirect } from "next/navigation";



const updateTopicSchema = z.object({
    slug: z
    .string({ required_error: "토픽명을 입력해주세요." })
    .min(3, "토픽명은 최소 3글자 이상이어야 합니다.")
    .max(30, "토픽명은 30글자를 초과할 수 없습니다.")
    .regex(/^[a-z-]+$/, { message: "토픽명은 영문 소문자와 하이픈(-)만 사용 가능합니다." }),
  description: z
    .string({ required_error: "토픽의 내용을 입력해주세요." })
    .min(5, "내용은 최소 5자 이상이어야 합니다."),
});

export interface updateTopicFormState{
    errors:{
       slug?: string[]; 
       description?: string[];
       _form?:string[]; 
    }
}



export async function updateTopic(
         formState:updateTopicFormState,  // 첫 번째 인자 타입 지정
         formData: FormData)
    : Promise<updateTopicFormState> {  // 반환 타입도 지정

    const session = await auth();
    
    if (!session?.user) {    
        return{
            errors: {
                _form: ["로그인 후 이용할 수 있습니다."],
            }
        }
    }


    const result = updateTopicSchema.safeParse({
        slug: formData.get("slug"),
        description: formData.get("description"),
    });

    if (!result.success) {
        console.log(result.error.flatten().fieldErrors);
        return{
            errors: result.error.flatten().fieldErrors,
        }
    }


    const updatedCheckSlug=await db.topic.findUnique({where: { slug: result.data.slug }})
    const currentSlug=await db.topic.findUnique({where: { id: formData.get("id") as string }})

    if(updatedCheckSlug && updatedCheckSlug.slug !== currentSlug?.slug) {
        return{
            errors: {
                slug: [`${updatedCheckSlug.slug} 은 이미 존재하는 토픽명입니다.`],
            }
        }
    }


    let topic:Topic;
    try {
        topic= await db.topic.update({
            where: {
                id: formData.get("id") as string,
            },
            data: {
                slug: result.data.slug,
                description: result.data.description,
            },
        });
        
    } catch (error:unknown) {
       if(error instanceof Error) {
            return{
                errors: {
                    _form: [error.message], 
                }
            }   
       }else{
            return{
                errors: {
                    _form: ['Something went wrong. Please try again.'], 
                }
            } 
       }
    }


    revalidatePath("/");
    revalidatePath("/api/topics");
    
    redirect(paths.topicShow(topic.slug));
}
