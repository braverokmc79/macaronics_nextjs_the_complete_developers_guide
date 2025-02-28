import React from 'react'
import Image from 'next/image';

const DevelopersGuidePage:React.FC = () => {
  return (
    <div >

      <div className='flex  flex-col items-center justify-center h-[100vh]'>
        <h2 className='text-4xl font-bold mb-10 '>
          "Next.js Developer Guide - Home Page"
        </h2>  


        <div className='flex flex-row '>
          <Image src="/images/home.jpg" 
              alt='Home'  width={700} height={500}  
            className='w-[700px] h-[500px] object-cover'
            priority
            />  

            <div> By our proudct</div>
        </div>


      </div>
    </div>
  )
}

export default DevelopersGuidePage;