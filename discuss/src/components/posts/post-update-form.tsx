"use client";
import React, { useActionState, startTransition } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import FormButton from "../common/form-button";

import { SelectOnePostType } from "@/actions/posts/select-post";
import { updatePost } from "@/actions/posts/update-post";

interface PostUpdateFormProps {
  post: SelectOnePostType ;
  postUpdateOpen: boolean;
  setPostUpdateOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const PostUpdateForm: React.FC<PostUpdateFormProps> = ({ post , postUpdateOpen, setPostUpdateOpen}) => {
  const { title, content, topic} = post;
 
 
  const [formState, action, isPending] = useActionState(
    updatePost.bind(null, topic.slug),
    { errors: {} } 
  );

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => {
      action(formData);
    });
  }

  return (
    <>     
      <Dialog open={postUpdateOpen} onOpenChange={setPostUpdateOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader className="py-4">
            <DialogTitle>포스트 수정</DialogTitle>
          </DialogHeader>
          <div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Input type="hidden" name="id" value={post.id} readOnly />

                <Label>제목</Label>
                <Input
                  name="title"
                  defaultValue={title}
                  placeholder="제목을 입력해 주세요."
                  className={`h-9 ${
                    formState.errors.title ? "border-red-500" : ""
                  }`}
                />
                {formState.errors.title && (
                  <p className="text-red-500 text-sm">
                    {formState.errors.title?.join(", ")}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label>내용</Label>
                <Textarea
                  name="content"
                  defaultValue={content}
                  placeholder="게시글 내용을 입력해주세요."
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
                포스트 수정하기
              </FormButton>
              
            </form>
          </div>
        </DialogContent>
      </Dialog>

    </>
  );
};

export default PostUpdateForm;
