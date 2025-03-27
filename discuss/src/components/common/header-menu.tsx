import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  //DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// import Link from "next/link";
// import { db } from "@/db";
// import paths from "@/paths";
const HeaderMenu: React.FC = () => {
  
  //const topics =await db.topic.findMany();
  // const renderedTopics =topics.map((topic) =>{
  //   return(
  //     <DropdownMenuItem key={topic.id}>    
  //       <Link href={paths.topicShow(topic.slug)}>
  //       {topic?.slug}                               
  //       </Link>      
  //     </DropdownMenuItem>
  //   )
  // });

  
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">토픽목록</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="ml-10">          
          {/* {renderedTopics} */}
{/*           
          <DropdownMenuItem>
            <Link href="/topics">토픽1</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>토픽2</DropdownMenuItem>
          <DropdownMenuItem>토픽3</DropdownMenuItem> */}

        </DropdownMenuContent>
      </DropdownMenu>

      {/* <Button variant="outline" className="flex items-center gap-2" >
         토픽생성
      </Button> */}
    </>
  );
};

export default HeaderMenu;
