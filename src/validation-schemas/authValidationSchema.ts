import { z } from "zod";

//1.로그인 유효성 검사 스키마 정의
export const signinValidationSchema = z.object({
  email: z.string().email("유효한 이메일을 입력하세요."),
  password: z.string().min(4, "비밀번호는 최소 4자 이상이어야 합니다."),
});



//2.회원 가입 유효성 검사 스키마 정의
export const signupValidationSchema = z.object({
    email: z.string().email("유효한 이메일을 입력하세요."),
    name: z.string({ required_error: "이름을 을 입력해주세요." }).optional(),
    accountType: z.enum(["personal", "company"]),
    companyName: z.string({ required_error: "기업명을 입력해주세요." }).optional(),
    numberOfEmployees: z.coerce.number({ required_error: "직원수를 입력해주세요." }).optional(),  
    dob:z.date({ required_error: "생년월일을 선택해주세요." }).refine((date)=>{
      const today = new Date();
      const eighteedYearsAgo =new Date(
        today.getFullYear() - 18,
        today.getMonth(),
        today.getDate()
      );
      return date <= eighteedYearsAgo;    
    }, "18세 이상의 사람만 회원가입 가능합니다."),  
    password: z.string({ required_error: "비밀번호를 입력해 주세요." }).min(8, "8자 이상 입력하세요.")
    .refine((password) => {
       return /^(?=.*[!@#$%^&*])(?=.*[A-Z]).*$/.test(password);
    },"비밀번호는 특수문자 1개 이상, 대문자 1개 이상을 포함해야 합니다."),
  
    passwordConfirm: z.string({ required_error: "비밀번호 확인을 입력해 주세요." }),
    acceptTerms: z.boolean({required_error: "이용약관에 동의해야 합니다."})
    //.refine((checked) => checked, "You must accept the terms and conditions"),  
  
  }).superRefine((data, ctx) => {
    // 1️⃣ 기업 계정인 경우 기업명과 직원 수 먼저 확인
    if (data.accountType === "company") {
      if (!data.companyName) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["companyName"],
          message: "기업명을 입력해주세요.",
        });
      }
  
      if (!data.numberOfEmployees || data.numberOfEmployees < 1) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["numberOfEmployees"],
          message: "직원수를 입력해주세요.",
        });
      }
    }
  
    // 2️⃣ 비밀번호 확인 필드 체크
    if (data.password !== data.passwordConfirm) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["passwordConfirm"],
        message: "비밀번호와 비밀번호 확인은 일치해야 합니다.",
      });
    }
  
    // 3️⃣ 이용약관 동의 마지막에 체크
    if (!data.acceptTerms) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["acceptTerms"],
        message: "이용약관에 동의해야 합니다.",
      });
    }
  });
  