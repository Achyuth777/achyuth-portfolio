import { useState } from "react";
import { projects } from "../data";
import { Button, Label, ProjectCard } from "../components/UI";
import Scene from "../components/Scene";
export default function Home() {
  const [phase, setPhase] = useState(0);
  return (
    <>
      <section id="home" className="hero">
        <div className="hero-topline label">
          <span>
            <i className="status-dot" /> STUDENT DEVELOPER / CHENNAI, IN
          </span>
          <span>PORTFOLIO — V.02</span>
        </div>
        <div className="hero-title">
          <h1>
            Building what
            <br />
            comes <em>next.</em>
          </h1>
          <div className="hero-name">
            ACHYUTH PV <span>アーキテクト / DIGITAL ARCHITECT</span>
          </div>
        </div>
        <div className="hero-scene">
          <Scene
            variant={phase === 0 ? "gate" : phase === 1 ? "network" : "risk"}
          />
        </div>
        <div className="hero-bottom">
          <div>
            <p className="hero-intro">
              Software with intent.
              <br />
              At the intersection of{" "}
              <span>
                {
                  [
                    "product, people and possibility.",
                    "systems, signals and intelligence.",
                    "finance, trust and technology.",
                  ][phase]
                }
              </span>
            </p>
            <Button href="/projects" primary>
              Explore selected work
            </Button>
          </div>
          <div className="phase-control">
            <span className="label">SELECT A PERSPECTIVE</span>
            <div>
              {["Build", "Understand", "Protect"].map((x, i) => (
                <button
                  key={x}
                  aria-pressed={phase === i}
                  onClick={() => setPhase(i)}
                >
                  <span>0{i + 1}</span>
                  {x}
                </button>
              ))}
            </div>
          </div>
          <a className="scroll-cue" href="#projects">
            SCROLL TO EXPLORE <span>↓</span>
          </a>
        </div>
      </section>
      <div className="identity-strip">
        <span>FULL-STACK DEVELOPMENT</span>
        <span>AI & INTELLIGENCE</span>
        <span>FINTECH & WEB3</span>
        <span>PRODUCT ENGINEERING</span>
      </div>
      <section id="projects" className="section">
        <div className="section-heading">
          <div>
            <Label>01 / SELECTED WORK</Label>
            <h2>
              Ideas, made
              <br />
              <em>operational.</em>
            </h2>
          </div>
          <p>
            Three projects. Three questions about how software can help us see
            clearly, move safely and make better decisions.
          </p>
        </div>
        <div className="project-grid">
          {projects.map((p) => (
            <ProjectCard key={p.slug} p={p} />
          ))}
        </div>
      </section>
      <section id="about" className="section manifesto">
        <Label>02 / THE PERSON BEHIND THE SYSTEMS</Label>
        <h2>
          Curious by default.
          <br />A builder <em>by choice.</em>
        </h2>
        <div className="manifesto-bottom">
          <span className="seal" aria-hidden="true">
            APV
            <br />
            <small>作る / BUILD</small>
          </span>
          <div>
            <p>
              I’m Achyuth, an Information Technology student at SRMIST
              Ramapuram. I explore how an idea becomes a product — from the
              interface someone touches to the systems they trust.
            </p>
            <Button href="/about">A little more about me</Button>
          </div>
        </div>
      </section>
      <section id="skills" className="section compact-section">
        <div>
          <Label>03 / CAPABILITIES</Label>
          <h2>
            Connected tools.
            <br />
            Considered systems.
          </h2>
        </div>
        <div>
          <p className="lede">
            Interfaces, APIs, data and programmable value. Explore the
            technologies behind the work.
          </p>
          <Button href="/skills">Enter the developer universe</Button>
        </div>
      </section>
      <section id="journey" className="section home-journey">
        <Label>04 / IN PROGRESS</Label>
        <h2>
          Learning in public.
          <br />
          Building with purpose.
        </h2>
        <div className="mini-timeline">
          <span>SRMIST / IT-A</span>
          <span>TECHNICAL EXPLORATION</span>
          <span>PRODUCT EXPERIMENTS</span>
        </div>
        <Button href="/experience">Explore my journey</Button>
      </section>
      <section id="contact" className="section closing">
        <Label>05 / OPEN A CHANNEL</Label>
        <h2>
          Let’s make
          <br />
          <em>something matter.</em>
        </h2>
        <Button href="/contact" primary>
          Start a conversation
        </Button>
      </section>
    </>
  );
}
