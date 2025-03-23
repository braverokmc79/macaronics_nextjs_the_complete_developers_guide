import TopicCreateForm from "@/components/topics/topic-create-form";
import TopicList from "@/components/topics/topic-list";


export default async function Home() {
  
  return (
    <div className="w-full max-w-screen-2xl mx-auto  grid grid-cols-4 gap-4 p-4">      
      <div className="col-span-3">        
            <h1 className="text-xl m-2">Top Posts</h1>
      </div>

      <div className="w-full max-w-screen-2xl border shadow py-3 px-2">
        <TopicCreateForm />  

        <hr className="my-2" />
        <h3 className="text-lg">Topics</h3>

        <TopicList />              
      </div>
    </div>
  );


}
