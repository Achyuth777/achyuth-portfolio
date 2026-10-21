import { build } from "esbuild";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import React from "react";
import { renderToString } from "react-dom/server";
await build({
  entryPoints: ["src/App.tsx"],
  bundle: true,
  platform: "node",
  format: "esm",
  packages: "external",
  outfile: ".prerender/app.mjs",
  loader: { ".css": "empty" },
});
await build({
  entryPoints: ["src/data.ts"],
  bundle: true,
  platform: "node",
  format: "esm",
  outfile: ".prerender/data.mjs",
});
const { default: App } = await import("../.prerender/app.mjs");
const { routes, pageTitle } = await import("../.prerender/data.mjs");
const template = await readFile("dist/index.html", "utf8");
for (const route of [...routes, "/404"]) {
  const html = template
    .replace(
      "<!--app-->",
      renderToString(React.createElement(App, { initialPath: route })),
    )
    .replace(
      "<title>Achyuth PV // Cyber Ronin</title>",
      `<title>${pageTitle(route)}</title>`,
    );
  const dir = route === "/" ? "dist" : `dist${route}`;
  await mkdir(dir, { recursive: true });
  await writeFile(dir + "/index.html", html);
  if (route === "/404") await writeFile("dist/404.html", html);
}
console.log(`Prerendered ${routes.length} routes + 404 with readable HTML.`);
