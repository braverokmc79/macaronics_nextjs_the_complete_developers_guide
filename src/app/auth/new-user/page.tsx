"use client";
import React ,{ useState }from "react";
import SignupForm from "../components/signup-form";
import SocialLogin from "../components/social-login";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

const NewUserPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 관리

  const socialLoginHandleOpenModal = () => {
    setIsModalOpen(true); // 모달 열기
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // 모달 닫기
  };

  return (
    <div className="w-full flex flex-col justify-center items-center  mt-48 mb-48">   
        <div className="flex justify-center mb-2 ">
         <Link  href="/"className="text-5xl font-bold text-pink-500" >M</Link>
       </div>
       <div className="w-full  md:max-w-4xl  flex flex-col md:flex-row ">
         <SignupForm socialLoginHandleOpenModal={socialLoginHandleOpenModal} />
          
         <Card className="hidden  w-full    md:block max-w-sm mx-auto">
          <CardHeader>
            <CardTitle className="text-center text-3xl">소셜 가입</CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent>
            <SocialLogin />
          </CardContent>
        </Card>
       
       </div>   

         {/* 모달 팝업 */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
            <button onClick={handleCloseModal} className="absolute top-4 right-4 text-xl text-black">
              X
            </button>
            <h2 className="text-2xl mb-4 text-center">소셜 가입</h2>
            <SocialLogin /> {/* 소셜 로그인 컴포넌트 팝업 안에 포함 */}
          </div>
        </div>
      )}
    </div>
    
  )
};

export default NewUserPage;
