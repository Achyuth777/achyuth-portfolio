import { useEffect, useState } from "react";
import snapshot from "../content/github-snapshot.json";
import { activityStats, type Day } from "../github";
const endpoint =
  "https://github-contributions-api.jogruber.de/v4/Achyuth777?y=last";
export default function GitHubActivity() {
  const [data, setData] = useState(snapshot);
  const [state, setState] = useState("Saved snapshot");
  const [selected, setSelected] = useState<Day | null>(null);
  useEffect(() => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8000);
    fetch(endpoint, { signal: controller.signal })
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then((d) => {
        if (
          !Array.isArray(d.contributions) ||
          !d.contributions.length ||
          !d.contributions.every(
            (v: Day) =>
              /^\d{4}-\d{2}-\d{2}$/.test(v.date) &&
              Number.isInteger(v.count) &&
              v.count >= 0 &&
              Number.isInteger(v.level) &&
              v.level >= 0 &&
              v.level <= 4,
          )
        )
          throw new Error();
        setData({
          updatedAt: new Date().toISOString().slice(0, 10),
          contributions: d.contributions,
        });
        setState("Updated from GitHub activity");
      })
      .catch(() => setState("Saved snapshot · live refresh unavailable"))
      .finally(() => clearTimeout(timer));
    return () => {
      controller.abort();
      clearTimeout(timer);
    };
  }, []);
  const days = [...data.contributions]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(-365);
  const stats = activityStats(days);
  const pad = new Date(days[0].date + "T00:00:00Z").getUTCDay();
  const label = selected
    ? `${selected.date}: ${selected.count} contribution${selected.count === 1 ? "" : "s"}`
    : "Select a square to inspect a day. Use arrow keys to move through the calendar.";
  return (
    <section
      className="github-activity"
      id="coding-activity"
      aria-labelledby="activity-title"
    >
      <div className="activity-heading">
        <div>
          <span className="label">THE WORK BETWEEN MILESTONES</span>
          <h2 id="activity-title">What I’ve been pushing to GitHub.</h2>
          <p>
            My public GitHub activity. Some days are busy; some aren’t. Here’s
            the actual record.
          </p>
        </div>
        <a
          className="underlink"
          href="https://github.com/Achyuth777?tab=overview"
          target="_blank"
          rel="noreferrer"
        >
          View on GitHub ↗
        </a>
      </div>
      <div className="activity-stats">
        {[
          [stats.total, "contributions"],
          [stats.active, "active days"],
          [stats.current, "current streak*"],
          [stats.best, "longest streak"],
        ].map(([n, t]) => (
          <div key={t}>
            <strong>{n}</strong>
            <span>
              {t}
              {String(t).includes("streak") ? " / days" : ""}
            </span>
          </div>
        ))}
      </div>
      <div
        className="contribution-scroll"
        role="region"
        aria-label="GitHub contribution calendar, scroll horizontally"
        tabIndex={0}
      >
        <div
          className="contribution-grid"
          role="group"
          aria-label="Daily contributions"
        >
          {Array.from({ length: pad }, (_, i) => (
            <span key={"pad" + i} />
          ))}
          {days.map((d, index) => (
            <button
              key={d.date}
              tabIndex={
                selected
                  ? selected.date === d.date
                    ? 0
                    : -1
                  : index === days.length - 1
                    ? 0
                    : -1
              }
              onKeyDown={(e) => {
                const offsets: Record<string, number> = {
                  ArrowLeft: -7,
                  ArrowRight: 7,
                  ArrowUp: -1,
                  ArrowDown: 1,
                };
                const next =
                  e.key === "Home"
                    ? 0
                    : e.key === "End"
                      ? days.length - 1
                      : e.key in offsets
                        ? Math.max(
                            0,
                            Math.min(days.length - 1, index + offsets[e.key]),
                          )
                        : -1;
                if (next < 0) return;
                e.preventDefault();
                const buttons =
                  e.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>(
                    "button",
                  );
                buttons?.[next]?.focus();
              }}
              className={"contribution-cell level-" + d.level}
              aria-label={`${d.date}: ${d.count} contributions`}
              title={`${d.date}: ${d.count} contributions`}
              onFocus={() => setSelected(d)}
              onMouseEnter={() => setSelected(d)}
              onClick={() => setSelected(d)}
            />
          ))}
        </div>
      </div>
      <div className="activity-legend">
        <span>
          {days[0].date} — {days.at(-1)?.date}
        </span>
        <span>
          Less <i className="level-0" />
          <i className="level-1" />
          <i className="level-2" />
          <i className="level-3" />
          <i className="level-4" /> More
        </span>
      </div>
      <p className="day-detail" role="status">
        {label}
      </p>
      <p className="activity-note">
        {state} · checked {data.updatedAt}. Contributions include commits, pull
        requests and other GitHub activity. *Streak measured through the last
        day shown; an empty final day allows yesterday’s streak. Data via the
        GitHub Contributions API.
      </p>
    </section>
  );
}
