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
import { formatRelativeTime } from "@/utils/timeUtils";
import { useInView } from "framer-motion";

const funkydoriBold = localFont({
  src: '../../public/fonts/funkydori-bold.otf',
  variable: '--font-funkydori-bold',
});

const funkydori = localFont({
  src: '../../public/fonts/funkydori.otf',
  variable: '--font-funkydori',
});

function SideBarContent({article}: {article: FeedResponse['posts'][0]}) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
  });

  return (
    <motion.div 
      ref={ref} 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 10 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-[#ffffff]/90 backdrop-blur-2xl p-4 rounded-3xl border border-gray-500/10 shadow-[0_0px_60px_-15px_rgba(0,0,0,0.02)]"
    >
      <p className="text-sm text-black mb-2">
        {article.text
        .replace('🚨 RESTOCK ALERT 🚨', '')
        .split('📱')[0]
        }
        <span className="text-gray-500 text-xs">
          {article.timestamp ? formatRelativeTime(article.timestamp) : ''}
          {article.timestamp}
        </span>
      </p>
    </motion.div>
  )
}

function MenuBar({ menu, setTab, isHeaderPinned }: { menu: boolean, setTab: (tab: string) => void, isHeaderPinned: boolean }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: menu ? 0 : 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`${isHeaderPinned ? 'border-b border-gray-500/20' : ''} bg-[#ffffff]/70 relative flex flex-row z-50 gap-4 w-full justify-start sticky top-0 backdrop-blur-2xl`}
    >
      <div className="relative max-w-[1080px] mx-auto flex flex-row gap-4 w-full justify-between">
        <div className="relative top-0 left-0 h-full overflow-hidden">
          <motion.div 
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: isHeaderPinned ? 0 : -30, opacity: isHeaderPinned ? 1 : 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="h-full w-full flex flex-col justify-center"
          >
            <img src="https://i.imgur.com/tr9aFtv.png" alt="logo" className="h-10 w-full object-cover" />
          </motion.div>
        </div>
        <motion.div 
          className="flex flex-row gap-4 justify-center p-4"
          initial={{ x: 0 }}
          // True to temporarily disable the hamburger menu
          animate={{ x: 0, opacity: menu ? 0 : 1 }} // 56px = button width (40px) + gap (16px)
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {['Labubu', 'Molly', 'Hirono', 'Skullpanda', 'Dimoo'].map((item, idx) => (
            <motion.button 
              initial={{ x: 0 }}
              animate={{ x: menu ? 8 * ((!isHeaderPinned ? -2 : 5) - idx) : 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={() => setTab(item)} key={idx} className={`cursor-pointer px-4 py-2 flex flex-col h-full`}>
              <div className="text-sm text-black underline font-semibold whitespace-pre-line">
                {item}
              </div>
            </motion.button>
          ))}
        </motion.div>
        <div className="relative top-0 left-0 h-14 w-40 -mt-4 overflow-hidden  "/>
      </div>
    </motion.div>
  )
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: menu ? 0 : 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex flex-row z-50 gap-4 w-full justify-start sticky top-0 p-4 bg-[#ffffff]/0 backdrop-blur-2xl"
    >
      <div className="max-w-[1080px] mx-auto flex flex-row gap-4 w-full justify-start">
        {/* <motion.button
          className="relative inset-0 flex flex-col justify-center items-start w-10 h-10 rounded focus:outline-none overflow-hidden"
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
            animate={open && false ? {width: "100%", rotate: 45, y: 8 } : { width: "100%", rotate: 0, y: 0 }}
            className="w-8 h-1 bg-black rounded mb-1"
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          />
          <motion.div
            animate={open && false ? { width: "100%", opacity: 0 } : { width: isHovered || animationCoolDown ? "100%" : "66%", opacity: 1 }}
            className="w-4 h-1 bg-black rounded mb-1"
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          />
          <motion.div
            animate={open && false ? { width: "100%", rotate: -45, y: -8 } : { width: isHovered || animationCoolDown ? "100%" : "33%", rotate: 0, y: 0 }}
            className="w-2 h-1 bg-black rounded"
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          />
        </motion.button> */}

        <motion.div 
          className="flex flex-row gap-4"
          initial={{ x: 0 }}
          // True to temporarily disable the hamburger menu
          animate={{ x: true ? 0 : isHeaderPinned && !menu ? 8 : -50, opacity: menu ? 0 : 1 }} // 56px = button width (40px) + gap (16px)
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {['Labubu', 'Molly', 'Hirono', 'Skullpanda', 'Dimoo'].map((item, idx) => (
            <motion.button 
              initial={{ x: 0 }}
              animate={{ x: menu ? 8 * ((!isHeaderPinned ? -2 : 5) - idx) : 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={() => setTab(item)} key={idx} className={`cursor-pointer rounded-[20px] bg-black px-4 py-2 flex flex-col h-full`}>
              <div className="text-sm text-white whitespace-pre-line">
                {item}
              </div>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function Home() {
  const [tweetContent, setTweetContent] = useState<string>('');
  const [feedContent, setFeedContent] = useState<FeedResponse['posts']>([]);
  const [restocksContent, setRestocksContent] = useState<FeedResponse['posts']>([]);
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
    const fetchRestocks = async () => {
      if(fetching) return;
      setFetching(true);
      const response = await feedExtract('restockd_ping', null);
      console.log(response);
      viewMore('restockd_ping', response.loadMoreUrl);
      setRestocksContent(response.posts.slice(0,10));
      setFetching(false);
    };

    fetchRestocks();
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

        <MenuBar menu={menu} setTab={setTab} isHeaderPinned={isHeaderPinned} />
        
                {/* Horizontal Restocks Section - Mobile Only */}
        <div className="w-full overflow-x-hidden sm:hidden">
          <div className="w-full">
            <div className="max-w-[1080px] mx-auto px-4">
              <span className={`${funkydori.className} text-[60px] sm:text-4xl text-black mb-0 sm:mb-4 block mt-8 sm:mt-0 text-center sm:text-left`}>Restocks</span>
            </div>
            <div className="overflow-x-auto pb-4">
              <div className="flex gap-4 w-max pl-4">
                <AnimatePresence>
                  {restocksContent.map((article, idx) => (
                    <div key={idx} className="w-80 flex-shrink-0">
                      <SideBarContent article={article} />
                    </div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        <div className="flex sm:hidden w-full">
          <span className={`${funkydori.className} text-[60px] sm:text-4xl text-black block text-center m-auto`}>Products</span>
        </div>
        <div
          className={`bg-[#ffffff] overflow-x-hidden mt-6`}
        >
          <main className="flex flex-col gap-6 w-full items-center">
            <div className="max-w-[1080px] w-full gap-6 flex-1 flex flex-col sm:flex-row px-4 sm:px-0">
              <div className="w-full sm:w-3/4 flex flex-col gap-2">
                {/* <div className="w-full aspect-[2] rounded-md overflow-hidden">
                  <img src="https://miro.medium.com/v2/resize:fit:806/0*taYqENrufmxEw2n6.jpeg" alt="logo" className="h-full w-full object-cover" />
                </div> */}
                {(() => {
                  // Filter out items without images
                  const filteredFeedContent = feedContent.filter(item => item.images && item.images[0]);
                  
                  const components = [];
                  let currentIndex = 0;
                  let gridIndex = 0;
                  
                  while (currentIndex < filteredFeedContent.length) {
                    const isGridOne = gridIndex % 2 === 0;
                    
                    if (isGridOne) {
                      // GridOne shows 4 posts
                      const postsForGrid = filteredFeedContent.slice(currentIndex, currentIndex + 4);
                      if (postsForGrid.length > 0) {
                        components.push(
                          <div key={`grid-one-${gridIndex}`}>
                            <GridOne posts={postsForGrid} />
                            {currentIndex + 4 < filteredFeedContent.length && (
                              <div className="w-full h-[1px] bg-black my-10 rounded-full" />
                            )}
                          </div>
                        );
                        currentIndex += 4;
                      }
                    } else {
                      // GridTwo shows up to 8 posts
                      const postsForGrid = filteredFeedContent.slice(currentIndex, currentIndex + 8);
                      if (postsForGrid.length > 0) {
                        components.push(
                          <div key={`grid-two-${gridIndex}`}>
                            <GridTwo posts={postsForGrid} />
                            {currentIndex + 8 < filteredFeedContent.length && (
                              <div className="w-full h-[1px] bg-black my-10 rounded-full" />
                            )}
                          </div>
                        );
                        currentIndex += 8;
                      }
                    }
                    gridIndex++;
                  }
                  
                  return components;
                })()}
              </div>
              
              {/* Desktop Sidebar - Hidden on Mobile */}
              <div className="hidden sm:block sm:w-1/4 sticky top-40">
                <div className="flex flex-col gap-4">
                  <span className={`${funkydori.className} mt-4 text-[60px] text-black -mb-8`}>Restocks</span>
                  <AnimatePresence>
                    {restocksContent.map((article, idx) => (
                      <SideBarContent key={idx} article={article} />
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </main>
          <footer className="row-start-3 flex mt-20 gap-[24px] flex-wrap items-center justify-center">
            
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
