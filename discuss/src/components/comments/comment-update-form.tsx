"use client";
import React, { useActionState, startTransition, useEffect } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import FormButton from "../common/form-button";
import { updateComment } from "@/actions/comments/update-comment";
import { Comment } from "@prisma/client";
import { useParams } from "next/navigation";


interface CommentUpdateFormProps {
  comment: Comment ;
  commentUpdateOpen: boolean;
  setCommentUpdateOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CommentUpdateForm: React.FC<CommentUpdateFormProps> = ({ comment, commentUpdateOpen, setCommentUpdateOpen}) => {
  const { slug } = useParams();
  const { id, content} = comment;
  const [formState, action, isPending] = useActionState(updateComment,{errors: {} } );

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => {
      action(formData);
    });
  }
  useEffect(() => {
    if (formState.success && !isPending) {
      setCommentUpdateOpen(false);
    }
  }, [isPending, formState.success, setCommentUpdateOpen]);

  return (
    <>     
      <Dialog open={commentUpdateOpen} onOpenChange={setCommentUpdateOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader className="py-4">
            <DialogTitle>댓글 수정</DialogTitle>
          </DialogHeader>
          <div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input type="hidden" name="id" value={id} readOnly /> 
              <Input type="hidden" name="slug" value={slug} readOnly />     

              <div className="space-y-2">
                <Label>내용</Label>
                <Textarea
                  name="content"
                  defaultValue={content}
                  placeholder="댓글 내용을 입력해주세요."
                  rows={10}
                  className={`h-48 ${
                    formState.errors.content ? "border-red-500" : ""
                  } `}
                />
                {formState.errors.content && (
                  <p className="text-red-500 text-sm">
                    {formState.errors.content?.join(", ")}
                  </p>
                )}
              </div>

              {formState.errors._form && (
                <p className="text-red-500 text-sm">
                  {formState.errors._form?.join(", ")}
                </p>
              )}

              <FormButton className="w-full bg-blue-600 hover:bg-blue-500" isLoading={isPending}>
                댓글 수정하기
              </FormButton>              
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CommentUpdateForm;
