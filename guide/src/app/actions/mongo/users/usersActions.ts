"use server";
import bcrypt from "bcryptjs";
import { dbConnect } from "@/lib/mongo";
import { User } from "@/model/mongo/user-model";
import { ResponseType } from "@/types/ResponseType";
import { UserType } from "@/types/UserType";

// 1. 유저 생성 함수
export async function createUser(
  userData: Omit<UserType, "createdAt" | "updatedAt" | "passwordConfirm">
): Promise<ResponseType<Omit<UserType, "password">>> {
  try {
    await dbConnect();

    // 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(userData.password, 5);

    // 유저 데이터 생성
    const newUser = await User.create({
      name: userData.name,
      email: userData.email,
      password: hashedPassword, // 해싱된 비밀번호 저장
      dob: userData.dob,
      accountType: userData.accountType,
      companyName: userData.companyName,
      numberOfEmployees: userData.numberOfEmployees,
    });

    // Mongoose 문서를 JS 객체로 변환 후 필드 가공
    const createdUser = newUser.toObject();
    
    return {
      status: 201,
      message: "성공적으로 회원 가입 처리 되었습니다.",
      data: {
        ...createdUser,
        _id: createdUser._id.toString(), // ObjectId를 문자열로 변환
        createdAt: createdUser.createdAt.toISOString(), // Date 변환
        updatedAt: createdUser.updatedAt.toISOString(),
        password: undefined, // 보안상 반환하지 않음
      },
    };
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes("E11000 duplicate key error collection:")) {
        return {
          status: 400,
          message: "이메일이 중복되었습니다.",
          field: "email",
        };
      }
      console.error("회원 가입 실패:", error.message);
      return {
        status: 500,
        message: error.message,
      };
    }
    throw error;
  }
}
