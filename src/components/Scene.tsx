import { useEffect, useRef, useState } from "react";
export default function Scene({ variant = "gate" }: { variant?: string }) {
  const root = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setReady(false);
    let alive = true;
    let cleanup: undefined | (() => void);
    const el = root.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        observer.disconnect();
        import("./three-scene")
          .then((m) => {
            if (alive)
              cleanup = m.mountScene(el, variant, () => setReady(true));
          })
          .catch(() => {});
      },
      { rootMargin: "100px" },
    );
    observer.observe(el);
    return () => {
      alive = false;
      observer.disconnect();
      cleanup?.();
    };
  }, [variant]);
  return (
    <div
      className={"scene " + (ready ? "scene-ready" : "")}
      ref={root}
      aria-hidden="true"
    >
      <svg className="scene-fallback" viewBox="0 0 800 640">
        <defs>
          <radialGradient id={"halo-" + variant}>
            <stop stopColor="#c57e4b" stopOpacity=".22" />
            <stop offset="1" stopColor="#101211" stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse
          cx="420"
          cy="340"
          rx="360"
          ry="300"
          fill={"url(#halo-" + variant + ")"}
        />
        <g fill="none" stroke="#e8ab77" strokeWidth="1">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <path
              key={i}
              opacity={1 - i * 0.13}
              d={`M${170 + i * 28} 510 V${100 + i * 24} H${630 - i * 28} V510`}
            />
          ))}
          <path
            d="M60 540H740M100 570H700M140 600H660M170 510L60 640M630 510L740 640"
            opacity=".35"
          />
          <circle cx="400" cy="305" r="66" />
          <path d="M400 237L465 305L400 373L335 305Z" />
        </g>
      </svg>
      <span className="scene-coordinate">
        35° / STRUCTURE STUDY — {variant.toUpperCase()}
      </span>
    </div>
  );
}
