import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-foreground/80 backdrop-blur-md">
      <div className="container mx-auto px-6 flex items-center justify-between h-16">
        <a href="/" className="font-display text-xl font-bold text-background">
          ZanziInvest
        </a>

        <div className="hidden md:flex items-center gap-8">
          {[
            ["Properties", "#properties"],
            ["ROI Calculator", "#calculator"],
            ["Why Zanzibar", "#why-zanzibar"],
            ["Contact", "#contact"],
          ].map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="text-sm text-background/70 hover:text-background transition-colors"
            >
              {label}
            </a>
          ))}

          <a
            href="#investor-form"
            className="px-5 py-2 rounded-lg bg-secondary text-secondary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Get Started
          </a>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-background"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-foreground/95 backdrop-blur-md px-6 pb-6 space-y-4">
          {[
            ["Properties", "#properties"],
            ["ROI Calculator", "#calculator"],
            ["Why Zanzibar", "#why-zanzibar"],
            ["Contact", "#investor-form"],
          ].map(([label, href]) => (
            <a
              key={label}
              href={href}
              onClick={() => setOpen(false)}
              className="block text-background/70 hover:text-background transition-colors"
            >
              {label}
            </a>
          ))}

          <a
            href="#investor-form"
            onClick={() => setOpen(false)}
            className="block text-secondary font-semibold"
          >
            Get Started
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
