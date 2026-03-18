/**
 * ZanziInvest Leads Dashboard – embedded view.
 * URL: zanziinvest.com/dashboard (iframe to dashboard server).
 */
import { useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const DASHBOARD_URL =
  import.meta.env.VITE_DASHBOARD_URL ||
  (import.meta.env.DEV ? "http://localhost:5052" : "https://dashboard.zanziinvest.com");

export default function Dashboard() {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col px-4 py-4">
        <div className="mb-3 flex items-center justify-between gap-4">
          <h1 className="text-xl font-semibold">Leads Dashboard</h1>
          <a
            href={DASHBOARD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary underline hover:no-underline"
          >
            Open in new tab
          </a>
        </div>
        <div className="min-h-[calc(100vh-12rem)] flex-1 overflow-hidden rounded-lg border bg-card">
          <iframe
            ref={iframeRef}
            src={DASHBOARD_URL}
            title="ZanziInvest Leads Dashboard"
            className="h-full min-h-[600px] w-full border-0"
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}
