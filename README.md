# Achyuth PV / Cyber Ronin 2.0

A complete React + TypeScript portfolio with nine prerendered pages, original Three.js architectural studies, project case studies and interactive explanatory models. Personal identity: **Achyuth PV · B.Tech IT · SRMIST Ramapuram · IT-A**.

## Run and build

Requires Node 22.13+ (Node 24 used for validation).

```sh
npm ci
npm run dev
```

Production verification:

```sh
npm test
npm run build
python3 scripts/verify-output.py
npm run preview
```

`npm run build` typechecks, creates the Vite client bundle, then prerenders every route into `dist`. No environment variables, API credentials or backend are required. Serve **dist**, not the source index.html. Do not open the source file directly from disk.

## Routes

| Route | Experience |
|---|---|
| `/` | Architectural gateway, perspective selector, selected work and original section anchors |
| `/about` | Personal story, identity card and interest explorer |
| `/projects` | Filterable project index with original visual studies |
| `/projects/supplylens` | Supply-chain case study and inventory runway model |
| `/projects/treasuryflow` | Payment workflow case study and approval walkthrough |
| `/projects/argus-ai` | Risk case study and stress/repayment model |
| `/skills` | Interactive capability constellation linked to real projects |
| `/experience` | Expandable milestones and original writing links |
| `/contact` | Copy email, signal interaction and email-draft composer |

Original home anchors `#home`, `#projects`, `#about`, `#skills`, `#journey`, `#contact` and `#main` are retained. The old project dialogs are now full, directly linkable case studies. Unknown URLs receive the built `404.html` on a compatible static host.

## Deploy a review preview on Vercel

This work belongs on `feat/cyber-ronin-2`; **do not merge until the preview is reviewed**. The existing production branch remains `main`.

The repository now includes `vercel.json` declaring Vite, `npm ci`, `npm run build` and `dist`. If an old dashboard override still forces the original no-build setup, remove that override or set the same values. Root directory: repository root. No environment variables. Import the review branch as a preview through the existing GitHub/Vercel integration. Review mobile, desktop and keyboard behavior before merging. A merge into the production branch can trigger deployment; no production deployment is performed by these scripts.

## Architecture

- `src/App.tsx`: shared shell, native command dialog, client navigation, focus and native View Transitions enhancement.
- `src/pages/`: seven page components; one data-driven case-study template serves three routes.
- `src/data.ts`: verified identity/project data and route definitions.
- `src/components/UI.tsx`: shared headings, buttons, original SVG project portraits and project cards.
- `src/components/Scene.tsx`: static SVG fallback and viewport-triggered import.
- `src/components/three-scene.ts`: original 3D gates/networks; capped DPR, on-demand rendering, visibility and reduced-motion handling, disposal.
- `src/components/Labs.tsx` + `src/labs.ts`: interactive inventory, approval and stress models, with pure tested calculations.
- `src/vendor/`: selected official React Bits Magnet and SpotlightCard sources and license. See [component research](docs/COMPONENT-RESEARCH.md).
- `scripts/prerender.mjs`: server-rendered static output, distinct route titles and 404.
- `scripts/verify-output.py`: static route, link, markup and bundle-budget checks.

## Design and research

Read the [25-portfolio comparison](docs/RESEARCH.md), [audit and design decisions](docs/AUDIT.md), [component research](docs/COMPONENT-RESEARCH.md), and [verification report](docs/VERIFICATION.md).

Five signature systems connect the site: architectural gateway, mission index navigation, project portals and labs, capability constellation, and closing signal composer. Decorative art is original code, not fabricated product screenshots. Fonts are bundled locally. The technical demonstrations are explicitly simplified educational models, not live integrations.

## Important behavior and limitations

- Contact opens a `mailto:` draft. It does not send or store messages. Clipboard errors expose an email fallback.
- SupplyLens starts from synthetic data and its hosted workspace requires sign-in. TreasuryFlow demos do not move money. Argus AI uses demo positions and simulated protection.
- No internships, dates, testimonials, metrics or proficiency percentages were invented. Existing self-reported achievements are retained with their provenance.
- Content and normal links remain readable without JavaScript. Interactive controls require JavaScript; a no-script navigation is provided.
- Browser rendering, real device interaction, screen-reader behavior, Core Web Vitals and Lighthouse still require review. Do not represent the static checks as browser or accessibility certification.
