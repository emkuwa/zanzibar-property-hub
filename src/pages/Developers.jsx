import { useState } from "react";
import { motion } from "framer-motion";

const Developers = () => {

  const [form, setForm] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    whatsapp: "",
    category: "",
    location: ""
  });

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await fetch("https://zanziinvest.com/api/partners/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const result = await res.json();

      if (result.status === "success") {

        alert("Application received. We will contact you shortly.");

        setForm({
          companyName: "",
          contactPerson: "",
          email: "",
          whatsapp: "",
          category: "",
          location: ""
        });

      } else {

        alert("Submission failed.");

      }

    } catch (err) {

      console.error(err);
      alert("Something went wrong.");

    }

  };

  return (

    <div className="min-h-screen">

      {/* HERO */}

      <section className="py-20 text-center">

        <div className="max-w-4xl mx-auto px-6">

          <h1 className="text-4xl md:text-5xl font-bold">
            Get International Property Investors
          </h1>

          <p className="mt-6 text-lg text-muted-foreground">
            ZanziInvest connects property developers, real estate agents and
            brokers with international investors looking to buy property in
            Zanzibar.
          </p>

          <p className="mt-4 font-semibold">
            Try our service with <strong>3–5 FREE real investor leads</strong>.
          </p>

          <div className="mt-8">

            <a
              href="#apply"
              className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold"
            >
              Get Free Investor Leads
            </a>

          </div>

        </div>

      </section>


      {/* APPLY FORM */}

      <section id="apply" className="py-20 bg-muted/40">

        <div className="max-w-xl mx-auto px-6 text-center">

          <h2 className="text-3xl font-bold">
            Apply to Receive Investor Leads
          </h2>

          <p className="mt-4 text-muted-foreground">
            Submit your details to receive your first 3–5 investor leads.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-4"
          >

            <input
              required
              value={form.companyName}
              onChange={(e) =>
                setForm({ ...form, companyName: e.target.value })
              }
              type="text"
              placeholder="Company Name"
              className="w-full p-3 border rounded-lg"
            />

            <input
              required
              value={form.contactPerson}
              onChange={(e) =>
                setForm({ ...form, contactPerson: e.target.value })
              }
              type="text"
              placeholder="Contact Person"
              className="w-full p-3 border rounded-lg"
            />

            <input
              required
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              type="email"
              placeholder="Email Address"
              className="w-full p-3 border rounded-lg"
            />

            <input
              required
              value={form.whatsapp}
              onChange={(e) =>
                setForm({ ...form, whatsapp: e.target.value })
              }
              type="text"
              placeholder="WhatsApp Number"
              className="w-full p-3 border rounded-lg"
            />

            <select
              required
              value={form.category}
              onChange={(e) =>
                setForm({ ...form, category: e.target.value })
              }
              className="w-full p-3 border rounded-lg"
            >
              <option value="">Business Type</option>
              <option value="developer">Property Developer</option>
              <option value="agent">Real Estate Agent</option>
              <option value="broker">Property Broker</option>
              <option value="hotel">Hotel Investor</option>
              <option value="land">Land Seller</option>
            </select>

            <select
              required
              value={form.location}
              onChange={(e) =>
                setForm({ ...form, location: e.target.value })
              }
              className="w-full p-3 border rounded-lg"
            >
              <option value="">Property Location</option>
              <option value="Paje">Paje</option>
              <option value="Nungwi">Nungwi</option>
              <option value="Jambiani">Jambiani</option>
              <option value="Kendwa">Kendwa</option>
              <option value="Kiwengwa">Kiwengwa</option>
              <option value="Matemwe">Matemwe</option>
            </select>

            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground p-3 rounded-lg font-semibold"
            >
              Request Free Investor Leads
            </button>

          </form>

        </div>

      </section>

    </div>

  );

};

export default Developers;
