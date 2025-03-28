"use server"
import { db } from "@/db";
import { revalidatePath } from "next/cache";

export async function deleteTopic(topicId: string): Promise<string | null> {
  if (!topicId) {
    return "notFound";
  }

  try {
 
    // 먼저 관련된 데이터를 삭제
    await db.post.deleteMany({ where: { topicId} });

    // 그 후에 topic 삭제
    await db.topic.delete({ where: { id:topicId } });

    // 캐시 무효화
    revalidatePath("/");
    revalidatePath("/api/topics");
    
    return "success";
  } catch (error) {
    console.error("삭제 중 오류 발생:", error);
    return "error";
  }
}
