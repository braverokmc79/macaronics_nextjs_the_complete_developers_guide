import { db } from '@/db';
import { notFound } from 'next/navigation';
import React from 'react';

interface PostShowProps {
  postId: string;
}

const PostShow: React.FC<PostShowProps> = async ({ postId }) => {
  //await new Promise((resolve) => {setTimeout(resolve, 3000)});

  const post = await db.post.findFirst({
    where: { id: postId },
    include: {
      topic: true,
    },
  });

  if (!post) {
    notFound();
  }

//   {post?.topic && console.log("postpostpostpost :",post)}

  return (
    <div className="w-full mx-auto my-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-extrabold text-gray-800">{post?.title}</h1>
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
