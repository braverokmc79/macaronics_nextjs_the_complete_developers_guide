import CommentShow from "@/components/comments/comment-show";
import type { CommentWithAuthor } from "@/db/queries/comments";

interface CommentListProps {
   fetchData:()=>Promise<CommentWithAuthor[]>;
   postId:string
}


export default async function CommentList( {fetchData, postId}: CommentListProps) {

  const comments = await fetchData();


  const topLevelComments = comments.filter(
    (comment) => comment.parentId === null
  );


  const renderedComments = topLevelComments.map((comment) => {
    return (
      <CommentShow
        key={comment.id}
        commentId={comment.id}
        postId={postId}
      />
    );
  });

  return (
    <div className="space-y-3">
      <h1 className="text-lg font-bold">전체 {comments.length} 댓글</h1>
      {renderedComments}
    </div>
  );
}
