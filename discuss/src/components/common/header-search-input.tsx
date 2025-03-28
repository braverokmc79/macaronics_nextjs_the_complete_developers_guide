"use client";
import React, { useActionState, useState, startTransition, useEffect } from "react";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { topicSearch } from "@/actions/topics";

const SearchInput = () => {

  const searchParams = useSearchParams();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");
  const [formState, action] =useActionState(topicSearch, {returnUrl:"/" });

  // const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (event.key === "Enter") {
  //     event.preventDefault();
  //     router.push(`?term=${encodeURIComponent(searchTerm)}`);
  //     //alert(searchTerm);
  //   }
  // };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();  
    console.log("sss:",searchTerm); 
    const formData = new FormData(event.currentTarget);
    formData.append('term', searchTerm);
    startTransition(() => {
        action(formData);
    });
    // startTransition(async () => {
    //   const path = await topicSearch(formData);
    //   router.push(path);
    // });        
  };

  useEffect(() => {
    if (formState.returnUrl!=="/") {
      router.push(formState.returnUrl);
    }
  }, [formState, router]);
  

  return (
    <div className="w-full px-2 md:w-1/2 md:pr-2 relative">
      <form
        onSubmit={handleSubmit}
      >
        <Input
          type="search"
          placeholder="검색..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          //onKeyDown={handleSearch}        
        />

        <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400 cursor-pointer" 
          onClick={() => router.push(`?q=${encodeURIComponent(searchTerm)}`)} 
        />
      </form>
    </div>
  );
};

export default SearchInput;
