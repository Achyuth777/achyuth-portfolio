import { Arrow, Label, Heading, Next } from "../components/UI";
export default function Experience() {
  return (
    <div className="page">
      <Heading
        index="04 / JOURNEY"
        title="Still learning. Already building."
        copy="A student’s journey through technical exploration, community participation and the practice of communicating ideas."
      />
      <div className="journey-layout">
        <aside>
          <div className="journey-mark">↗</div>
          <Label>CURRENT CHAPTER</Label>
          <h2>
            B.Tech
            <br />
            Information
            <br />
            Technology.
          </h2>
          <p>
            SRM Institute of Science and Technology
            <br />
            Ramapuram · IT-A
          </p>
          <small>
            Milestones below are retained from my original portfolio. They are
            not presented as dated employment history.
          </small>
        </aside>
        <div className="timeline">
          {[
            [
              "Technical exploration",
              "Sairam hacking competition",
              "Won a hacking competition at Sairam College, with a ₹1,000 prize, as documented in my original portfolio.",
            ],
            [
              "Community participation",
              "CHAT Club events",
              "Participated in technical events with CHAT Club and received participation certificates.",
            ],
            [
              "Communicating ideas",
              "MUN, seminars & creative tools",
              "School MUN events, seminars, Canva design and basic video editing helped me practice presenting ideas. I have also explored AI tools for websites and presentations.",
            ],
            [
              "Building products",
              "From curiosity to working systems",
              "SupplyLens, TreasuryFlow and Argus AI explore planning, payment workflows and risk modeling. Each has a public repository and a clearly defined implementation boundary.",
            ],
          ].map(([label, title, body], i) => (
            <details key={title} open={i === 0}>
              <summary>
                <span className="timeline-index">0{i + 1}</span>
                <div>
                  <span className="label">{label}</span>
                  <h3>{title}</h3>
                </div>
                <span className="expand">+</span>
              </summary>
              <p>{body}</p>
            </details>
          ))}
        </div>
      </div>
      <section className="section writing">
        <Label>FIELD NOTES / ORIGINAL PORTFOLIO</Label>
        <h2>Learning out loud.</h2>
        {[
          ["Day 1 Coding Blog", "post/day-1-coding-blog"],
          [
            "Showcase Your IT Skills",
            "post/showcase-your-it-skills-craft-a-winning-portfolio-resume",
          ],
          ["Browse the writing archive", "blog"],
        ].map(([t, url], i) => (
          <a
            key={url}
            href={
              "https://achyuthpvvirat.wixsite.com/it-btech-portfolio-r/" + url
            }
            target="_blank"
            rel="noreferrer"
          >
            <span>0{i + 1}</span>
            <h3>{t}</h3>
            <Arrow />
          </a>
        ))}
      </section>
      <Next href="/contact" label="The next chapter starts with hello" />
    </div>
  );
}
