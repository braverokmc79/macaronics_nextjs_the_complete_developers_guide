"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/custom_calendar";
import { format } from "date-fns"
import { ko } from "date-fns/locale";  // ✅ 한국어 로케일 추가
import { PasswordInput } from "@/components/ui/password-input";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/custom-use-toast";
import { ToastAction } from "@/components/ui/custom-toast";
import { createUser } from "@/app/actions/mongo/users/usersActions";

import { UserType } from "@/types/UserType";
import { signupValidationSchema } from "@/validation-schemas/authValidationSchema";
import { createUsersAction } from "@/app/actions/userService";


interface SignupFormProps {
  socialLoginHandleOpenModal: () => void;
}

const SignupForm: React.FC<SignupFormProps> = ({socialLoginHandleOpenModal}) => {
  const { toast } = useToast();
  const router =useRouter();
  const [isLogining, setIsLogining] = useState(false);

  const form = useForm<z.infer<typeof signupValidationSchema>>({
    resolver: zodResolver(signupValidationSchema),
    defaultValues: {
      email: "",
      name: "",  
      accountType: "personal", 
      dob: undefined,
      companyName: "",
      numberOfEmployees: 0,
      password: "", 
      passwordConfirm: "",
    },
  });

  // 회원가입 핸들러
  const handleSubmit = async (data: z.infer<typeof signupValidationSchema>) => {
    setIsLogining(true);
    try {
           // 비밀번호 확인 필드 제거 & User 모델에 맞게 데이터 정리
            const userData = {
              name: data.name,
              email: data.email,
              password: data.password,
              dob: new Date(data.dob), // 문자열을 Date 객체로 변환
              accountType: data.accountType,
              companyName: data.companyName,
              numberOfEmployees: data.numberOfEmployees,
            } as UserType;


            //1.서버 액션(Server Actions) 처리 방식
            //const response = await createUsersAction( userData);
            
            //2.API 라우트(API Routes) 방식
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTES_TYPE}/users/register`, {
              method: 'POST',
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify(userData)
            }).then(response => response.json());

     
            if (response.status === 201) {
              toast({
                description: "✅ 회원 가입을 축하 합니다.",
                position:"top",             
                action: (
                  <ToastAction altText="확인"
                    onClick={() => router.push("/auth/signin")}>
                    확인
                  </ToastAction>
                ),
              });
               
             setTimeout(() => router.push("/auth/signin"), 5200);
            
          }else{
            toast({
              title: "❌ 회원가입 실패.",
              description: response.message,
              position:"top", 
              variant:"default",                          
            });
              form.setError("email", { message: response.message });
              return;
          }

    } catch (error) {
      console.error("회원가입 실패:", error);
      toast({  position:"top",   description: `❌ 회원가입 실패:` });
    }finally{
      setIsLogining(false);
    }     
  };

  const accountType = form.watch("accountType");
  const dobFromDate=new Date();
  dobFromDate.setFullYear(dobFromDate.getFullYear() - 120);

  return (
    <>
      <Card className="w-full max-w-sm mx-auto  ">
        <CardHeader className="mt-20 md:mt-0">
          <CardTitle className="text-center text-3xl">회원가입</CardTitle>
          <CardDescription>Macaronics.net 계정에 회원가입하세요.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="flex flex-col gap-4"
            >
              {/* 이메일 필드 */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>이메일</FormLabel>
                    <FormControl>
                      <Input placeholder="example@email.com" required {...field} />
                    </FormControl>
                    {/* <FormDescription>
                      Macaronics.net 계정의 이메일을 입력해주세요.
                    </FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />

                {/* 이름 */}
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>이름</FormLabel>
                        <FormControl>
                          <Input placeholder="이름을 입력해주세요. " {...field} />
                        </FormControl>                        
                        <FormMessage />
                      </FormItem>
                    )}
                  />

              <FormField
                control={form.control}
                name="accountType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>회원구분</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="회원구분을 선택해 주세요." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="personal">개인</SelectItem>
                        <SelectItem value="company">기업</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              {accountType === "company" && (
                <>
                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>기업명</FormLabel>
                        <FormControl>
                          <Input placeholder="기업명을 입력해주세요. " {...field} />
                        </FormControl>                        
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="numberOfEmployees"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>직원수</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="직원수를 입력해주세요." {...field} 
                            min={0} 
                            value={field.value ?? ""}
                          />
                        </FormControl>                        
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                
                </> 
              )}
              

              <FormField
                control={form.control}
                name="dob"
                render={({ field }) => (
                  <FormItem className="flex flex-col pt-2">
                    <FormLabel className="h-5" >생년월일</FormLabel>
                    <FormControl>                     
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>                            
                            <Button variant={"outline"}                      
                              className="normal-case flex justify-between"                            
                            >
                        
                          {field.value ? (format(field.value, "yyyy-MM-dd")) : (<span>날짜 선택</span>)}
                      
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                       
                        <PopoverContent  align="start" className="w-auto p-0 ">
      
                        <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={(date) => field.onChange(date ?? null)}
                            fixedWeeks
                            weekStartsOn={0}  // 주의 시작 요일을 '일요일(0)'로 변경
                            fromMonth={dobFromDate}
                            toDate={new Date()}
                            captionLayout="dropdown-buttons"
                            locale={ko}  // ✅ 한국어 적용
                            required
                          /> 
                        </PopoverContent>
                      </Popover>
                    </FormControl>                        
                    <FormMessage />
                  </FormItem>
                )}
              />
       


          {/* 비밀번호 필드 */}
              <FormField
                control={form.control}
                
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>비밀번호</FormLabel>
                    <FormControl>
                      {/* <Input placeholder="비밀번호" type="password" {...field} /> */}
                      <PasswordInput  placeholder="비밀번호" required  {...field} />
                    </FormControl>                   
                    <FormMessage />
                  </FormItem>
                )}
              />


           {/* 비밀번호 확인 필드 */}
            <FormField
                control={form.control}                
                name="passwordConfirm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>비밀번호 확인</FormLabel>
                    <FormControl>                      
                      <PasswordInput  placeholder="비밀비밀번호 확인" required  {...field} />
                    </FormControl>                   
                    <FormMessage />
                  </FormItem>
                )}
            />



            {/* 이용약관 체크 박스 */}
            <FormField
                control={form.control}
                name="acceptTerms"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex gap-2 items-center">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel>이용약관에 동의합니다.</FormLabel>
                    </div>
                    <FormDescription>
                      회원 가입을 위해 약관 동의는 필수 입니다.{" "}
                      <Link
                        href="/terms"
                        className="text-primary hover:underline"
                      >
                       이용 약관
                      </Link>
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />


              {/* 회원가입 버튼 */}
             {isLogining ? 
             <Button type="submit" disabled className="w-full">회원가입중...</Button> 
              :<Button type="submit" className="w-full">회원가입</Button>
             }

              {/* 소셜 가입 아이콘 버튼 */}
              <Button type="button" onClick={socialLoginHandleOpenModal} variant="outline" 
                  className="block md:hidden 
                   w-full bg-destructive text-destructive-foreground hover:bg-destructive/80 
                   hover:text-destructive-foreground
                   ">
                소셜 회원가입
              </Button>
            </form>
          </Form>        
        </CardContent>
         

        <CardFooter className="flex justify-between">
          <small>이미 계정이 있으신가요?</small>
          <Button asChild variant="outline" size="sm">
            <Link href="/auth/signin">로그인</Link>
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default SignupForm;
