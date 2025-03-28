import PostCreateForm from "@/components/posts/post-create-form";
import PostList from "@/components/posts/post-list";
import React from "react";
import { fetchPostsByTopicSlug } from "@/db/queries/posts";
import type { Topic } from "@prisma/client";
import { getTopicInfo } from "@/actions/topics/topic-info";
import { auth } from "@/auth";


interface TopicShowPageProps{
  params: Promise<{ slug: string }>;
}


const TopicShowPage: React.FC<TopicShowPageProps> = async ({ params }) => {
  const { slug } = await params;
  const topic  = await getTopicInfo(slug) as Topic | null ;
  const session =await auth();

  return (
    <div className="w-full max-w-screen-2xl mx-auto   mt-5 px-2">
      <div className="flex flex-col md:flex-row mb-10">
        <div className="w-full flex flex-col">
          <h1 className="text-2xl font-bold">{slug}</h1>
          {topic?.description  && (
            <p className="w-full text-gray-600 mt-2">
              <span className="">설명: </span>
              {topic.description}</p>
          )}
        </div>

        {session && topic && <PostCreateForm slug={slug} topicId={topic?.id} />  }
      </div>
      
      <div className="grid grid-cols-2 gap-4">
      <PostList fetchData={() => fetchPostsByTopicSlug(slug)} />
      </div>

    </div>
  );
};


export default TopicShowPage;
