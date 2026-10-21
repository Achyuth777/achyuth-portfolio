# Journey and voice revision — 21 October 2026

## Design decisions

The user's two screenshots identify the hero AP tile and About APV panel. Replaced both, plus the home APV seal, with original code-native graphics: a restrained code emblem and a project-notes panel linking to the three actual projects. No generated portrait or invented personal imagery.

Journey now reads chronologically from education to community work, leadership, internship and projects. The sticky year index, numbered route, native disclosure cards, filters and visitor exploration counter provide game-like discovery without fake XP, proficiency percentages or achievements. GitHub shows a separate factual record, not a score of engineering ability.

Home, About and Contact copy is more direct and specific. Existing routes, project case studies, screenshots, live links and interactive labs are retained. No WebGL is introduced.

## Reference refresh

Revisited the 25-site shortlist in RESEARCH.md through live page retrieval on 21 October. 24 returned readable page content; Gil Huybrecht did not. These were content/structure checks, not rendered animation, accessibility or performance audits, and not an objective top-25 ranking. Awwwards' current homepage was also inspected. Rob Bowen and Sarah Drasner retrievals failed; Cassie Evans' current page is a retirement notice, so it was not treated as a current portfolio reference.

The most useful ideas for this specific revision:

- Brittany Chiang: dates, role descriptions and project evidence are easy to find. Adapted clear experience hierarchy.
- Takuya Matsuyama: personal introduction, biography and work live together. Adapted plain first-person context.
- Dennis Snellenberg: work index and clear navigation. Adapted the year index and direct project access.
- Bruno Simon: an invitation to explore. Adapted optional chapter exploration while keeping content immediately readable without playing a game.
- Lee Robinson: short biography and expandable detail. Adapted concise summaries with optional story text.

No individual layout, source code or artwork was copied. Cyber Ronin's warm palette and display typography remain the visual foundation. The full earlier comparison matrix and links remain in RESEARCH.md.

## Personal information sources and limits

- LinkedIn public search listing: https://in.linkedin.com/in/achyuth-pv-78653528a — education 2024–2028, June 2025 MongoDB/Python credential, August 2025 Cyfrin Solidity credential, March 2025 TEXUS paper presentation, February 2025 NUS immersion, October 2024 BITS quant workshop and Dubai industrial visit, December 2024 volunteering and May 2025 teaching. Public posts describe StellarVerse and IBM AI completion. Direct LinkedIn page retrieval failed; search indexing exposed the listed content.
- CodeKrafters team search result: https://www.codekrafters.tech/team — Achyuth PV, Web3 Lead. August 2025 start is supplied in prior user context, not a visible LinkedIn employment date.
- Launchpad host listing: https://luma.com/evpe7or8 — names Achyuth Pv as co-host. No attendance count or exact event date was added to the portfolio.
- Kodeus AI Growth Marketing Intern is visible in the indexed LinkedIn snippet; 2026 comes from prior user context. No month, tenure, invented metric or task list is asserted.
- Stellar ambassador role is supported by public profile title and prior user context. No unverified start month is added.
- IBM entry intentionally has no issue date or credential ID. The public post confirms completion but does not identify a precise course title. Blockchain Basics was omitted from the featured certificates because the listing reports expiry in June 2026.

## GitHub activity

Source: https://github-contributions-api.jogruber.de/v4/Achyuth777?y=last (third-party aggregation of GitHub's public contribution calendar). Retrieved snapshot checked 21 October 2026. The page requests fresh data on mount, validates records, times out after eight seconds and retains the dated snapshot on failure. It never replaces failure with invented zeros. Calendar, active-day count and streaks are computed from the same 365-day range. Contributions are labelled as such; they are not claimed to be all commits or all-time streaks. Private work and non-default-branch commits may not be represented by GitHub's public calendar.

Keyboard navigation uses one calendar tab stop and arrow/Home/End keys. Focus/hover/tap shows the date and count. The calendar scrolls horizontally on narrow screens.

## Verification

Production build, TypeScript, hooks gate, existing model tests and new streak/total boundary tests pass. Static route/link/asset checks pass. Browser observed: Work filter; opening Web3 chapter increments exploration count; live GitHub refresh succeeds; arrow key updates date selection. Home, About and Journey fit 305px usable width in 320px frames. Actual phones, screen readers and every browser not tested. No Lighthouse score claimed.
