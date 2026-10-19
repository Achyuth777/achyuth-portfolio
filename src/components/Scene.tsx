import { useEffect, useRef, useState, type CSSProperties } from "react";
export default function Scene({
  variant = "gate",
  zoom = 1,
}: {
  variant?: string;
  zoom?: number;
}) {
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
    useEffect(() => {
      root.current?.dispatchEvent(
        new CustomEvent("scene-zoom", { detail: zoom }),
      );
    }, [zoom]);
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
      data-zoom={zoom}
      style={{ "--scene-zoom": zoom } as CSSProperties}
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
        <g fill="none" stroke="#b99a79" strokeWidth="2">
          {variant === "network" || variant === "gate" ? (
            <g transform="translate(400 320) rotate(-30)">
              {[0, Math.PI].map((phase) => (
                <path
                  key={phase}
                  d={Array.from({ length: 101 }, (_, i) => {
                    const t = i / 100;
                    return `${i ? "L" : "M"}${Math.cos(t * Math.PI * 5 + phase) * 70} ${(t - 0.5) * 460}`;
                  }).join(" ")}
                  strokeWidth="8"
                />
              ))}
              {Array.from({ length: 24 }, (_, i) => {
                const t = i / 23,
                  x = Math.cos(t * Math.PI * 5) * 70,
                  y = (t - 0.5) * 460;
                return (
                  <path key={i} d={`M${x} ${y}L${-x} ${y}`} stroke="#e98a45" />
                );
              })}
            </g>
          ) : (
            <g transform="translate(400 310)">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <ellipse
                  key={i}
                  rx={variant === "ledger" ? 150 : 60 + i * 20}
                  ry={variant === "ledger" ? 75 : 50 + i * 12}
                  cy={variant === "ledger" ? (i - 2.5) * 25 : 0}
                  transform={
                    variant === "ledger" ? "rotate(-25)" : `rotate(${i * 25})`
                  }
                  strokeWidth="5"
                />
              ))}
            </g>
          )}
        </g>
      </svg>
      <span className="scene-coordinate">
        35° / STRUCTURE STUDY — {variant.toUpperCase()}
      </span>
    </div>
  );
}
