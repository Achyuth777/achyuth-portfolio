import { useEffect } from "react";
import type Lenis from "lenis";

/** Native touch/keyboard scrolling; optional wheel smoothing on desktop. */
export function useSmoothScroll(path: string, menuOpen: boolean) {
  useEffect(() => {
    if (menuOpen) return;
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = matchMedia("(pointer: fine)");
    let instance: Lenis | undefined;
    let disposed = false;
    let generation = 0;
    const sync = () => {
      if (!instance) return;
      if (document.hidden || document.querySelector("dialog[open]"))
        instance.stop();
      else instance.start();
    };
    const configure = async () => {
      const current = ++generation;
      instance?.destroy();
      instance = undefined;
      if (motion.matches || !pointer.matches) return;
      try {
        const { default: SmoothScroll } = await import("lenis");
        if (disposed || current !== generation) return;
        instance = new SmoothScroll({
          autoRaf: true,
          lerp: 0.12,
          smoothWheel: true,
          syncTouch: false,
          anchors: { duration: 0.7 },
          prevent: (node) => !!node.closest("dialog, [data-lenis-prevent]"),
        });
        sync();
      } catch {
        // Loading an optional enhancement must never block native scrolling.
      }
    };
    const observer = new MutationObserver(sync);
    observer.observe(document.body, {
      subtree: true,
      attributes: true,
      attributeFilter: ["open"],
    });
    motion.addEventListener("change", configure);
    pointer.addEventListener("change", configure);
    document.addEventListener("visibilitychange", sync);
    void configure();
    return () => {
      disposed = true;
      generation++;
      instance?.destroy();
      observer.disconnect();
      motion.removeEventListener("change", configure);
      pointer.removeEventListener("change", configure);
      document.removeEventListener("visibilitychange", sync);
    };
  }, [path, menuOpen]);
}
