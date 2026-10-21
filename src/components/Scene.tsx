import { useEffect, useRef, useState, useId, type CSSProperties } from "react";
export default function Scene({
  variant = "gate",
  zoom = 1,
  reveal = 0,
  installation = false,
}: {
  variant?: string;
  zoom?: number;
  reveal?: number;
  installation?: boolean;
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
              cleanup = m.mountScene(
                el,
                variant,
                () => setReady(true),
                installation,
              );
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
  }, [variant, installation]);
  useEffect(() => {
    root.current?.dispatchEvent(
      new CustomEvent("scene-zoom", { detail: zoom }),
    );
  }, [zoom]);
  useEffect(() => {
    root.current?.dispatchEvent(
      new CustomEvent("scene-reveal", { detail: reveal }),
    );
  }, [reveal]);
  const svgId = useId();
  return (
    <div
      className={"scene " + (ready ? "scene-ready" : "")}
      ref={root}
      data-zoom={zoom}
      data-reveal={reveal}
      style={{ "--scene-zoom": zoom } as CSSProperties}
      aria-hidden="true"
    >
      <svg className="scene-fallback" viewBox="0 0 800 640">
        <defs>
          <radialGradient id={svgId}>
            <stop stopColor="#c57e4b" stopOpacity=".22" />
            <stop offset="1" stopColor="#101211" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={svgId + "-metal"} x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#f0c89f" />
            <stop offset=".17" stopColor="#332b24" />
            <stop offset=".4" stopColor="#080b0c" />
            <stop offset=".65" stopColor="#7f8175" />
            <stop offset=".77" stopColor="#171413" />
            <stop offset="1" stopColor="#be8c5c" />
          </linearGradient>
          <linearGradient id={svgId + "-rock"} x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#ba7746" />
            <stop offset=".3" stopColor="#734020" />
            <stop offset="1" stopColor="#24160f" />
          </linearGradient>
        </defs>
        <ellipse
          cx="420"
          cy="340"
          rx="360"
          ry="300"
          fill={"url(#" + svgId + ")"}
        />
        {installation && (
          <g>
            <ellipse
              cx="400"
              cy="555"
              rx="215"
              ry="30"
              fill="#110a07"
              opacity=".55"
            />
            <ellipse
              cx="400"
              cy="540"
              rx="195"
              ry="37"
              fill="#24170e"
              stroke="#a86b38"
            />
            <ellipse
              cx="400"
              cy="538"
              rx="175"
              ry="28"
              fill="none"
              stroke="#8b5429"
              strokeDasharray="1 8"
            />
          </g>
        )}
        <g fill="none" stroke={"url(#" + svgId + "-metal)"} strokeWidth="2">
          {variant === "network" || variant === "gate" ? (
            <g transform="translate(400 320) rotate(-30)">
              {[0, Math.PI].map((phase) => (
                <path
                  key={phase}
                  d={Array.from({ length: 101 }, (_, i) => {
                    const t = i / 100;
                    return `${i ? "L" : "M"}${Math.cos(t * Math.PI * 5 + phase) * 70} ${(t - 0.5) * 460}`;
                  }).join(" ")}
                  strokeWidth="16"
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
                  strokeWidth="12"
                />
              ))}
            </g>
          )}
        </g>
        {installation &&
          [0, 1, 2, 3, 4, 5].map((i) => {
            const a = (i * Math.PI) / 3;
            return (
              <g
                key={i}
                transform={`translate(${400 + Math.cos(a) * (155 + reveal * 85)} ${320 + Math.sin(a) * (190 + reveal * 60)}) rotate(${i * 27})`}
              >
                <path
                  d="M-43-52 35-63 64-15 40 47-30 58-62 5Z"
                  fill={"url(#" + svgId + "-rock)"}
                  stroke="#ba7947"
                  strokeWidth=".6"
                />
                <path
                  d="M-43-52-10-20 35-63 64-15 14 13 40 47-30 58-10-20-62 5Z"
                  fill="#291a11"
                  opacity=".4"
                />
                <path
                  d="M-43-52-10-20 14 13 40 47M-10-20 35-63M14 13 64-15M-10-20-30 58"
                  fill="none"
                  stroke="#d39458"
                  strokeWidth=".7"
                  opacity=".6"
                />
                <path
                  d="m-40-37 27 20 4 35m24-62-21 25 30 26m-15 29 19-11"
                  fill="none"
                  stroke="#1c110b"
                  strokeWidth="1.5"
                  opacity=".6"
                />
              </g>
            );
          })}
      </svg>
      <span className="scene-coordinate">
        {ready ? "3D STRUCTURE" : "ILLUSTRATED PREVIEW"} /{" "}
        {variant.toUpperCase()}
      </span>
    </div>
  );
}
