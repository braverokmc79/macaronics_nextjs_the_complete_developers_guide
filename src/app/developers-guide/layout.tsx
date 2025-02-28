import React from 'react'

interface DevelopersGuideLayoutProps {
    children: React.ReactNode
}
const DevelopersGuideLayout:React.FC<DevelopersGuideLayoutProps> = ({children}) => {
  return (
    <div>
        {children}
    </div>
  )
}

export default DevelopersGuideLayout;