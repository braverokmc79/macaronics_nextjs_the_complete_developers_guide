"use client";
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import {  usePathname } from 'next/navigation';
import React from 'react'

const ProductsSectionBbannerComponent = () => {
 const pathname = usePathname();
 if(pathname!=="/products") return null;

  return (
    <section id="hero">
      {/* 히어로 컨테이너  */}
      <div className="container flex flex-col-reverse mx-auto p-6 lg:flex-row">
       
       
        {/* 1.내용 컨테이너  */}
        <div className="flex flex-col space-y-10 md:mb-20 lg:mt-16 lg:w-1/2 xl:mb-32">
          <h1
            className="text-5xl font-bold text-center lg:text-5xl lg:max-w-md lg:text-left">
            부트 캠퍼스
          </h1>
          <p
            className="text-2xl text-center text-gray-400 lg:max-w-md lg:text-left"
          >
           풀스택으로 스프링부트, NestJs, Django, 넥스트, 리액트 네이티브로 웹 && 앱을 만들기
          </p>
          <div className="mx-auto lg:mx-0">            
             <Button size="lg"  asChild>
                <Link href="#">시작하기</Link>
            </Button>
          </div>
        </div>
         
        {/*2.이미지  */}
        
        <div className="mb-24 mx-auto md:w-180 lg:mb-0 lg:w-1/2">
          <Image src="images/illustration-working.svg" alt="작업 중"  width={500} height={500} />
        </div>
      </div>
    </section>
  )
}

export default ProductsSectionBbannerComponent;