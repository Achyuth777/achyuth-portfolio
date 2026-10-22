import { Button, Label } from "../components/UI";
import RoninHero from "../components/RoninHero";
import ProjectOverview from "../components/ProjectOverview";
import About from "./About";
import Skills from "./Skills";
import Experience from "./Experience";
import Contact from "./Contact";
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
        className="home-full home-about"
        aria-label="About me"
      >
        <About embedded />
      </section>
      <section id="skills" className="home-full" aria-label="Capabilities">
        <Skills embedded />
      </section>
      <section id="journey" className="home-full" aria-label="Journey">
        <Experience embedded />
      </section>
      <section id="contact" className="home-full" aria-label="Contact">
        <Contact embedded />
      </section>
    </>
  );
}
