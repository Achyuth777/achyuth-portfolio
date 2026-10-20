export const email = "achyuthpvvirat@gmail.com";
export const nav = [
  ["/", "Home"],
  ["/about", "About"],
  ["/projects", "Projects"],
  ["/skills", "Capabilities"],
  ["/experience", "Journey"],
  ["/contact", "Contact"],
];
export type Project = {
  slug: string;
  name: string;
  number: string;
  category: string;
  color: string;
  tagline: string;
  intro: string;
  status: string;
  stack: string[];
  repo: string;
  demo: string;
  problem: string;
  concept: string;
  features: string[];
  architecture: string[];
  challenge: string;
  takeaway: string;
  boundary: string;
};
export const projects: Project[] = [
  {
    slug: "supplylens",
    name: "SupplyLens",
    number: "01",
    category: "Product systems",
    color: "#b8c9a0",
    tagline: "See the shortage. Before it happens.",
    intro:
      "Connecting demand, inventory and purchasing decisions in one supply-chain workspace.",
    status: "Database-backed MVP",
    stack: [
      "React",
      "TypeScript",
      "Vinext",
      "Next.js",
      "Tailwind CSS",
      "Drizzle ORM",
      "Recharts",
      "Cloudflare Workers",
      "D1",
      "Zod",
    ],
    repo: "https://github.com/Achyuth777/SupplyLens",
    demo: "https://supplylens-intelligence.achyuthpvvirat.chatgpt.site",
    problem:
      "Inventory is a timing problem. Demand forecasts, supplier lead times and incoming orders need to tell the same story before a purchasing decision is made.",
    concept:
      "A planning workspace that makes those relationships visible, then connects the forecast to the purchase-order lifecycle.",
    features: [
      "Forecast demand with exponential smoothing (α = 0.3).",
      "Explore supplier delays and demand shocks against inventory runway.",
      "Move purchase orders from draft to ordered to received.",
      "Protect database writes with revision checks and duplicate-receipt guards.",
    ],
    architecture: [
      "React + Recharts / planning UI",
      "Vinext + Workers / validated requests",
      "Zod / input contracts",
      "D1 / inventory and order records",
    ],
    challenge:
      "Receiving an order changes inventory. Repeating that action must not count the same stock twice; revision checks and duplicate guards protect that boundary.",
    takeaway:
      "A useful forecast needs an operational next step. The most important design connection is between the planning model and a safely recorded purchase order.",
    boundary:
      "Synthetic starting data; the hosted workspace requires ChatGPT sign-in. External supply-chain integrations are future work.",
  },
  {
    slug: "treasuryflow",
    name: "TreasuryFlow",
    number: "02",
    category: "Fintech",
    color: "#e8ab77",
    tagline: "Every payment needs a paper trail.",
    intro:
      "Exploring programmable payments, approval policies and recoverable settlement.",
    status: "Local-chain project + browser simulation",
    stack: [
      "React",
      "TypeScript",
      "Java",
      "Spring Boot",
      "PostgreSQL",
      "Solidity",
      "ethers.js",
      "Ganache",
      "Cloudflare D1 / R2",
    ],
    repo: "https://github.com/Achyuth777/treasuryflow",
    demo: "https://treasuryflow-smoky.vercel.app",
    problem:
      "A payment request, its approval and its ledger entry can drift apart. Retrying an interrupted workflow should never create a second payment.",
    concept:
      "Model the complete lifecycle: request, authorize, settle and reconcile. Make policy and recovery explicit rather than treating settlement as a single button.",
    features: [
      "Idempotent requests and threshold-based approval policies.",
      "Local Solidity settlement with due-date checks and daily limits.",
      "Reconciliation against chain events for interrupted settlements.",
      "A separate hosted company workspace with roles, invoices, manual payment records and audit history.",
    ],
    architecture: [
      "React / request and approval interface",
      "Spring Boot / workflow and idempotency",
      "PostgreSQL / application ledger",
      "Solidity + Ganache / local settlement",
    ],
    challenge:
      "A transaction may settle before the application records its result. Event-based reconciliation restores the ledger without blindly paying again.",
    takeaway:
      "Financial software needs explicit state transitions and recovery paths. Correctness includes what happens after a partial failure.",
    boundary:
      "Educational local EVM system. The linked browser demo simulates payments. The separate company workspace records payments made elsewhere. No real funds are moved.",
  },
  {
    slug: "argus-ai",
    name: "Argus AI",
    number: "03",
    category: "AI / Web3",
    color: "#aeb3ed",
    tagline: "Make risk visible. Before the edge.",
    intro:
      "A Solana DeFi risk simulator for exploring positions under market stress.",
    status: "Demo-position risk simulator",
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Solana Wallet Adapter",
      "Solana web3.js",
      "Kamino SDK",
      "Gemini API (optional)",
    ],
    repo: "https://github.com/Achyuth777/argus-ai",
    demo: "https://argus-ai-mu.vercel.app",
    problem:
      "A healthy-looking collateral position can change quickly when the market moves. A headline balance alone does not explain liquidation exposure.",
    concept:
      "Show modeled health factors, stress the collateral value and explain what repayment or additional collateral would do to the position.",
    features: [
      "Modeled health factors, liquidation buffers and target repayment calculations.",
      "Stress scenarios for correlated collateral and stable debt.",
      "Simulated protection rules with balance, expiry, spending and approval checks.",
      "Deterministic explanations plus an optional experimental Gemini endpoint.",
    ],
    architecture: [
      "Next.js + React / scenario interface",
      "Demo positions / model inputs",
      "Risk math / stress and target calculations",
      "Safeguard checks / simulated protection",
    ],
    challenge:
      "A risk model is only as useful as its assumptions. The simulation explicitly assumes correlated collateral and stable debt; it is not a live lending indexer.",
    takeaway:
      "Explanations and constraints belong beside the number. A protection proposal needs limits and consent, not just a calculated action.",
    boundary:
      "Demo positions only. No live lending indexing, autonomous execution or background monitoring. Protection actions are simulated; the portfolio lab is educational, not financial advice.",
  },
];
export const routes = [
  "/",
  "/about",
  "/projects",
  "/skills",
  "/experience",
  "/contact",
  ...projects.map((p) => "/projects/" + p.slug),
];
export function pageTitle(path: string) {
  return (
    (projects.find((p) => path === "/projects/" + p.slug)?.name ||
      nav.find((n) => n[0] === path)?.[1] ||
      "Not found") + " — Achyuth PV // Cyber Ronin"
  );
}
