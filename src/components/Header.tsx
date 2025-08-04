import { motion, useInView } from "framer-motion";
import { useState, useEffect, useRef } from "react";

export default function Header({ setMenu }: { setMenu: () => void }) {
  const [open, setOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [animationCoolDown, setAnimationCoolDown] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderRefInView = useInView(headerRef);

  useEffect(() => {
    if(!open) {
        setAnimationCoolDown(true);
        setTimeout(() => {
            setAnimationCoolDown(false);
        }, 300);
    }
  }, [open]);

  return (
    <div className="relative">
    {/* <LiquidGlass
        displacementScale={110}
        blurAmount={0.2}
        saturation={140}
        aberrationIntensity={3}
        elasticity={0.8}
        cornerRadius={20}
        style={{
            position: "fixed",
            top: "32px",
            left: "50%",
            backgroundColor: "rgba(0, 0, 0, 0.02)",
            borderRadius: "0",
            zIndex: 100,
        }}
    > */}
      {/* <div className="w-[100vw] mx-auto flex flex-row justify-between items-center w-full bg-[#ffffff]/90 backdrop-blur-xl p-4 removesticky removetop-0 z-50">
        <div className="max-w-[1080px] mx-auto flex flex-row justify-between items-center w-full">
          <motion.button
            className="relative flex flex-col justify-center items-start w-10 h-10 rounded focus:outline-none overflow-hidden"
            onClick={() => {
              setOpen((o) => !o);
              setMenu();
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            aria-label="Open menu"
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
          </motion.button>
        </div>
      </div> */}
      
      <div ref={headerRef} className="max-w-[1080px] mx-auto flex flex-col justify-between items-center gap-12 pt-12 mb-12 z-0 inset-0">
        <img src="https://i.imgur.com/tr9aFtv.png" alt="logo" className="h-20 w-auto" />
      </div>
    </div>
  );
}