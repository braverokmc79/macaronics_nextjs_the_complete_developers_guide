"use client";
import React from 'react'

interface SnippetsNewErrorPageProps {
   error :Error;
   reset:() => void;
}




const SnippetsNewErrorPage:React.FC<SnippetsNewErrorPageProps> = ({error}) => {
  return (
    <div>
        {error.message}
    </div>
  )
}

export default SnippetsNewErrorPage;
