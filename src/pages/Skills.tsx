import { projects } from "../data";
import { Label, Heading, Next } from "../components/UI";
import "../skills-cards.css";

const groups = [
  {
    title: "Frameworks & interfaces",
    items: [
      ["React", "react", "Interfaces across my projects", "supplylens"],
      ["Next.js", "nextjs", "Argus AI application", "argus-ai"],
      ["Tailwind CSS", "tailwindcss", "Product layouts & styling", "argus-ai"],
      ["Spring Boot", "spring", "TreasuryFlow backend", "treasuryflow"],
    ],
  },
  {
    title: "Backend, data & Web3",
    items: [
      [
        "PostgreSQL",
        "postgresql",
        "TreasuryFlow relational data",
        "treasuryflow",
      ],
      ["MongoDB", "mongodb", "Course: MongoDB with Python", ""],
      ["Cloudflare", "cloudflare", "Workers & D1 deployment", "supplylens"],
      ["Solidity", "solidity", "Local payment contracts", "treasuryflow"],
    ],
  },
  {
    title: "Languages",
    items: [
      ["TypeScript", "typescript", "Typed application code", "supplylens"],
      ["JavaScript", "javascript", "Web development", ""],
      ["Java", "java", "TreasuryFlow backend", "treasuryflow"],
      ["Python", "python", "Coursework & practice", ""],
      ["SQL", "sql", "Queries & relational data", "treasuryflow"],
    ],
  },
];

export default function Skills({ embedded = false }: { embedded?: boolean }) {
  const GroupTitle = embedded ? "h3" : "h2";
  return (
    <div className="page skills-page">
      <Heading
        embedded={embedded}
        index="03 / CAPABILITIES"
        title="My everyday toolkit."
        copy="The tools in my projects, plus the languages I’m learning along the way."
      />
      {groups.map((group) => (
        <section className="tool-group" key={group.title}>
          <div className="tool-group-heading">
            <GroupTitle>{group.title}</GroupTitle>
            <span>{String(group.items.length).padStart(2, "0")} TOOLS</span>
          </div>
          <ul className="tool-grid">
            {group.items.map(([name, icon, note, project]) => {
              const content = (
                <>
                  <div className={"tool-logo tool-logo-" + icon}>
                    {icon === "sql" ? (
                      <svg
                        viewBox="0 0 64 64"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        aria-hidden="true"
                      >
                        <ellipse cx="32" cy="14" rx="22" ry="9" />
                        <path d="M10 14v35c0 12 44 12 44 0V14M10 31c0 12 44 12 44 0" />
                      </svg>
                    ) : (
                      <img
                        src={"/tech/" + icon + ".svg"}
                        alt=""
                        width="64"
                        height="64"
                        loading="lazy"
                      />
                    )}
                    <span className="tool-card-hint">
                      {project ? "VIEW PROJECT ↗" : "LEARNING & PRACTICE"}
                    </span>
                  </div>
                  <div className="tool-caption">
                    <strong>{name}</strong>
                    <span>{note}</span>
                  </div>
                </>
              );
              return (
                <li key={name} className="tool-card">
                  {project ? (
                    <a
                      href={"/projects/" + project}
                      aria-label={name + " — " + note + ". View project."}
                    >
                      {content}
                    </a>
                  ) : (
                    <div>{content}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      ))}
      <section className="tool-support">
        <Label>ALSO IN THE PROJECTS</Label>
        <p>
          Solana web3.js · Wallet Adapter · Kamino SDK · ethers.js · Ganache ·
          Gemini API · Recharts · Drizzle ORM · Zod · D1 · R2
        </p>
        <p className="tool-support-note">
          I’m exploring risk modeling and demand forecasting through Argus AI
          and SupplyLens.
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
      {!embedded && <Next href="/projects" label="See the tools in practice" />}
    </div>
  );
}
