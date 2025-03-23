"use client";
import React, { useActionState, useState, startTransition } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import FormButton from "../common/form-button";
import { createPost } from "@/actions/topics";

interface PostCreateFormProps {
    slug: string;
}

const PostCreateForm: React.FC<PostCreateFormProps>  = ({slug}) => {
  
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

  return (
    <div className="w-full max-w-screen-2xl mx-auto  grid grid-cols-4 gap-4 mt-5">
    
    <div className="w-full flex justify-end">
        <Button onClick={() => setOpen(true)}>포스트</Button> {/* 클릭 시 다이얼로그 열기 */}
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

    </div>
  );
};

export default PostCreateForm;
