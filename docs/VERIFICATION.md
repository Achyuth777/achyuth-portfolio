# Journey revision — 21 October 2026

See [JOURNEY-REVISION.md](JOURNEY-REVISION.md) for sources, design reasoning, GitHub data handling and checks. Replaced AP/APV placeholders, rewrote personal copy, added dated timeline and credentials, and a live-refresh contribution calendar with saved fallback. Earlier reports below describe superseded revisions.

---

# Screenshot previews and readable capabilities — 2026-10-20

Replaced project overview, cards, inspector and case-study artwork with the three user-supplied landing-page screenshots. Encoded as WebP (about 311 KB combined) and lazy loaded. TreasuryFlow taskbar is excluded by the display frame. No canvas remains in the rendered project overview; Three.js is no longer included in the production output. The original Ronin hero is retained.

Capabilities uses a static responsive grid. SQL/PostgreSQL and MongoDB are included; MongoDB is presented as an additional backend tool, not attributed to a project. Stack updates were checked against Argus AI and TreasuryFlow repository package manifests and the existing SupplyLens checkout manifest. SDK presence does not imply live indexing or deployed settlement; project boundaries are retained.

Browser QA: screenshot selector changes TreasuryFlow content and image, all preview images load, Argus inspector opens with its screenshot, desktop layout fits, Projects and Capabilities fit 305px usable width in 320px frames. No physical-device or screen-reader test claimed. Build/typecheck/hooks gate, model tests, static route/link/asset checks and diff whitespace checks pass. All nine routes and demo links remain.

Earlier reports below describe superseded iterations.

---

# Ronin restoration — current verification (2026-10-20)

- Restored original Ronin image pair, Orbitron/Inter typography, orange/cream palette, cursor spotlight and touch/keyboard reality toggle. Replaced the Atelier hero component and stylesheet rather than keeping duplicate versions.
- Project data (`src/data.ts`), all nine routes, About/Skills/Experience/Contact content, case studies and demos are unchanged. The overview and inspector add original 3D shell separation and close-up controls.
- Production build, source-wide Rules of Hooks, TypeScript, three model tests and static route/link/markup/budget checks pass. Initial JS is approximately 91.0 KB gzip; deferred WebGL bundle 129.2 KB gzip; CSS 11.0 KB gzip (Vite estimates). The lazy chunk still receives Vite's raw 500 KB advisory; its compressed size stays below the existing 180 KB budget. These are bundle measurements, not Lighthouse or Core Web Vitals scores.
- Browser observations: original hero artwork and fonts load; scrolling into projects remains usable; selecting TreasuryFlow/Argus updates content and links; unseal controls and range keyboard End work; case-study navigation, inspector zoom/unseal and Escape dismissal work. Verified 390px hero composition and 320px home/contact layout. Fixed narrow typography overflow on journey and architecture sections; rechecked journey and the shared case-study layout at 305px usable width with scrollWidth equal to clientWidth. Projects fits the 768px frame as well. These are browser frames, not physical-device tests.
- Important limit: the cloud browser reports WebGL disabled. The illustrated fallback was visually checked and stays functional; actual GPU materials, lighting, frame timing and context recovery still need a WebGL-capable device review. Native iOS/touch behavior, screen readers and reduced-motion preference switching have not been empirically tested. No visual score is claimed.
- Vimeo opened and played in the browser. Observed warm amber surroundings, textured sculptural forms and a close-up product reveal; translated that direction into original code rather than reusing its footage or asserting pixel-identical motion.
- External font/image hosts remain dependencies. The older supplied film is no longer requested. Temporary responsive test harness is removed before delivery.

The reports below describe previous iterations and are retained as historical records.

---

# Cinematic refinement — current verification

The original report below records the first V2 iteration. This revision replaces the abstract home gateway with the exact supplied helmet MP4, the typography with two locally bundled AU Grotesk (TeX Gyre Heros) Latin subsets, and basic 3D geometry with metallic network, ledger and risk studies. It adds a native-dialog project inspector with card-to-panel expansion/contraction and 1×–2× camera zoom.

Current build: initial JS ~89.7 KB gzip; lazy scene/Three.js ~127 KB gzip; CSS ~10.4 KB gzip. Two font files total 28.6 KB. Video responds HTTP 200, content-type video/mp4, content length 5,645,541 bytes. Video is an intentional increase in media cost to follow the exact reference. It is not counted in JavaScript budgets. Build, static output checks, font signatures and model tests pass. Vite emits a size advisory because the lazy WebGL chunk exceeds 500 KB uncompressed; it stays within the existing 180 KB gzip budget.

Manual review still required: film playback/autoplay on iOS; 320px through ultrawide composition; Escape/focus return and open/close interruption in the inspector; all zoom endpoints and reset; reduced motion; pointer previews; WebGL-disabled fallback; runtime console and hydration; smoothness on real devices. Browser QA is unavailable under the same managed workflow restriction described below. No visual or Lighthouse score is claimed. The uploaded reference was inspected as a still image; it does not establish exact animation timing.

---

# Verification — Cyber Ronin 2.0

## Completed

- `npm run build`: TypeScript check, Vite production build and static prerender all pass. Nine page routes plus a 404 document generated.
- `npm test`: three meaningful model tests pass: stock/lead-time boundary, stress and repayment effects, approval threshold and daily limit.
- `python3 scripts/verify-output.py`: all nine route documents checked for one H1, unique IDs, main landmark target, retained home anchors, valid internal paths/fragments, built asset references and label targets. Bundle budgets pass.
- Source review: all form controls have labels; native buttons and dialog; explicit focus indicators; tab keyboard controls; reduced-motion rules; informative no-script navigation; readable static content. These are implementation checks, not an accessibility certification.
- Source review: original WebGL scene uses viewport-triggered loading, capped DPR, on-demand frames, hidden-tab/viewport handling, resize observer, preference listener and geometry/material/renderer cleanup. SVG remains when WebGL creation fails.
- Production dependency advisory check returned no known advisories at inspection time. This is not a security audit.
- Existing GitHub `main` remained at `95bb00c5e91292b6be7a7c16f2818d2a0af1fca0` before review-branch upload.

## Measured build output

Vite gzip estimates from the final production build:

| Resource | Uncompressed | Gzip estimate |
|---|---:|---:|
| Initial application JS | 275.32 KB | 87.73 KB |
| Lazy Three.js + scene | 481.60 KB | 121.16 KB |
| CSS | 34.76 KB | 8.34 KB |

Four self-hosted WOFF2 font files total approximately 74.6 KB. WOFF fallbacks also exist in the output; modern browsers choose WOFF2. No decorative remote image/video downloads. Initial JS budget <100 KB gzip and lazy 3D budget <180 KB gzip pass. Static HTML provides content before hydration. The hero still loads Three.js when visible; first-view total transfer includes that chunk. No claim is made about frame rate, LCP, CLS, INP or Lighthouse scores.

## Fixes during verification

- Corrected the currently documented React Bits `magnetStrength` API after TypeScript rejected an outdated prop.
- Added explicit cleanup of generated output before build after finding stale hashed assets across repeated builds.
- Capped risk-diagram coordinates across the entire slider range.
- Split the initial implementation into shared components and seven page modules.
- Preserved no-JavaScript navigation and ensured fallback content is never hidden by scroll-reveal setup.
- React Bits Vite-only modifications: removed the `use client` directive and formatted source. Original license retained. Application controls respond to reduced-motion changes; lighting effects are suppressed by the reduced-motion CSS.

## Not verified here

The Sites skill instructs managed Linux sessions without the control-browser skill to skip browser QA and not start a preview server, install a browser or improvise another browser-control path. That capability was unavailable. Consequently, no rendered desktop/mobile screenshots, browser console inspection, hydration runtime test, screen-reader audit, actual clipboard/mail-app test, navigation interaction test, GPU/device benchmark or Lighthouse measurement was performed. The implementation is ready for **preview review**, not represented as browser-certified or award-winning.

Repository source and demo URLs are preserved from verified project READMEs. Direct web retrieval of all three hosted demos was inaccessible in this session, so their current runtime availability was not verified. SupplyLens may require sign-in. This portfolio does not depend on those demos loading.

## Preview review before merging

1. At 1440×900, 1024×768, 768×1024, 390×844 and 320×700: inspect all nine routes, text wrapping, horizontal overflow, safe touch areas and the contact form. Check landscape mobile too.
2. Navigate with mouse, keyboard and touch. Open the mission index with its button and Ctrl/Cmd-K; search; use Escape; confirm focus returns. Follow project-to-project links and browser back/forward.
3. Test project filters, About tabs, skill selection, all lab range endpoints, approval reset/blocked settlement, timeline details, email copy and valid/invalid email draft inputs.
4. Enable reduced motion, then change it while the page is open. Confirm no continuous motion, usable navigation, all content visible. Disable WebGL and JavaScript separately to check fallbacks.
5. Check DevTools for hydration, console and network errors. Run Lighthouse against the production preview on a mobile profile; record real scores and Core Web Vitals before making performance claims.
6. Visit external repositories, project demos and original writing links. Confirm email drafts open in the configured email client; the site itself must never claim to have sent a message.
7. Review the research matrix’s N/O dimensions: visual/motion/mobile/performance scoring still requires rendered observation. Do not convert these to fabricated numeric ratings.

## Deployment boundary

Only a dedicated review branch and draft pull request are prepared. No merge or production deployment is part of this change. Vercel configuration has changed from a buildless root to Vite `npm run build` → `dist`; check the preview’s project settings if older dashboard overrides remain.

## Project preview crash fix

The scene zoom effect was incorrectly nested inside its initialization effect. React rejects that hook call when a project preview mounts. Moved it to component scope, preserving the existing 3D preview and zoom behavior. Added a source-wide Rules of Hooks check to the production build; verified that it rejects the previous broken Scene source and accepts the corrected source. Production build, existing model tests and static output verification pass. Rendered browser/device scroll QA remains unavailable in this environment.
