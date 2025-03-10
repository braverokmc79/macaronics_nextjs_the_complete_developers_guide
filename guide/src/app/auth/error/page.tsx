"use client";

import { useSearchParams } from "next/navigation";

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold text-red-500">인증 오류 발생</h1>
      <p className="mt-2">{error ? `오류 코드: ${error}` : "알 수 없는 오류"}</p>
    </div>
  );
}
