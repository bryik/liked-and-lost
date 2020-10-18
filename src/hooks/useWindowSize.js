import { useState, useEffect } from "react";

const isClient = typeof window === "object";

function getSize() {
  return {
    width: isClient ? window.innerWidth : undefined,
    height: isClient ? window.innerHeight : undefined,
  };
}

/**
 * A really common need is to get the current size of the browser window.
 * This hook returns an object containing the window's width and height.
 * If executed server-side (no window object) the value of width and height
 * will be undefined.
 *
 * Source: https://usehooks.com/useWindowSize/
 */
export default function useWindowSize() {
  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    if (!isClient) {
      return false;
    }

    function handleResize() {
      setWindowSize(getSize());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return windowSize;
}
