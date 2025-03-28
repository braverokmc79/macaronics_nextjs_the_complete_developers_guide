"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "../ui/textarea";
import { createTopic } from "@/actions/topics";
import { useActionState, startTransition } from "react";
import FormButton from "../common/form-button";
import { PlusCircle } from "lucide-react";
import { useSession } from "next-auth/react";



const TopicCreateForm: React.FC = () => {
  const {status } = useSession();
  const [formState, action, isPending] = useActionState(createTopic,  
    {errors:{}}  // 반환 에러 타입 동일하게 지정
  );

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => {
      action(formData);
    });
  }

  return (
    <Dialog  >
      {status==="authenticated" &&   
        <DialogTrigger asChild className="bg-blue-600 hover:bg-blue-500">
          <Button> <PlusCircle className="w-4 h-4" />토픽 만들기</Button>
        </DialogTrigger>
       }

      <DialogContent className="max-w-lg">
          <DialogHeader className="py-4">
           <DialogTitle>토픽 만들기</DialogTitle>
         </DialogHeader>        
        <form 
        onSubmit={handleSubmit}
        className="space-y-4">
          <div className="space-y-5">
            <div className="space-y-2">
              <Label>토픽명</Label> 
              <Input
                name="name"
                placeholder="토픽명을 입력하세요."                         
                className={`h-9 ${formState.errors.name ? "border-red-500" : ""}`}
              /> 
              {formState.errors.name && 
              <p className="text-red-500 text-sm">{formState.errors.name?.join(", ")}</p>
              }
            </div>

            <div className="space-y-2">
              <Label>내용</Label>
              <Textarea
                name="description"
                placeholder="토픽의 내용을 입력해주세요."
                rows={10}
                className={`h-48 ${formState.errors.description ? "border-red-500" : ""}`}
              />
              {formState.errors.description && 
              <p className="text-red-500 text-sm">{formState.errors.description?.join(", ")}</p>
              }
            </div>
          </div>

  
          {formState.errors._form ? (
            <p className="rounded p-2 bg-red-200 border border-red-400">
                {formState.errors._form?.join(", ")}
            </p>) : null
          }            

          
          <FormButton className="w-full"  
                isLoading={isPending}>생성하기
           </FormButton>
        </form>      
      </DialogContent>


    </Dialog>
  );
};

export default TopicCreateForm;
