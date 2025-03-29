"use client";
import React from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { FiTrash } from "react-icons/fi";
import { deletePost } from "@/actions/posts/delete-post";
import { useRouter } from "next/navigation";

interface PostDeleteComponentProps {
    postId: string;
}

const PostDeleteComponent: React.FC<PostDeleteComponentProps> = ({postId}) => {

  const router = useRouter();

  const handleDeletePost = async () => {
    toast.info("포스트를 삭제하시겠습니까?", {
      icon: <FiTrash size={20} />, // 삭제 아이콘 추가
      position: "top-center",
      action: {
        label: "확인",
        onClick: async () => {
          const response = await deletePost(postId);
          if (response.success) {
            router.push(`/topics/${response.data}`);
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
          // 취소 시 아무 작업도 하지 않거나 특정 작업을 추가할 수 있습니다.
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
    <Button
      onClick={handleDeletePost}
      className="bg-rose-600 hover:bg-rose-500"
    >
      포스트 삭제
    </Button>
  );
};

export default PostDeleteComponent;
