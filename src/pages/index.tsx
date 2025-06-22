import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import { TwitterTweetEmbed } from "react-twitter-embed";
import { useEffect, useState, useRef } from 'react';
import { tweetExtract } from '../utils/tweetExtract';
import ArticleHorizontal from "@/components/ArticleHorizontal";
import { feedExtract, viewMore } from "@/utils/feedExtract";
import Header from "@/components/Header";
import { motion, AnimatePresence } from "framer-motion";
import FullScreenGallery from "@/components/FullScreenGallery";
import FullScreenCharacters from "@/components/FullScreenCharacters";
import localFont from 'next/font/local';
import BottomBar, { CenterMenu } from "@/components/BottomBar";
import TestBar from "@/components/TestBar";
import MenuCard from "@/components/MenuCard";
import { GridOne, GridTwo } from "@/components/FeedModules";

const funkydoriBold = localFont({
  src: '../../public/fonts/funkydori-bold.otf',
  variable: '--font-funkydori-bold',
});

const funkydori = localFont({
  src: '../../public/fonts/funkydori.otf',
  variable: '--font-funkydori',
});

export default function Home() {
  const [tweetContent, setTweetContent] = useState<string>('');
  const [feedContent, setFeedContent] = useState<FeedResponse['posts']>([]);
  const [page, setPage] = useState("News");
  const [menu, setMenu] = useState(false);
  const lastMenuToggle = useRef<number>(0);
  const [tab, setTab] = useState('Labubu');
  const [fetching, setFetching] = useState(false);
  const [open, setOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [animationCoolDown, setAnimationCoolDown] = useState(false);
  const [isHeaderPinned, setIsHeaderPinned] = useState(false);

  useEffect(() => {
    if(!open) {
        setAnimationCoolDown(true);
        setTimeout(() => {
            setAnimationCoolDown(false);
        }, 300);
    }
  }, [open]);

  const debouncedSetMenu = (value: boolean) => {
    const now = Date.now();
    if (now - lastMenuToggle.current >= 1500) {
      setMenu(value);
      lastMenuToggle.current = now;
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      // Check if we've scrolled past the initial header height (around 120px)
      const scrollY = window.scrollY;
      const headerHeight = 300; // Approximate height of the initial header
      setIsHeaderPinned(scrollY > headerHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchFeed = async () => {
      if(fetching) return;
      setFetching(true);
      const response = await feedExtract('POPMARTGlobal', tab);
      console.log(response);
      // viewMore('POPMARTGlobal', response.loadMoreUrl);
      setFeedContent(response.posts);
      setFetching(false);
    };

    // const fetchTweet = async () => {
    //   console.log('fetching tweet');
    //   try {
    //     const response = await tweetExtract('popmart_us', '1915330117641056260');
    //     console.log('data', response);
    //     setTweetContent(response.text);
    //   } catch (error) {
    //     console.error('Error fetching tweet:', error);
    //   }
    // };

    // fetchTweet();
    fetchFeed();
  }, [tab]);

  return (
    <div className="relative z-20 bg-[#ffffff] pt-12">
      {/* Sticky header at viewport level */}
      <Header setMenu={() => debouncedSetMenu(!menu)} />
      
      <div className="w-full mx-auto">
        {/* Main content inside constrained container */}
        {page === "Series" && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-hidden">
            <FullScreenGallery />
          </div>
        )}
        {page === "Characters" && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-hidden">
            <FullScreenCharacters />
          </div>
        )}

        <div className="flex flex-row gap-4 w-full justify-start sticky top-0 z-50 p-4 bg-[#ffffff]/90 backdrop-blur-xl">
          <div className="max-w-[1080px] mx-auto flex flex-row gap-4 w-full justify-start">
            <motion.button
              className="relative z-50 flex flex-col justify-center items-start w-10 h-10 rounded focus:outline-none overflow-hidden"
              onClick={() => {
                setOpen((o) => !o);
                debouncedSetMenu(!menu);
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              aria-label="Open menu"
              initial={{ opacity: 0, x: -20 }}
              animate={{ 
                opacity: isHeaderPinned ? 1 : 0, 
                x: isHeaderPinned ? 0 : -20 
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <motion.div
                animate={open ? {width: "100%", rotate: 45, y: 8 } : { width: "100%", rotate: 0, y: 0 }}
                className="w-8 h-1 bg-black rounded mb-1"
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
              <motion.div
                animate={open ? { width: "100%", opacity: 0 } : { width: isHovered || animationCoolDown ? "100%" : "66%", opacity: 1 }}
                className="w-4 h-1 bg-black rounded mb-1"
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
              <motion.div
                animate={open ? { width: "100%", rotate: -45, y: -8 } : { width: isHovered || animationCoolDown ? "100%" : "33%", rotate: 0, y: 0 }}
                className="w-2 h-1 bg-black rounded"
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
            </motion.button>

            <motion.div 
              className="flex flex-row gap-4"
              initial={{ x: 0 }}
              animate={{ x: isHeaderPinned && !menu ? 8 : -50, opacity: menu ? 0 : 1 }} // 56px = button width (40px) + gap (16px)
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {['Labubu', 'Molly', 'Hirono', 'Skullpanda', 'Dimoo'].map((item, idx) => (
                <motion.button 
                  initial={{ x: 0 }}
                  animate={{ x: menu ? 8 * (5 - idx) : 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  onClick={() => setTab(item)} key={idx} className={`cursor-pointer rounded-[20px] bg-black px-4 py-2 flex flex-col h-full`}>
                  <div className="text-sm text-white whitespace-pre-line">
                    {item}
                  </div>
                </motion.button>
              ))}
            </motion.div>
          </div>
        </div>

        <div
          className={`bg-[#ffffff] min-h-screen overflow-x-hidden`}
        >
          <main className="flex flex-col gap-6 w-screen items-center">
            <div className="max-w-[1080px] gap-6 flex-1">
              <div className="col-span-2">
                <GridOne posts={feedContent} />
              </div>
              <div className="w-full h-[1px] bg-black my-10 rounded-full" />
              <div className="flex flex-col gap-2">
                <GridTwo posts={feedContent.filter((article) => article.images.length > 0).slice(0, 4)} />
              </div>
            </div>
          </main>
          <footer className="row-start-3 flex mt-20 gap-[24px] flex-wrap items-center justify-center">
            <a
              className="flex items-center gap-2 hover:underline hover:underline-offset-4"
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                aria-hidden
                src="/file.svg"
                alt="File icon"
                width={16}
                height={16}
              />
              Learn
            </a>
            <a
              className="flex items-center gap-2 hover:underline hover:underline-offset-4"
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                aria-hidden
                src="/window.svg"
                alt="Window icon"
                width={16}
                height={16}
              />
              Examples
            </a>
            <a
              className="flex items-center gap-2 hover:underline hover:underline-offset-4"
              href="https://nextjs.org?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                aria-hidden
                src="/globe.svg"
                alt="Globe icon"
                width={16}
                height={16}
              />
              Go to nextjs.org →
            </a>
          </footer>
        </div>
      </div>
       {/* <TestBar />  */}

      {/* <BottomBar page={page} menu={menu} setPage={setPage} setMenu={() => debouncedSetMenu(!menu)} /> */}
      <motion.div 
        animate={{ display: menu ? 'flex' : 'none' }}
        transition={{
          delay: menu ? 0 : 0.6,
        }}
          className="fixed inset-0 flex items-center justify-center overflow-hidden"
      >
        {/* Top white curtain */}
        <motion.div
          initial={{ y: "-100%" }}
          animate={{ y: menu ? "0%" : "-100%" }}
          transition={{ 
            delay: menu ? 0 : 0.6, 
            duration: 0.6, 
            ease: [.97,.56,.32,.99] 
          }}
          className="absolute top-0 left-0 w-full h-1/2 bg-white z-10"
        />
        
        {/* Bottom white curtain */}
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: menu ? "0%" : "100%" }}
          transition={{ 
            delay: menu ? 0 : 0.6, 
            duration: 0.6, 
            ease: [.97,.56,.32,.99] 
          }}
          className="absolute bottom-0 left-0 w-full h-1/2 bg-white z-10"
        />

        <div className="relative z-20 flex flex-col gap-4 justify-center items-center">
            <MenuCard
              title="News"
              secondary="News"
              image="https://i.imgur.com/G2QtZzi.png"
              onClick={() => {
                setPage("News");
                debouncedSetMenu(false);
              }}
              menu={menu}
              delay={0.55}
            />
            
            <MenuCard
              title="Series"
              secondary="Series"
              image="https://i.imgur.com/tFkfdq8.png"
              onClick={() => {
                setPage("Series");
                debouncedSetMenu(false);
              }}
              menu={menu}
              delay={0.55}
            />

            <MenuCard
              title="Characters"
              secondary="Characters"
              image="https://i.imgur.com/JkQioxQ.png"
              onClick={() => {
                setPage("Characters");
                debouncedSetMenu(false);
              }}
              menu={menu}
              delay={0.55}
            />

            <MenuCard
              title="Collect"
              secondary="Soon"
              image="https://i.imgur.com/dKY8U2b.png"
              onClick={() => {
                debouncedSetMenu(false);
              }}
              menu={menu}
              delay={0.55}
            />
        </div>

      </motion.div>
    </div>
  );
}
