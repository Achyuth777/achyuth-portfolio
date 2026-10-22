import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { projects, nav, pageTitle } from "./data";
import { Label, Heading, Button, Arrow } from "./components/UI";
import SectionNav from "./components/SectionNav";
import "./recruiter-polish.css";
import Home from "./pages/Home";
import { useSmoothScroll } from "./components/useSmoothScroll";
import ProjectInspector from "./components/ProjectInspector";
import About from "./pages/About";
import Projects from "./pages/Projects";
import CaseStudy from "./pages/CaseStudy";
import Skills from "./pages/Skills";
import Experience from "./pages/Experience";
import Contact from "./pages/Contact";
export default function App({ initialPath = "/" }: { initialPath?: string }) {
  const [path, setPath] = useState(initialPath);
  const [menu, setMenu] = useState(false);
  const [query, setQuery] = useState("");
  useSmoothScroll(path, menu);
  const dialog = useRef<HTMLDialogElement>(null);
  const main = useRef<HTMLElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    document.title = pageTitle(path);
  }, [path]);
  useEffect(() => {
    if (menu) {
      dialog.current?.showModal();
      document.body.style.overflow = "hidden";
    } else {
      dialog.current?.close();
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menu]);
  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setMenu((v) => !v);
      }
    };
    document.addEventListener("keydown", key);
    return () => document.removeEventListener("keydown", key);
  }, []);
  useEffect(() => {
    const visit = () => {
      const next = location.pathname.replace(/\/$/, "") || "/";
      setPath(next);
      setMenu(false);
      requestAnimationFrame(() => {
        if (location.hash)
          document.getElementById(location.hash.slice(1))?.scrollIntoView();
        else {
          scrollTo(0, 0);
          main.current?.focus({ preventScroll: true });
        }
      });
    };
    const click = (e: MouseEvent) => {
      const a = (e.target as Element).closest("a");
      if (
        !a ||
        a.target ||
        a.hasAttribute("download") ||
        /\.(pdf|jpe?g|png)$/i.test(a.pathname) ||
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      )
        return;
      const url = new URL(a.href);
      if (
        url.origin !== location.origin ||
        (url.protocol !== "http:" && url.protocol !== "https:")
      )
        return;
      if (url.pathname === location.pathname && url.hash) {
        setMenu(false);
        return;
      }
      e.preventDefault();
      history.pushState({}, "", url.pathname + url.hash);
      const update = () => flushSync(visit);
      const d = document as Document & {
        startViewTransition?: (f: () => void) => unknown;
      };
      if (
        d.startViewTransition &&
        !matchMedia("(prefers-reduced-motion: reduce)").matches
      )
        d.startViewTransition(update);
      else update();
    };
    document.addEventListener("click", click);
    addEventListener("popstate", visit);
    return () => {
      document.removeEventListener("click", click);
      removeEventListener("popstate", visit);
    };
  }, []);
  // Reveal only off-screen elements. Above-the-fold content is never hidden.
  // Native scrolling and reduced-motion preferences remain untouched.
  useEffect(() => {
    const root = main.current;
    if (!root || !("IntersectionObserver" in window)) return;
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches) return;

    const selector = [
      ".section-heading",
      ".page-heading",
      ".personal-intro-copy",
      ".portrait-composition",
      ".personal-story-copy",
      ".offline-heading",
      ".offline-switches",
      ".offline-content",
      ".personal-signoff",
      ".project-overview",
      ".project-index .project-card",
      ".tool-group-heading",
      ".tool-card",
      ".tool-support",
      ".chapter-index",
      ".chapter-stream article",
      ".credentials-section",
      ".coding-activity",
      ".contact-layout > *",
      ".contact-finale",
      ".feature",
      ".architecture-grid li",
      ".case-reflection > *",
    ].join(", ");
    const registered = new WeakSet<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("motion-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.02, rootMargin: "0px 0px -6% 0px" },
    );

    const register = () => {
      root.querySelectorAll<HTMLElement>(selector).forEach((element, index) => {
        if (registered.has(element)) return;
        registered.add(element);
        const box = element.getBoundingClientRect();
        // No flash or invisible UI when a route or anchor opens in view.
        if (box.bottom <= 0 || box.top < innerHeight * 0.9) return;
        element.classList.add("motion-reveal");
        element.style.setProperty("--motion-delay", `${(index % 4) * 65}ms`);
        observer.observe(element);
      });
    };
    register();
    // Also animate items introduced by filtering without rerunning the page.
    const mutations = new MutationObserver(register);
    mutations.observe(root, { childList: true, subtree: true });
    const onMotionChange = () => {
      if (!motion.matches) return;
      root.querySelectorAll(".motion-reveal").forEach((element) => {
        element.classList.add("motion-visible");
      });
      observer.disconnect();
    };
    motion.addEventListener("change", onMotionChange);
    return () => {
      observer.disconnect();
      mutations.disconnect();
      motion.removeEventListener("change", onMotionChange);
    };
  }, [path]);
  const sectionHref = (href: string) =>
    path === "/"
      ? {
          "/": "#home",
          "/about": "#about",
          "/projects": "#projects",
          "/skills": "#skills",
          "/experience": "#journey",
          "/contact": "#contact",
        }[href] || href
      : href;
  const p = projects.find((p) => path === "/projects/" + p.slug);
  let content =
    path === "/" ? (
      <Home />
    ) : path === "/about" ? (
      <About />
    ) : path === "/projects" ? (
      <Projects />
    ) : path === "/skills" ? (
      <Skills />
    ) : path === "/experience" ? (
      <Experience />
    ) : path === "/contact" ? (
      <Contact />
    ) : p ? (
      <CaseStudy key={p.slug} p={p} />
    ) : (
      <div className="page">
        <Heading
          index="404"
          title="Outside the map."
          copy="This route doesn’t exist. The work is still here."
        />
        <Button href="/projects">Return to projects</Button>
      </div>
    );
  return (
    <>
      <ProjectInspector />
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className={"site-header " + (path === "/" ? "ronin-header" : "")}>
        <a className="brand" href="/" aria-label="Achyuth PV home">
          <svg width="27" height="29" viewBox="0 0 27 29" aria-hidden="true">
            <path
              d="M2 25L13.5 3L25 25M7 17H20M13.5 3V28"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
          <span>
            ACHYUTH PV<small>CYBER RONIN / V.02</small>
          </span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {nav.slice(1, 5).map(([href, t]) => (
            <a
              key={href}
              href={sectionHref(href)}
              aria-current={path === href ? "page" : undefined}
            >
              {t}
            </a>
          ))}
        </nav>
        <div className="header-right">
          <a className="header-contact" href={sectionHref("/contact")}>
            Let’s talk ↗
          </a>
          <button
            ref={trigger}
            className="menu-button"
            onClick={() => {
              setQuery("");
              setMenu(true);
            }}
            aria-haspopup="dialog"
            aria-expanded={menu}
          >
            Index <span>＋</span>
          </button>
        </div>
      </header>
      <main id="main" ref={main} tabIndex={-1} key={path}>
        {content}
      </main>
      {path === "/" && !menu && <SectionNav />}
      <footer className="site-footer">
        <a href="/" className="footer-brand">
          ACHYUTH PV /
        </a>
        <span>
          IT-A · SRMIST Ramapuram
          <br />
          Built with curiosity. © 2026
        </span>
        <a href="#main">Back to top ↑</a>
      </footer>
      <dialog
        ref={dialog}
        className="command-menu"
        aria-labelledby="menu-title"
        onCancel={() => setMenu(false)}
        onClick={(e) => {
          if (e.target === dialog.current) setMenu(false);
        }}
        onClose={() => {
          setMenu(false);
          trigger.current?.focus();
        }}
      >
        <div className="command-inner">
          <div className="command-top">
            <Label>CYBER RONIN / MISSION INDEX</Label>
            <button className="button" onClick={() => setMenu(false)}>
              Close ×
            </button>
          </div>
          <h2 id="menu-title">Where to next?</h2>
          <label className="sr-only" htmlFor="route-search">
            Find a page or project
          </label>
          <input
            id="route-search"
            autoFocus
            placeholder="Find a page or project…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <nav aria-label="All pages">
            {[...nav, ...projects.map((p) => ["/projects/" + p.slug, p.name])]
              .filter(([, t]) => t.toLowerCase().includes(query.toLowerCase()))
              .map(([href, t], i) => (
                <a
                  key={href}
                  href={sectionHref(href)}
                  onClick={() => setMenu(false)}
                >
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  {t}
                  <Arrow />
                </a>
              ))}
          </nav>
          {![
            ...nav,
            ...projects.map((p) => ["/projects/" + p.slug, p.name]),
          ].some(([, t]) => t.toLowerCase().includes(query.toLowerCase())) && (
            <p>No matching pages. Try “projects” or “contact”.</p>
          )}
          <small>⌘ / Ctrl K to open · Esc to close</small>
        </div>
      </dialog>
    </>
  );
}
