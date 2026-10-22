import { useState } from "react";
import { Label, Heading, Next } from "../components/UI";
import GitHubActivity from "../components/GitHubActivity";
const linkedin = "https://www.linkedin.com/in/achyuth-pv-78653528a/";
const chapters = [
  {
    date: "2024 — 2028",
    year: "2024",
    kind: "Learning",
    title: "Started Information Technology at SRM",
    place: "SRMIST · Ramapuram · IT-A",
    body: "I’m studying Information Technology at SRM. Alongside classes, I’ve been getting involved in Web3 communities and building projects around the things that interest me: finance, software and AI.",
    link: linkedin,
  },
  {
    date: "OCT 2024",
    year: "2024",
    kind: "Learning",
    title: "A closer look at finance and engineering",
    place: "BITS Pilani · University of Birmingham Dubai",
    body: "I attended a quant finance workshop and an industrial visit to the University of Birmingham Dubai. Both are part of the learning experiences I’ve listed on LinkedIn.",
    link: linkedin,
  },
  {
    date: "DEC 2024",
    year: "2024",
    kind: "Community",
    title: "Helping out at Chill Camp",
    place: "Chinmaya Mission · Volunteer",
    body: "I volunteered at Chill Camp 2K24, helping children take part in activities and learn through experience.",
    link: linkedin,
  },
  {
    date: "FEB 2025",
    year: "2025",
    kind: "Learning",
    title: "Learning beyond my own campus",
    place: "National University of Singapore",
    body: "I took part in the Global Immersion Programme. It was another chance to step outside my regular college routine.",
    link: linkedin,
  },
  {
    date: "2025",
    year: "2025",
    kind: "Community",
    title: "From attending Web3 events to hosting one",
    place: "Stellar India · Ambassador",
    body: "After attending Web3 events around Chennai, I helped host StellarVerse: Chennai Edition. Being on the organising side gave me a different view of how these communities come together.",
    link: linkedin,
  },
  {
    date: "MAY 2025",
    year: "2025",
    kind: "Community",
    title: "Back at camp, this time teaching",
    place: "Chinmaya Mission · Cool Camp 2K25",
    body: "I taught children about Indian history at Cool Camp. Explaining something to a younger audience is a useful reminder to keep things simple.",
    link: linkedin,
  },
  {
    date: "AUG 2025",
    year: "2025",
    kind: "Work",
    title: "Taking on the Web3 lead role",
    place: "CodeKrafters · SRM Ramapuram",
    body: "I joined the club’s leadership as Web3 Lead. I’m also listed as a host of Launchpad, our introduction to the club and its different domains.",
    link: "https://www.codekrafters.tech/team",
    extra: "https://luma.com/evpe7or8",
  },
  {
    date: "2026",
    year: "2026",
    kind: "Work",
    title: "Working on the growth side of AI",
    place: "Kodeus AI · Growth Marketing Intern",
    body: "I worked on growth marketing at Kodeus AI. It’s a side of product work I’m interested in alongside development: how people find a product and understand what it does.",
    link: linkedin,
  },
  {
    date: "OCT 2026",
    year: "2026",
    kind: "Building",
    title: "Three projects I can actually show you",
    place: "SupplyLens · TreasuryFlow · Argus AI",
    body: "Inventory planning, payment approvals and DeFi risk. These are the problems behind my three main projects. You can open the demos, read the code and try the small simulations on this site.",
    link: "/projects",
  },
];
const credentials = [
  ["COMPLETION SHARED ON LINKEDIN", "Artificial intelligence", "IBM", ""],
  [
    "AUG 2025",
    "Solidity Smart Contract Development",
    "Cyfrin Updraft",
    "DARN5B8D2JLF",
  ],
  ["JUN 2025", "Using MongoDB with Python", "MongoDB", "MDBfhtizu0ggi"],
  ["MAR 2025", "Paper presentation", "TEXUS", ""],
  [
    "FEB 2025",
    "Global Immersion Programme",
    "National University of Singapore",
    "",
  ],
];
export default function Experience({
  embedded = false,
}: {
  embedded?: boolean;
}) {
  const [filter, setFilter] = useState("All");
  const [opened, setOpened] = useState<string[]>([]);
  const visible = chapters.filter((c) => filter === "All" || c.kind === filter);
  return (
    <div className="page journey-page">
      <Heading
        embedded={embedded}
        index="04 / JOURNEY"
        title="How I got here. What I’m trying next."
        copy="College, communities, a bit of teaching, and projects that kept me curious. Here are the chapters so far."
      />
      <div className="journey-intro-strip">
        <span>
          <i /> CURRENT CHAPTER / IT @ SRM
        </span>
        <a href="#coding-activity">Jump to GitHub activity ↓</a>
        <a href={linkedin} target="_blank" rel="noreferrer">
          LinkedIn ↗
        </a>
      </div>
      <div className="journey-shell">
        <aside className="chapter-index">
          <Label>THE SAVE FILE</Label>
          <h2>
            Still in
            <br />
            <em>progress.</em>
          </h2>
          <p>Open a chapter for the story behind it.</p>
          <div
            className="chapter-progress"
            role="progressbar"
            aria-label="Chapters explored"
            aria-valuenow={opened.length}
            aria-valuemin={0}
            aria-valuemax={chapters.length}
          >
            <span
              style={{ width: `${(opened.length / chapters.length) * 100}%` }}
            />
          </div>
          <span className="chapter-count" aria-live="polite">
            {String(opened.length).padStart(2, "0")} / 09 chapters explored
          </span>
          <div className="year-index">
            {["2024", "2025", "2026"].map((y) => (
              <a
                key={y}
                href={"#chapter-" + y}
                onClick={(e) => {
                  e.preventDefault();
                  setFilter("All");
                  requestAnimationFrame(() =>
                    document.getElementById("chapter-" + y)?.scrollIntoView({
                      behavior: matchMedia("(prefers-reduced-motion: reduce)")
                        .matches
                        ? "instant"
                        : "smooth",
                      block: "start",
                    }),
                  );
                }}
              >
                {y}
                <span>↓</span>
              </a>
            ))}
          </div>
          <p className="chapter-small">
            No finish line here. Just a record of what I’ve done and what I’m
            learning.
          </p>
        </aside>
        <div className="chapter-stream">
          <div
            className="chapter-filters"
            role="group"
            aria-label="Filter journey"
          >
            {["All", "Work", "Community", "Learning", "Building"].map((f) => (
              <button
                key={f}
                aria-pressed={filter === f}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
          {visible.map((c) => {
            const index = chapters.indexOf(c);
            const first = visible.find((x) => x.year === c.year) === c;
            return (
              <article
                className="chapter"
                key={c.title}
                id={first ? "chapter-" + c.year : undefined}
              >
                <span className="chapter-dot" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="chapter-date">
                  <time>{c.date}</time>
                  <span>{c.kind}</span>
                </div>
                <details
                  onToggle={(e) => {
                    if (e.currentTarget.open)
                      setOpened((old) =>
                        old.includes(c.title) ? old : [...old, c.title],
                      );
                  }}
                >
                  <summary>
                    <h3>{c.title}</h3>
                    <span className="chapter-plus" aria-hidden="true">
                      +
                    </span>
                    <p>{c.place}</p>
                  </summary>
                  <div className="chapter-body">
                    <p>{c.body}</p>
                    <a
                      href={c.link}
                      target={c.link.startsWith("/") ? undefined : "_blank"}
                      rel="noreferrer"
                    >
                      {c.kind === "Building"
                        ? "Explore the projects"
                        : c.extra
                          ? "See the club team"
                          : "View on LinkedIn"}{" "}
                      ↗
                    </a>
                    {c.extra && (
                      <a href={c.extra} target="_blank" rel="noreferrer">
                        Launchpad event ↗
                      </a>
                    )}
                  </div>
                </details>
              </article>
            );
          })}
          <div className="next-checkpoint">
            <span>↳</span>
            <p>
              <strong>Next up</strong>Keep building. Get better at explaining
              the code behind it.
            </p>
          </div>
        </div>
      </div>
      <GitHubActivity />
      <section className="credential-section">
        <Label>COURSES & OTHER MILESTONES</Label>
        <h2>A few things I’ve studied.</h2>
        <div className="credential-grid">
          {credentials.map(([date, title, issuer, id]) => (
            <a
              key={title}
              href={linkedin}
              target="_blank"
              rel="noreferrer"
              className="credential"
            >
              <span className="credential-date">
                {date}
                <span>↗</span>
              </span>
              <h3>{title}</h3>
              <p>{issuer}</p>
              {id && <small>Credential {id}</small>}
            </a>
          ))}
        </div>
        <p className="credential-footnote">
          These entries are listed on my LinkedIn profile. Programme
          participation and paper presentation are shown separately from
          technical course titles.
        </p>
      </section>
      <details className="earlier-notes">
        <summary>
          Earlier college activities & writing <span>+</span>
        </summary>
        <p>
          My earlier portfolio also records a Sairam hacking competition win,
          CHAT Club participation, MUN events and seminar work.
        </p>
        <a
          className="underlink"
          href="https://achyuthpvvirat.wixsite.com/it-btech-portfolio-r/blog"
          target="_blank"
          rel="noreferrer"
        >
          Read the original blog ↗
        </a>
      </details>
      {!embedded && (
        <Next href="/contact" label="Want to talk about any of this?" />
      )}
    </div>
  );
}
