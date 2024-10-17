"use client";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import React from "react";

const AnimatedContent = ({ children }: { children: React.ReactNode }) => {
  const container = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  gsap.registerPlugin(useGSAP, ScrollTrigger);

  useGSAP(
    () => {
      if (prefersReducedMotion) {
        gsap.set(container.current, { y: 0 });
        return;
      }
      gsap.fromTo(
        container.current,
        { y: 100 },
        {
          y: 0,
          ease: "power2.inOut",
          duration: 1,
          scrollTrigger: container.current,
          start: "top bottom-=40%",
          toggleActions: "play pause resume reverse",
        },
      );
    },
    { scope: container },
  );

  return <div ref={container}>{children}</div>;
};

export default AnimatedContent;
