import Image from "next/image";
import React from "react";

interface HeroProps {
    title: string
    imagAlt: string
    imgUrl: string
}

const Hero: React.FC<HeroProps> = (props) => {
  return (
    <div className="w-full -z-10 h-screen overflow-y-clip">
        <div className="absolute  inset-0">
            <Image
                src={props.imgUrl}
                alt="Home"
                fill
                className="object-cover"                
            />
      </div>
      <div className="relative pt-48 flex justify-center items-center z-10">           
            <h1 className="text-white text-6xl font-bold">
                {props.title}
            </h1>   
       </div>

    </div>
  );
};

export default Hero;
