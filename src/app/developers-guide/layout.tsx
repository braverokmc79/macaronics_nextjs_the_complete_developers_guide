import React from 'react'

interface DevelopersGuideLayoutProps {
    children: React.ReactNode
}
const DevelopersGuideLayout:React.FC<DevelopersGuideLayoutProps> = ({children}) => {
  return (
    <div className='bg-gray-100'>
      <div className='max-w-screen-2xl mx-auto'>
          {children}
      </div>
    </div>
    
  )
}

export default DevelopersGuideLayout;