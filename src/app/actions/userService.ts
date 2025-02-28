"use server"
import { UserType } from "@/types/UserType";
import { createUser as mongooseCreateUser } from "./mongo/users/usersActions";
import { createUser as prismaCreateUser } from "./prisma/users/usersActions";
import { createUser as supabaseCreateUser } from "./supabase/users/usersActions";
import { ResponseType } from "@/types/ResponseType";

// 사용할 백엔드 타입을 설정 (환경 변수나 설정 파일로 관리 가능)
const SERVER_ACTIONS_TYPE = process.env.NEXT_SERVER_ACTIONS_TYPE || "mongoose"; // 기본값: mongoose


//1.Action(인터페이스):  유저 생성
export async function createUsersAction(userData: Omit<UserType, "createdAt" | "updatedAt" | "passwordConfirm">):
   Promise<ResponseType<Omit<UserType, "password" |  "passwordConfirm">>> {
  

  if (SERVER_ACTIONS_TYPE === "mongoose") {
    return await mongooseCreateUser(userData);
    
  } else if(SERVER_ACTIONS_TYPE === "prisma"){
    return await prismaCreateUser(userData);

  }else if(SERVER_ACTIONS_TYPE === "supabase"){
    return await supabaseCreateUser(userData);
  }


  

  return {
    status: 500,
    message: "서버  타입이 Mongoose 또는 Prisma가 아닙니다.",
  };

}