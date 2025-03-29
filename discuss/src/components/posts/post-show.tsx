import { auth } from '@/auth';
import { db } from '@/db';
import { notFound } from 'next/navigation';
import React from 'react';
import { Button } from '../ui/button';
import PostDeleteComponent from './post-delete-component';

interface PostShowProps {
  postId: string;
}

const PostShow: React.FC<PostShowProps> = async ({ postId }) => {
  const session = await auth();
  //const router=useRouter();

  const post = await db.post.findFirst({
    where: { id: postId },
    include: {
      topic: true,
    },
  });

  if (!post) {
    notFound();
  }



  return (
    <div className="w-full mx-auto my-10 p-6 bg-white shadow-md rounded-lg">
      <div className='flex justify-between'>
        <h1 className="text-3xl font-extrabold text-gray-800">{post?.title}</h1>
        
        
        {session  &&<div className="w-full flex justify-end gap-2 ">
              <Button >포스트 수정</Button>{" "}        
              
              <PostDeleteComponent postId={postId}  />
              {" "}
            </div>
          }
      </div>

      <p className="text-sm text-gray-500 mt-2">
        작성일: {new Date(post?.createdAt).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}
      </p>

      

      {post?.topic && (
        <span className="mt-3 inline-block text-sm font-semibold text-primary bg-blue-100 px-3 py-1 rounded-full">
          {post?.content}
        </span>
      )}

      <hr className="my-4 border-gray-300" />

      <p className="text-gray-600 leading-relaxed">{post?.content}</p>
    </div>
  );
};

export default PostShow;
