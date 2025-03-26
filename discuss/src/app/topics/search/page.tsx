import React from 'react'
import { fetchPostsBySearchTerm } from '@/db/queries/posts';
import PostList from '@/components/posts/post-list';


interface SearchPageProps {
    searchParams: Promise<{
      term: string;
    }>;
}

const Searchpage:React.FC<SearchPageProps> =async ({searchParams}) => {  
  const {term} =await searchParams;
     
  return (
    <div>       
        <PostList fetchData={() => fetchPostsBySearchTerm(term)} />
    </div>
  )

}

export default Searchpage;