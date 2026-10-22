import { useRef, useState, type CSSProperties } from "react";
import RoninEmblem from "./RoninEmblem";
const asset = (file: string) =>
  `https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2F${file}.png&w=1920&q=85`;
export const roninBase = asset(
  "hf_20260831_115955_2a9adb39-5e9b-4ced-96e2-6900eabe3de9",
);
const roninReveal = asset(
  "hf_20260831_123709_183f0065-efb2-4bb2-a849-13aaa5af2f3f",
);
export default function RoninHero() {
  const layer = useRef<HTMLDivElement>(null);
  const [alternate, setAlternate] = useState(false);
  return (
    <section
      id="home"
      className="ronin-hero"
      aria-label="Introduction"
      onPointerMove={(e) => {
        if (alternate || e.pointerType === "touch" || !layer.current) return;
        const r = e.currentTarget.getBoundingClientRect();
        const radius = innerWidth < 480 ? 120 : innerWidth < 720 ? 160 : 260;
        const mask = `radial-gradient(circle ${radius}px at ${e.clientX - r.left}px ${e.clientY - r.top}px,#fff 0%,#fff 40%,rgba(255,255,255,.75) 60%,rgba(255,255,255,.4) 75%,rgba(255,255,255,.12) 88%,transparent 100%)`;
        layer.current.style.maskImage = mask;
        layer.current.style.webkitMaskImage = mask;
      }}
      onPointerLeave={() => {
        if (!alternate && layer.current) {
          layer.current.style.maskImage = "";
          layer.current.style.webkitMaskImage = "";
        }
      }}
    >
      <div
        className="ronin-base"
        style={{ backgroundImage: `url('${roninBase}')` }}
        aria-hidden="true"
      />
      <div
        ref={layer}
        className={"ronin-reveal " + (alternate ? "alternate" : "")}
        style={{ backgroundImage: `url('${roninReveal}')` }}
        aria-hidden="true"
      />
      <div className="ronin-shade" aria-hidden="true" />
      <div className="ronin-content">
        <div className="ronin-copy">
          <span className="label">
            CHENNAI, INDIA / IT STUDENT · FULL-STACK PROJECTS
          </span>
          <h1>
            {["ACHYUTH PV //", "CODE, FINANCE", "& CURIOSITY."].map(
              (line, i) => (
                <span key={line} style={{ "--line": i } as CSSProperties}>
                  {line}
                </span>
              ),
            )}
          </h1>
          <p>
            I’m an IT student in Chennai. I build web projects around payments,
            supply chains and crypto — mostly because I want to understand how
            they work.
          </p>
          <div className="ronin-actions">
            <a className="button primary" href="#projects">
              Explore my work <span>↘</span>
            </a>
            <a
              className="ronin-github"
              href="https://github.com/Achyuth777"
              target="_blank"
              rel="noreferrer"
            >
              GitHub ↗
            </a>
          </div>
        </div>
        <button
          className="reality-switch"
          aria-pressed={alternate}
          onClick={() => {
            setAlternate(!alternate);
            if (layer.current) {
              layer.current.style.maskImage = "";
              layer.current.style.webkitMaskImage = "";
            }
          }}
        >
          <span aria-hidden="true">◈</span>{" "}
          {alternate ? "RETURN TO DAY" : "SHIFT REALITY"}
        </button>
        <div className="ronin-bottom">
          <a className="ronin-profile" href="/about">
            <span className="ronin-monogram">
              <RoninEmblem />
            </span>
            <span>
              <strong>
                A little about me.
                <br />
                Beyond the projects.
              </strong>
              <small>SRMIST RAMAPURAM · IT-A</small>
            </span>
            <span aria-hidden="true">↗</span>
          </a>
          <div className="ronin-specs">
            <h2>Operative specs</h2>
            {[
              ["DISCIPLINE", "B.Tech Information Technology"],
              ["FOCUS", "Full-stack / AI / Web3"],
              ["MISSION", "Build. Understand. Improve."],
            ].map(([l, v]) => (
              <div key={l}>
                <span>{l}</span>
                <span>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="ronin-scroll">
        <span>SCROLL TO EXPLORE</span>
        <span>↓</span>
      </div>
    </section>
  );
}
