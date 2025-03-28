import PostList from "@/components/posts/post-list";
import TopicCreateForm from "@/components/topics/topic-create-form";
import TopicList from "@/components/topics/topic-list";
import { fetchTopPost } from "@/db/queries/posts";


export default async function Home() {
  
  return (
    <div className="grid grid-cols-4 gap-4 p-4">      
      <div className="col-span-3">        
            <h1 className="text-xl m-2">인기 토픽</h1>
            <PostList fetchData={() => fetchTopPost()} postType="popularPosts" />
      </div>
      

      <div className="border shadow py-3 px-2 relative overflow-x-auto ">
        <TopicCreateForm />  
        <hr className="my-2" />
        <h3 className="text-lg">Topics</h3>

        <TopicList />          
      </div>
    </div>
  );


}
