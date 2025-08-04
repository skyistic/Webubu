import { useState } from 'react';
import Stats from './Stats';
import { motion } from 'framer-motion';

const shadow = "shadow-[0_0px_60px_-15px_rgba(0,0,0,0)]";

export function GridOne({posts}: {posts: FeedResponse['posts']}) {
  if (!posts || posts.length === 0) {
    return null; 
  }

  const mainArticle = posts[0];
  const sideArticles = posts.slice(1, 4);

  return (
    <div className={`${shadow} font-sans bg-white p-2 mx-auto rounded-none`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <img src={"https://nitter.net" + mainArticle.images[0]} alt="Main article image" className="w-full aspect-[3/2] object-cover rounded-xl mb-4" />
          <p className="text-base text-gray-500 leading-normal line-clamp-4">{mainArticle.text}</p>
          <Stats {...mainArticle} isHovered={false} />
        </div>
        <div className="flex-1 flex flex-col gap-5">
          {sideArticles.map((article: FeedResponse['posts'][0], index: number) => (
            <div key={index} className="flex gap-4">
              <div className="relative w-[100px] md:w-[150px] flex-shrink-0 inset-0 z-0">
                <img src={"https://nitter.net" + article.images[0]} alt="Article image" className="rounded-none w-full aspect-[1/1] object-cover" />
                {/* Hardcoded live badge */}
                {index === 0 && <span className="absolute top-2 right-2 bg-red-500 text-white px-1.5 py-0.5 rounded text-[10px] font-bold">LIVE</span>}
              </div>
              <div className="flex flex-col">
                <p className="text-base text-gray-500 leading-normal line-clamp-4">{article.text}</p>
                <Stats {...article} isHovered={false} />  
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function GridTwo({posts}: {posts: FeedResponse['posts']}) {
  if (!posts || posts.length === 0) {
    return null; 
  }

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="font-sans mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full">
        {posts.map((article: FeedResponse['posts'][0], index: number) => (
          <motion.div onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} key={index} className={`${shadow} cursor-pointer flex gap-4 w-full bg-white p-2 rounded-none hover:bg-[#f2f0f0] duration-200`}>
            <div className="w-1/3">
              <img src={"https://nitter.net" + article.images[0]} alt="Main article image" className="w-full aspect-[1/1] object-cover rounded-none" />
            </div>
            <div className="w-2/3 flex flex-col gap-2 pt-2 justify-between">
              <p className="text-base text-black underline font-semibold leading-normal line-clamp-4">{article.text}</p>
              <Stats isHovered={isHovered} {...article} />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}