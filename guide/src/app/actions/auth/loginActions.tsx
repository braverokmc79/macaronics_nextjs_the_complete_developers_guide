"use server";
import { signIn, signOut } from "@/auth";
import { ResponseType } from "@/types/ResponseType";
import { UserType } from "@/types/UserType";
import { CredentialsProviderError } from "@/utils/CredentialsProviderError";

/**
 * 소셜로그인 처리
 * @param formData 
 */
export async function doSocialLogin(formData: FormData): Promise<void> {
    const action = formData.get("action");

    if (!action || typeof action !== "string") {
        throw new Error("Invalid action provided for login.");
    }

    await signIn(action, { redirectTo: "/dashboard" });
}

export async function doLogout(): Promise<void> {
    await signOut({redirectTo: "/"});    
}



/**
 * 로그인처리
 * @param param0 
 * @returns 
 */
export async function doCredentialsLogin({ email, password } :{email: string;password: string;})
      :Promise<ResponseType<Omit<UserType, "password">>> {
  try {
   
    const response = await signIn("credentials", { 
      redirect: false, 
      email, password ,
    });
    //성공시 : response http://localhost:3000/auth/signin ,http://localhost:3000/      
    //console.log("로그인 성공 시 :",response);
    return response;
  } catch (error) {
    
    if (error instanceof CredentialsProviderError) {      
      console.log(" 1. 로그인 오류 : " ,error.message);
       // 정규식을 사용하여 "Read more at https://errors.authjs.dev#autherror" 제거
      const cleanedMessage = error.message.replace(/\.?\s*Read more at https:\/\/errors\.authjs\.dev#autherror/, "");                 
      console.log(" 2로그인 오류 : " ,error.message);
      return {
        status: 401,
        message: cleanedMessage,
        field: error?.field ?? 'unknown'
      };
    }
    throw error;
  }
}

