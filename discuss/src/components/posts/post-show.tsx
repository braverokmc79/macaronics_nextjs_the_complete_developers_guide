"use client";
import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import PostDeleteComponent from './post-delete-component';

import { useSession } from 'next-auth/react';
import { selectOnePost, SelectOnePostType } from '@/actions/posts/select-post';
import PostUpdateForm from './post-update-form';

interface PostShowProps {
  postId: string;
}



const PostShow: React.FC<PostShowProps> =  ({ postId }) => {
  const {data:session} = useSession();
  const [postUpdateOpen, setPostUpdateOpen] = useState(false);
  const [post, setPost] =useState<SelectOnePostType | null>();
 

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const postData = await selectOnePost(postId);
        if(postData){
          setPost(postData);        
        }        
      } catch (error) {
        console.error("Error fetching post data:", error);  
      }   
    };
    fetchPostData();
 
  }, [postId]);

  if(!post){
    return null;
  }

  return (
    <>
    <div className="w-full mx-auto my-10 p-6 bg-white shadow-md rounded-lg">
      <div className='flex justify-between'>
        <h1 className="text-3xl font-extrabold text-gray-800">{post.title}</h1>
        
        
        {session  &&<div className="w-full flex justify-end gap-2 ">
              <Button onClick={() => setPostUpdateOpen(true)} >포스트 수정</Button>{" "}                      
              <PostDeleteComponent postId={postId}  />
              {" "}
            </div>
          }
      </div>

      <p className="text-sm text-gray-500 mt-2">
        작성일: {new Date(post.createdAt).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}
      </p>
      

     {post && (
        <span className="mt-3 inline-block text-sm font-semibold text-primary bg-blue-100 px-3 py-1 rounded-full">
          {post?.topic?.slug}
        </span>
      )} 

      <hr className="my-4 border-gray-300" />

      <p className="text-gray-600 leading-relaxed">{post.content}</p>
    </div>

      <PostUpdateForm  
          post={post}
          postUpdateOpen={postUpdateOpen}
          setPostUpdateOpen={setPostUpdateOpen}
      />
      
    </>
  );
};

export default PostShow;
