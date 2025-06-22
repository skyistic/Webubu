import { motion } from "framer-motion"
import { AnimatePresence } from "framer-motion"
import LiquidGlass from "./LiquidGlass";
import { useEffect, useState } from "react";
export default function BottomBar({ explore, menu, setExplore, setMenu }: { explore: boolean, menu: boolean, setExplore: (explore: boolean) => void, setMenu: (menu: boolean) => void }) {
    const [open, setOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [animationCoolDown, setAnimationCoolDown] = useState(false);

    useEffect(() => {
        if(!open) {
            setAnimationCoolDown(true);
            setTimeout(() => {
                setAnimationCoolDown(false);
            }, 300);
        }
      }, [open]);

    return (
        <LiquidGlass
            displacementScale={110}
            blurAmount={0.2}
            saturation={140}
            aberrationIntensity={3}
            elasticity={0.8}
            cornerRadius={20}
            style={{
                position: "fixed",
                bottom: "0.5rem",
                left: "50%",
                backgroundColor: "rgba(0, 0, 0, 0.02)",
                borderRadius: "20px",
                zIndex: 100,
            }}
        >
            <div className="flex flex-row items-center justify-center gap-4 w-[300px] max-w-[90vw]" onMouseEnter={(e) => e.preventDefault()}>
                {/* Dot grid */}
                {/* <motion.div onClick={() => setMenu(!menu)} className="h-10 w-10 rounded-lg hover:rounded-xl border border-white/80 hover:bg-white/20 flex flex-col items-center justify-center gap-1 duration-300 cursor-pointer">
                    <img src="https://i.imgur.com/H2vA2vo.png" alt="explore" className="w-6 h-6 object-cover invert" />
                </motion.div> */}

                <motion.div 
                onClick={() => setMenu(!menu)} 
                style={{boxShadow: "0px 0px 60px rgba(0, 0, 0, 0.14)"}}
                className="h-10 w-10 rounded-lg hover:rounded-xl border border-white/20 bg-white/20 flex flex-col items-center justify-center gap-1 duration-300 cursor-pointer">

                <motion.button
                        className="cursor-pointer flex flex-col justify-center items-start w-6 h-6 rounded focus:outline-none overflow-hidden"
                        onClick={() => setMenu(!menu)}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        aria-label="Open menu"
                    >
                        <motion.div
                        animate={menu ? {width: "100%", rotate: 45, y: 8 } : { width: "100%", rotate: 0, y: 0 }}
                        className="h-1 bg-black rounded mb-1"
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        />
                        <motion.div
                        animate={menu ? { width: "100%", opacity: 0 } : { width: isHovered || animationCoolDown ? "100%" : "66%", opacity: 1 }}
                        className="h-1 bg-black rounded mb-1"
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        />
                        <motion.div
                        animate={menu ? { width: "100%", rotate: -45, y: -8 } : { width: isHovered || animationCoolDown ? "100%" : "33%", rotate: 0, y: 0 }}
                        className="h-1 bg-black rounded"
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        />
                    </motion.button>
                </motion.div>
      
                {/* Centered text */}
                <div className="flex-1 flex justify-center">
                    <span className="text-black font-semibold text-lg tracking-wide">News</span>
                </div>
                {/* Close button */}
                <button onClick={() => setExplore(!explore)} className="overflow-hidden cursor-pointer w-10 h-10 rounded-lg hover:bg-white/80 hover:rounded-xl bg-white/60 duration-300 flex items-center justify-center">
                    <div className="overflow-hidden w-8 h-8 relative flex flex-col items-center justify-center">
                        <AnimatePresence initial={false} mode="wait">
                            <motion.img
                                key="img1"
                                src="https://i.imgur.com/LKMWSTe.png"
                                alt="explore"
                                className="w-6 h-6 object-cover absolute top-1 left-1"
                                initial={{ y: 0, opacity: 1 }}
                                animate={{ y: explore ? -20 : 0, opacity: explore ? 0 : 1, scale: explore ? 0 : 1 }}
                                whileHover={{ rotate: 180 }}
                                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                            />
                            <motion.img
                                key="img2"
                                src="https://i.imgur.com/WRTKndW.png"
                                alt="feed"
                                className="w-6 h-6 object-cover absolute top-1 left-1"
                                initial={{ y: 20, opacity: 1 }}
                                animate={{ y: explore ? 0 : 20, opacity: !explore ? 0 : 1, scale: !explore ? 0 : 1 }}
                                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                            />
                        </AnimatePresence>
                    </div>
                </button>
            </div>
        </LiquidGlass>
    );
}

export function CenterMenu() {
    return (
        <LiquidGlass
            displacementScale={140}
            blurAmount={0.1}
            saturation={140}
            aberrationIntensity={2}
            elasticity={0.8}
            cornerRadius={20}
            style={{
                position: "fixed",
                bottom: "0%",
                left: "50%",
                backgroundColor: "rgba(255, 255, 255, 0.4)",
                borderRadius: "20px",
            }}
        >
            <div className="flex flex-row items-center justify-center gap-4 h-[400px] w-[400px] max-w-[90vw]">
            </div>
        </LiquidGlass>
    )
}