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
