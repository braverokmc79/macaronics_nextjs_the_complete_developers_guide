"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,  
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "../ui/textarea";
import { useActionState, startTransition } from "react";
import FormButton from "../common/form-button";
import { Topic } from "@prisma/client";
import { updateTopic } from "@/actions/topics/update-topic";

interface TopicUpdateFormProps {
  topic: Topic;
  topicUpdateOpen: boolean;
  setTopicUpdateOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const TopicUpdateForm: React.FC<TopicUpdateFormProps> = ({topic, topicUpdateOpen, setTopicUpdateOpen}) => {

  const [formState, action, isPending] = useActionState(updateTopic,{errors:{}});


  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => {
      action(formData);
    });
  }

  return (
    <Dialog open={topicUpdateOpen}  onOpenChange={setTopicUpdateOpen} >
     
      <DialogContent className="max-w-lg">
          <DialogHeader className="py-4">
           <DialogTitle>토픽 수정하기</DialogTitle>
         </DialogHeader>        
        <form 
        onSubmit={handleSubmit}
        className="space-y-4">
          <div className="space-y-5">
            <div className="space-y-2">

            <Input name="id" type="hidden" value={topic.id} /> 
              
              <Label>토픽명</Label> 
              <Input
                name="slug"
                placeholder="토픽명을 입력하세요."                         
                className={`h-9 ${formState.errors.slug ? "border-red-500" : ""}`}
                defaultValue={topic.slug}
              /> 
              {formState.errors.slug && 
              <p className="text-red-500 text-sm">{formState.errors.slug?.join(", ")}</p>
              }
            </div>

            <div className="space-y-2">
              <Label>내용</Label>
              <Textarea
                name="description"
                placeholder="토픽의 내용을 입력해주세요."
                rows={10}
                className={`h-48 ${formState.errors.description ? "border-red-500" : ""}`}
                defaultValue={topic.description}
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
                isLoading={isPending}>토픽 수정하기
           </FormButton>
        </form>      
      </DialogContent>

    </Dialog>
  );
};

export default TopicUpdateForm;
