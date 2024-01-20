import { useState, useEffect, MutableRefObject, useRef } from "react";

import { Dims } from "@/types";

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
