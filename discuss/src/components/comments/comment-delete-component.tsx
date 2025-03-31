"use client";
import React from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { FiTrash } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { deleteComment } from "@/actions/comments/delete-comment";
import { Trash } from "lucide-react";

interface CommentDeleteComponentProps {
  slug: string;
  postId: string;
  commentId: string;  
}

const CommentDeleteComponent: React.FC<CommentDeleteComponentProps> = ({slug,postId, commentId}) => {

  const router = useRouter();

  const handleDeletePost = async () => {
    toast.info("댓글을 삭제하시겠습니까?", {
      icon: <FiTrash size={20} />, // 삭제 아이콘 추가
      position: "top-center",
      action: {
        label: "확인",
        onClick: async () => {
          const response = await deleteComment(commentId, `/topics/${slug}/posts/${postId}`);
          if (response.success) {
            router.push(`/topics/${slug}/posts/${postId}`);
          }
        },
      },
      actionButtonStyle: {
        color: "white",
        backgroundColor: "red",
        borderRadius: "5px",
        padding: "5px 10px",
        border: "none",
        cursor: "pointer",
      },
      cancel: {
        label: "취소",
        onClick: () => {
          toast.dismiss(); // 토스트 메시지 닫기
        },
      },
      cancelButtonStyle: {
        color: "white",
        backgroundColor: "black", // 취소 버튼 배경색
        borderRadius: "5px",
        padding: "5px 10px",
        border: "none",
        cursor: "pointer",
      },
    });
  };

  return (
    <Button onClick={handleDeletePost} className="bg-rose-600 hover:bg-rose-500">
      <Trash className="w-4" />
    </Button>
  );
};

export default CommentDeleteComponent;
