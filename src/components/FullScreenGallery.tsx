import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import localFont from 'next/font/local';

const funkydoriBold = localFont({
  src: '../../public/fonts/funkydori-bold.otf',
  variable: '--font-funkydori-bold',
});

const funkydori = localFont({
  src: '../../public/fonts/funkydori.otf',
  variable: '--font-funkydori',
});

const bgImages = [
    "https://i.imgur.com/G2QtZzi.jpeg",
    "https://i.imgur.com/tFkfdq8.jpeg",
    "https://i.imgur.com/YEjSDmc.jpeg",
    "https://i.imgur.com/kGlvDsw.jpeg",
    "https://i.imgur.com/dotQiMW.jpeg",
];
const fgImages = [
  "https://i.imgur.com/G2QtZzi.jpeg",
  "https://i.imgur.com/tFkfdq8.jpeg",
  "https://i.imgur.com/YEjSDmc.jpeg",
  "https://i.imgur.com/kGlvDsw.jpeg",
  "https://i.imgur.com/dotQiMW.jpeg",
];
const titles = [
  "Wacky Mart",
  "Wacky Mart2",
  "Big Into Energy",
  "Have A Seat",
  "Let's Checkmate",
];

export default function FullScreenGallery() {
  const [idx, setIdx] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const next = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(1);
    setIdx((i) => (i + 1) % bgImages.length);
  };
  
  const prev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(-1);
    setIdx((i) => (i - 1 + bgImages.length) % bgImages.length);
  };

  useEffect(() => {
    if (isAnimating) {
      setTimeout(() => {
        setIsAnimating(false);
      }, 1000);
    }
  }, [isAnimating]);

  // Animation variants for sliding
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 1,
      position: "absolute" as const,
    }),
    center: {
      x: 0,
      opacity: 1,
      position: "absolute" as const,
      transition: { 
        duration: 1.1, 
        ease: [0.77, 0, 0.175, 1]
      }
    },
    exit: (dir: number) => ({
      x: dir > 0 ? "-100%" : "100%",
      opacity: 1,
      position: "absolute" as const,
      transition: {
        duration: 1.1,
        ease: [0.77, 0, 0.175, 1],
      }
    }),
  };

  // Animation variants for inner content
  const innerVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "30%" : "-30%",
      scaleX: 2.8,
      scaleY: 1.4,
      rotate: dir * 30,
    }),
    center: {
      x: 0,
      rotate: 0,
      scaleX: 1.2,
      scaleY: 1.2,
      transition: { duration: 1.1, ease: [0.77, 0, 0.175, 1] }
    },
    exit: (dir: number) => ({
      x: dir > 0 ? "-30%" : "30%",
      scaleX: 2.8,
      scaleY: 1.4,
      rotate: -dir * 30,
      transition: {
        duration: 1.1,
        ease: [0.77, 0, 0.175, 1],
      }
    }),
  };

  // Title animation variants
  const titleVariants = {
    enter: (dir: number) => ({
      y: dir > 0 ? "100%" : "-100%",
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.1,
        ease: [0.77, 0, 0.175, 1],
      }
    }),
    center: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 1.1, ease: [0.77, 0, 0.175, 1] }
    },
    exit: (dir: number) => ({
      y: dir > 0 ? "-100%" : "100%",
      opacity: 1,
      scale: 1,
      transition: { duration: 1.1, ease: [0.77, 0, 0.175, 1] }
    }),
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center z-50">
      {/* Background slider */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center">
        <div className="absolute z-2 backdrop-blur-xs w-full h-full overflow-hidden shadow-2xl bg-black/10"/>
        <div className="relative w-full h-full overflow-hidden shadow-2xl">
          <AnimatePresence initial={false} custom={-direction} mode="sync">
            <motion.div
              key={bgImages[idx]}
              custom={-direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute w-full h-full"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="w-full h-full overflow-hidden">
                <motion.div
                  custom={-direction}
                  variants={innerVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="w-full h-full"
                  style={{
                    backgroundImage: `url(${bgImages[idx]})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Foreground slider */}
      <div className="relative w-[300px] h-[400px] shadow-xl">
        <div className="relative w-[300px] h-[400px] overflow-hidden">
          <AnimatePresence initial={false} custom={direction} mode="sync">
            <motion.div
              key={fgImages[idx]}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute w-full h-full"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="w-full h-full overflow-hidden">
                <motion.div
                  custom={direction}
                  variants={innerVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="w-full h-full"
                  style={{
                    backgroundImage: `url(${fgImages[idx]})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        <span className={`${funkydoriBold.className} absolute bottom-0 left-0 right-0 flex justify-center cursor-pointer items-center rounded-full w-fit mx-auto text-white underline text-3xl`}>
          Explore
        </span>
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-2 overflow-hidden h-[90px] w-full">
        <AnimatePresence initial={false} custom={direction} mode="sync">
          <motion.h2
          key={titles[idx]}
          custom={direction}
          variants={titleVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className={`${funkydoriBold.className} absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  text-white text-[80px] mt-6 font-bold text-center drop-shadow w-full`}
          >
          {titles[idx]}
          </motion.h2>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex gap-6">
        <button
          onClick={prev}
          className={`${funkydoriBold.className} absolute mt-2 left-8 top-1/2 -translate-y-1/2 text-white text-5xl font-regular text-center hover:opacity-50 duration-300 cursor-pointer`}
        >
          Prev
        </button>
        <button
          onClick={next}
          className={`${funkydoriBold.className} absolute mt-2 right-8 top-1/2 -translate-y-1/2 text-white text-5xl font-regular text-center hover:opacity-50 duration-300 cursor-pointer`}
        >
          Next
        </button>
      </div>
    </div>
  );
}