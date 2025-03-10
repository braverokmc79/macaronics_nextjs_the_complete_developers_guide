"use client";
import { Editor } from '@monaco-editor/react'
import React from 'react'


const EditorComponent = ({code} :{code:string}) => {
  return (
    <Editor 
    className="w-full   rounded-lg p-2 resize-none"
    height="40vh"
    defaultLanguage="javascript"
    theme='vs-dark'
    defaultValue={code}
    options={
      {
      minimap:{enabled:false},
    }}

  />

  )
}

export default EditorComponent