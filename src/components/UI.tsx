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
  return (
    <svg
      className={"project-art " + kind}
      viewBox="0 0 640 380"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id={"grid-" + kind}
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M40 0H0V40"
            fill="none"
            stroke="currentColor"
            opacity=".08"
          />
        </pattern>
      </defs>
      <rect width="640" height="380" fill={"url(#grid-" + kind + ")"} />
      {kind === "supplylens" ? (
        <g fill="none" stroke="currentColor">
          {[
            [120, 190],
            [260, 100],
            [260, 280],
            [420, 120],
            [500, 250],
          ].map(([x, y], i) => (
            <g key={i}>
              <path d={`M320 190L${x} ${y}`} opacity=".45" />
              <rect
                x={x - 22}
                y={y - 22}
                width="44"
                height="44"
                transform={`rotate(45 ${x} ${y})`}
              />
              <circle cx={x} cy={y} r="4" fill="currentColor" />
            </g>
          ))}
          <circle cx="320" cy="190" r="48" />
          <circle
            className="orbit"
            cx="320"
            cy="190"
            r="65"
            strokeDasharray="4 12"
          />
          <text
            x="320"
            y="195"
            textAnchor="middle"
            stroke="none"
            fill="currentColor"
            fontSize="12"
          >
            SL
          </text>
        </g>
      ) : kind === "treasuryflow" ? (
        <g fill="none" stroke="currentColor">
          {[0, 1, 2].map((i) => (
            <g key={i} transform={`translate(${145 + i * 120} ${90 + i * 38})`}>
              <path d="M0 0L150 -30L240 20L90 50Z" fill="#171916" />
              <path d="M0 0V80L90 130L240 100V20M90 50V130" />
              <path d="M20 35L65 60M20 47L50 64" opacity=".5" />
            </g>
          ))}
          <path
            className="flow-line"
            d="M100 310H480L540 250"
            strokeDasharray="8 8"
          />
          <circle cx="540" cy="250" r="6" fill="currentColor" />
        </g>
      ) : (
        <g transform="translate(320 190)" fill="none" stroke="currentColor">
          {[55, 90, 125, 158].map((r) => (
            <ellipse
              key={r}
              rx={r}
              ry={r * 0.65}
              transform="rotate(-25)"
              opacity={r === 125 ? 1 : 0.3}
            />
          ))}
          <path
            d="M-220 40L-160 40L-120 0L-85 65L-40 -70L0 10L45 -5L90 -80L130 -20L210 -20"
            strokeWidth="2"
          />
          <circle cx="90" cy="-80" r="6" fill="currentColor" />
          <path d="M0 -170V170M-230 0H230" opacity=".2" />
        </g>
      )}
      <text
        x="24"
        y="350"
        fill="currentColor"
        opacity=".5"
        fontSize="10"
        letterSpacing="2"
      >
        {kind === "supplylens"
          ? "CONNECTED INVENTORY"
          : kind === "treasuryflow"
            ? "PROGRAMMABLE TRUST"
            : "MODELED EXPOSURE"}{" "}
        / CONCEPT STUDY
      </text>
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
        aria-label={"Explore " + p.name}
      >
        <Art kind={p.slug} />
        <span className="portal-arrow">↗</span>
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
