import * as React from "react";
import { createRoot } from "react-dom/client";

import { Main } from "./components/Main";

const container = document.getElementById("example");
if (!container) {
  throw new Error("Root container #example was not found in index.html");
}

createRoot(container).render(
    <Main compiler="TypeScript" framework="React" />
);