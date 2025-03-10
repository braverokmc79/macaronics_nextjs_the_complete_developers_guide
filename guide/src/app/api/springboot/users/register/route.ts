import { NextResponse } from "next/server";
import { ResponseType } from "@/types/ResponseType";


//API 라우트(springboot) :  /api/mongo/users/register
export const GET = async (request: Request) => {
  console.log("  springboot   유저 등록 :", request);
  return NextResponse.json<ResponseType>({
    status: 200,
    message: "GET API springboot   유저 등록",
  });
};


//API 라우트(springboot) :  /api/mongo/users/register
export const POST = async (request: Request) => {
  try {
  
    return NextResponse.json<ResponseType>({
      status: 201,
      message: "성공적으로 회원 가입 처리 되었습니다.",
      data: {
        email: request.url,
        dob: new Date(),       
      }
    });
  } catch (error) {

    throw error;
  }
};
