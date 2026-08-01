"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // When pathname changes, trigger transition animation
    setIsTransitioning(true);
    
    // Wait for the slide-in phase to swap children
    const swapTimer = setTimeout(() => {
      setDisplayChildren(children);
    }, 350);

    // End transition
    const endTimer = setTimeout(() => {
      setIsTransitioning(false);
    }, 750);

    return () => {
      clearTimeout(swapTimer);
      clearTimeout(endTimer);
    };
  }, [pathname, children]);

  return (
    <>
      <AnimatePresence mode="wait">
        {isTransitioning && (
          <div className="fixed inset-0 z-[99999] pointer-events-none overflow-hidden">
            {/* Layer 1: Dark grey banner */}
            <motion.div
              initial={{ x: "-120vw", skewX: -15 }}
              animate={{ x: "120vw" }}
              transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
              className="absolute inset-y-0 w-[150vw] bg-text origin-left"
              style={{ left: "-15vw" }}
            />
            {/* Layer 2: Orange/Coral banner */}
            <motion.div
              initial={{ x: "-120vw", skewX: -15 }}
              animate={{ x: "120vw" }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
              className="absolute inset-y-0 w-[150vw] bg-accent-coral origin-left"
              style={{ left: "-15vw" }}
            />
          </div>
        )}
      </AnimatePresence>
      
      {/* Content wrapper with a subtle fade-in */}
      <motion.div
        key={pathname}
        initial={{ opacity: 0.6 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.35 }}
        className="w-full flex-grow flex flex-col"
      >
        {displayChildren}
      </motion.div>
    </>
  );
}
