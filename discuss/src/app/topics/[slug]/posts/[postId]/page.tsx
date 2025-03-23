import React from 'react'

interface PostDetailsPageProps{
  params:Promise<{postId:string}>
}


const PostDetailsPage:React.FC<PostDetailsPageProps> = async ({params}) => {
  const {postId} =await params;

  return (
    <div>        
        PostDetailsPage  -{postId}
    </div>
  )

}

export default PostDetailsPage;