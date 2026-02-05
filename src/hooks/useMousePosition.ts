import { useState, useEffect, useCallback } from "react";

interface MousePosition {
  x: number;
  y: number;
  normalizedX: number;
  normalizedY: number;
}

export function useMousePosition(): MousePosition {
  const [position, setPosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    normalizedX: 0,
    normalizedY: 0,
  });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const normalizedX = (e.clientX / window.innerWidth) * 2 - 1;
    const normalizedY = (e.clientY / window.innerHeight) * 2 - 1;
    
    setPosition({
      x: e.clientX,
      y: e.clientY,
      normalizedX,
      normalizedY,
    });
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      const normalizedX = (touch.clientX / window.innerWidth) * 2 - 1;
      const normalizedY = (touch.clientY / window.innerHeight) * 2 - 1;
      
      setPosition({
        x: touch.clientX,
        y: touch.clientY,
        normalizedX,
        normalizedY,
      });
    }
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [handleMouseMove, handleTouchMove]);

  return position;
}
