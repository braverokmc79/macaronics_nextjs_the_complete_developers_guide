import type {Post} from "@prisma/client";
import {db} from "@/db";
import {cache} from "react";

export type PostWithData =Post & {
    topic: { slug: string };
    user: { name: string | null };
    _count: { comments: number };
};

/**
 * 검색처리
 * @returns 
 */
export function fetchPostsBySearchTerm(term:string):Promise<PostWithData[]> {
  return db.post.findMany({
    include: {
        topic: {select:{slug:true}},
        user:{select:{name:true, image:true}},
        _count:{select:{comments:true}},
    },
    where: {
      OR: [
        { title: { contains: term } },
        { content: { contains: term } },
      ],
    },
  })
}


export const fetchPostsByTopicSlug=cache(async(slug:string):Promise<PostWithData[]>=>{
    return db.post.findMany({
        where:{topic: {slug:slug}},
        include:{
           topic: {select:{slug:true}},
           user:{select:{name:true}},
           _count:{select:{comments:true}},
        }
    });
});




export const fetchTopPost=cache(():Promise<PostWithData[]> => {
    const result=   db.post.findMany({       
        orderBy: [
          {
            comments: {
              _count: "desc",
            },
          }
        ],  
        include: {
            topic: {select:{slug:true}},
            user:{select:{name:true, image:true}},
            _count:{select:{comments:true}},
        } ,
        take: 5,     
    });


    console.log("🤢Fetching top posts...", result);

    return result;  
});