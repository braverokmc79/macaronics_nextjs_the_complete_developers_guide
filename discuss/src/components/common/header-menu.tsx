"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import paths from "@/paths";
import type { Topic } from "@prisma/client";

const HeaderMenu: React.FC = () => {
  const [topics, setTopics] = useState<Topic[]>([]);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await fetch("/api/topics");
        if (!response.ok) throw new Error("Failed to fetch topics");
        const data = await response.json();
        setTopics(data.topics);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTopics();
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">토픽 목록</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="ml-10">
        {topics.map((topic) => (
          <DropdownMenuItem key={topic.id}>
            <Link href={paths.topicShow(topic.slug)}>{topic.slug}</Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default HeaderMenu;
