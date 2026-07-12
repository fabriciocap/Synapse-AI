import { useEffect, useRef, useState } from "react";

/**
 * Reveals an element (fade + slide up) the first time it enters the viewport.
 * Usage: const [ref, isVisible] = useReveal();
 * <div ref={ref} className={`reveal ${isVisible ? "is-visible" : ""}`}>
 */
export function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return [ref, isVisible];
}
