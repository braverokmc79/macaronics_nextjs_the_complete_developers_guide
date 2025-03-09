"use client";

import { deleteSnippetAction } from "@/app/actions/prisma/snippets/snippetsAction";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";

interface SnippetDeleteButtonProps {
  snippetId: number;
}

const SnippetDeleteButton: React.FC<SnippetDeleteButtonProps> = ({ snippetId }) => {
  const [isPending, startTransition] = useTransition();

  return (
    <form
      action={() => {
        startTransition(() => deleteSnippetAction(snippetId));
      }}
    >
      <Button className="bg-pink-500 hover:bg-pink-600" disabled={isPending}>
        {isPending ? "삭제 중..." : "삭제하기"}
      </Button>
    </form>
  );
};

export default SnippetDeleteButton;
