import PostCreateForm from "@/components/posts/post-create-form";
import PostList from "@/components/posts/post-list";
import React from "react";
import { fetchPostsByTopicSlug } from "@/db/queries/posts";




interface TopicShowPageProps{
  params: Promise<{ slug: string }>;
}


const TopicShowPage: React.FC<TopicShowPageProps> = async ({ params }) => {
  const { slug } = await params;

  return (
    <div className="w-full max-w-screen-2xl mx-auto  grid grid-cols-4 gap-4 mt-5">
      <div className="col-span-3">
          <h1 className="text-2xl font-bold mb-5">{slug}</h1>          
          <PostList fetchData={() => fetchPostsByTopicSlug(slug)} />
      </div>
      
      <PostCreateForm slug={slug} /> 
    </div>
  );
};


export default TopicShowPage;
