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

  const updatePosition = useCallback((x: number, y: number) => {
    const normalizedX = (x / window.innerWidth) * 2 - 1;
    const normalizedY = (y / window.innerHeight) * 2 - 1;
    setPosition({ x, y, normalizedX, normalizedY });
  }, []);

  useEffect(() => {
    let rafId = 0;
    let pendingX = 0;
    let pendingY = 0;
    let hasPending = false;

    const flush = () => {
      rafId = 0;
      if (!hasPending) return;
      hasPending = false;
      updatePosition(pendingX, pendingY);
    };

    const queueUpdate = (x: number, y: number) => {
      pendingX = x;
      pendingY = y;
      hasPending = true;
      if (rafId === 0) {
        rafId = window.requestAnimationFrame(flush);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      queueUpdate(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        queueUpdate(touch.clientX, touch.clientY);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      if (rafId !== 0) {
        window.cancelAnimationFrame(rafId);
      }
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [updatePosition]);

  return position;
}
