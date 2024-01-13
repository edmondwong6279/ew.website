import { Dims } from "@/types";
import { useState, useEffect, MutableRefObject, useRef } from "react";

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0
  });

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }
    // Add event listener
    window.addEventListener("resize", handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
};

export const useDims = <T>(): [MutableRefObject<T | null>, Dims] => {
  const ref = useRef<T | null>(null);
  const [dims, setDims] = useState<Dims>({ width: 0, height: 0 });

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      if (entries[0]) {
        const { width, height } = entries[0].contentRect;
        setDims({ width, height });
      }
    });

    if (ref.current instanceof Element) {
      resizeObserver.observe(ref.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [ref]);

  return [ref, dims];
};

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
