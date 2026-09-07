import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

// Reusable floating "back to top" control. Mounted once on the shared
// product/list components so it appears on product pages only. Fixed-position
// (no layout shift), keyboard accessible, and honours reduced-motion.
export default function ScrollToTopButton({ threshold = 400 }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const shouldShow = window.scrollY > threshold;
      // Only update when the boolean actually flips, to avoid re-rendering on
      // every scroll event.
      setVisible((prev) => (prev === shouldShow ? prev : shouldShow));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  const scrollToTop = () => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  };

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="العودة للأعلى"
      className="
        fixed bottom-5 left-5 z-40
        w-11 h-11
        rounded-full
        bg-primary text-black
        shadow-lg shadow-black/20
        flex items-center justify-center
        hover:scale-110 transition
      "
    >
      <ArrowUp size={22} aria-hidden="true" />
    </button>
  );
}
