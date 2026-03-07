// redeploy trigger

import JambianiVillas from "./pages/JambianiVillas";
import BuyPropertyZanzibar from "./pages/BuyPropertyZanzibar";
import PajeVillas from "./pages/PajeVillas";
import NungwiBeachfront from "./pages/NungwiBeachfront";
import LocationPage from "./pages/LocationPage";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>

      <Toaster />
      <Sonner />

      <BrowserRouter>
        <Routes>

          {/* Homepage */}
          <Route path="/" element={<Index />} />

          {/* Main SEO page */}
          <Route path="/buy-property-in-zanzibar" element={<BuyPropertyZanzibar />} />

          {/* Manual SEO pages */}
          <Route path="/paje-villas-for-sale" element={<PajeVillas />} />

          <Route path="/nungwi-beachfront-property" element={<NungwiBeachfront />} />

          <Route path="/jambiani-villas-for-sale" element={<JambianiVillas />} />

          {/* Programmatic SEO route */}
          <Route path="/buy-property-in-:location-zanzibar" element={<LocationPage />} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />

        </Routes>
      </BrowserRouter>

    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
