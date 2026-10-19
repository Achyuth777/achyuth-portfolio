import { useEffect, useRef, useState, type CSSProperties } from "react";
const film =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261005_143740_52dbf3ef-ea20-4594-a1ad-91d6c2970159.mp4";
export default function CinematicHero() {
  const video = useRef<HTMLVideoElement>(null);
  const stage = useRef<HTMLElement>(null);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const v = video.current,
      el = stage.current;
    if (!v || !el) return;
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    let alive = true;
    let timer = 0;
    let failsafe = 0;
    let frame = 0;
    let resume = false;
    const finish = () => {
      el.classList.remove("is-entering", "is-playing");
      clearTimeout(timer);
      clearTimeout(failsafe);
    };
    const start = async () => {
      if (!media.matches) {
        v.autoplay = true;
        try {
          await v.play();
        } catch {}
        if (!alive) return;
        el.classList.add("is-entering");
        failsafe = window.setTimeout(finish, 4500);
        await Promise.race([
          document.fonts.ready,
          new Promise((r) => setTimeout(r, 1200)),
        ]);
        if (!alive) return;
        frame = requestAnimationFrame(() => {
          el.classList.add("is-playing");
          timer = window.setTimeout(finish, 2200);
          const animations = el
            .getAnimations({ subtree: true })
            .filter(
              (a) =>
                "animationName" in a &&
                String(a.animationName).startsWith("au-"),
            );
          Promise.allSettled(animations.map((a) => a.finished)).then(() => {
            if (alive) finish();
          });
        });
      }
    };
    const preference = () => {
      if (media.matches) {
        v.autoplay = false;
        v.removeAttribute("autoplay");
        v.pause();
        finish();
      }
    };
    const visibility = () => {
      if (document.hidden) {
        resume = !v.paused;
        v.pause();
      } else if (resume && !media.matches) {
        v.play().catch(() => {});
        resume = false;
      }
    };
    const observer = new IntersectionObserver((es) => {
      if (!es[0].isIntersecting) {
        resume = !v.paused;
        v.pause();
      } else if (resume && !media.matches && !document.hidden) {
        v.play().catch(() => {});
        resume = false;
      }
    });
    observer.observe(el);
    media.addEventListener("change", preference);
    document.addEventListener("visibilitychange", visibility);
    start();
    return () => {
      alive = false;
      finish();
      cancelAnimationFrame(frame);
      v.pause();
      observer.disconnect();
      media.removeEventListener("change", preference);
      document.removeEventListener("visibilitychange", visibility);
    };
  }, []);
  return (
    <section
      id="home"
      className="hero cinema"
      ref={stage}
      onPointerMove={(e) => {
        if (e.pointerType === "touch") return;
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty(
          "--light-x",
          `${e.clientX - r.left}px`,
        );
        e.currentTarget.style.setProperty(
          "--light-y",
          `${e.clientY - r.top}px`,
        );
      }}
    >
      <div className="hero__photo" role="presentation">
        <video
          ref={video}
          src={film}
          muted
          loop
          playsInline
          preload="metadata"
          onPlaying={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onError={() => setFailed(true)}
          aria-hidden="true"
        />
      </div>
      <div className="cinema-shade" aria-hidden="true" />
      <div className="cinema-grid" aria-hidden="true">
        {Array.from({ length: 48 }, (_, i) => (
          <i key={i} />
        ))}
      </div>
      <div className="cinema-intro small">
        <span>Independent thinking.</span>
        <span>Software, shaped with intent.</span>
        <span>Achyuth PV / IT-A · SRMIST</span>
      </div>
      <div className="cinema-location small">
        <span>CHENNAI, INDIA</span>
        <span>CYBER RONIN — V.02</span>
      </div>
      <ul className="services small" aria-label="Explore the portfolio">
        <li>
          <a className="rv" href="/projects">
            Full-stack development ↗
          </a>
        </li>
        <li>
          <a className="rv" href="/projects/treasuryflow">
            Fintech & systems ↗
          </a>
        </li>
        <li>
          <a className="rv" href="/projects/argus-ai">
            AI & Web3 ↗
          </a>
        </li>
      </ul>
      <div className="rule" aria-hidden="true" />
      <h1 className="hl" aria-label="Achyuth PV. Building meaningful systems.">
        {["ACHYUTH", "BUILDS", "SYSTEMS."].map((word, i) => (
          <span
            className="hl__line"
            aria-hidden="true"
            key={word}
            style={{ "--line": i } as CSSProperties}
          >
            <span className="hl__clip">
              <span className="hl__track">{word}</span>
            </span>
          </span>
        ))}
      </h1>
      <div className="cinema-bottom">
        <a href="#projects">
          INSPECT SELECTED WORK <span>↓</span>
        </a>
        <button
          className="film-control"
          onClick={() => {
            const v = video.current;
            if (!v) return;
            if (failed) {
              setFailed(false);
              v.load();
            }
            if (v.paused) v.play().catch(() => setFailed(true));
            else v.pause();
          }}
          aria-label={
            playing ? "Pause background film" : "Play background film"
          }
        >
          {failed ? "RETRY FILM" : playing ? "PAUSE FILM Ⅱ" : "PLAY FILM ▷"}
        </button>
      </div>
    </section>
  );
}
