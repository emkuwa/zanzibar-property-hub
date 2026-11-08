// redeploy trigger

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Index from "./pages/Index";
const Dashboard = lazy(() => import("./pages/Dashboard"));
import NotFound from "./pages/NotFound";
import SeoPage from "./components/seo/SeoPage";
import { CONTENT_PAGES, HUBS } from "./content/seo";
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

          {[...HUBS, ...CONTENT_PAGES].map((page) => (
            <Route
              key={page.path}
              path={page.path}
              element={<SeoPage path={page.path} />}
            />
          ))}
          {/* Published resource routes are explicit; unknown paths remain 404. */}
          <Route path="/dashboard" element={
            <Suspense fallback={<main className="container py-12" role="status">Loading dashboard…</main>}>
              <Dashboard />
            </Suspense>
          } />

          {/* 404 page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
