"use server";

import { db } from "@/db";

export type SelectOnePostType= {
  id: string;
  title: string;
  content: string;
  userId: string;
  topic: {
    slug: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export async function selectOnePost(postId: string) : Promise<SelectOnePostType | null>{
  if (!postId) return null;


 const post = await db.post.findUnique({
      where: { id: postId },
      include: {
        topic: true,
      },
 });

  return post;
}
