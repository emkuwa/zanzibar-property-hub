import { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const InvestorForm = () => {

  const { toast } = useToast();

  const [form, setForm] = useState({
    name: "",
    email: "",
    whatsapp: "",
    country: "",
    preferredArea: "",
    propertyType: "",
    budget: "",
    timeline: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();

    try {

      await fetch(
        "https://script.google.com/macros/s/AKfycbyEVgwdSMVm8M6fmm68L4ry-OcOVqAG3hgbAb2S_UVohg-iwXKtjOzP6D5WgJ3eaLQg/exec",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(form),
          mode: "no-cors"
        }
      );

      toast({
        title: "Thank you!",
        description: "We will contact you with investment opportunities."
      });

      setForm({
        name: "",
        email: "",
        whatsapp: "",
        country: "",
        preferredArea: "",
        propertyType: "",
        budget: "",
        timeline: ""
      });

    } catch (error) {

      toast({
        title: "Error",
        description: "Something went wrong. Please try again."
      });

    }
  };

  return (
    <section id="investor-form" className="py-24 bg-background">

      <div className="container mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >

          <div className="text-center mb-12">

            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">
              Get Zanzibar Investment Opportunities
            </h2>

            <p className="mt-4 text-muted-foreground text-lg">
              Join investors receiving curated Zanzibar property deals.
            </p>

          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-card rounded-2xl p-8 md:p-10 shadow-lg space-y-5"
          >

            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-lg border border-input bg-background px-4 py-3"
              placeholder="Full Name"
            />

            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full rounded-lg border border-input bg-background px-4 py-3"
              placeholder="Email Address"
            />

            <input
              required
              value={form.whatsapp}
              onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
              className="w-full rounded-lg border border-input bg-background px-4 py-3"
              placeholder="WhatsApp Number"
            />

            <select
              required
              value={form.country}
              onChange={(e) => setForm({ ...form, country: e.target.value })}
              className="w-full rounded-lg border border-input bg-background px-4 py-3"
            >
              <option value="">Select Country</option>
              <option value="United States">United States</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="Germany">Germany</option>
              <option value="Netherlands">Netherlands</option>
              <option value="France">France</option>
              <option value="Italy">Italy</option>
              <option value="Spain">Spain</option>
              <option value="Canada">Canada</option>
              <option value="Australia">Australia</option>
              <option value="UAE">United Arab Emirates</option>
              <option value="South Africa">South Africa</option>
              <option value="Other">Other</option>
            </select>

            <select
              required
              value={form.preferredArea}
              onChange={(e) =>
                setForm({ ...form, preferredArea: e.target.value })
              }
              className="w-full rounded-lg border border-input bg-background px-4 py-3"
            >
              <option value="">Preferred Area</option>
              <option value="Paje">Paje</option>
              <option value="Nungwi">Nungwi</option>
              <option value="Jambiani">Jambiani</option>
              <option value="Kendwa">Kendwa</option>
              <option value="Any">Any Area</option>
            </select>

            <select
              required
              value={form.propertyType}
              onChange={(e) =>
                setForm({ ...form, propertyType: e.target.value })
              }
              className="w-full rounded-lg border border-input bg-background px-4 py-3"
            >
              <option value="">Property Type</option>
              <option value="Villa">Villa</option>
              <option value="Apartment">Apartment</option>
              <option value="Beachfront Land">Beachfront Land</option>
              <option value="Hotel Investment">Hotel Investment</option>
            </select>

            <select
              required
              value={form.budget}
              onChange={(e) => setForm({ ...form, budget: e.target.value })}
              className="w-full rounded-lg border border-input bg-background px-4 py-3"
            >
              <option value="">Investment Budget</option>
              <option value="50-100k">$50,000 – $100,000</option>
              <option value="100-250k">$100,000 – $250,000</option>
              <option value="250-500k">$250,000 – $500,000</option>
              <option value="500k+">$500,000+</option>
            </select>

            <select
              required
              value={form.timeline}
              onChange={(e) => setForm({ ...form, timeline: e.target.value })}
              className="w-full rounded-lg border border-input bg-background px-4 py-3"
            >
              <option value="">Investment Timeline</option>
              <option value="now">Ready to invest now</option>
              <option value="3-6">3–6 months</option>
              <option value="6-12">6–12 months</option>
              <option value="researching">Just researching</option>
            </select>

            <button
              type="submit"
              className="w-full py-4 rounded-lg bg-primary text-primary-foreground font-semibold text-lg hover:opacity-90 flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              Send Me Investment Opportunities
            </button>

          </form>

        </motion.div>
      </div>
    </section>
  );
};

export default InvestorForm;
