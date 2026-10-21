import { useState } from "react";
import { email } from "../data";
import { Arrow, Label, Heading } from "../components/UI";
export default function Contact() {
  const [status, setStatus] = useState(""),
    [signal, setSignal] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setStatus("Email address copied.");
      setSignal(true);
    } catch {
      setStatus(
        "Copy unavailable. Select the email address above, or open your email app.",
      );
    }
  }
  return (
    <div className="page contact-page">
      <Heading
        index="05 / CONTACT"
        title="Say hello."
        copy="If you’re working on something in fintech, Web3 or AI, I’d like to hear about it. You can also reach out about internships or my projects."
      />
      <div className="contact-layout">
        <div className={"signal-station " + (signal ? "signal-active" : "")}>
          <svg viewBox="0 0 400 260" aria-hidden="true">
            {[30, 60, 90, 120].map((r) => (
              <circle
                key={r}
                cx="200"
                cy="130"
                r={r}
                fill="none"
                stroke="currentColor"
                opacity={1 - r / 150}
              />
            ))}
            <path
              d="M0 130H400M200 0V260"
              stroke="currentColor"
              opacity=".15"
            />
            <circle cx="200" cy="130" r="5" fill="currentColor" />
            <path
              className="signal-wave"
              d="M20 130H120L145 100L175 170L200 70L225 160L250 115L270 130H380"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
          <span className="label">OPEN CHANNEL / CHENNAI, INDIA</span>
          <a className="contact-email" href={"mailto:" + email}>
            {email} ↗
          </a>
          <div className="actions">
            <button className="button" onClick={copy}>
              Copy email ⧉
            </button>
            <a
              className="button"
              href="https://github.com/Achyuth777"
              target="_blank"
              rel="noreferrer"
            >
              GitHub ↗
            </a>
          </div>
          <p role="status" className="copy-status">
            {status || "Email is the easiest way to reach me."}
          </p>
        </div>
        <form
          className="contact-form"
          onSubmit={(e) => {
            e.preventDefault();
            const f = new FormData(e.currentTarget);
            const body = `Hi Achyuth,\n\n${f.get("message")}\n\n${f.get("name")}\nReply to: ${f.get("email")}`;
            window.location.href = `mailto:${email}?subject=${encodeURIComponent(String(f.get("subject")))}&body=${encodeURIComponent(body)}`;
            setSignal(true);
            setStatus(
              "Email draft requested. Review and send it in your email app; nothing has been sent by this website.",
            );
          }}
        >
          <Label>COMPOSE A MESSAGE</Label>
          <div className="form-pair">
            <label htmlFor="name">
              Your name
              <input
                id="name"
                name="name"
                autoComplete="name"
                required
                maxLength={100}
                placeholder="Your name"
              />
            </label>
            <label htmlFor="email">
              Email address
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                maxLength={200}
                placeholder="you@example.com"
              />
            </label>
          </div>
          <label htmlFor="subject">
            What’s on your mind?
            <input
              id="subject"
              name="subject"
              required
              maxLength={150}
              placeholder="A project, an opportunity, a hello…"
            />
          </label>
          <label htmlFor="message">
            Your message
            <textarea
              id="message"
              name="message"
              required
              maxLength={2000}
              rows={4}
              placeholder="Tell me a little about it."
            />
          </label>
          <button className="button primary" type="submit">
            Open email draft <Arrow />
          </button>
          <small>
            Opens your email app with a prepared draft. You review and send it.
            No message is stored or submitted by this website.
          </small>
        </form>
      </div>
      <div className="contact-finale">
        <span>EVERY GREAT SYSTEM</span>
        <strong>starts with a human.</strong>
        <a href="/projects">Keep exploring the work ↗</a>
      </div>
    </div>
  );
}
