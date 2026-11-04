import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Index from "./pages/Index";
import Webshop from "./pages/Webshop";
import Workbook from "./pages/Workbook";
import RelationshipWorkbook from "./pages/RelationshipWorkbook";
import NotFound from "./pages/NotFound";
import "./styles.css";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    if (typeof window.gtag === "function") {
      window.gtag("config", "G-4K9DCM5CWH", {
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);

  return null;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AnalyticsTracker />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/webshop" element={<Webshop />} />
        <Route path="/munkafuzet" element={<Workbook />} />
        <Route path="/kapcsolati-mintaim" element={<RelationshipWorkbook />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
