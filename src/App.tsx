// redeploy trigger

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";

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

          {/* Legacy property URLs now enter the private enquiry flow. */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/:slug" element={<Navigate to="/#enquiry" replace />} />

          {/* 404 page */}
          <Route path="*" element={<NotFound />} />

        </Routes>
      </BrowserRouter>

    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
