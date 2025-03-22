"use server";
import { z } from "zod";
import {auth} from '@/auth';
import { revalidatePath } from "next/cache";
import paths from "@/paths";
import type {Topic} from "@prisma/client";
import { db } from "@/db";
import { redirect } from "next/navigation";



const createTopicSchema = z.object({
  name: z
    .string({ required_error: "토픽명을 입력해주세요." })
    .min(3, "토픽명은 최소 3글자 이상이어야 합니다.")
    .max(30, "토픽명은 30글자를 초과할 수 없습니다.")
    .regex(/^[a-z-]+$/, { message: "토픽명은 영문 소문자와 하이픈(-)만 사용 가능합니다." }),
  description: z
    .string({ required_error: "토픽의 내용을 입력해주세요." })
    .min(10, "내용은 최소 10자 이상이어야 합니다."),
});

export interface CreateTopicFormState{
    errors:{
       name?: string[]; 
       description?: string[];
       _form?:string[]; 
    }
}



export async function createTopic(
         formState:CreateTopicFormState,  // 첫 번째 인자 타입 지정
         formData: FormData)
    : Promise<CreateTopicFormState> {  // 반환 타입도 지정

    const session = await auth();
    
    if (!session?.user) {    
        return{
            errors: {
                _form: ["로그인 후 이용할 수 있습니다."],
            }
        }
    }


    const result = createTopicSchema.safeParse({
        name: formData.get("name"),
        description: formData.get("description"),
    });

    if (!result.success) {
        console.log(result.error.flatten().fieldErrors);
        return{
            errors: result.error.flatten().fieldErrors,
        }
    }


    let topic:Topic;
    try {
        topic= await db.topic.create({
            data: {
                slug: result.data.name,
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
    redirect(paths.topicShow(topic.slug));


}
