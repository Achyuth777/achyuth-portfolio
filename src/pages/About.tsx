import { useState, type CSSProperties } from "react";
import { Label, Next } from "../components/UI";
const interests = [
  {
    name: "Story-mode games",
    eyebrow: "OFF THE CLOCK",
    title: "Sometimes, I just want a good story.",
    copy: "I like story-driven games — getting into a world and seeing where the story goes. Not every evening needs to turn into another project.",
    color: "#c5b1ee",
    kind: "game",
  },
  {
    name: "Basketball",
    eyebrow: "AWAY FROM THE SCREEN",
    title: "A different kind of screen break.",
    copy: "Basketball and football are two things I enjoy outside college and coding. It’s nice to do something where the next move isn’t another browser tab.",
    color: "#ef9a54",
    kind: "ball",
  },
  {
    name: "Web3 meetups",
    eyebrow: "AROUND CHENNAI",
    title: "I like meeting the people behind the projects.",
    copy: "Web3 events were part of my life before these apps. I’ve attended meetups around Chennai and helped host StellarVerse. I enjoy hearing what people are trying, including the parts that haven’t worked yet.",
    color: "#c8d995",
    kind: "meet",
  },
];
function InterestDrawing({ kind }: { kind: string }) {
  return (
    <svg
      viewBox="0 0 500 360"
      className="interest-drawing"
      fill="none"
      aria-hidden="true"
    >
      {kind === "game" ? (
        <g className="controller-drawing" stroke="currentColor" strokeWidth="3">
          <path d="M170 118c-36 0-53 28-64 66l-23 82c-8 30 17 47 38 31l57-42h144l57 42c21 16 46-1 38-31l-23-82c-11-38-28-66-64-66Z" />
          <path d="M185 118v-16h130v16M146 174v52m-26-26h52" />
          <circle cx="333" cy="175" r="9" />
          <circle cx="362" cy="202" r="9" />
          <circle cx="304" cy="202" r="9" />
          <circle cx="333" cy="230" r="9" />
          <circle cx="218" cy="230" r="19" />
          <circle cx="272" cy="230" r="19" />
          <path d="M236 160h28M250 102V76q0-34 44-34" />
          <path
            d="m70 100-20-14m29 49H53m359-36 20-14m-24 50h26"
            opacity=".4"
          />
        </g>
      ) : kind === "ball" ? (
        <g stroke="currentColor" strokeWidth="3">
          <path d="M78 305h344M115 310l-16 15m287-15 16 15" opacity=".3" />
          <g className="basketball-drawing">
            <circle cx="250" cy="173" r="105" />
            <path d="M145 173h210M250 68v210M178 97c100 29 100 123 0 152M322 97c-100 29-100 123 0 152" />
            <path
              d="M172 102c36 72 120 98 162 138M166 240c42-74 126-100 162-138"
              opacity=".2"
            />
          </g>
          <ellipse cx="250" cy="306" rx="80" ry="8" opacity=".25" />
        </g>
      ) : (
        <g stroke="currentColor" strokeWidth="2">
          <path
            d="M90 250 250 80 410 250Z M90 250h320M250 80v170"
            strokeDasharray="5 7"
            opacity=".45"
          />
          {[
            [250, 80],
            [90, 250],
            [410, 250],
            [250, 250],
          ].map(([x, y], i) => (
            <g key={i} className={"meet-dot meet-dot-" + i}>
              <circle cx={x} cy={y} r="34" />
              <circle cx={x} cy={y - 7} r="9" />
              <path d={`M${x - 16} ${y + 17}q16-26 32 0`} />
            </g>
          ))}
          <path d="M170 145h50v30h-16l-12 10v-10h-22Z M300 150h50v30h-22l-12 10v-10h-16Z" />
          <path d="M181 157h28m102 5h28" />
        </g>
      )}
    </svg>
  );
}
export default function About({ embedded = false }: { embedded?: boolean }) {
  const Title = embedded ? "h2" : "h1";
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const item = interests[active];
  return (
    <div className={"personal-about " + (paused ? "motion-paused" : "")}>
      <section className="personal-intro">
        <div className="personal-intro-copy">
          <Label>01 / ABOUT ME</Label>
          <Title className="personal-title">
            Hey, I’m
            <br />
            <span>Achyuth.</span>
            <svg viewBox="0 0 100 30" aria-hidden="true">
              <path d="M3 22Q35 2 96 12M16 28Q60 12 87 19" />
            </svg>
          </Title>
          <p className="personal-lede">
            IT student. Fintech curious.
            <br />
            Usually a few tabs too deep.
          </p>
          <p>
            I’m based in Chennai and study Information Technology at SRM
            Ramapuram. I’m interested in the bits of software that connect to
            everyday decisions — paying someone, managing stock, or knowing when
            a crypto position gets risky.
          </p>
          <div className="personal-intro-links">
            <a href="#my-story">A bit of my story ↓</a>
            <button onClick={() => setPaused((p) => !p)} aria-pressed={paused}>
              {paused ? "Play motion ▷" : "Pause motion Ⅱ"}
            </button>
          </div>
        </div>
        <figure className="portrait-composition">
          <div className="portrait-halo" aria-hidden="true" />
          <div className="portrait-orbit" aria-hidden="true">
            <svg viewBox="0 0 120 120">
              <path
                id="portrait-circle"
                d="M60 10a50 50 0 1 1-.1 0"
                fill="none"
              />
              <text>
                <textPath href="#portrait-circle">
                  CHENNAI · IT STUDENT · CHENNAI · IT STUDENT ·{" "}
                </textPath>
              </text>
            </svg>
          </div>
          <div className="portrait-paper">
            <img
              src="/portraits/achyuth.webp"
              width="1105"
              height="1423"
              alt="Achyuth PV wearing a dark suit and white shirt"
              fetchPriority={embedded ? "auto" : "high"}
              loading={embedded ? "lazy" : "eager"}
            />
            <figcaption>
              <span>Achyuth PV</span>
              <span>IT-A / SRMIST ↗</span>
            </figcaption>
          </div>
          <span className="portrait-sticker sticker-college">
            CHENNAI, INDIA
            <br />
            <strong>Home for now.</strong>
          </span>
          <span className="portrait-sticker sticker-note">Yep, that’s me.</span>
          <svg
            className="portrait-doodle"
            viewBox="0 0 120 120"
            aria-hidden="true"
          >
            <path
              d="M14 12q83 9 64 67M57 65l19 21 23-15M25 28l9 10M12 48l16 4"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            />
          </svg>
        </figure>
      </section>
      <div
        className="personal-ribbon"
        aria-label="Interests: finance, code, communities and games"
      >
        <span>FINANCE</span>
        <i>✳</i>
        <span>CODE</span>
        <i>✳</i>
        <span>COMMUNITIES</span>
        <i>✳</i>
        <span>GAMES</span>
        <i>✳</i>
        <span>STILL LEARNING</span>
      </div>
      <section id="my-story" className="personal-story">
        <div className="story-margin">
          <span>THE SHORT VERSION</span>
          <svg viewBox="0 0 150 150" aria-hidden="true">
            <path
              d="M35 25q110 0 65 80Q60 160 30 95q-18-48 63-40M79 41l18 13-13 19"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            />
          </svg>
        </div>
        <div className="personal-story-copy">
          <h2>
            The interest in finance
            <br />
            came <em>before the apps.</em>
          </h2>
          <p>
            Markets, payments and Web3 caught my attention early. Going to
            events around Chennai gave me people to talk to about them. Building
            projects gave me a way to try some of the ideas for myself.
          </p>
          <p>
            I’m not trying to make every project sound like a startup. I want to
            understand the problem, get something working, and be able to
            explain the choices behind it. There’s plenty I’m still figuring
            out.
          </p>
          <a
            className="story-journey-link"
            href={embedded ? "#journey" : "/experience"}
          >
            The events, roles and courses along the way <span>↗</span>
          </a>
        </div>
      </section>
      {!embedded && (
        <section
          className="personal-worknotes"
          aria-labelledby="worknotes-title"
        >
          <div className="worknotes-heading">
            <Label>THAT’S HOW THESE HAPPENED</Label>
            <h2 id="worknotes-title">
              Three interests.
              <br />
              Three tabs still open.
            </h2>
          </div>
          <div className="worknotes-list">
            {[
              [
                "01",
                "SupplyLens",
                "What if you could spot a stock shortage before it became a problem?",
                "supplylens",
              ],
              [
                "02",
                "TreasuryFlow",
                "Who approved this payment, and what happens if it fails halfway?",
                "treasuryflow",
              ],
              [
                "03",
                "Argus AI",
                "What happens to a DeFi position if the market drops?",
                "argus-ai",
              ],
            ].map(([n, name, copy, slug]) => (
              <a href={"/projects/" + slug} key={slug}>
                <span>{n}</span>
                <div>
                  <h3>{name}</h3>
                  <p>{copy}</p>
                </div>
                <span>↗</span>
              </a>
            ))}
          </div>
        </section>
      )}
      <section
        className="personal-offline"
        style={{ "--interest-color": item.color } as CSSProperties}
        aria-labelledby="offline-title"
      >
        <div className="offline-heading">
          <Label>THERE’S ALSO LIFE OUTSIDE THE EDITOR</Label>
          <h2 id="offline-title">Off the clock.</h2>
          <p>A few things I enjoy that don’t need a GitHub repository.</p>
        </div>
        <div
          className="offline-switches"
          role="tablist"
          aria-label="Personal interests"
        >
          {interests.map((x, i) => (
            <button
              key={x.kind}
              id={"personal-tab-" + i}
              role="tab"
              aria-selected={active === i}
              aria-controls="personal-interest-panel"
              tabIndex={active === i ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => {
                if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(e.key))
                  return;
                e.preventDefault();
                const n =
                  e.key === "Home"
                    ? 0
                    : e.key === "End"
                      ? 2
                      : (active + (e.key === "ArrowRight" ? 1 : 2)) % 3;
                setActive(n);
                document.getElementById("personal-tab-" + n)?.focus();
              }}
            >
              {x.name}
              <span>↗</span>
            </button>
          ))}
        </div>
        <div
          className="offline-content"
          id="personal-interest-panel"
          role="tabpanel"
          aria-labelledby={"personal-tab-" + active}
          tabIndex={0}
        >
          <div className="offline-art">
            <InterestDrawing kind={item.kind} />
            <span className="art-caption">
              {active === 0
                ? "PRESS PAUSE ON THE TO-DO LIST"
                : active === 1
                  ? "LESS SCROLLING. MORE SHOOTING."
                  : "GOOD CONVERSATIONS > HOT TAKES"}
            </span>
          </div>
          <div className="offline-copy" key={item.kind}>
            <span className="label">{item.eyebrow}</span>
            <h3>{item.title}</h3>
            <p>{item.copy}</p>
          </div>
        </div>
      </section>
      <div className="personal-signoff">
        <p>
          That’s a little more about me.
          <br />
          <span>If we share an interest, say hello.</span>
        </p>
        <a href={embedded ? "#contact" : "/contact"}>
          Let’s talk <span>↗</span>
        </a>
      </div>
      {!embedded && (
        <div className="personal-next">
          <Next
            href={embedded ? "#journey" : "/experience"}
            label="The story so far"
          />
        </div>
      )}
    </div>
  );
}
