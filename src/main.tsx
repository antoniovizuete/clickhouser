import React from "react";
import { createRoot } from "react-dom/client";

import "allotment/dist/style.css";
import "../node_modules/@blueprintjs/core/lib/css/blueprint.css";
import "../node_modules/@blueprintjs/icons/lib/css/blueprint-icons.css";
import "../node_modules/@blueprintjs/popover2/lib/css/blueprint-popover2.css";
import "../node_modules/@blueprintjs/table/lib/css/table.css";
import "../node_modules/normalize.css/normalize.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./components/App";
import "./main.css";
import { ThemeProvider } from "./contexts/useTheme";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
