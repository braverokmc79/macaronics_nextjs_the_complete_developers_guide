import React from 'react';
import { db } from '@/db';
import paths from '@/paths';
import Link from 'next/link';
import { Chip } from '../Chip';


const TopicList=async () => {
  const topics =await db.topic.findMany();

  const renderedTopics =topics.map((topic) =>{
    return(
      <div key={topic.id} >
        <Link href={paths.topicShow(topic.slug)}>
          <Chip label={topic?.slug} variant="filled" size="lg" className='hover:bg-zinc-600'   />                                
        </Link>
      </div>
    )
  });


  
  return (
    <div className='flex flex-row gap-2 mt-5'>
      {renderedTopics}
    </div>
  )
}

export default TopicList;