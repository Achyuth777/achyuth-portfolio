import { Button, Label } from "../components/UI";
import RoninHero from "../components/RoninHero";
import ProjectOverview from "../components/ProjectOverview";
export default function Home() {
  return (
    <>
      <RoninHero />
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
        <ProjectOverview />
        <div className="archive-link">
          <Button href="/projects">Browse the full project archive</Button>
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
          <Button href="/skills">Explore my tech stack</Button>
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
