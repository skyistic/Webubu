import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import localFont from 'next/font/local';
import LiquidGlass from "./LiquidGlass";

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

type CharacterName = 'Zimomo' | 'Tycoco' | 'Mokoko' | 'Pippo' | 'Spooky' | 'Pato' | 'Puca' | 'Monster Boy' | 'Vos' | 'Yaya';

const characters: Record<CharacterName, {image: string, title: string}> = {
  Zimomo: {image: "https://cdn.shopify.com/s/files/1/0683/0194/7201/files/Zimomo_480x480.png?v=1738307517", title: "Wacky Mart"},
  Tycoco: {image: "https://cdn.shopify.com/s/files/1/0683/0194/7201/files/Tycoco_480x480.png?v=1738307572", title: "Wacky Mart2"},
  Mokoko: {image: "https://cdn.shopify.com/s/files/1/0683/0194/7201/files/Mokoko_480x480.png?v=1738307611", title: "Big Into Energy"},
  Pippo: {image: "https://cdn.shopify.com/s/files/1/0683/0194/7201/files/Pippo_480x480.png?v=1738307645", title: "Have A Seat"},
  Spooky: {image: "https://cdn.shopify.com/s/files/1/0683/0194/7201/files/Spooky_480x480.png?v=1738307678", title: "Let's Checkmate"},
  Pato: {image: "https://cdn.shopify.com/s/files/1/0683/0194/7201/files/Pato_480x480.png?v=1738307742", title: "Pato"},
  Puca: {image: "https://cdn.shopify.com/s/files/1/0683/0194/7201/files/Puca_480x480.png?v=1738307753", title: "Puca"}, 
  "Monster Boy": {image: "https://cdn.shopify.com/s/files/1/0683/0194/7201/files/Monster_Boy_480x480.png?v=1738307822", title: "Monster Boy"},  
  Vos: {image: "https://cdn.shopify.com/s/files/1/0683/0194/7201/files/Vos_480x480.png?v=1738307753", title: "Vos"},
  Yaya: {image: "https://cdn.shopify.com/s/files/1/0683/0194/7201/files/Yaya_480x480.png?v=1738307753", title: "Yaya"},
};

function Card({name}: {name: CharacterName}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="bg-white/30 backdrop-blur-sm flex flex-row items-center justify-center gap-4 p-2 h-[200px] max-w-[90vw] border border-white/50 rounded-2xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.img 
        animate={{
          scale: isHovered ? 1.05 : 1,
        }}
        src={characters[name].image} 
        alt={name} 
        className={`w-full h-full object-cover transition-all duration-300 ${isHovered ? 'grayscale-0' : 'grayscale'}`}
      />
    </div>
  )
}

export default function FullScreenGallery() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setSelectedIndex((prev) => (prev + 1) % Object.keys(characters).length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setSelectedIndex((prev) => (prev - 1 + Object.keys(characters).length) % Object.keys(characters).length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-50">
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        <div className="relative flex items-center justify-center">
          {/* <div className="absolute w-[calc(70vw-50px)] max-w-[450px] aspect-[4/5]  bg-white/80 border-black border-2 flex flex-col items-center justify-center">
            <span className={`${funkydori.className} z-10 mb-30 text-black text-center text-[180px]`}>
              Hello
            </span>
            <img src={"https://img.pikbest.com/wp/202405/abstract-light-blue-background-mesmerizing-metallic-glitter-and-reflections-on-liquid-or-glass-3d-rendered-illustration_9847270.jpg!w700wp"} alt={Object.keys(characters)[selectedIndex]} className="absolute w-full h-full object-cover" />
          
          </div> */}
          {Object.entries(characters).map(([name, {image, title}], index) => {
            const isSelected = index === selectedIndex;
            return (
              <motion.div
                key={name}
                initial={false}
                animate={{
                  x: `${(index - selectedIndex) * 100}%`,
                  scale: isSelected ? 1 : 0.6,
                  opacity: isSelected ? 1 : 0.5,
                  zIndex: isSelected ? 10 : 1,
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute w-[70vw] max-w-[500px] aspect-square cursor-pointer"
                onClick={() => {
                  if (index > selectedIndex) handleNext();
                  else if (index < selectedIndex) handlePrev();
                }}
              >
                {/* <span className={`${funkydori.className} absolute -top-0 left-0 right-0 bottom-0 z-10 text-black text-center text-[180px]`}>
                  {name}
                </span> */}
                <motion.img 
                  src={image} 
                  alt={name} 
                  className={`relative z-10 w-[70vw] max-w-[500px] aspect-square object-cover transition-all duration-300 ${isSelected ? 'grayscale-0' : 'grayscale'}`}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Navigation Buttons */}
        <button 
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm p-4 rounded-full hover:bg-white/30 transition-all z-20"
        >
          ←
        </button>
        <button 
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm p-4 rounded-full hover:bg-white/30 transition-all z-20"
        >
          →
        </button>
      </div>
    </div>
  );
}