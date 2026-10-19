import { useState } from "react";
import { projects } from "../data";
import { Arrow, Label, Heading, Next } from "../components/UI";
import Scene from "../components/Scene";
const clusters = [
  {
    name: "Interfaces",
    tools: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
    copy: "Readable, responsive interfaces that make complex workflows approachable.",
    slugs: ["supplylens", "treasuryflow", "argus-ai"],
  },
  {
    name: "Systems",
    tools: ["Java", "Spring Boot", "PostgreSQL", "Zod"],
    copy: "Explicit contracts, persisted state and reliable workflow boundaries.",
    slugs: ["supplylens", "treasuryflow"],
  },
  {
    name: "Intelligence",
    tools: ["Recharts", "Risk modeling", "Gemini API"],
    copy: "Models and explanations that expose assumptions rather than hiding them.",
    slugs: ["supplylens", "argus-ai"],
  },
  {
    name: "Programmable value",
    tools: [
      "Solidity",
      "Solana Wallet Adapter",
      "Cloudflare Workers",
      "D1 / R2",
    ],
    copy: "Exploring settlement, wallet interfaces and hosted product infrastructure.",
    slugs: ["treasuryflow", "argus-ai", "supplylens"],
  },
];
export default function Skills() {
  const [selected, setSelected] = useState(0);
  const c = clusters[selected];
  return (
    <div className="page">
      <Heading
        index="03 / CAPABILITIES"
        title="Tools connect. Possibilities multiply."
        copy="A map of technologies used across my projects — without arbitrary proficiency scores. Select a capability to trace it back to the work."
      />
      <div className="universe">
        <div className="universe-visual">
          <Scene variant="network" />
          <div className="universe-center">
            APV<span>DEVELOPER UNIVERSE</span>
          </div>
          {clusters.map((x, i) => (
            <button
              className={"universe-node node-" + i}
              key={x.name}
              aria-pressed={selected === i}
              onClick={() => setSelected(i)}
            >
              <span>0{i + 1}</span>
              {x.name}
            </button>
          ))}
        </div>
        <div className="capability-panel" aria-live="polite">
          <Label>CAPABILITY 0{selected + 1}</Label>
          <h2>{c.name}</h2>
          <p>{c.copy}</p>
          <div className="tags">
            {c.tools.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
          <h3>Connected work</h3>
          {projects
            .filter((p) => c.slugs.includes(p.slug))
            .map((p) => (
              <a
                className="capability-link"
                key={p.slug}
                href={"/projects/" + p.slug}
              >
                {p.name}
                <Arrow />
              </a>
            ))}
        </div>
      </div>
      <section className="section skill-inventory">
        <Label>THE STACK, IN CONTEXT</Label>
        {projects.map((p) => (
          <div key={p.slug}>
            <h3>
              <a href={"/projects/" + p.slug}>{p.name} ↗</a>
            </h3>
            <p>{p.stack.join(" / ")}</p>
          </div>
        ))}
      </section>
      <Next href="/projects" label="See the systems in practice" />
    </div>
  );
}
