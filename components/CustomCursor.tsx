
import React, { useEffect, useState, useRef } from 'react';

const CustomCursor: React.FC = () => {
  const [isHovering, setIsHovering] = useState(false);
  const cursorOuterRef = useRef<HTMLDivElement>(null);
  const cursorInnerRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(0);
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const updateCursor = () => {
      if (cursorOuterRef.current && cursorInnerRef.current) {
        const { x, y } = mousePos.current;
        cursorOuterRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${isHovering ? 2.5 : 1})`;
        cursorInnerRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      }
      requestRef.current = requestAnimationFrame(updateCursor);
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' || 
          target.tagName === 'BUTTON' ||
          target.closest('button') ||
          target.closest('a')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseover', onMouseOver);
    requestRef.current = requestAnimationFrame(updateCursor);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      cancelAnimationFrame(requestRef.current);
    };
  }, [isHovering]);

  return (
    <>
      <div 
        ref={cursorOuterRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-accent pointer-events-none z-[9999] transition-transform duration-150 ease-out hidden md:block will-change-transform"
        style={{ opacity: isHovering ? 0.3 : 0.8 }}
      />
      <div 
        ref={cursorInnerRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-accent-bright pointer-events-none z-[9999] hidden md:block will-change-transform"
      />
    </>
  );
};

export default CustomCursor;
