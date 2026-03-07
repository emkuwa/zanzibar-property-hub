import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Tunatengeneza muundo wa data ya fomu (TypeScript Interface)
interface FormData {
  name: string;
  email: string;
  whatsapp: string;
  country: string;
  preferredArea: string;
  propertyType: string;
  budget: string;
  timeline: string;
  funding: string;
  purpose: string;
  notes: string;
}

const InvestorForm = () => {
  const { toast } = useToast();

  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    whatsapp: "",
    country: "",
    preferredArea: "",
    propertyType: "",
    budget: "",
    timeline: "",
    funding: "",
    purpose: "",
    notes: ""
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      // MAREKEBISHO: Oanisha na majina ya fomu ya Python Backend
      const data = {
        full_name: form.name,
        email: form.email,
        phone: form.whatsapp,
        budget: form.budget,
        location_interest: form.preferredArea,
        notes: `Timeline: ${form.timeline}, Funding: ${form.funding}, Property: ${form.propertyType}, Country: ${form.country}`
      };

      // MAREKEBISHO: URL inayopiga DigitalOcean API Subdomain
      const res = await fetch("https://api.zanziinvest.com/api/investor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const result = await res.json();

      if (result.status === "success") {
        toast({
          title: "Request submitted",
          description: "Our team will contact you with investment opportunities."
        });

        // Safisha fomu
        setForm({
          name: "",
          email: "",
          whatsapp: "",
          country: "",
          preferredArea: "",
          propertyType: "",
          budget: "",
          timeline: "",
          funding: "",
          purpose: "",
          notes: ""
        });

      } else {
        toast({
          title: "Submission failed",
          description: result.message || "Please try again later.",
          variant: "destructive"
        });
      }

    } catch (err) {
      console.error("CORS or Connection Error:", err);
      toast({
        title: "Error",
        description: "Could not connect to the server. Please check your connection.",
        variant: "destructive"
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
              className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground"
              placeholder="Full Name"
            />

            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground"
              placeholder="Email Address"
            />

            <input
              required
              value={form.whatsapp}
              onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
              className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground"
              placeholder="WhatsApp Number"
            />

            <select
              required
              value={form.country}
              onChange={(e) => setForm({ ...form, country: e.target.value })}
              className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground"
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
              className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground"
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
              className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground"
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
              className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground"
            >
              <option value="">Investment Budget</option>
              <option value="50-100k">50k-100k</option>
              <option value="100-250k">100k-250k</option>
              <option value="300k-700k">300k-700k</option>
              <option value="700k+">700k+</option>
            </select>

            <select
              required
              value={form.timeline}
              onChange={(e) => setForm({ ...form, timeline: e.target.value })}
              className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground"
            >
              <option value="">Investment Timeline</option>
              <option value="0-3">0–3 months</option>
              <option value="3-6">3–6 months</option>
              <option value="6-12">6–12 months</option>
              <option value="researching">Just researching</option>
            </select>

            <select
              required
              value={form.funding}
              onChange={(e) => setForm({ ...form, funding: e.target.value })}
              className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground"
            >
              <option value="">Funding Method</option>
              <option value="cash">Cash</option>
              <option value="mortgage">Mortgage</option>
              <option value="partnership">Investment partnership</option>
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
