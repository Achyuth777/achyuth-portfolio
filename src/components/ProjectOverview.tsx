import { useId, useState } from "react";
import { projects } from "../data";
import Scene from "./Scene";
export default function ProjectOverview() {
  const [index, setIndex] = useState(0);
  const [reveal, setReveal] = useState(0);
  const [zoom, setZoom] = useState(1);
  const id = useId();
  const p = projects[index];
  function select(n: number) {
    setIndex((n + projects.length) % projects.length);
    setReveal(0);
    setZoom(1);
  }
  function inspect() {
    setReveal(reveal > 0.5 ? 0 : 1);
    setZoom(reveal > 0.5 ? 1 : 1.3);
  }
  return (
    <div className="project-overview" aria-label="Interactive project overview">
      <div className="overview-top">
        <span>PROJECT ARCHIVE / INTERACTIVE OBJECTS</span>
        <span>0{index + 1} — 03</span>
      </div>
      <div className="overview-layout">
        <div className="overview-stage">
          <div className="overview-watermark" aria-hidden="true">
            {p.number}
          </div>
          <Scene
            variant={
              p.slug === "supplylens"
                ? "network"
                : p.slug === "treasuryflow"
                  ? "ledger"
                  : "risk"
            }
            reveal={reveal}
            zoom={zoom}
            installation
          />
          <div className="overview-stage-caption">
            <span>CYBER RONIN / {p.slug.toUpperCase()}</span>
            <span>CONCEPT SCULPTURE</span>
          </div>
          <button
            className="core-trigger"
            onClick={inspect}
            aria-pressed={reveal > 0.5}
          >
            <span aria-hidden="true">{reveal > 0.5 ? "−" : "＋"}</span>
            {reveal > 0.5 ? "Close structure" : "Reveal the core"}
          </button>
        </div>
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
        <div className="overview-camera">
          <label htmlFor={id + "-reveal"}>
            UNSEAL <span>{Math.round(reveal * 100)}%</span>
          </label>
          <input
            id={id + "-reveal"}
            aria-label="Unseal sculpture"
            type="range"
            min="0"
            max="1"
            step=".01"
            value={reveal}
            onChange={(e) => setReveal(Number(e.target.value))}
          />
          <button
            onClick={() => setZoom((v) => (v === 1 ? 1.5 : 1))}
            aria-pressed={zoom > 1}
            aria-label="Toggle close-up"
          >
            {zoom > 1 ? "Wide view ↙" : "Close-up ↗"}
          </button>
        </div>
      </div>
      <p className="overview-help">
        Move to orbit · Unseal to explore · Select a project to enter its case
        study
      </p>
      <span className="sr-only" role="status">
        Selected project: {p.name}
      </span>
    </div>
  );
}
