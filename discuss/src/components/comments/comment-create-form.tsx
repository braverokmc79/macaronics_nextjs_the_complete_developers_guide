"use client";

import { useActionState , startTransition} from "react";
import { useEffect, useRef, useState } from "react";
import FormButton from "@/components/common/form-button";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { createComment } from "@/actions/topics";
import { Label } from "../ui/label";

interface CommentCreateFormProps {
  postId: string;
  parentId?: string;
  startOpen?: boolean;
}

export default function CommentCreateForm({postId,parentId,startOpen}: CommentCreateFormProps) {
  
  const [open, setOpen] = useState(startOpen);
  const ref = useRef<HTMLFormElement | null>(null);
  
  const [formState, action, isPending] = useActionState(createComment, { success: false, errors: {} });

  useEffect(() => {
    if (formState.success) {
      ref.current?.reset();
      if (!startOpen) {
        setOpen(false);
      }
    }
  }, [formState, startOpen]);

  function handleSubmit(event:React.FormEvent<HTMLFormElement>){
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => {
      action(formData);
    });
  }



  const form = (
    <div className="mt-3 mb-3">
      <form 
        onSubmit={handleSubmit}
        ref={ref}>
          <input type="hidden" name="postId" value={postId} />
          {parentId && <input type="hidden" name="parentId" value={parentId} />}

          <div className="space-y-2 px-1">
            <Label>내용</Label>      
            <Textarea
              name="content"
              placeholder="댓글을 입력해주세요."
              rows={10}
              className={`h-48 ${formState.errors?.content? "border-red-500" : ""}`}       
            />

            {formState.errors?.content &&
                        <p className="text-red-500 text-sm">{formState.errors.content?.join(", ")}</p>
            }
            
          </div>

          {formState.errors._form &&
                        <p className="text-red-500 text-sm">{formState.errors._form?.join(", ")}</p>
                    
          }
          <FormButton className="w-full" isLoading={isPending}>댓글 작성하기</FormButton>
      </form>
    </div>
  );

  return (
    <div>
      <Button size="sm"  onClick={() => setOpen(!open)}>
        댓글
      </Button>
      {open && form}
    </div>
  );
}
