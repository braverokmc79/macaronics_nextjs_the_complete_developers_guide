import React from 'react'
import Image from 'next/image';
import Hero from './components/hero';

const DevelopersGuideCorpPage:React.FC = () => {
  return (
    <div  className='mt-28'>

     <div className='flex flex-col items-center justify-center h-[100vh] '>
        <h2 className='text-5xl font-bold mb-10  z-10 relative text-white'>
          "Next.js Developer Guide -Cops Home Page"
        </h2>  

       <div className='w-full'>
          <Hero 
            imgUrl='/images/home.jpg'
            imagAlt="자동차 공장"   
            title='전문 클라우드 호스팅' />
        </div>
      </div>

    </div>
  )
}

export default DevelopersGuideCorpPage;