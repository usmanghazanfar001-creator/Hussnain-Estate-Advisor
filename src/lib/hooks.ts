"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/** Tracks the `(prefers-reduced-motion: reduce)` media query. */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

/** Generic media query hook, defaults to `false` during SSR. */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    setMatches(mql.matches);
    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

/**
 * Reports whether an element is currently in the viewport, using
 * IntersectionObserver. Used to pause expensive work (like the 3D hero
 * scene's render loop) when it's scrolled out of view.
 *
 * Implemented as a *callback ref* rather than `useRef` + `useEffect(...,
 * [])` on purpose: a plain ref-object approach only attaches the observer
 * once, on the component's first commit. If the target element doesn't
 * exist yet on that first render (e.g. a component that initially returns
 * `null` and only mounts its real DOM on a later render — exactly what
 * `HeroScene` does while waiting to confirm WebGL support), that first
 * effect finds `ref.current === null`, bails out, and — because its
 * dependency array is empty — never runs again. The observer then never
 * gets attached at all. A callback ref fires precisely when React
 * attaches (or detaches) the DOM node, regardless of which render cycle
 * that happens on, so it can't miss a late-mounting element.
 */
export function useInView<T extends Element>(
  options?: IntersectionObserverInit
): [(node: T | null) => void, boolean] {
  const [inView, setInView] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const setRef = useCallback((node: T | null) => {
    observerRef.current?.disconnect();
    observerRef.current = null;

    if (node) {
      const observer = new IntersectionObserver(([entry]) => {
        setInView(entry.isIntersecting);
      }, options);
      observer.observe(node);
      observerRef.current = observer;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [setRef, inView];
}

/**
 * Fires `onIntersect` once, the first time the element enters view.
 * Same callback-ref reasoning as `useInView` above.
 */
export function useOnceInView<T extends Element>(
  onIntersect: () => void,
  options?: IntersectionObserverInit
): (node: T | null) => void {
  const firedRef = useRef(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const setRef = useCallback((node: T | null) => {
    observerRef.current?.disconnect();
    observerRef.current = null;

    if (node && !firedRef.current) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !firedRef.current) {
            firedRef.current = true;
            onIntersect();
            observer.disconnect();
          }
        });
      }, options);
      observer.observe(node);
      observerRef.current = observer;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return setRef;
}
