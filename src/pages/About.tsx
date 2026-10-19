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
      "Gaming, books, basketball and football. Different ways to stay curious, practice and see another perspective.",
    ],
  ];
  return (
    <div className="page">
      <Heading
        index="01 / ABOUT"
        title="A mind for systems. A habit of making."
        copy="I’m Achyuth PV — a student exploring the space between an ambitious idea and something useful."
      />
      <div className="about-layout">
        <div className="identity-card">
          <div className="identity-monogram">
            AP<span>V</span>
            <i>↗</i>
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
          <Label>THE BUILDING MINDSET</Label>
          <h2>
            From “what if”
            <br />
            to <em>“how does it work?”</em>
          </h2>
          <p>
            My interests connect full-stack development, AI, fintech, blockchain
            and entrepreneurship. Building projects is how I turn those
            interests into questions I can actually investigate.
          </p>
          <p>
            SupplyLens explores decisions under uncertainty. TreasuryFlow
            explores trust and recovery. Argus AI explores the limits of a risk
            model. Together, they reflect the kind of product engineering I want
            to keep pursuing.
          </p>
          <a className="underlink" href="/projects">
            See those questions in practice <Arrow />
          </a>
        </div>
      </div>
      <section className="section interest-section">
        <Label>FOUR WINDOWS INTO MY WORLD</Label>
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
