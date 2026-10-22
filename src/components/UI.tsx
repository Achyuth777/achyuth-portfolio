import ProjectPreview from "./ProjectPreview";
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
  embedded = false,
}: {
  index: string;
  title: string;
  copy?: string;
  embedded?: boolean;
}) {
  const Title = embedded ? "h2" : "h1";
  return (
    <header className="page-heading">
      <Label>{index} / ACHYUTH PV</Label>
      <Title>{title}</Title>
      {copy && <p className="lede">{copy}</p>}
    </header>
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
        <ProjectPreview slug={p.slug} name={p.name} />
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
