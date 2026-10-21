import RoninEmblem from "../components/RoninEmblem";
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
          <Button href="/projects">Browse the full project archive</Button>
        </div>
      </section>
      <section id="about" className="section manifesto">
        <Label>02 / THE PERSON BEHIND THE SYSTEMS</Label>
        <h2>
          Hi, I’m Achyuth.
          <br />
          Here’s a bit <em>about me.</em>
        </h2>
        <div className="manifesto-bottom">
          <span className="seal" aria-hidden="true">
            <RoninEmblem />
          </span>
          <div>
            <p>
              I study IT at SRMIST Ramapuram. Outside classes, I spend time on
              Web3 events, side projects and the occasional game. Fintech is the
              area I keep coming back to.
            </p>
            <Button href="/about">A little more about me</Button>
          </div>
        </div>
      </section>
      <section id="skills" className="section compact-section">
        <div>
          <Label>03 / CAPABILITIES</Label>
          <h2>
            What I’m
            <br />
            working with.
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
          Outside the classroom.
          <br />
          And behind the commits.
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
          Have an idea?
          <br />
          <em>Let’s talk.</em>
        </h2>
        <Button href="/contact" primary>
          Start a conversation
        </Button>
      </section>
    </>
  );
}
