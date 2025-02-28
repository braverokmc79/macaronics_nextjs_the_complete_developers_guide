import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react'

const DevelopersGuidePage:React.FC = () => {
  return (
    <div className='w-full max-w-screen-2xl mx-auto items-center bg-zinc-100 h-[100vh]'>

      <div className='flex  flex-col items-center justify-center h-[100vh]'>
        <h2 className='text-4xl font-bold  '>
          "Next.js Developer Guide - Home Page"
        </h2>

        <div className='flex gap-3 mt-5'>
           <Button asChild >
              <Link href="/developers-guide/performance">performance</Link>
           </Button>

           <Button asChild >
              <Link href="/developers-guide/reliability">reliability</Link>
           </Button>

           <Button asChild >
              <Link href="/developers-guide/performance">scale</Link>
           </Button>
        </div> 
      </div>
    </div>
  )
}

export default DevelopersGuidePage;