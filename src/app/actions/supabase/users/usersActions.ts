"use server";
import bcrypt from "bcryptjs";
import { ResponseType } from "@/types/ResponseType";
import { UserType } from "@/types/UserType";
import { supabase } from "@/lib/supabaseClient";

// 유저 생성 함수
export async function createUser(
  userData: Omit<UserType, "createdAt" | "updatedAt" | "passwordConfirm">
): Promise<ResponseType<Omit<UserType, "password" | "passwordConfirm">>> {
  try {
    // 중복 이메일 체크
    const { data: existingUser, error: existingUserError } = await supabase.from("users")
                .select("*").eq("email", userData.email).single();

     console.log(" =============existingUser :",existingUser);

    if (existingUser) {
      return {
        status: 400,
        message: "이메일이 중복되었습니다.",
        field: "email",
      };
    }

    // 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(userData.password, 5);

    // accountType 유효성 검사
    const validAccountTypes = ["personal", "company"];
    const accountType = validAccountTypes.includes(userData.accountType)? userData.accountType: "personal";

    // 유저 데이터 생성
    const insertData = {
      email: userData.email,
      password: hashedPassword,
      dob: new Date(userData.dob),
      accountType: accountType,
      name: userData.name,
      companyName: userData.companyName,
      numberOfEmployees: userData.numberOfEmployees,
    };

    const { data: resUsers, error } = await supabase
      .from("users")
      .insert(insertData)
      .select()
      .single(); // 삽입된 단일 행을 반환

    if (error) throw new Error(error.message);
    if (!resUsers) throw new Error("Failed to create user");

    const newUser = resUsers as UserType;

    return {
      status: 201,
      message: "성공적으로 회원 가입 처리 되었습니다.",
      data: {
        id: newUser.id,
        email: newUser.email,
        accountType: newUser.accountType,
        dob: newUser.dob,
        name: newUser.name ?? undefined,
        companyName: newUser.companyName ?? undefined,
        numberOfEmployees: newUser.numberOfEmployees ?? undefined,
        createdAt: newUser.createdAt,
        updatedAt: newUser.updatedAt,
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
