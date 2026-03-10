import { useState, FormEvent, useRef, useEffect } from "react";
import { MessageCircle, Sparkles } from "lucide-react";
import { API_BASE } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

type ChatMessage = {
  role: "user" | "ai";
  text: string;
};

type StepKey =
  | "full_name"
  | "email"
  | "phone"
  | "country"
  | "location_interest"
  | "property_type"
  | "budget"
  | "timeline"
  | "funding"
  | "notes";

type StepOption = { label: string; value: string };
type Step = {
  key: StepKey;
  question: string;
  optional?: boolean;
  options?: StepOption[];
};

const STEPS: Step[] = [
  { key: "full_name", question: "What's your full name?" },
  { key: "email", question: "What's your email address?" },
  { key: "phone", question: "What's your WhatsApp number (with country code)?" },
  {
    key: "country",
    question: "Which country are you from?",
    options: [
      { label: "🇬🇧 UK", value: "United Kingdom" },
      { label: "🇺🇸 USA", value: "United States" },
      { label: "🇩🇪 Germany", value: "Germany" },
      { label: "🇳🇱 Netherlands", value: "Netherlands" },
      { label: "🇫🇷 France", value: "France" },
      { label: "🇦🇪 UAE", value: "UAE" },
      { label: "🇨🇦 Canada", value: "Canada" },
      { label: "🇦🇺 Australia", value: "Australia" },
      { label: "🇿🇦 South Africa", value: "South Africa" },
      { label: "Other", value: "Other" }
    ]
  },
  {
    key: "location_interest",
    question: "Which area in Zanzibar interests you?",
    options: [
      { label: "Paje", value: "Paje" },
      { label: "Nungwi", value: "Nungwi" },
      { label: "Jambiani", value: "Jambiani" },
      { label: "Kendwa", value: "Kendwa" },
      { label: "Any area", value: "Any" }
    ]
  },
  {
    key: "property_type",
    question: "What type of property?",
    options: [
      { label: "Villa", value: "Villa" },
      { label: "Apartment", value: "Apartment" },
      { label: "Beachfront Land", value: "Beachfront Land" },
      { label: "Hotel Investment", value: "Hotel Investment" }
    ]
  },
  {
    key: "budget",
    question: "What's your investment budget range?",
    options: [
      { label: "50k – 100k USD", value: "50-100k" },
      { label: "100k – 250k USD", value: "100-250k" },
      { label: "300k – 700k USD", value: "300k-700k" },
      { label: "700k+ USD", value: "700k+" }
    ]
  },
  {
    key: "timeline",
    question: "When do you plan to invest?",
    options: [
      { label: "0 – 3 months", value: "0-3" },
      { label: "3 – 6 months", value: "3-6" },
      { label: "6 – 12 months", value: "6-12" },
      { label: "Just researching", value: "researching" }
    ]
  },
  {
    key: "funding",
    question: "How will you fund it?",
    options: [
      { label: "Cash", value: "cash" },
      { label: "Mortgage", value: "mortgage" },
      { label: "Partnership", value: "partnership" }
    ]
  },
  {
    key: "notes",
    question: "Anything else you'd like us to know?",
    optional: true
  }
];

// Short investment tips shown after user picks an option (Zanzibar-specific)
function getTipAfterChoice(stepKey: StepKey, value: string): string | null {
  const v = value.toLowerCase();
  if (stepKey === "location_interest") {
    if (v.includes("paje")) return "💡 Paje is great for villa & beachfront — strong kitesurf tourism, typical ROI 8–15% for holiday rentals.";
    if (v.includes("nungwi")) return "💡 Nungwi is a prime tourism hub; villas and hotels often see strong nightly rates.";
    if (v.includes("jambiani")) return "💡 Jambiani is growing fast for boutique villas and guesthouses with good rental demand.";
    if (v.includes("kendwa")) return "💡 Kendwa offers quieter beaches and solid villa potential for lifestyle + rental.";
    return "💡 We'll match you with listings across the best areas.";
  }
  if (stepKey === "property_type") {
    if (v.includes("villa")) return "💡 Villas in Paje/Nungwi often target 8–15% gross ROI with holiday rentals.";
    if (v.includes("apartment")) return "💡 Apartments can start from ~50k USD; good for lower entry and steady demand.";
    if (v.includes("beachfront") || v.includes("land")) return "💡 Beachfront land is premium — leasehold via ZIPA is the standard route for foreigners.";
    if (v.includes("hotel")) return "💡 Hotel investments suit larger budgets; we can share operator and feasibility info.";
    return null;
  }
  if (stepKey === "budget") {
    if (v.includes("50") || v.includes("100k")) return "💡 This range fits smaller apartments and entry-level options in Zanzibar.";
    if (v.includes("100") || v.includes("250")) return "💡 You can find solid villas and smaller beachfront in this range.";
    if (v.includes("300") || v.includes("700")) return "💡 Strong villa and beachfront options; many investors target 8–15% ROI here.";
    if (v.includes("700k+")) return "💡 Premium villas, beachfront and hotel-style projects are within reach.";
    return null;
  }
  return null;
}

const INTRO =
  "Hi! I'll help you get tailored Zanzibar investment opportunities. First I need a few details — then I'll share quick tips as we go. Let's start.";
const THANKYOU =
  "Thanks! We have your details. Our team will send you tailored Zanzibar opportunities soon.";
const SENDING = "Submitting…";

function isValidEmail(s: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim());
}

const AIAdvisor = () => {
  const { toast } = useToast();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "ai", text: INTRO + "\n\n" + STEPS[0].question }
  ]);
  const [collected, setCollected] = useState<Partial<Record<StepKey, string>>>({});
  const [currentStep, setCurrentStep] = useState(0);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const applyAnswer = (value: string, step: Step, displayLabel?: string) => {
    const displayText = displayLabel ?? (value || "(skipped)");
    setMessages((prev) => [...prev, { role: "user", text: displayText }]);
    setCollected((prev) => ({ ...prev, [step.key]: value }));

    const tip = getTipAfterChoice(step.key, value);
    const nextIndex = currentStep + 1;

    if (nextIndex >= STEPS.length) {
      setLoading(true);
      setCompleted(true);
      setMessages((prev) => [...prev, { role: "ai", text: SENDING }]);

      const merged = { ...collected, [step.key]: value };
      const final = {
        full_name: merged.full_name ?? "",
        email: merged.email ?? "",
        phone: merged.phone ?? "",
        country: merged.country ?? "",
        location_interest: merged.location_interest ?? "",
        property_type: merged.property_type ?? "",
        budget: merged.budget ?? "",
        timeline: merged.timeline ?? "",
        funding: merged.funding ?? "",
        notes: merged.notes ?? ""
      };

      fetch(`${API_BASE}/api/investor`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leadData: final })
      })
        .then((res) => res.json())
        .then((result) => {
          setMessages((prev) =>
            prev.map((m) => (m.text === SENDING ? { ...m, text: THANKYOU } : m))
          );
          toast({
            title: "Request submitted",
            description: "Our team will contact you with investment opportunities."
          });
        })
        .catch(() => {
          setMessages((prev) =>
            prev.map((m) =>
              m.text === SENDING ? { ...m, text: THANKYOU + " (If submission failed, use the form below.)" } : m
            )
          );
          toast({
            title: "Connection issue",
            description: "Please use the form below to submit your details.",
            variant: "destructive"
          });
        })
        .finally(() => setLoading(false));
      return;
    }

    const nextStep = STEPS[nextIndex];
    let nextAiText = "";
    if (tip) nextAiText += tip + "\n\n";
    nextAiText += nextStep.question;
    setMessages((prev) => [...prev, { role: "ai", text: nextAiText }]);
    setCurrentStep(nextIndex);
    setInput("");
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (loading || completed) return;

    const step = STEPS[currentStep];
    const isSkip = step.optional && /^\s*skip\s*$/i.test(text);

    if (step.options) return;

    if (!text && !isSkip) return;
    if (step.key === "email" && !isSkip && !isValidEmail(text)) {
      setMessages((prev) => [
        ...prev,
        { role: "user", text },
        { role: "ai", text: "Please enter a valid email (e.g. name@example.com)." }
      ]);
      setInput("");
      return;
    }

    applyAnswer(isSkip ? "" : text, step, undefined);
  };

  const handleOptionClick = (option: StepOption) => {
    if (loading || completed) return;
    const step = STEPS[currentStep];
    applyAnswer(option.value, step, option.label);
  };

  const step = STEPS[currentStep];
  const showInput = !step.options && !completed;
  const showSkipButton = step.optional && step.key === "notes";

  return (
    <section className="py-20 bg-muted/40">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto bg-card rounded-2xl p-6 md:p-8 shadow-lg border border-border">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-bold">
                Zanzibar AI Investment Advisor
              </h2>
              <p className="text-sm text-muted-foreground">
                Choose options and get tailored tips — we collect your details and match you with opportunities.
              </p>
            </div>
          </div>

          <div
            ref={scrollRef}
            className="mb-4 h-72 md:h-80 overflow-y-auto overflow-x-hidden space-y-3 pr-1 scroll-smooth"
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm md:text-[15px] leading-relaxed whitespace-pre-line ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-sm"
                      : "bg-muted text-foreground rounded-bl-sm"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {!completed && (
            <div className="mt-4 space-y-3">
              {step.options ? (
                <div className="flex flex-wrap gap-2">
                  {step.options.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => handleOptionClick(opt)}
                      disabled={loading}
                      className="rounded-full border border-muted-foreground/40 bg-background px-4 py-2 text-sm font-medium text-foreground hover:border-primary hover:bg-primary/10 hover:text-primary transition-colors disabled:opacity-60"
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <MessageCircle className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      disabled={loading}
                      className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-input bg-background text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-primary/40"
                      placeholder={
                        step.key === "email"
                          ? "you@example.com"
                          : step.key === "phone"
                            ? "+255 700 123 456"
                            : step.optional
                              ? "Type here or click Skip"
                              : "Your answer"
                      }
                    />
                  </div>
                  <div className="flex gap-2">
                    {showSkipButton && (
                      <button
                        type="button"
                        onClick={() => applyAnswer("", step, undefined)}
                        disabled={loading}
                        className="inline-flex items-center justify-center px-4 py-2.5 rounded-lg border border-muted-foreground/40 bg-background font-medium text-sm hover:bg-muted disabled:opacity-60"
                      >
                        Skip
                      </button>
                    )}
                    <button
                      type="submit"
                      disabled={loading || (!input.trim() && !showSkipButton)}
                      className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm md:text-base hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap"
                    >
                      {loading ? "…" : "Send"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          <div className="mt-4 space-y-3">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 rounded-lg bg-muted/60 px-4 py-3">
              <p className="text-xs md:text-sm text-muted-foreground">
                Prefer one form? Use the full form below for the same opportunities.
              </p>
              <a
                href="#investor-form"
                className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-xs md:text-sm font-semibold text-primary-foreground hover:opacity-90"
              >
                Open full form
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIAdvisor;
