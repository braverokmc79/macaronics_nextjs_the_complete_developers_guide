"use server"
import { db } from "@/db";
import { revalidatePath } from "next/cache";

interface DeletePostResponse {
  success: boolean;
  data?: string;
  error?: string;
}

export async function deletePost(postId: string): Promise<DeletePostResponse> {
  if (!postId) {
    return {
      success: false,
      error: "postId not found"
    }
  }

  try {

    const post = await db.post.findUnique({ 
      where: { id: postId},
      include: {
        topic: { select: { slug: true } },
      },
    } );

    if (!post) {
      return {
        success: false,
        error: "post not found"
      }
    }

    await db.post.delete({ where: { id:postId} });

    
    // 캐시 무효화
    revalidatePath("/");
    revalidatePath(`/topics/${post?.topic.slug}`);
    
    return {
      success: true,
      data:post?.topic.slug
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
