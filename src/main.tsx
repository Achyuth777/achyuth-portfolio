import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import "./style.css";
import "./ronin.css";
const root = document.getElementById("root")!;
const app = <App initialPath={location.pathname.replace(/\/$/, "") || "/"} />;
if (root.children.length) hydrateRoot(root, app);
else createRoot(root).render(app);

import "./journey.css";

import "./personal-about.css";

import "lenis/dist/lenis.css";
import "./home-refinement.css";

// Final responsive and motion overrides, after the original design layers.
import "./motion-polish.css";
