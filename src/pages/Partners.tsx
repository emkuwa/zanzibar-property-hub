import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Globe, Target, ShieldCheck, TrendingUp,
  ClipboardList, Gift, Store, User, MapPin,
  DollarSign, Clock, Building2, Eye, Filter,
  MessageSquare, BarChart3, ArrowRight, Star,
  CheckCircle2, Users, Briefcase, Hotel, LandPlot,
  Search, BadgeCheck, Check, Package, Calculator,
  Mail, Phone, Shield
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

/* ─── ANIMATED COUNTER ─── */

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1500;
          const steps = 40;
          const increment = target / steps;
          let current = 0;
          const interval = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(interval);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

/* ─── HERO ─── */

function Hero() {
  const scrollToForm = () => {
    document.getElementById("apply-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden bg-primary px-6 py-24 md:py-32">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 h-64 w-64 rounded-full bg-primary-foreground blur-3xl" />
        <div className="absolute bottom-10 right-10 h-80 w-80 rounded-full bg-primary-foreground blur-3xl" />
      </div>
      <motion.div
        className="relative mx-auto max-w-4xl text-center"
        initial="hidden"
        animate="visible"
        variants={stagger}
      >
        <motion.h1
          variants={fadeUp}
          className="text-4xl font-bold tracking-tight text-primary-foreground md:text-6xl"
        >
          Get International Property Investors
        </motion.h1>
        <motion.p
          variants={fadeUp}
          className="mx-auto mt-6 max-w-2xl text-lg text-primary-foreground/80"
        >
          ZanziInvest connects real estate partners in Zanzibar with international
          investors actively searching for property opportunities.
        </motion.p>
        <motion.div variants={fadeUp} className="mt-5 flex flex-col items-center gap-2">
          <span className="text-sm text-primary-foreground/70">
            ✓ Trusted by local agents, brokers and property developers
          </span>
          <span className="inline-block rounded-full bg-primary-foreground/15 px-5 py-2 text-sm font-semibold text-primary-foreground backdrop-blur">
            ✨ Start with 3 FREE investor leads
          </span>
        </motion.div>
        <motion.div variants={fadeUp} className="mt-8">
          <button
            onClick={scrollToForm}
            className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-base font-semibold text-accent-foreground shadow-lg transition hover:opacity-90"
          >
            Get Free Investor Leads
            <ArrowRight className="h-5 w-5" />
          </button>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="mx-auto mt-14 flex max-w-md items-center justify-center gap-4"
        >
          <div className="flex flex-col items-center gap-2 rounded-2xl bg-primary-foreground/10 px-6 py-4 backdrop-blur">
            <Globe className="h-8 w-8 text-primary-foreground" />
            <span className="text-xs font-medium text-primary-foreground/80">International Investors</span>
          </div>
          <div className="flex-1 border-t-2 border-dashed border-primary-foreground/30" />
          <div className="rounded-full bg-accent p-2">
            <ArrowRight className="h-5 w-5 text-accent-foreground" />
          </div>
          <div className="flex-1 border-t-2 border-dashed border-primary-foreground/30" />
          <div className="flex flex-col items-center gap-2 rounded-2xl bg-primary-foreground/10 px-6 py-4 backdrop-blur">
            <Building2 className="h-8 w-8 text-primary-foreground" />
            <span className="text-xs font-medium text-primary-foreground/80">Zanzibar Partners</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Trust bar with animated counters */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={stagger}
        className="relative mx-auto mt-16 max-w-4xl"
      >
        <motion.div
          variants={fadeUp}
          className="grid grid-cols-2 gap-4 rounded-2xl bg-primary-foreground/10 p-6 backdrop-blur md:grid-cols-5"
        >
          {[
            { label: "Investor Enquiries", value: 1200, suffix: "+" },
            { label: "Leads Generated", value: 3500, suffix: "+" },
            { label: "Avg Leads / Week", value: 60, suffix: "+" },
            { label: "Trusted Partners", value: 45, suffix: "+" },
            { label: "Est. Deal Value", value: 8, suffix: "M+" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-bold text-primary-foreground md:text-3xl">
                {stat.label === "Est. Deal Value" ? "$" : ""}
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-1 text-xs text-primary-foreground/60">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─── WHO PARTNERS ARE ─── */

const partnerTypes = [
  { icon: Users, title: "Real Estate Agents", desc: "Agents listing and selling properties across Zanzibar." },
  { icon: Briefcase, title: "Property Brokers", desc: "Brokers connecting buyers and sellers in the local market." },
  { icon: Building2, title: "Property Developers", desc: "Developers building residential and commercial projects." },
  { icon: LandPlot, title: "Land Owners", desc: "Owners with land available for development or sale." },
  { icon: Hotel, title: "Hotel & Resort Investors", desc: "Professionals in hospitality and tourism real estate." },
  { icon: Search, title: "Investment Consultants", desc: "Advisors guiding international investors on Zanzibar opportunities." },
];

function WhoPartnersAre() {
  return (
    <section className="px-6 py-20 md:py-28">
      <motion.div
        className="mx-auto max-w-5xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger}
      >
        <motion.h2 variants={fadeUp} className="text-center text-3xl font-bold md:text-4xl">
          Who ZanziInvest Partners Are
        </motion.h2>
        <motion.p variants={fadeUp} className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground leading-relaxed">
          ZanziInvest Partners are professionals involved in real estate opportunities in Zanzibar
          who want to connect with international property investors. Partners use the platform to
          receive investor enquiries and present suitable property opportunities.
        </motion.p>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {partnerTypes.map((p) => (
            <motion.div
              key={p.title}
              variants={fadeUp}
              className="flex items-start gap-4 rounded-2xl border bg-card p-5 shadow-[var(--card-shadow)] transition hover:shadow-[var(--card-shadow-hover)]"
            >
              <div className="shrink-0 rounded-xl bg-primary/10 p-3">
                <p.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-semibold">{p.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/* ─── HOW ZANZIINVEST WORKS ─── */

function HowPlatformWorks() {
  return (
    <section className="bg-secondary px-6 py-20 md:py-28">
      <motion.div
        className="mx-auto max-w-4xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger}
      >
        <motion.h2 variants={fadeUp} className="text-center text-3xl font-bold md:text-4xl">
          How ZanziInvest Works
        </motion.h2>
        <motion.p variants={fadeUp} className="mx-auto mt-4 max-w-xl text-center text-muted-foreground leading-relaxed">
          ZanziInvest brings together two groups to create property investment opportunities in Zanzibar.
        </motion.p>

        <motion.div variants={fadeUp} className="mt-12 flex flex-col items-center gap-4 md:flex-row md:gap-6">
          <div className="flex-1 rounded-2xl border bg-card p-6 text-center shadow-[var(--card-shadow)]">
            <div className="mx-auto mb-4 inline-flex rounded-xl bg-primary/10 p-3">
              <Globe className="h-7 w-7 text-primary" />
            </div>
            <h3 className="text-lg font-semibold">Investors</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              International buyers from Europe, the Middle East and other markets
              actively researching property investment in Zanzibar.
            </p>
          </div>

          <div className="flex flex-col items-center gap-1">
            <ArrowRight className="hidden h-6 w-6 text-primary md:block" />
            <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
              ZanziInvest
            </span>
            <ArrowRight className="hidden h-6 w-6 text-primary md:block" />
          </div>

          <div className="flex-1 rounded-2xl border bg-card p-6 text-center shadow-[var(--card-shadow)]">
            <div className="mx-auto mb-4 inline-flex rounded-xl bg-accent/15 p-3">
              <Building2 className="h-7 w-7 text-accent" />
            </div>
            <h3 className="text-lg font-semibold">Partners</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              Local real estate professionals in Zanzibar who provide property
              opportunities and respond to investor enquiries.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─── WHY LEADS ARE VALUABLE ─── */

const benefits = [
  {
    icon: Globe,
    title: "International Buyers",
    desc: "Connect with investors from Europe, the Middle East and other global markets who are specifically looking for Zanzibar property opportunities.",
  },
  {
    icon: Target,
    title: "High Intent Leads",
    desc: "Every lead represents an investor actively researching property investment in Zanzibar — not casual browsers.",
  },
  {
    icon: ShieldCheck,
    title: "Pre-Qualified Interest",
    desc: "Investors submit detailed enquiries about ROI expectations, preferred locations and property types before being matched with partners.",
  },
  {
    icon: TrendingUp,
    title: "Growing Zanzibar Market",
    desc: "Tourism arrivals and property demand in Zanzibar continue to grow rapidly, creating strong momentum for investment.",
  },
];

function WhyValuable() {
  return (
    <section className="px-6 py-20 md:py-28">
      <motion.div
        className="mx-auto max-w-5xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger}
      >
        <motion.h2 variants={fadeUp} className="text-center text-3xl font-bold md:text-4xl">
          Why These Leads Are Valuable
        </motion.h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {benefits.map((b) => (
            <motion.div
              key={b.title}
              variants={fadeUp}
              className="rounded-2xl border bg-card p-6 shadow-[var(--card-shadow)] transition hover:shadow-[var(--card-shadow-hover)]"
            >
              <div className="mb-4 inline-flex rounded-xl bg-primary/10 p-3">
                <b.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">{b.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/* ─── HOW IT WORKS (3 Steps) ─── */

const steps = [
  { num: 1, icon: ClipboardList, title: "Apply as a Partner", desc: "Fill in your details below to join the ZanziInvest partner network. It takes less than a minute." },
  { num: 2, icon: Gift, title: "Receive 3 FREE Leads", desc: "Get your first 3 verified international investor leads at no cost — no payment or commitment required." },
  { num: 3, icon: Store, title: "Access the Marketplace", desc: "Unlock additional investor leads through the ZanziInvest leads marketplace as they become available." },
];

function HowItWorks() {
  return (
    <section className="bg-secondary px-6 py-20 md:py-28">
      <motion.div
        className="mx-auto max-w-4xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger}
      >
        <motion.h2 variants={fadeUp} className="text-center text-3xl font-bold md:text-4xl">
          How It Works
        </motion.h2>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {steps.map((s) => (
            <motion.div key={s.num} variants={fadeUp} className="text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-xl font-bold text-primary-foreground">
                {s.num}
              </div>
              <h3 className="text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/* ─── EXAMPLE LEAD ─── */

function ExampleLead() {
  return (
    <section className="px-6 py-20 md:py-28">
      <motion.div
        className="mx-auto max-w-2xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger}
      >
        <motion.h2 variants={fadeUp} className="text-center text-3xl font-bold md:text-4xl">
          Example Investor Lead
        </motion.h2>
        <motion.p variants={fadeUp} className="mx-auto mt-3 max-w-lg text-center text-muted-foreground">
          Here is an example of the type of investor enquiry partners receive through ZanziInvest.
        </motion.p>
        <motion.div
          variants={fadeUp}
          className="mt-10 rounded-2xl border bg-card p-8 shadow-[var(--card-shadow)]"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
            <CheckCircle2 className="h-4 w-4" /> Verified Investor Lead
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { icon: User, label: "Full Name", value: "Michael Schneider" },
              { icon: Globe, label: "Country", value: "Germany" },
              { icon: Mail, label: "Email", value: "m.schneider@example.com" },
              { icon: Phone, label: "WhatsApp", value: "+49 ••• ••• ••••" },
              { icon: DollarSign, label: "Investment Budget", value: "$180,000 – $250,000" },
              { icon: Building2, label: "Property Interest", value: "Beachfront villa or boutique hotel" },
              { icon: MapPin, label: "Preferred Location", value: "Paje or Jambiani" },
              { icon: Clock, label: "Investment Timeline", value: "Within 6 months" },
              { icon: Briefcase, label: "Investor Background", value: "Entrepreneur / Small business owner" },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-3">
                <item.icon className="mt-0.5 h-5 w-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="font-medium">{item.value}</p>
                </div>
              </div>
            ))}
            <div className="flex items-start gap-3">
              <Star className="mt-0.5 h-5 w-5 text-accent-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Lead Quality Score</p>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-0.5 text-xs font-semibold text-primary">
                  <Shield className="h-3.5 w-3.5" /> High Potential Investor
                </span>
              </div>
            </div>
          </div>
          <p className="mt-6 text-xs text-muted-foreground italic">
            Actual partner leads may include additional information depending on the enquiry and available investor signals.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─── DASHBOARD PREVIEW ─── */

function DashboardPreview() {
  const features = [
    { icon: Eye, text: "View new investor leads as they arrive" },
    { icon: Store, text: "Access the leads marketplace for additional opportunities" },
    { icon: Filter, text: "Filter leads by location, budget and property type" },
    { icon: BarChart3, text: "Track your enquiries and response history" },
  ];

  return (
    <section className="bg-secondary px-6 py-20 md:py-28">
      <motion.div
        className="mx-auto max-w-3xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger}
      >
        <motion.h2 variants={fadeUp} className="text-center text-3xl font-bold md:text-4xl">
          Partner Dashboard Preview
        </motion.h2>
        <motion.p variants={fadeUp} className="mx-auto mt-3 max-w-lg text-center text-muted-foreground">
          Every partner gets access to a simple dashboard to manage investor leads and track opportunities.
        </motion.p>
        <motion.div
          variants={fadeUp}
          className="mt-10 overflow-hidden rounded-2xl border bg-card shadow-[var(--card-shadow)]"
        >
          <div className="flex items-center gap-2 border-b bg-muted/50 px-5 py-3">
            <div className="h-3 w-3 rounded-full bg-destructive/60" />
            <div className="h-3 w-3 rounded-full bg-accent/60" />
            <div className="h-3 w-3 rounded-full bg-primary/60" />
            <span className="ml-3 text-xs text-muted-foreground">dashboard.zanziinvest.com</span>
          </div>
          <div className="p-6 md:p-8">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-lg font-semibold">Your Leads</h3>
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                3 new
              </span>
            </div>
            <ul className="space-y-4">
              {features.map((f) => (
                <li key={f.text} className="flex items-center gap-3 text-sm">
                  <div className="rounded-lg bg-primary/10 p-2">
                    <f.icon className="h-4 w-4 text-primary" />
                  </div>
                  {f.text}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─── TESTIMONIALS ─── */

const testimonials = [
  {
    quote: "ZanziInvest connected us with international buyers we would never have been able to reach through local marketing alone.",
    author: "Real Estate Agent, Zanzibar",
  },
  {
    quote: "The investor enquiries are serious and already researching Zanzibar property. Highly relevant leads.",
    author: "Property Developer",
  },
];

function Testimonials() {
  return (
    <section className="px-6 py-20 md:py-28">
      <motion.div
        className="mx-auto max-w-4xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger}
      >
        <motion.h2 variants={fadeUp} className="text-center text-3xl font-bold md:text-4xl">
          What Our Partners Say
        </motion.h2>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {testimonials.map((t) => (
            <motion.div
              key={t.author}
              variants={fadeUp}
              className="rounded-2xl border bg-card p-6 shadow-[var(--card-shadow)]"
            >
              <div className="mb-3 flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-sm leading-relaxed italic text-muted-foreground">"{t.quote}"</p>
              <p className="mt-4 text-sm font-semibold">— {t.author}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/* ─── MARKETPLACE ─── */

function Marketplace() {
  return (
    <section className="bg-secondary px-6 py-20 md:py-28">
      <motion.div
        className="mx-auto max-w-2xl text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger}
      >
        <motion.h2 variants={fadeUp} className="text-3xl font-bold md:text-4xl">
          Leads Marketplace
        </motion.h2>
        <motion.p variants={fadeUp} className="mt-4 text-muted-foreground leading-relaxed">
          Partners can access additional investor enquiries through the ZanziInvest leads marketplace
          where new opportunities are regularly available. New investor leads are added as international
          interest in Zanzibar continues to grow.
        </motion.p>
        <motion.div variants={fadeUp} className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary/10 px-5 py-2.5 text-sm font-semibold text-primary">
          <Store className="h-4 w-4" />
          New leads added weekly
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─── PRICING ─── */

const plans = [
  {
    name: "Starter",
    price: "Free",
    period: "",
    highlight: false,
    features: [
      "Receive your first 3 investor leads",
      "Explore the platform",
      "No commitment required",
    ],
    leadValue: "Estimated lead value: $20 – $40 per enquiry",
    extra: null,
  },
  {
    name: "Professional",
    price: "$49",
    period: "/ month",
    highlight: true,
    features: [
      "Up to 15 investor leads per month",
      "Leads marketplace access",
      "Location filtering",
    ],
    leadValue: "Average cost per lead: $3 – $5",
    extra: "Additional leads: $4 per lead",
  },
  {
    name: "Premium",
    price: "$99",
    period: "/ month",
    highlight: false,
    features: [
      "Up to 40 investor leads per month",
      "Priority investor leads",
      "Country and budget filters",
      "Property type filters",
      "Premium lead requests",
    ],
    leadValue: "Average cost per lead: $2 – $3",
    extra: "Additional leads: $3 per lead",
  },
];

function Pricing() {
  const scrollToForm = () => {
    document.getElementById("apply-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="px-6 py-20 md:py-28">
      <motion.div
        className="mx-auto max-w-5xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger}
      >
        <motion.h2 variants={fadeUp} className="text-center text-3xl font-bold md:text-4xl">
          Partner Pricing
        </motion.h2>
        <motion.p variants={fadeUp} className="mx-auto mt-4 max-w-xl text-center text-muted-foreground leading-relaxed">
          Start for free and upgrade as your business grows. Every plan gives you access to verified international investor leads.
        </motion.p>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              variants={fadeUp}
              className={`relative flex flex-col rounded-2xl border p-6 shadow-[var(--card-shadow)] transition hover:shadow-[var(--card-shadow-hover)] ${
                plan.highlight
                  ? "border-primary bg-card ring-2 ring-primary/20"
                  : "bg-card"
              }`}
            >
              {plan.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-0.5 text-xs font-semibold text-primary-foreground">
                  Most Popular
                </span>
              )}
              <h3 className="text-lg font-semibold">{plan.name}</h3>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-3xl font-bold">{plan.price}</span>
                {plan.period && (
                  <span className="text-sm text-muted-foreground">{plan.period}</span>
                )}
              </div>
              <ul className="mt-6 space-y-3 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 rounded-xl bg-muted/60 p-3">
                <p className="text-xs font-medium text-muted-foreground">{plan.leadValue}</p>
                {plan.extra && (
                  <p className="mt-1 text-xs text-muted-foreground">{plan.extra}</p>
                )}
              </div>
              <button
                onClick={scrollToForm}
                className={`mt-5 w-full rounded-xl py-2.5 text-sm font-semibold transition ${
                  plan.highlight
                    ? "bg-primary text-primary-foreground hover:opacity-90"
                    : "border bg-background text-foreground hover:bg-muted"
                }`}
              >
                Get Started
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/* ─── BULK LEADS ─── */

function BulkLeads() {
  return (
    <section className="bg-secondary px-6 py-16 md:py-20">
      <motion.div
        className="mx-auto max-w-2xl text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger}
      >
        <motion.div variants={fadeUp} className="mx-auto mb-4 inline-flex rounded-xl bg-primary/10 p-3">
          <Package className="h-6 w-6 text-primary" />
        </motion.div>
        <motion.h2 variants={fadeUp} className="text-2xl font-bold md:text-3xl">
          Bulk Leads Packages
        </motion.h2>
        <motion.p variants={fadeUp} className="mt-3 text-muted-foreground">
          Need more leads? Purchase bulk packages at discounted rates.
        </motion.p>
        <motion.div variants={fadeUp} className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            { qty: "50 Leads", price: "$120" },
            { qty: "100 Leads", price: "$200" },
            { qty: "Custom", price: "Contact Us" },
          ].map((pkg) => (
            <div
              key={pkg.qty}
              className="rounded-2xl border bg-card p-5 shadow-[var(--card-shadow)]"
            >
              <p className="text-lg font-bold">{pkg.qty}</p>
              <p className="mt-1 text-sm font-semibold text-primary">{pkg.price}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─── TARGETED LEAD REQUESTS ─── */

const targetOptions = [
  { icon: Globe, label: "Investor Country", example: "Europe, Middle East, Asia" },
  { icon: Building2, label: "Property Type", example: "Villa, hotel, land, apartment" },
  { icon: DollarSign, label: "Investment Budget", example: "$100K – $500K+" },
  { icon: MapPin, label: "Preferred Location", example: "Paje, Nungwi, Jambiani, Kendwa" },
];

function TargetedLeads() {
  return (
    <section className="px-6 py-20 md:py-28">
      <motion.div
        className="mx-auto max-w-3xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger}
      >
        <motion.h2 variants={fadeUp} className="text-center text-3xl font-bold md:text-4xl">
          Request Targeted Investor Leads
        </motion.h2>
        <motion.p variants={fadeUp} className="mx-auto mt-4 max-w-xl text-center text-muted-foreground leading-relaxed">
          Partners can request specific types of investor leads tailored to their
          property portfolio and expertise.
        </motion.p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {targetOptions.map((opt) => (
            <motion.div
              key={opt.label}
              variants={fadeUp}
              className="flex items-start gap-3 rounded-2xl border bg-card p-5 shadow-[var(--card-shadow)]"
            >
              <div className="shrink-0 rounded-xl bg-primary/10 p-2.5">
                <opt.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold">{opt.label}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{opt.example}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div
          variants={fadeUp}
          className="mt-8 rounded-2xl border border-dashed border-primary/30 bg-primary/5 p-5 text-center"
        >
          <p className="text-sm text-muted-foreground italic">
            Example request: <span className="font-medium text-foreground not-italic">"Investors from Europe looking for beachfront villas in Zanzibar with a budget over $200,000."</span>
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─── INVESTOR LEAD VALUE ─── */

function LeadValue() {
  return (
    <section className="bg-secondary px-6 py-20 md:py-28">
      <motion.div
        className="mx-auto max-w-3xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger}
      >
        <motion.div variants={fadeUp} className="mx-auto mb-4 inline-flex rounded-xl bg-primary/10 p-3">
          <Calculator className="h-6 w-6 text-primary" />
        </motion.div>
        <motion.h2 variants={fadeUp} className="text-center text-3xl font-bold md:text-4xl">
          The Potential Value of an Investor Lead
        </motion.h2>
        <motion.p variants={fadeUp} className="mx-auto mt-4 max-w-xl text-center text-muted-foreground leading-relaxed">
          If an investor purchases a property worth $150,000 and the agent commission is around 3%,
          the potential commission could be approximately $4,500. Even if only a small percentage
          of leads convert, the return can be significant.
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mx-auto mt-10 max-w-sm rounded-2xl border bg-card p-6 shadow-[var(--card-shadow)]"
        >
          <h3 className="mb-4 text-center text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Example ROI Calculation
          </h3>
          <div className="space-y-3">
            {[
              { label: "Investor Budget", value: "$150,000" },
              { label: "Typical Agent Commission", value: "3%" },
              { label: "Potential Commission", value: "$4,500" },
              { label: "Estimated Lead Cost", value: "$3 – $5" },
            ].map((row) => (
              <div key={row.label} className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{row.label}</span>
                <span className="font-semibold">{row.value}</span>
              </div>
            ))}
            <div className="border-t pt-3">
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-primary">Possible ROI</span>
                <span className="font-bold text-primary">Very High</span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─── APPLICATION FORM ─── */

function ApplicationForm() {
  const [form, setForm] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    whatsapp: "",
    businessType: "",
    location: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const update = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm({ ...form, [field]: e.target.value });

  if (submitted) {
    return (
      <section id="apply-form" className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-lg text-center">
          <CheckCircle2 className="mx-auto h-16 w-16 text-primary" />
          <h2 className="mt-4 text-3xl font-bold">Application Received!</h2>
          <p className="mt-2 text-muted-foreground">We will contact you shortly with your first investor leads.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="apply-form" className="px-6 py-20 md:py-28">
      <motion.div
        className="mx-auto max-w-lg"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger}
      >
        <motion.h2 variants={fadeUp} className="text-center text-3xl font-bold md:text-4xl">
          Apply to Become a ZanziInvest Partner
        </motion.h2>
        <motion.p variants={fadeUp} className="mt-3 text-center text-muted-foreground">
          Fill in your details to receive your first 3 FREE investor leads.
        </motion.p>
        <motion.form
          variants={fadeUp}
          onSubmit={handleSubmit}
          className="mt-10 space-y-4"
        >
          <input
            required
            value={form.companyName}
            onChange={update("companyName")}
            placeholder="Company Name"
            className="w-full rounded-xl border bg-card px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-ring"
          />
          <input
            required
            value={form.contactPerson}
            onChange={update("contactPerson")}
            placeholder="Contact Person"
            className="w-full rounded-xl border bg-card px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-ring"
          />
          <input
            required
            type="email"
            value={form.email}
            onChange={update("email")}
            placeholder="Email Address"
            className="w-full rounded-xl border bg-card px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-ring"
          />
          <input
            required
            value={form.whatsapp}
            onChange={update("whatsapp")}
            placeholder="WhatsApp Number"
            className="w-full rounded-xl border bg-card px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-ring"
          />
          <select
            required
            value={form.businessType}
            onChange={update("businessType")}
            className="w-full rounded-xl border bg-card px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-ring"
          >
            <option value="">Business Type</option>
            <option>Real Estate Agent</option>
            <option>Broker</option>
            <option>Developer</option>
            <option>Land Owner</option>
          </select>
          <input
            required
            value={form.location}
            onChange={update("location")}
            placeholder="Main Property Location"
            className="w-full rounded-xl border bg-card px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-ring"
          />
          <button
            type="submit"
            className="w-full rounded-xl bg-accent py-3.5 text-sm font-semibold text-accent-foreground shadow transition hover:opacity-90"
          >
            Request Free Investor Leads
          </button>
        </motion.form>
      </motion.div>
    </section>
  );
}

/* ─── MAIN PAGE ─── */

export default function Partners() {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <WhoPartnersAre />
      <HowPlatformWorks />
      <WhyValuable />
      <HowItWorks />
      <ExampleLead />
      <DashboardPreview />
      <Testimonials />
      <Marketplace />
      <Pricing />
      <BulkLeads />
      <TargetedLeads />
      <LeadValue />
      <ApplicationForm />
      <footer className="border-t px-6 py-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} ZanziInvest. All rights reserved.
      </footer>
    </div>
  );
}
