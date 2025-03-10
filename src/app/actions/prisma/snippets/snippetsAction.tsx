"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

/**
 * 생성
 * @param formData
 */
export async function createSnippet(formState: { message: string }, formData: FormData) {
  //form 데이터 가져오기 및 유효성 검사
  const title = formData.get("title") as string;
  const code = formData.get("code") as string;
  console.log(title, code);

  if (typeof title !== "string" || title.length < 3) {
    return {
      message: "Title must be longer",
    };
  }
  if (typeof code !== "string" || code.length < 3) {
    return {
      message: "Code must be a longer",
    };
  }

  try {
    //데이터 베이스에 기록    
    await prisma.snippet.create({ data: { title, code } });
    console.log("2데이터 베이스에 등록 성공");
    
    revalidatePath("/developers-guide/snippets/");
    // 성공시 리다이렉트 처리
   //   redirect("/developers-guide/snippets/");
    return {
      message: "NEXT_REDIRECT",
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        message: error.message,
      };
    } else {
      return {
        message: "Something went wrong...",
      };
    }
  }
}

export async function snippetsUpdateAction(id: number, code: string, data: FormData) {
  // Get form data
  const title = data.get("title") as string;

  console.log("액션 :", id, code, title);

  await prisma.snippet.update({
    where: {
      id: id,
    },
    data: {
      title: title,
      code: code,
    },
  });

   revalidatePath(`/developers-guide/snippets/${id}`);
  redirect(`/developers-guide/snippets/${id}`);
}


export async function deleteSnippetAction(id: number) {
  if (!id) return;
  console.log("삭제할아이디", id);
  await prisma.snippet.delete({
    where: {
      id: id,
    },
  });

  revalidatePath("/developers-guide/snippets/");
  redirect("/developers-guide/snippets/");
}
