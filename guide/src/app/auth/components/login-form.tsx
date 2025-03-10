"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,  
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { doCredentialsLogin } from "@/app/actions/auth/loginActions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signinValidationSchema } from "@/validation-schemas/authValidationSchema";



const LoginForm: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] =useState(false);

  // 2) useForm 설정
  const form = useForm<z.infer<typeof signinValidationSchema>>({
    resolver: zodResolver(signinValidationSchema), // zodResolver를 사용하여 유효성 검사를 적용
    defaultValues: { email: "", password: "" }, // 기본값을 빈 문자열로 설정
  });

  // 3) 폼 제출 핸들러
  const handleSubmit = async (data: z.infer<typeof signinValidationSchema>) => {
    setIsLoading(true); // 로그인 시작 → 로딩 상태 true
    try {
      const response = await doCredentialsLogin(data);
  
      if (response && response.field) {       
        if (response.field && response.field === "password") {
          form.setError(response.field, { message: response.message });
        } else {
          form.setError("email", { message: response.message }); // 기본적으로 이메일 필드에 표시
        }     
        return;               
      }

      router.push("/dashboard");
      
    } catch (error) {
      console.error("handleSubmit Error: ", error);
      form.setError("email", { message: "로그인 중 오류가 발생했습니다." });
    } finally {
      setIsLoading(false); 
    }
  };
  
  

  return (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col gap-4 mb-2"
          >
            {/* 이메일 입력 필드 */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>이메일</FormLabel>
                  <FormControl>
                    <Input placeholder="example@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 비밀번호 입력 필드 */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>비밀번호</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="비밀번호" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 로그인 버튼 */}
            <Button type="submit" className="w-full bg-destructive hover:bg-red-800" disabled={isLoading}>
              {isLoading ? "로그인 중..." : "로그인"}
            </Button>
          </form>
    </Form>
  );
};

export default LoginForm;
