import CommentCreateForm from '@/components/comments/comment-create-form';
import CommentList from '@/components/comments/comment-list';
import PostShow from '@/components/posts/post-show';
import PostShowLoading from '@/components/posts/post-show-loading';
import { fetchCommentsByPostId } from '@/db/queries/comments';
import paths from '@/paths';
import Link from 'next/link';
import React, { Suspense } from 'react';

interface PostDetailsPageProps {
  params: Promise<{
    slug: string;
    postId: string;
  }>;
}

const PostShowPage: React.FC<PostDetailsPageProps> = async ({ params }) => {
  const { slug, postId } = await params;

  return (
    <div className="w-full  mx-auto space-y-6 mt-8 ">
      <Link
        href={paths.topicShow(slug)}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg
         bg-black text-white text-sm hover:bg-zinc-700 transition-all">

        <span className="text-lg">←</span>
        <span className="hover:underline decoration-solid font-medium">뒤로가기</span>
      </Link>


      <div className="bg-white shadow-lg rounded-2xl p-6 border min-h-lvh">
        <Suspense fallback={<PostShowLoading />}>         
           <PostShow postId={postId} />     
        </Suspense>
        
        <CommentCreateForm postId={postId} startOpen />      
        <CommentList fetchData={() => fetchCommentsByPostId(postId)} postId={postId} />
      </div>
    </div>
  );
};

export default PostShowPage;
