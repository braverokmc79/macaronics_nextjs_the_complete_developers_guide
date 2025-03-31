"use client"
import React, { useState } from 'react'
import CommentUpdateForm from './comment-update-form';
import CommentDeleteComponent from './comment-delete-component';
import { Comment } from '@prisma/client';
import { Button } from '../ui/button';
import { Edit } from 'lucide-react';

interface CommentSettingProps{
  comment:Comment
}


const CommentSetting:React.FC<CommentSettingProps> = ({comment}) => {  
  const [ commentUpdateOpen, setCommentUpdateOpen]=useState(false);

  return (
    <>
     <CommentUpdateForm  comment={comment}  
      commentUpdateOpen={commentUpdateOpen} setCommentUpdateOpen={setCommentUpdateOpen} />    
      <Button onClick={() => setCommentUpdateOpen(true)} className='mr-2' >
          <Edit className="w-5 h-5" />
      </Button>     
     <CommentDeleteComponent commentId={comment.id} postId={comment.postId} slug={comment.postId} />
    </>
  )
}

export default CommentSetting;