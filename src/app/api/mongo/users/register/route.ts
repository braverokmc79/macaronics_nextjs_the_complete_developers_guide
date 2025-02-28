import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { dbConnect } from "@/lib/mongo";
import { ResponseType } from "@/types/ResponseType";
import { UserType } from "@/types/UserType";
import { User } from "@/model/mongo/user-model";



//API 라우트(mongodb) :  /api/mongo/users/register
export const POST = async (request: Request) => {
  
  try {
    const userData: UserType = await request.json(); 
    await dbConnect();

    // 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(userData.password, 5);

    // MongoDB에 저장할 데이터 구조 정의
    const newUser = {
      name: userData.name,
      email: userData.email,
      password: hashedPassword,
      dob: userData.dob,
      accountType: userData.accountType,
      companyName: userData.companyName,
      numberOfEmployees: userData.numberOfEmployees,
    };

    // 유저 생성
    const createdUser = await User.create(newUser);

    // NextResponse.json()을 사용해 응답
    return NextResponse.json<ResponseType<Omit<UserType, "password">>>({
      status: 201,
      message: "성공적으로 회원 가입 처리 되었습니다.",
      data: {
        ...createdUser.toObject(),
        password: undefined, // 비밀번호 숨김
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes("E11000 duplicate key error collection:")) {
        return NextResponse.json({
          status: 400,
          message: "이메일이 중복되었습니다.",
          field: "email",
        });
      }
      console.error("회원 가입 실패:", error.message);
      return NextResponse.json({
        status: 500,
        message: error.message,
      });
    }
    throw error;
  }
};
