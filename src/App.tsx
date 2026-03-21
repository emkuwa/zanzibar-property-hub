// redeploy trigger

import Developers from "./pages/Developers";
import JambianiVillas from "./pages/JambianiVillas";
import BuyPropertyZanzibar from "./pages/BuyPropertyZanzibar";
import PajeVillas from "./pages/PajeVillas";
import NungwiBeachfront from "./pages/NungwiBeachfront";
import LocationPage from "./pages/LocationPage";
import InvestInZanzibar from "./pages/InvestInZanzibar";
import Partners from "@/pages/Partners";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import { gaPageView } from "@/lib/gtag";

const queryClient = new QueryClient();

function GaPageViews() {
  const location = useLocation();
  useEffect(() => {
    const path = location.pathname + location.search + location.hash;
    gaPageView(path);
  }, [location.pathname, location.search, location.hash]);
  return null;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>

      <Toaster />
      <Sonner />

      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <GaPageViews />
        <Routes>

          {/* Homepage */}
          <Route path="/" element={<Index />} />

          <Route path="/partners" element={<Partners />} />

          <Route path="/invest-in-zanzibar" element={<InvestInZanzibar />} />

          {/* Main SEO page */}
          <Route path="/buy-property-in-zanzibar" element={<BuyPropertyZanzibar />} />

          {/* Manual SEO pages */}
          <Route path="/paje-villas-for-sale" element={<PajeVillas />} />

          <Route path="/nungwi-beachfront-property" element={<NungwiBeachfront />} />

          <Route path="/jambiani-villas-for-sale" element={<JambianiVillas />} />

          {/* Developers page */}
          <Route path="/developers" element={<Developers />} />

          {/* Leads dashboard (embedded) */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Programmatic SEO pages */}
          <Route path="/:slug" element={<LocationPage />} />

          {/* 404 page */}
          <Route path="*" element={<NotFound />} />

        </Routes>
      </BrowserRouter>

    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
