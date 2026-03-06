import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <h3 className="font-display text-2xl font-bold text-background">ZanziInvest</h3>
            <p className="mt-3 text-background/60 max-w-sm leading-relaxed">
              The premier platform for discovering property investment opportunities in Zanzibar, Tanzania. Connecting international investors with verified developments.
            </p>
            <div className="flex gap-4 mt-6">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors"
                >
                  <Icon className="w-5 h-5 text-background/70" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-background mb-4">Company</h4>
            <ul className="space-y-2.5">
              {["About", "Contact", "Careers", "Blog"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-background/60 hover:text-background transition-colors text-sm">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-background mb-4">Legal</h4>
            <ul className="space-y-2.5">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-background/60 hover:text-background transition-colors text-sm">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-background/10 mt-12 pt-8 text-center text-background/40 text-sm">
          © {new Date().getFullYear()} ZanziInvest. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
