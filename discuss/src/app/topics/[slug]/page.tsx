import PostCreateForm from "@/components/posts/post-create-form";
import { db } from "@/db";
import React from "react";

interface TopicShowPageProps{
  params: Promise<{ slug: string }>;
}


const TopicShowPage: React.FC<TopicShowPageProps> = async ({ params }) => {
  const { slug } = await params;
  const topic = await db.topic.findUnique({ where: { slug } });


  return (
    <div className="w-full max-w-screen-2xl mx-auto  grid grid-cols-4 gap-4 mt-5">
      <div className="col-span-3">
          <h1 className="text-2xl font-bold mb-2">{slug}</h1>          
      </div>
      
 
       {topic && <PostCreateForm slug={slug} /> }

    </div>
  );
};


export default TopicShowPage;
