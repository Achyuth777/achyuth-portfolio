import { projects } from "../data";
import { Label, Heading, Next } from "../components/UI";
const clusters = [
  {
    name: "Frontend & interfaces",
    tools: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Recharts"],
    copy: "Responsive product interfaces, typed components and clear data visualizations.",
  },
  {
    name: "Backend & databases",
    tools: [
      "Java",
      "Spring Boot",
      "SQL",
      "PostgreSQL",
      "Cloudflare Workers",
      "D1",
      "Zod",
    ],
    copy: "APIs, validation, relational data and recoverable payment workflows.",
  },
  {
    name: "Web3 & payments",
    tools: [
      "Solidity",
      "ethers.js",
      "Ganache",
      "Solana web3.js",
      "Wallet Adapter",
      "Kamino SDK",
    ],
    copy: "Local settlement contracts, wallet connections and DeFi tooling.",
  },
  {
    name: "AI & product intelligence",
    tools: ["Google Gemini API", "Risk modeling", "Demand forecasting"],
    copy: "Exploring practical models, transparent assumptions and useful explanations.",
  },
];
export default function Skills() {
  return (
    <div className="page">
      <Heading
        index="03 / CAPABILITIES"
        title="The tools behind the work."
        copy="A practical stack for building interfaces, connecting systems and working with data."
      />
      <div className="capabilities-grid">
        {clusters.map((c, i) => (
          <section className="capability-card" key={c.name}>
            <Label>0{i + 1} / CAPABILITY</Label>
            <h2>{c.name}</h2>
            <p>{c.copy}</p>
            <ul className="tech-list">
              {c.tools.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      <section className="backend-extra">
        <Label>ADDITIONAL BACKEND TOOL</Label>
        <h2>MongoDB</h2>
        <p>
          Document databases are also part of my backend toolkit, alongside SQL
          and PostgreSQL.
        </p>
      </section>
      <section className="section skill-inventory">
        <Label>PROJECT STACKS</Label>
        {projects.map((p) => (
          <div key={p.slug}>
            <h3>
              <a href={"/projects/" + p.slug}>{p.name} ↗</a>
            </h3>
            <p>{p.stack.join(" / ")}</p>
          </div>
        ))}
      </section>
      <Next href="/projects" label="See the tools in practice" />
    </div>
  );
}
