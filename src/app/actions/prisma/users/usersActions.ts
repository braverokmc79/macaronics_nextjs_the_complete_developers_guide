"use server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { ResponseType } from "@/types/ResponseType";
import { UserType } from "@/types/UserType";

// 1. 유저 생성 함수
export async function createUser(
  userData: Omit<UserType, "createdAt" | "updatedAt" | "passwordConfirm">
): Promise<ResponseType<Omit<UserType, "password" | "passwordConfirm">>> {
  try {
    // 중복 이메일 체크
    const existingUser = await prisma.user.findUnique({
      where: { email: userData.email },
    });

    if (existingUser) {
      return {
        status: 400,
        message: "이메일이 중복되었습니다.",
        field: "email",
      };
    }

    // 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(userData.password, 5);

    // 유저 데이터 생성
    const newUser = await prisma.user.create({
      data: {
        email: userData.email,
        password: hashedPassword, // 해싱된 비밀번호 저장
        dob: new Date(userData.dob),
        accountType: userData.accountType,
        name: userData.name,
        companyName: userData.companyName,
        numberOfEmployees: userData.numberOfEmployees,
      },
    });

    return {
      status: 201,
      message: "성공적으로 회원 가입 처리 되었습니다.",
      data: {
        id: newUser.id,
        email: newUser.email,
        accountType: userData.accountType === "personal" || userData.accountType === "company" ? userData.accountType : "personal",
        dob: newUser.dob,
        name: newUser.name ?? undefined,
        companyName: newUser.companyName ?? undefined,
        numberOfEmployees: newUser.numberOfEmployees ?? undefined,
        createdAt: newUser.createdAt,
        updatedAt: newUser.updatedAt
      },
    };
  } catch (error) {
    console.error("회원 가입 실패:", error);
    return {
      status: 500,
      message: "서버 오류가 발생했습니다.",
    };
  }
}
