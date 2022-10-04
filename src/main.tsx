import React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App";

import "../node_modules/normalize.css/normalize.css";
import "../node_modules/@blueprintjs/core/lib/css/blueprint.css";
import "../node_modules/@blueprintjs/icons/lib/css/blueprint-icons.css";
import "../node_modules/@blueprintjs/popover2/lib/css/blueprint-popover2.css";

import "./main.css";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
