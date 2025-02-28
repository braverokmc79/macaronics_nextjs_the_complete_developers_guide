// src/middleware.ts
import { NextRequest } from "next/server";
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import {PUBLIC_ROUTES, LOGIN, ROOT, PROTECTED_SUB_ROUTES} from "./utils/MiddlewareRoutes";
import { NextAuthConfig } from "next-auth";


// ✅ NextAuth 설정을 가져와 미들웨어에서 활용할 수 있도록 설정
const nextAuthConfig: NextAuthConfig = {
    ...authConfig, // auth.config.ts에 정의된 기본 설정을 불러옴
    providers: authConfig.providers || [], // 프로바이더가 없을 경우 빈 배열을 기본값으로 설정
};

// ✅ NextAuth 인스턴스를 생성하여 auth 함수를 가져옴
const { auth } = NextAuth(nextAuthConfig);

/**
 * ✅ 미들웨어 함수: 모든 요청에 대해 실행됨
 * - 사용자의 인증 상태를 확인하고 접근 제어를 수행
 * - 인증되지 않은 사용자가 보호된 페이지에 접근하려 하면 로그인 페이지로 리디렉트
 */
export async function middleware(request:NextRequest ) {
  const { nextUrl } = request;
  const session = await auth();    // 현재 사용자 세션을 가져옴
  const isAuthenticated = !!session?.user; // 사용자가 로그인한 상태인지 확인
 
  console.log("====================middleware  :" ,isAuthenticated, nextUrl.pathname);

    // ✅ 공개 라우트 여부 확인 (로그인 없이 접근 가능한 페이지)
  const isPublicRoute = (
      (PUBLIC_ROUTES.find(route => nextUrl.pathname.startsWith(route)) // PUBLIC_ROUTES 배열에 포함된 경로인지 확인
      || nextUrl.pathname === ROOT) // 루트('/') 경로도 공개됨
      && !PROTECTED_SUB_ROUTES.find(route => nextUrl.pathname.includes(route)) // 보호된 서브 경로(PROTECTED_SUB_ROUTES)에 포함되지 않는 경우
  );
  
  console.log(isPublicRoute);

    // ✅ 로그인하지 않은 사용자가 보호된 페이지에 접근할 경우 로그인 페이지로 리디렉트
  if (!isAuthenticated && !isPublicRoute) {
      return Response.redirect(new URL(LOGIN, nextUrl)); // 로그인 페이지로 이동
  }

}




export const config = {
  matcher: [
    // ✅ 특정 파일 확장자가 있는 요청, `_next`, `api/auth` 경로를 제외하고 모든 경로에 미들웨어 적용
    //"/((?!.+\\.[\\w]+$|_next|api/auth).*)",

    //developers-guide 경로가 matcher에 포함되지 않도록 (?!developers-guide|...) 정규식
    "/((?!developers-guide|.+\\.[\\w]+$|_next|api/auth).*)",

    //example/ 이하의 모든 페이지도 미들웨어 적용 대상에서 제외하려면
    //"/((?!developers-guide|example|.+\\.[\\w]+$|_next|api/auth).*)",
    
    // ✅ 루트 경로(`/`)에도 미들웨어 적용
    "/",

    // ✅ `/api/mongo`, `/api/prisma`, `/api/springboot`, `/api/supabase`, `/trpc` 및 그 하위 경로에 미들웨어 적용
    "/(api/mongo|api/prisma|api/springboot|api/supabase|trpc)(.*)"
  ]
};

