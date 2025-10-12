import { useState, useEffect, useRef } from "react";

export type ScrollHeaderState = {
  isHeaderVisible: boolean;
  isScrolled: boolean;
};

export const useScrollHeader = (): ScrollHeaderState => {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          // Hide on scroll down after threshold; show on scroll up
          if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
            setIsHeaderVisible(false);
          } else {
            setIsHeaderVisible(true);
          }

          setIsScrolled(currentScrollY > 8);

          lastScrollY.current = currentScrollY;
          ticking.current = false;
        });

        ticking.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { isHeaderVisible, isScrolled };
};
