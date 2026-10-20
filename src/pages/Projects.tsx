import { useState } from "react";
import { projects } from "../data";
import { Heading, ProjectCard, Next } from "../components/UI";
import ProjectOverview from "../components/ProjectOverview";
export default function Projects() {
  const [filter, setFilter] = useState("All");
  return (
    <div className="page">
      <Heading
        index="02 / PROJECTS"
        title="A collection of considered experiments."
        copy="From connected inventories to programmable payments and modeled risk. Explore the thinking, architecture and boundaries behind each build."
      />
      <ProjectOverview />
      <div className="filter-row" aria-label="Filter projects">
        {["All", "Product systems", "Fintech", "AI / Web3"].map((x) => (
          <button
            key={x}
            aria-pressed={filter === x}
            onClick={() => setFilter(x)}
          >
            {x}
            <span>{x === "All" ? "03" : "01"}</span>
          </button>
        ))}
      </div>
      <p className="sr-only" role="status">
        {filter === "All" ? 3 : 1} projects shown
      </p>
      <div className="project-index">
        {projects
          .filter((p) => filter === "All" || p.category === filter)
          .map((p) => (
            <ProjectCard key={p.slug} p={p} wide />
          ))}
      </div>
      <Next href="/contact" label="What should we build next?" />
    </div>
  );
}
