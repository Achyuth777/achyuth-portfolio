import { useEffect, useRef, useState, type CSSProperties } from "react";
import { projects, type Project } from "../data";
import ProjectPreview from "./ProjectPreview";
type Origin = { x: number; y: number; width: number; height: number };
export default function ProjectInspector() {
  const [project, setProject] = useState<Project | null>(null);
  const [closing, setClosing] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const source = useRef<HTMLElement | null>(null);
  const origin = useRef<Origin | null>(null);
  const animation = useRef<Animation | null>(null);
  const mounted = useRef(true);
  useEffect(() => {
    mounted.current = true;
    const open = (event: Event) => {
      const e = event as CustomEvent<{
        slug: string;
        rect: Origin;
        trigger: HTMLElement;
      }>;
      const p = projects.find((p) => p.slug === e.detail.slug);
      if (!p) return;
      source.current = e.detail.trigger;
      origin.current = e.detail.rect;
      setProject(p);
    };
    const dismiss = () => {
      animation.current?.cancel();
      setProject(null);
      setClosing(false);
    };
    window.addEventListener("popstate", dismiss);
    window.addEventListener("inspect-project", open);
    return () => {
      mounted.current = false;
      window.removeEventListener("inspect-project", open);
      window.removeEventListener("popstate", dismiss);
      animation.current?.cancel();
    };
  }, []);
  function transform() {
    const r = panel.current?.getBoundingClientRect(),
      o = origin.current;
    if (!r || !o) return "scale(.9)";
    return `translate(${o.x + o.width / 2 - r.x - r.width / 2}px,${o.y + o.height / 2 - r.y - r.height / 2}px) scale(${o.width / r.width},${o.height / r.height})`;
  }
  useEffect(() => {
    if (!project) return;
    const d = dialog.current,
      el = panel.current;
    if (!d || !el) return;
    d.showModal();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
      animation.current = el.animate(
        [
          { transform: transform(), opacity: 0.3 },
          { transform: "none", opacity: 1 },
        ],
        { duration: 650, easing: "cubic-bezier(.16,1,.3,1)" },
      );
    }
    return () => {
      animation.current?.cancel();
      d.close();
      document.body.style.overflow = overflow;
    };
  }, [project]);
  async function close() {
    if (closing) return;
    setClosing(true);
    if (source.current?.isConnected) {
      const r = source.current.getBoundingClientRect();
      origin.current = { x: r.x, y: r.y, width: r.width, height: r.height };
    }
    if (
      panel.current &&
      !matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      animation.current?.cancel();
      animation.current = panel.current.animate(
        [
          { transform: "none", opacity: 1 },
          { transform: transform(), opacity: 0 },
        ],
        { duration: 420, easing: "cubic-bezier(.76,0,.24,1)" },
      );
      try {
        await animation.current.finished;
      } catch {}
    }
    if (!mounted.current) return;
    setProject(null);
    setClosing(false);
    source.current?.focus({ preventScroll: true });
  }
  return (
    <dialog
      ref={dialog}
      className="project-inspector"
      aria-labelledby="inspection-title"
      onCancel={(e) => {
        e.preventDefault();
        close();
      }}
      onClick={(e) => {
        if (e.target === dialog.current) close();
      }}
    >
      {project && (
        <div
          ref={panel}
          className="inspection-panel"
          style={{ "--project": project.color } as CSSProperties}
        >
          <div className="inspection-top">
            <span>FIELD STUDY / {project.number}</span>
            <button onClick={close} disabled={closing} autoFocus>
              Back to work ×
            </button>
          </div>
          <div className="inspection-layout">
            <div className="inspection-viewport">
              <ProjectPreview slug={project.slug} name={project.name} />
            </div>
            <div className="inspection-copy">
              <span className="label">
                {project.category} / {project.status}
              </span>
              <h2 id="inspection-title">{project.name}</h2>
              <p>{project.intro}</p>
              <div className="inspection-stack">
                {project.stack.slice(0, 5).map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
              <p className="inspection-boundary">{project.boundary}</p>
              <a
                className="button primary"
                href={"/projects/" + project.slug}
                onClick={() => {
                  animation.current?.cancel();
                  setProject(null);
                }}
              >
                Read the case study ↗
              </a>
              <a
                className="inspection-demo"
                href={project.demo}
                target="_blank"
                rel="noreferrer"
              >
                Open project demo ↗
              </a>
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}
