import { useState } from "react";
import { projects } from "../data";
import ProjectPreview from "./ProjectPreview";
export default function ProjectOverview() {
  const [index, setIndex] = useState(0);
  const p = projects[index];
  function select(n: number) {
    setIndex((n + projects.length) % projects.length);
  }
  return (
    <div className="project-overview" aria-label="Project overview">
      <div className="overview-top">
        <span>PROJECT ARCHIVE / LIVE PRODUCTS</span>
        <span>0{index + 1} — 03</span>
      </div>
      <div className="overview-layout">
        <a
          className="overview-screenshot"
          href={p.demo}
          target="_blank"
          rel="noreferrer"
          aria-label={"Open " + p.name + " live demo"}
        >
          <div className="preview-toolbar">
            <span aria-hidden="true">● ● ●</span>
            <span>{p.name} / LANDING PAGE</span>
            <span>↗</span>
          </div>
          <ProjectPreview slug={p.slug} name={p.name} />
          <span className="preview-footer">
            Explore the live project <span>↗</span>
          </span>
        </a>
        <div className="overview-copy" key={p.slug}>
          <span className="label">
            {p.category} / FIELD STUDY {p.number}
          </span>
          <h3>{p.name}</h3>
          <p className="overview-tagline">{p.tagline}</p>
          <p>{p.intro}</p>
          <div className="overview-stack">
            {p.stack.slice(0, 4).map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
          <span className="overview-status">{p.status}</span>
          <a className="button primary" href={"/projects/" + p.slug}>
            Explore case study <span>↗</span>
          </a>
          <a
            className="overview-demo"
            href={p.demo}
            target="_blank"
            rel="noreferrer"
          >
            Open live demo ↗
          </a>
        </div>
      </div>
      <div className="overview-controls">
        <div
          className="overview-tabs"
          role="group"
          aria-label="Choose a project"
        >
          {projects.map((project, i) => (
            <button
              key={project.slug}
              aria-pressed={i === index}
              onClick={() => select(i)}
            >
              <span>{project.number}</span>
              {project.name}
            </button>
          ))}
        </div>
      </div>
      <span className="sr-only" role="status">
        Selected project: {p.name}
      </span>
    </div>
  );
}
