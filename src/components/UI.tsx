import { type ReactNode, type CSSProperties } from "react";
import { type Project } from "../data";
import Magnet from "../vendor/Magnet";
import { useReducedMotion } from "./useReducedMotion";
export const Arrow = () => <span aria-hidden="true">↗</span>;
export function Button({
  href,
  children,
  primary = false,
}: {
  href: string;
  children: ReactNode;
  primary?: boolean;
}) {
  const reduced = useReducedMotion();
  return (
    <Magnet disabled={reduced} padding={20} maxOffset={5} magnetStrength={8}>
      <a className={"button " + (primary ? "primary" : "")} href={href}>
        {children}
        <Arrow />
      </a>
    </Magnet>
  );
}
export function Label({ children }: { children: ReactNode }) {
  return (
    <div className="label">
      <span className="dash" />
      {children}
    </div>
  );
}
export function Heading({
  index,
  title,
  copy,
}: {
  index: string;
  title: string;
  copy?: string;
}) {
  return (
    <header className="page-heading">
      <Label>{index} / ACHYUTH PV</Label>
      <h1>{title}</h1>
      {copy && <p className="lede">{copy}</p>}
    </header>
  );
}
export function Art({ kind }: { kind: string }) {
  const id = "material-" + kind;
  const strand = (phase: number) =>
    Array.from({ length: 81 }, (_, i) => {
      const t = i / 80;
      return `${i ? "L" : "M"}${90 + t * 460},${250 - t * 125 + Math.sin(t * Math.PI * 5 + phase) * 52}`;
    }).join(" ");
  return (
    <svg
      className={"project-art " + kind}
      viewBox="0 0 640 380"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2=".8" y2="1">
          <stop stopColor="#aab1a9" />
          <stop offset=".2" stopColor="#141916" />
          <stop offset=".45" stopColor="#505a50" />
          <stop offset=".6" stopColor="#080c09" />
          <stop offset=".83" stopColor="#b8bcae" />
          <stop offset="1" stopColor="#151a15" />
        </linearGradient>
        <linearGradient id={id + "-fire"}>
          <stop stopColor="#682a0b" />
          <stop offset=".5" stopColor="#ffb46d" />
          <stop offset="1" stopColor="#ca561d" />
        </linearGradient>
      </defs>
      {kind === "supplylens" ? (
        <g fill="none">
          {Array.from({ length: 23 }, (_, i) => {
            const t = i / 22,
              x = 90 + t * 460,
              y = 250 - t * 125,
              h = Math.sin(t * Math.PI * 5) * 52;
            return (
              <path
                key={i}
                d={`M${x} ${y - h} Q${x + 12} ${y} ${x} ${y + h}`}
                stroke={`url(#${id + "-fire"})`}
                strokeWidth={i % 3 === 0 ? 4 : 2}
                opacity={i % 3 === 0 ? 1 : 0.5}
              />
            );
          })}
          {[0, Math.PI].map((phase) => (
            <g key={phase}>
              <path d={strand(phase)} stroke={`url(#${id})`} strokeWidth="14" />
              <path
                d={strand(phase)}
                stroke="#f3e2c1"
                strokeWidth=".7"
                opacity=".5"
              />
            </g>
          ))}
        </g>
      ) : kind === "treasuryflow" ? (
        <g transform="translate(320 190) rotate(-24)" fill="none">
          {Array.from({ length: 7 }, (_, i) => (
            <g key={i} transform={`translate(0 ${(i - 3) * 19})`}>
              <ellipse rx="137" ry="65" stroke="#090c09" strokeWidth="20" />
              <ellipse
                rx="137"
                ry="65"
                stroke={`url(#${id})`}
                strokeWidth="10"
              />
              <path
                d="M-137 0A137 65 0 0 0 90 49"
                stroke={`url(#${id + "-fire"})`}
                strokeWidth="2"
              />
              <ellipse rx="65" ry="30" stroke={`url(#${id})`} strokeWidth="8" />
            </g>
          ))}
        </g>
      ) : (
        <g transform="translate(320 190)" fill="none">
          {[0, 1, 2, 3, 4].map((i) => (
            <g key={i} transform={`rotate(${i * 27 - 35})`}>
              <ellipse
                rx={65 + i * 24}
                ry={50 + i * 13}
                stroke={`url(#${id})`}
                strokeWidth="8"
              />
              <path
                d={`M${65 + i * 24} 0A${65 + i * 24} ${50 + i * 13} 0 0 0 0 ${-50 - i * 13}`}
                stroke={`url(#${id + "-fire"})`}
                strokeWidth="2"
              />
            </g>
          ))}
          <circle
            r="35"
            fill="#111510"
            stroke={`url(#${id})`}
            strokeWidth="5"
          />
        </g>
      )}
    </svg>
  );
}
export function ProjectCard({
  p,
  wide = false,
}: {
  p: Project;
  wide?: boolean;
}) {
  return (
    <article
      className={"project-card " + (wide ? "wide" : "")}
      style={{ "--project": p.color } as CSSProperties}
    >
      <a
        className="art-link"
        href={"/projects/" + p.slug}
        aria-label={"Inspect " + p.name}
        aria-haspopup="dialog"
        onClick={(e) => {
          if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
          e.preventDefault();
          e.stopPropagation();
          const r = e.currentTarget.getBoundingClientRect();
          window.dispatchEvent(
            new CustomEvent("inspect-project", {
              detail: {
                slug: p.slug,
                rect: { x: r.x, y: r.y, width: r.width, height: r.height },
                trigger: e.currentTarget,
              },
            }),
          );
        }}
      >
        <Art kind={p.slug} />
        <span className="portal-arrow">＋</span>
        <span className="inspect-hint">CLICK TO INSPECT</span>
        <span className="project-num">/{p.number}</span>
      </a>
      <div className="project-info">
        <div className="label">
          {p.category} <span>{p.status}</span>
        </div>
        <h3>
          <a href={"/projects/" + p.slug}>{p.name}</a>
        </h3>
        <p>{p.intro}</p>
        <a className="underlink" href={"/projects/" + p.slug}>
          Open case study <Arrow />
        </a>
      </div>
    </article>
  );
}
export function Next({ href, label }: { href: string; label: string }) {
  return (
    <a className="next-page" href={href}>
      <span className="label">CONTINUE EXPLORING</span>
      <h2>{label}</h2>
      <span className="next-arrow">↗</span>
    </a>
  );
}
