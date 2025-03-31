"use server"
import { auth } from "@/auth";
import { db } from "@/db";
import { revalidatePath } from "next/cache";

interface DeleteCommentResponse {
  success: boolean;
  data?: string;
  error?: string;
  
}

export async function deleteComment(commentId: string , redirectUrl: string): Promise<DeleteCommentResponse> {

  try {
    const session=await auth();
    if (!session?.user?.id) {
        return { success: false, error:"로그인 후 이용할 수 있습니다." };
    }

    const comment = await db.comment.findUnique({where: { id: commentId}} );
    if (!comment) {
      return {
        success: false,
        error: "post not found"
      }
    }

     await db.comment.delete({ where: { id:commentId} });
    

      // 캐시 무효화
     revalidatePath("/");
     revalidatePath(redirectUrl);

     return {
      success: true,
      data: "comment deleted successfully"
    }
  } catch (error) {
    console.error("삭제 중 오류 발생:", error);    
    if(error instanceof Error){
      return {
        success: false,      
        error: error.message.toString()        
      }
    }
    return {
      success: false,
      error: "서버 에러"
    }

  }

  
}
