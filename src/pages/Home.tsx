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
      <section id="projects" className="section home-selected">
        <div className="section-heading">
          <div>
            <Label>01 / SELECTED WORK</Label>
            <h2>
              Things I’ve
              <br />
              <em>been working on.</em>
            </h2>
          </div>
          <p>
            A supply-chain planner, a payments app and a DeFi risk simulator.
            Pick one to see the demo and what’s behind it.
          </p>
        </div>
        <ProjectOverview />
        <div className="archive-link">
          <Button href="/projects">All projects & case studies</Button>
        </div>
      </section>
      <section
        id="about"
        className="section home-personal"
        aria-labelledby="home-personal-title"
      >
        <div className="home-personal-top">
          <div className="home-personal-photo">
            <img
              src="/portraits/achyuth.webp"
              alt="Achyuth PV"
              width="1105"
              height="1423"
              loading="lazy"
            />
            <span>CHENNAI, INDIA / IT-A</span>
          </div>
          <div className="home-personal-story">
            <Label>02 / A LITTLE MORE ABOUT ME</Label>
            <h2 id="home-personal-title">
              Finance got me curious.
              <br />
              <em>Building keeps me here.</em>
            </h2>
            <p>
              I study IT at SRM Ramapuram. Payments and Web3 are the ideas I
              keep coming back to. Outside college, there are community events,
              basketball, and games I tell myself I’ll play for just an hour.
            </p>
            <Button href="/about">Meet the person behind the projects</Button>
          </div>
        </div>
        <div className="home-personal-links">
          <a id="skills" className="home-note" href="/skills">
            <span className="label">THE TOOLS</span>
            <h3>What I’m working with.</h3>
            <p>
              React, TypeScript, Python, SQL and MongoDB. See where they fit
              into my projects.
            </p>
            <span className="home-note-link">
              Explore my stack <b aria-hidden="true">↗</b>
            </span>
          </a>
          <a id="journey" className="home-note" href="/experience">
            <span className="label">THE STORY SO FAR</span>
            <h3>More than coursework.</h3>
            <p>
              Web3 communities, my internship, courses and the work between
              milestones.
            </p>
            <span className="home-note-link">
              Follow my journey <b aria-hidden="true">↗</b>
            </span>
          </a>
          <a id="contact" className="home-note" href="/contact">
            <span className="label">SAY HELLO</span>
            <h3>Something in common?</h3>
            <p>
              A project idea, a fintech conversation, or just a hello. I’d like
              to hear from you.
            </p>
            <span className="home-note-link">
              Let’s talk <b aria-hidden="true">↗</b>
            </span>
          </a>
        </div>
      </section>
    </>
  );
}
