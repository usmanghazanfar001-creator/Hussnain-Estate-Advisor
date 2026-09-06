"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import LandGridScene from "./LandGridScene";
import { usePrefersReducedMotion, useMediaQuery, useInView } from "@/lib/hooks";

function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

/**
 * Renders the animated hero background scene, or nothing at all when:
 * - the browser has no WebGL support,
 * - the user has requested reduced motion, or
 * - the scene has scrolled out of view (render loop is paused, not torn
 *   down, so it resumes instantly on scroll-back).
 *
 * Mobile devices get a lighter geometry/particle budget rather than the
 * scene being disabled outright.
 */
export default function HeroScene({ className }: { className?: string }) {
  const [containerRef, inView] = useInView<HTMLDivElement>({ threshold: 0 });
  const reducedMotion = usePrefersReducedMotion();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [canRender, setCanRender] = useState(false);
  const pointerRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setCanRender(supportsWebGL());
  }, []);

  useEffect(() => {
    function handlePointerMove(e: PointerEvent) {
      pointerRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      };
    }
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  if (reducedMotion || !canRender) {
    return null;
  }

  return (
    <div ref={containerRef} className={className} aria-hidden="true">
      <Canvas
        dpr={[1, isMobile ? 1.5 : 2]}
        gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
        camera={{ position: [0, 3.4, 9], fov: 38 }}
        frameloop={inView ? "always" : "never"}
        style={{ pointerEvents: "none" }}
      >
        <LandGridScene
          segments={isMobile ? 14 : 28}
          particleCount={isMobile ? 50 : 140}
          pointerRef={pointerRef}
        />
      </Canvas>
    </div>
  );
}
