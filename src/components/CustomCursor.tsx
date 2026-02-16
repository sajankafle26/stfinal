
'use client';

import React, { useEffect, useRef, useState } from 'react';

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${clientX - 10}px, ${clientY - 10}px, 0)`;
      }
      if (followerRef.current) {
        followerRef.current.style.transform = `translate3d(${clientX - 20}px, ${clientY - 20}px, 0)`;
      }
    };

    const onMouseEnter = () => setIsHovering(true);
    const onMouseLeave = () => setIsHovering(false);

    window.addEventListener('mousemove', onMouseMove);
    
    const interactives = document.querySelectorAll('a, button, .interactive');
    interactives.forEach(el => {
      el.addEventListener('mouseenter', onMouseEnter);
      el.addEventListener('mouseleave', onMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      interactives.forEach(el => {
        el.removeEventListener('mouseenter', onMouseEnter);
        el.removeEventListener('mouseleave', onMouseLeave);
      });
    };
  }, []);

  return (
    <div className="hidden lg:block pointer-events-none">
      <div 
        ref={cursorRef} 
        className={`custom-cursor ${isHovering ? 'scale-[3] opacity-50 bg-white' : ''}`}
      />
      <div 
        ref={followerRef} 
        className={`custom-cursor-follower ${isHovering ? 'scale-[1.5] border-white' : ''}`}
      />
    </div>
  );
};

export default CustomCursor;
