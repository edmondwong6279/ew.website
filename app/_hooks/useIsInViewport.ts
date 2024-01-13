import { useState, useEffect } from "react";

// used to detect which project is on screen so we can autoplay the correct one
export const useIsInViewport = (
  ref: React.MutableRefObject<HTMLVideoElement | null>
) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [observer, setObserver] = useState<IntersectionObserver | null>(null);

  useEffect(() => {
    setObserver(
      new IntersectionObserver(
        ([entry]) => setIsIntersecting(entry.isIntersecting),
        { rootMargin: "-40% 0% -40% 0%" }
      )
    );
  }, []);

  useEffect(() => {
    observer?.observe(ref.current as Element);

    return () => {
      observer?.disconnect();
    };
  }, [ref, observer]);

  return isIntersecting;
};
