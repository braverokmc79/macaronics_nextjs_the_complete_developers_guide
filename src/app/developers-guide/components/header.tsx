import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'


const DevelopersGuideHeader:React.FC = () => {
  return (
    <div className='flex  items-center justify-center   gap-3 pt-3'>
            <Button asChild  className='bg-zinc-800  hover:bg-zinc-950'>
                <Link href="/developers-guide/">guide Home</Link>
            </Button>
            <Button asChild  className='bg-zinc-800  hover:bg-zinc-950'>
                <Link href="/developers-guide/performance">performance</Link>
            </Button>

            <Button asChild  className='bg-zinc-800  hover:bg-zinc-950'>
                <Link href="/developers-guide/reliability">reliability</Link>
            </Button>

            <Button asChild  className='bg-zinc-800  hover:bg-zinc-950'>
                <Link href="/developers-guide/performance">scale</Link>
            </Button>
    </div> 
  )
}

export default DevelopersGuideHeader;