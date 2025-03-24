import CommentCreateForm from '@/components/comments/comment-create-form';
import CommentList from '@/components/comments/comment-list';
import PostShow from '@/components/posts/post-show';
import { fetchCommentsByPostId } from '@/db/queries/comments';
import paths from '@/paths';
import Link from 'next/link';
import React from 'react';

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
        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800
         transition-colors"
      >
        <span className="text-lg">←</span> 
        <span className="underline decoration-solid font-medium">뒤로가기</span>
      </Link>

      <div className="bg-white shadow-lg rounded-2xl p-6 border min-h-lvh">
        <PostShow postId={postId} />
     

        <CommentCreateForm postId={postId} startOpen />

        <CommentList fetchData={() => fetchCommentsByPostId(postId)} />

      </div>
    </div>
  );
};

export default PostShowPage;
