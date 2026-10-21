import { useState } from "react";
import { Arrow, Label, Heading, Next } from "../components/UI";
export default function About() {
  const [active, setActive] = useState(0);
  const interests = [
    [
      "Full-stack",
      "Following an idea through the interface, API and database. SupplyLens connects those layers to a real planning workflow.",
    ],
    [
      "Fintech & Web3",
      "Exploring what makes a payment trustworthy and a risk model understandable through TreasuryFlow and Argus AI.",
    ],
    [
      "AI & products",
      "Interested in intelligence that helps people make decisions, with clear assumptions and useful explanations.",
    ],
    [
      "Outside the editor",
      "I like story-driven games, basketball and football. Not everything has to turn into a project.",
    ],
  ];
  return (
    <div className="page">
      <Heading
        index="01 / ABOUT"
        title="Hey, I’m Achyuth."
        copy="IT student at SRM Ramapuram. Based in Chennai. Usually thinking about finance, Web3 or the next thing I want to try."
      />
      <div className="about-layout">
        <div className="identity-card">
          <div className="desk-notes">
            <span className="label">ON MY DESK / PROJECT NOTES</span>
            <svg viewBox="0 0 400 200" fill="none" aria-hidden="true">
              <path
                d="M40 135V70l85-45 85 45v65l-85 45Z M40 70l85 45 85-45 M125 115v65 M210 103h65l35-48h55 M275 103l35 47h55"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <circle cx="310" cy="55" r="5" fill="currentColor" />
              <circle cx="310" cy="150" r="5" fill="currentColor" />
              <path
                d="M70 135v-25m16 34v-25m16 34v-25"
                stroke="currentColor"
                strokeWidth="3"
              />
            </svg>
            <a href="/projects/supplylens">
              <span>01 / INVENTORY</span>SupplyLens ↗
            </a>
            <a href="/projects/treasuryflow">
              <span>02 / PAYMENTS</span>TreasuryFlow ↗
            </a>
            <a href="/projects/argus-ai">
              <span>03 / RISK</span>Argus AI ↗
            </a>
          </div>
          <div className="identity-meta">
            <span>ACHYUTH PV</span>
            <span>CHENNAI, INDIA</span>
          </div>
          <div className="barcode" aria-hidden="true" />
          <p>
            B.Tech Information Technology
            <br />
            SRM Institute of Science and Technology
            <br />
            Ramapuram · <strong>IT-A</strong>
          </p>
        </div>
        <div className="about-story">
          <Label>WHY THESE PROJECTS</Label>
          <h2>
            I’m interested in
            <br />
            <em>how money moves.</em>
          </h2>
          <p>
            Payments, markets and crypto caught my attention before I started
            building apps. That interest is still behind a lot of what I choose
            to work on.
          </p>
          <p>
            TreasuryFlow looks at payment approvals. Argus AI looks at what
            happens to a DeFi position when prices fall. SupplyLens is a
            different problem: figuring out what a business needs to order
            before stock runs out.
          </p>
          <p>
            I’m still learning. I use these projects to try things, read the
            code, and work out what I’d do differently next time.
          </p>
          <a className="underlink" href="/projects">
            Take a look at the projects <Arrow />
          </a>
        </div>
      </div>
      <section className="section interest-section">
        <Label>A FEW OTHER THINGS</Label>
        <div className="interest-layout">
          <div
            className="interest-tabs"
            role="tablist"
            aria-orientation="vertical"
            aria-label="Interests"
          >
            {interests.map(([title], i) => (
              <button
                key={title}
                id={"interest-" + i}
                role="tab"
                aria-selected={active === i}
                aria-controls="interest-panel"
                tabIndex={active === i ? 0 : -1}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown" || e.key === "ArrowUp") {
                    e.preventDefault();
                    const n = (active + (e.key === "ArrowDown" ? 1 : 3)) % 4;
                    setActive(n);
                    document.getElementById("interest-" + n)?.focus();
                  }
                }}
                onClick={() => setActive(i)}
              >
                <span>0{i + 1}</span>
                {title}
                <Arrow />
              </button>
            ))}
          </div>
          <div
            id="interest-panel"
            className="interest-panel"
            role="tabpanel"
            aria-labelledby={"interest-" + active}
          >
            <span className="giant-number">0{active + 1}</span>
            <h3>{interests[active][0]}</h3>
            <p>{interests[active][1]}</p>
          </div>
        </div>
      </section>
      <Next href="/experience" label="The journey behind the work" />
    </div>
  );
}
