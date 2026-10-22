import { type CSSProperties } from "react";
import { projects, type Project } from "../data";
import { Arrow, Button, Label, Next } from "../components/UI";
import ProjectPreview from "../components/ProjectPreview";
import Lab from "../components/Labs";
import SpotlightCard from "../vendor/SpotlightCard";
import { useReducedMotion } from "../components/useReducedMotion";
export default function CaseStudy({ p }: { p: Project }) {
  const reduced = useReducedMotion();
  const next = projects[(projects.indexOf(p) + 1) % 3];
  return (
    <div
      className="page case-page"
      style={{ "--project": p.color } as CSSProperties}
    >
      <a className="back-link" href="/projects">
        ← All projects
      </a>
      <header className="case-heading">
        <Label>
          FIELD STUDY {p.number} / {p.category}
        </Label>
        <h1>
          {p.name}
          <span>/{p.number}</span>
        </h1>
        <p className="case-tagline">{p.tagline}</p>
        <div className="case-meta">
          <span>{p.status}</span>
          <a href={p.repo} target="_blank" rel="noreferrer">
            GitHub <Arrow />
          </a>
          <a href={p.demo} target="_blank" rel="noreferrer">
            Open demo <Arrow />
          </a>
        </div>
      </header>
      <section className="build-context" aria-label="Project context">
        <div>
          <Label>HOW THIS WAS BUILT</Label>
          <h2>AI-assisted, and still learning.</h2>
          <p>
            I used AI coding tools extensively to build this project. I’m
            working through the implementation so I can explain the decisions,
            debug problems and make changes with more independence.
          </p>
        </div>
        <div>
          <Label>TRY IT WITH CONTEXT</Label>
          <p>{p.boundary}</p>
          <a
            className="underlink"
            href={p.repo}
            target="_blank"
            rel="noreferrer"
          >
            Inspect the implementation ↗
          </a>
        </div>
      </section>
      <div className="case-cover">
        <div>
          <span className="label">PROJECT PREVIEW / LANDING PAGE</span>
          <h2>
            {p.slug === "supplylens" ? (
              <>
                Signals become
                <br />
                <em>decisions.</em>
              </>
            ) : p.slug === "treasuryflow" ? (
              <>
                Trust is a<br />
                <em>process.</em>
              </>
            ) : (
              <>
                Understand
                <br />
                <em>the exposure.</em>
              </>
            )}
          </h2>
        </div>
        <ProjectPreview slug={p.slug} name={p.name} />
      </div>
      <div className="case-intro">
        <Label>01 / THE QUESTION</Label>
        <div>
          <h2>{p.intro}</h2>
          <p>{p.problem}</p>
          <p>{p.concept}</p>
        </div>
      </div>
      <div className="case-lab">
        <div>
          <Label>02 / EXPLORE THE LOGIC</Label>
          <h2>
            {p.slug === "supplylens"
              ? "When does stock run out?"
              : p.slug === "treasuryflow"
                ? "Who can authorize a payment?"
                : "What does a market shock change?"}
          </h2>
          <p>
            Adjust the model. See the relationship. This original explanatory
            study simplifies a concept in the project; it is not the production
            application.
          </p>
        </div>
        <Lab slug={p.slug} />
      </div>
      <section className="architecture-section">
        <Label>03 / INSIDE THE SYSTEM</Label>
        <div className="architecture-grid">
          <div>
            <h2>
              From interface
              <br />
              to <em>infrastructure.</em>
            </h2>
            <div className="tags">
              {p.stack.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </div>
          <ol className="architecture">
            {p.architecture.map((x, i) => (
              <li key={x}>
                <span>0{i + 1}</span>
                <div>
                  {x.split(" / ")[0]}
                  <small>{x.split(" / ")[1]}</small>
                </div>
                <span aria-hidden="true">↓</span>
              </li>
            ))}
          </ol>
        </div>
        {p.slug === "treasuryflow" && (
          <p className="boundary">
            The separate hosted company workspace uses Cloudflare D1/R2 for
            manual payment records and protected invoice attachments. It is
            distinct from this local-chain architecture.
          </p>
        )}
      </section>
      <section className="feature-section">
        <Label>04 / IMPLEMENTED IN THE REPOSITORY</Label>
        <div className="feature-grid">
          {p.features.map((f, i) => (
            <SpotlightCard
              key={f + String(reduced)}
              spotlightColor={p.color}
              intensity={0.07}
              borderGlow={0.15}
              className="feature"
            >
              <span>0{i + 1}</span>
              <h3>{f}</h3>
            </SpotlightCard>
          ))}
        </div>
      </section>
      <section className="case-reflection">
        <div>
          <Label>05 / THE HARD PART</Label>
          <h3>Where correctness matters.</h3>
          <p>{p.challenge}</p>
        </div>
        <div>
          <Label>06 / DESIGN TAKEAWAY</Label>
          <h3>What the implementation teaches.</h3>
          <p>{p.takeaway}</p>
        </div>
      </section>
      <aside className="boundary">
        <b>Implementation boundary</b>
        <p>{p.boundary}</p>
      </aside>
      <div className="actions case-actions">
        <Button href={p.repo}>Explore the source</Button>
        <Button href={p.demo} primary>
          Try the project demo
        </Button>
      </div>
      <Next
        href={"/projects/" + next.slug}
        label={"Next field study: " + next.name}
      />
    </div>
  );
}
