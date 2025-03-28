"use client";
import React, { useActionState, useState, startTransition } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import FormButton from "../common/form-button";
import { createPost } from "@/actions/topics";
import { deleteTopic } from "@/actions/topics/topic-delete";
import { useRouter } from "next/navigation";
import { toast } from "sonner"
import { FiTrash } from 'react-icons/fi';

interface PostCreateFormProps {
    slug: string;
    topicId: string;
}

const PostCreateForm: React.FC<PostCreateFormProps>  = ({slug, topicId}) => {
const router=useRouter();

 const [open, setOpen] = useState(false); // 다이얼로그 상태 관리
 const [formState, action, isPending] = useActionState(createPost.bind(null, slug), 
        {errors:{}}  // 반환 에러 타입 동일하게 지정topic
  );

function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => {
        action(formData);
    });
}

 const handleDeleteTopic =async () => {
    toast.info("토픽을 삭제하시겠습니까?", {
        icon: <FiTrash size={20} />, // 삭제 아이콘 추가
        position: 'top-center',        
        action: {
            label: "확인",          
            onClick: async () => {
                const response = await deleteTopic(topicId);
                if (response === "success") {
                    router.push("/");
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
 }

  return (
    <>
    
    <div className="w-full flex justify-end gap-2">
        <Button onClick={() => setOpen(true)} >토픽 수정</Button> {/* 클릭 시 다이얼로그 열기 */}
        <Button onClick={handleDeleteTopic} className="bg-rose-600 hover:bg-rose-500">토픽 삭제</Button> {/* 클릭 시 다이얼로그 열기 */}
        <Button onClick={() => setOpen(true)}  className="bg-blue-600 hover:bg-blue-500">포스트 생성</Button> {/* 클릭 시 다이얼로그 열기 */}
    </div>
 


    <Dialog open={open}  onOpenChange={setOpen}>      
        <DialogContent className="max-w-lg"  >
            <DialogHeader className="py-4">
                 <DialogTitle>포스트 생성</DialogTitle>
            </DialogHeader>
            <div>

            <form  onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <Label>제목</Label>
                    <Input name="title" placeholder="제목을 입력해 주세요."
                         className={`h-9 ${formState.errors.title ? "border-red-500" : ""}`}
                    />
                   {formState.errors.title &&
                        <p className="text-red-500 text-sm">{formState.errors.title?.join(", ")}</p>
                     }
                </div>

                <div className="space-y-2">
                    <Label>내용</Label>
                    <Textarea
                            name="content"
                            placeholder="게시글 내용을 입력해주세요."
                            rows={10}
                            className={`h-48 ${formState.errors.content ? "border-red-500" : ""} `}
                    />
                     {formState.errors.content &&
                        <p className="text-red-500 text-sm">{formState.errors.content?.join(", ")}</p>
                     }
                </div>
             
                 {formState.errors._form &&
                        <p className="text-red-500 text-sm">{formState.errors._form?.join(", ")}</p>
                    
                }

                <FormButton className="w-full"  isLoading={isPending}>포스트 생성하기</FormButton>
            </form>

            </div>
        </DialogContent>
    </Dialog>

    </>
  );
};

export default PostCreateForm;
