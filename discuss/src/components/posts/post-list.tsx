import { PostWithData } from '@/db/queries/posts';
import paths from '@/paths';
import Link from 'next/link';
import React from 'react'


interface PostListProps{
    fetchData: ()=>Promise<PostWithData[]>,
    postType?:string
}


const PostList:React.FC<PostListProps> = async ({postType="post", fetchData}) => {

  const posts = await fetchData();

  const renderPosts=posts.map(post =>{
    const topicSlug=post.topic.slug;

        if(!topicSlug){
            throw new Error("Need a slug to link to a post");
        }

        return(
        <div key={post.id} className="border rounded p-2  mb-2">
          <Link href={paths.postShow(topicSlug, post.id)}>
                <h3 className="text-lg font-bold">
                 {postType==="popularPosts" &&<small>[{post.topic.slug}] </small>} 
                  {post.title}
                </h3>
                <div className="flex flex-row gap-8">
                    <p className="text-xs text-gray-400">By {post.user.name}</p>
                    <p className="text-xs text-gray-400">
                    {post._count.comments} 댓글
                    </p>
                </div>
          </Link>
        </div>
    )
  });



  return (
    <>
        {renderPosts}
    </>
  )
}

export default PostList;