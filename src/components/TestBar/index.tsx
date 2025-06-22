'use client'

import React, { useEffect, useRef, useState } from 'react';

const TestBar = ({ className = '' }) => {
  const [lockscreenHeight, setLockscreenHeight] = useState(100);
  const [boxShadow, setBoxShadow] = useState('0px 0px 200px rgb(0,0,0,0)');
  const [fxFilter, setFxFilter] = useState('saturate(2) brightness(1)');
  const [clockTop, setClockTop] = useState(100);
  const [isHidden, setIsHidden] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  
  const frameRef = useRef<HTMLDivElement>(null);
  const homescreenRef = useRef<HTMLDivElement>(null);
  const lockscreenRef = useRef<HTMLDivElement>(null);
  const clockRef = useRef<HTMLDivElement>(null);
  const stickyContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (!frameRef.current || !homescreenRef.current) return;
      
      const maxheight = homescreenRef.current.offsetHeight;
      const frameRect = frameRef.current.getBoundingClientRect();
      const top = e.clientY - frameRect.top;
      const perc = (top < maxheight ? top : maxheight) / maxheight;
      
      setLockscreenHeight(Math.round((top < maxheight ? top : maxheight) / 2) * 2 + 100);
      setBoxShadow(`0px 0px 200px rgb(0,0,0,${Math.pow(perc, 0.5)})`);
      setFxFilter(`saturate(${2 - perc * 0.5}) brightness(${1 - perc * 0.125})`);
      setClockTop((1 - perc) * -maxheight + 100);
      
      if (perc > 0.975) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
    };

    const handleScroll = () => {
      if (!stickyContainerRef.current) return;
      
      const rect = stickyContainerRef.current.getBoundingClientRect();
      const isAtTop = rect.top <= 0;
      setIsSticky(isAtTop);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`fixed bottom-0 left-0 right-0 top-0 flex items-center justify-center z-100 ${className}`}>
      {/* Sticky container for the test effects */}
      <div 
        ref={stickyContainerRef}
        className={`w-full transition-all duration-300 ${
          isSticky 
            ? 'fixed top-0 left-0 right-0 z-50 bg-black/10 backdrop-blur-sm' 
            : 'absolute top-4'
        }`}
      >
        <div className="max-w-[1080px] mx-auto flex justify-between px-4">
          {/* Test FxFilterJS effects */}
          <div className="w-64 h-32 rounded-xl p-4 text-white">
            <div 
              className="w-full h-full rounded-lg flex items-center justify-center"
              style={{
                '--fx-filter': 'blur(2px) liquid-glass(2, 10) saturate(1.2)',
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
              } as React.CSSProperties}
            >
              <p className="text-sm font-bold">Liquid Glass Effect</p>
            </div>
          </div>

          <div className="w-64 h-32 rounded-xl p-4 text-white">
            <div 
              className="w-full h-full rounded-lg flex items-center justify-center"
              style={{
                '--fx-filter': 'blur(5px) noise(0.5, 0.8, 0.2)',
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
              } as React.CSSProperties}
            >
              <p className="text-sm font-bold">Noise Effect</p>
            </div>
          </div>
        </div>
      </div>

      <div 
        ref={frameRef}
        className="overflow-hidden fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 -translate-y-px scale-[0.505] bg-black/20"
        style={{
          width: 'calc(28 * 9px)',
          height: 'calc(28 * 19.5px)',
        }}
      >
      </div>
    </div>
  );
};

export default TestBar; 