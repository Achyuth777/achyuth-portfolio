# Audit and creative direction

## Before
Repository main 95bb00c5e91292b6be7a7c16f2818d2a0af1fca0 contains index.html and README.md. Plain HTML/CSS/JS, no dependencies, build, routing or deployment config. Existing anchors: main, home, projects, about, skills, journey, contact. Existing functionality: mobile navigation, project filters and dialogs, cursor scene reveal, email copy, email-draft form, reduced motion, writing links.

## Decision
Migrate to React/TypeScript/Vite to share navigation, project data, diagrams, interactive state and 3D lifecycle across nine real pages. This is justified by the requested React Bits and full case-study experiences. All original anchors survive on home; project dialogs become linkable full pages. Pointer reveal evolves into architectural depth. Preserve mailto behavior and clearly state that it does not send email. No backend or credentials. Keep GitHub→Vercel workflow; new vercel.json declares npm build and dist output. Changes stay on feat/cyber-ronin-2 for review.

## Content provenance
Personal facts and writing links retained from original verified portfolio/Wix. Name Achyuth PV, B.Tech Information Technology, SRMIST Ramapuram, IT-A. No invented dates, internships or proficiency metrics. Sairam competition win and ₹1,000 prize; CHAT participation; school MUN/seminars retained as self-reported original-portfolio facts, not independently certified.
SupplyLens README blob d91a1556c80b0028fc1dfa48ae0ec61fc8eebd29: synthetic-data MVP, exponential smoothing, purchase orders and guarded writes. TreasuryFlow README blob 354ef90668ae268967c177c0c66ea72a4d20bfd2: local EVM and separate hosted manual-payment workspace; no real funds. Argus AI README blob 132273fc4f4842a003fb8cfbf2adbb9f13cb05df: demo positions, modeled health factors and simulated safeguards. Architecture descriptions are README-grounded, not assertions that external services were live-tested.

## Design system
Graphite #101211, warm ivory #ede8dc, copper #e89b68, muted sage #a9bca6. Space Grotesk display, Inter reading, monospace instrument labels. 8px spacing rhythm; generous editorial 6vw gutters; 1px quiet dividers; square structural cards, rounded controls. Entrances 550ms, interaction 180–250ms. Never block navigation for motion.

## Route / signature plan
Home: architectural gateway and three project portals. About: editorial learning narrative with interest switcher. Projects: filterable visual index. Case studies: unique network, ledger and risk labs with honest boundaries, architecture, challenges and implementation takeaways. Skills: interactive technology-to-project constellation and readable controls. Experience: semantic expandable timeline plus writing archive. Contact: signal composer, clipboard fallback and email draft. Shared command index provides keyboard and mobile navigation.

## Performance boundaries
Static prerender every route. No image/video downloads for decorative art. Three.js separate lazy chunk; DPR capped 1.5 (1 on small screens), visibility-paused animation, render only on demand with reduced motion, dispose geometry/material/renderer on exit. SVG fallback always present. No smooth-scroll library, analytics or external API at runtime. Font files self-hosted through npm bundling. Target initial JS gzip <100KB and total lazy 3D gzip <180KB; measure build sizes rather than claim Lighthouse.

## Source verification beyond READMEs
Inspected repository trees, SupplyLens package.json and lib/engine.ts (forecast α=.3; shortage and order math), TreasuryFlow backend/pom.xml (Java 17, Spring Boot, PostgreSQL) and contracts/TreasuryFlow.sol (approval policy, duplicate approvals, daily limit, due time, execution state), and Argus AI package.json and lib/risk.ts (health-factor formula, shock clamp, target repayment, protection constraints and demo positions). These corroborate the case-study architecture and simplified lab assumptions. No external project was deployed or end-to-end tested for this audit.
