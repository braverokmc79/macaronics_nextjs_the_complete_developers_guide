import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";


//샘플
export const GET = async (request: Request) => {
  try {
    const session = await auth();
    console.log(" 샘플 request ", request);


    if (!session?.user?.email) {
      return NextResponse.json({ error: "User ID not found in session" }, { status: 400 });
    }

    const findUser = await prisma.user.findUnique({
        where: { email: session.user.email },
    });

    return NextResponse.json({ user: findUser });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
};



export const POST = async (request: Request) => {
  try {
    const userData = await request.json();

    // 중복 이메일 체크
    const existingUser = await prisma.user.findUnique({
      where: { email: userData.email },
    });

    if (existingUser) {
      return NextResponse.json({
        status: 400,
        message: "이메일이 이미 사용 중입니다.",
        field: "email",
      });
    }

    // 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(userData.password, 5);

    // 유저 생성
    const newUser = await prisma.user.create({
      data: {
        email: userData.email,
        accountType: userData.accountType,
        dob: new Date(userData.dob),
        password: hashedPassword,
        name: userData.name,
        companyName: userData.companyName,
        numberOfEmployees: userData.numberOfEmployees,
      },
    });

    return NextResponse.json({
      status: 201,
      message: "성공적으로 회원 가입이 완료되었습니다.",
      data: {
        id: newUser.id,
        email: newUser.email,
        accountType: newUser.accountType,
        dob: newUser.dob,
        name: newUser.name,
        companyName: newUser.companyName,
        numberOfEmployees: newUser.numberOfEmployees,
        createdAt: newUser.createdAt,
        updatedAt: newUser.updatedAt,
      },
    });
  } catch (error) {
    console.error("회원 가입 실패:", error);
    return NextResponse.json({
      status: 500,
      message: "서버 오류가 발생했습니다.",
    });
  }
};
