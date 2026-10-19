import { hydrateRoot } from "react-dom/client";
import App from "./App";
import "./style.css";
import "./cinema.css";
hydrateRoot(
  document.getElementById("root")!,
  <App initialPath={location.pathname.replace(/\/$/, "") || "/"} />,
);
