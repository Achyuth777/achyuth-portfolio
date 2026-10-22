import { useEffect, useState } from "react";
const sections = [
  ["about", "About"],
  ["projects", "Projects"],
  ["skills", "Skills"],
  ["journey", "Journey"],
  ["contact", "Contact"],
];
export default function SectionNav() {
  const [active, setActive] = useState("");
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const current = sections
        .filter(
          ([id]) =>
            (document.getElementById(id)?.getBoundingClientRect().top ??
              Infinity) <=
            innerHeight * 0.4,
        )
        .at(-1);
      setActive(current?.[0] || "");
    };
    const scroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    addEventListener("scroll", scroll, { passive: true });
    addEventListener("resize", scroll);
    return () => {
      cancelAnimationFrame(frame);
      removeEventListener("scroll", scroll);
      removeEventListener("resize", scroll);
    };
  }, []);
  return (
    <nav className="section-nav" aria-label="Homepage sections">
      {sections.map(([id, label]) => (
        <a
          key={id}
          href={"#" + id}
          aria-current={active === id ? "location" : undefined}
        >
          {label}
        </a>
      ))}
    </nav>
  );
}
