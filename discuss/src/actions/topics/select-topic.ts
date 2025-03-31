"use server";

import { db } from "@/db";
import type { Topic } from "@prisma/client";

export async function selectTopic(slug: string) : Promise<Topic | null>{
  if (!slug) return null;

  return await db.topic.findUnique({
    where: { slug },    
  });
}
