import { motion } from "framer-motion";
import localFont from 'next/font/local';
import { useEffect, useState } from "react";
import styles from './MenuCard.module.css';

const funkydori = localFont({
  src: '../../public/fonts/funkydori.otf',
  variable: '--font-funkydori',
});

interface MenuCardProps {
  title: string;
  image: string;
  onClick: () => void;
  menu: boolean;
  delay?: number;
  closing?: boolean;
  secondary?: string;
}

const Text3d = ({ primary, secondary, secondaryColor }: { primary: string, secondary: string, secondaryColor: string }) => {
  return (
    <div className={styles.textContainer}>
      <p className={styles.primary}>{primary}</p>
      <p className={styles.secondary} style={{ color: secondaryColor }}>{secondary}</p>
    </div>
  );
};

export default function MenuCard({ title, image, onClick, menu, delay = 0.6, secondary }: MenuCardProps) {
    const [flipper, setFlipper] = useState(false);
    const [animating, setAnimating] = useState(false);
    const [animationCycle, setAnimationCycle] = useState("closed");
    const [visible, setVisible] = useState(false);
    const [secondaryColor, setSecondaryColor] = useState("black");

    // Toggle flipper every time menu changes to true (menu opens)
    useEffect(() => {
      if (menu) {
        setVisible(true);
        setAnimationCycle("opening");
        setFlipper(true);
        setAnimating(true);
        setTimeout(() => {
          setFlipper(false);
          setAnimationCycle("open");
        }, 1000);
      } else {
        setAnimationCycle("closing");
        setTimeout(() => {
          setAnimationCycle("closed");
        }, 1000);
      }
    }, [menu]);

    if(!visible) {
      return null
    }

  return (
    <motion.div 
      onClick={() => {
        if(title === "Collect") {
          setSecondaryColor("red");
          setTimeout(() => {
            setSecondaryColor("black");
          }, 600);
          return;
        }
        setSecondaryColor("white");
        onClick();
        setTimeout(() => {
          setSecondaryColor("black");
        }, 1000);
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: menu ? 1 : 1 }}
      transition={{ delay: menu ? delay : 0, duration: 0.1, ease: [.97,.56,.32,.99] }}
      className="relative w-[450px] h-[100px] z-10 flex flex-col bg-black cursor-pointer overflow-hidden"  
    >
      <img 
        src={image} 
        alt={title.toLowerCase()} 
        className="relative z-10 w-full h-full object-cover opacity-90" 
      />
      <motion.span
        className={`${funkydori.className} tracking-wider leading-wider absolute top-6 left-0 right-0 w-full text-center z-40 text-white text-[80px] font-bold`}
        initial={{ opacity: 0, y: animationCycle === "closing"  ? 30 : -30 }}
        animate={{ opacity: animationCycle === "closing" ? 0 : menu ? 1 : 0, y: animationCycle === "closing" ? 30 : menu ? 0 : -30 }}
        transition={{ delay: menu ? delay + 0.1 : 0, duration: 0.4, ease: [.97,.56,.32,.99] }}
        onAnimationComplete={() => {
          if(animationCycle === "closing" || animationCycle === "closed") {
            setVisible(false);
          }
        }}
      >
        <Text3d secondaryColor={secondaryColor} primary={title} secondary={secondary || ""}/>
      </motion.span>
      {flipper || animating?
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          animate={{ y: menu ? (menu && animating && !flipper ? 110 : -110) : 0 }}
          transition={{ delay: menu ? delay : 0, duration: menu && !flipper ? 0 : 0.5, ease: [.97,.56,.32,.99] }}
          className="absolute z-30 w-full h-full bg-white"
        />
        :
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          animate={{ y: menu ? 110 : 0 }}
          transition={{ delay: menu ? delay : 0, duration: 0.5, ease: [.97,.56,.32,.99] }}
          className="absolute z-30 w-full h-full bg-white"
        />
      }
    </motion.div>
  );
} 