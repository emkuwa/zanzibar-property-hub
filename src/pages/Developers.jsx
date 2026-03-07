import { motion } from "framer-motion";

const Developers = () => {

  return (

    <div className="min-h-screen">

      {/* HERO */}

      <section className="py-20 text-center">

        <div className="max-w-4xl mx-auto px-6">

          <h1 className="text-4xl md:text-5xl font-bold">
            Get International Property Investors in Zanzibar
          </h1>

          <p className="mt-6 text-lg text-muted-foreground">
            ZanziInvest connects property developers, real estate agents,
            brokers and project owners with international investors actively
            searching for property investment opportunities in Zanzibar.
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


      {/* WHO THIS IS FOR */}

      <section className="py-16 bg-muted/40">

        <div className="max-w-5xl mx-auto px-6">

          <h2 className="text-3xl font-bold text-center">
            Who This Is For
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mt-10">

            <ul className="space-y-3">
              <li>Property Developers</li>
              <li>Real Estate Agents</li>
              <li>Property Brokers</li>
            </ul>

            <ul className="space-y-3">
              <li>Hotel & Resort Investors</li>
              <li>Land Sellers</li>
              <li>Property Investment Projects</li>
            </ul>

          </div>

        </div>

      </section>


      {/* HOW IT WORKS */}

      <section className="py-20">

        <div className="max-w-5xl mx-auto px-6">

          <h2 className="text-3xl font-bold text-center">
            How ZanziInvest Works
          </h2>

          <div className="grid md:grid-cols-3 gap-10 mt-12 text-center">

            <div>
              <h3 className="font-semibold text-xl">1. We Attract Investors</h3>
              <p className="mt-3 text-muted-foreground">
                ZanziInvest generates international investor traffic through
                search engines and investment content about Zanzibar.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-xl">2. Investors Submit Requests</h3>
              <p className="mt-3 text-muted-foreground">
                Investors looking for property opportunities submit inquiries
                with budget, location preference and investment timeline.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-xl">3. We Share Qualified Leads</h3>
              <p className="mt-3 text-muted-foreground">
                Qualified investor inquiries are shared with developers,
                agents and brokers who are part of the ZanziInvest network.
              </p>
            </div>

          </div>

        </div>

      </section>


      {/* TYPES OF LEADS */}

      <section className="py-16 bg-muted/40">

        <div className="max-w-5xl mx-auto px-6">

          <h2 className="text-3xl font-bold text-center">
            Types of Investor Leads
          </h2>

          <div className="grid md:grid-cols-2 gap-10 mt-10">

            <ul className="space-y-3">
              <li>Villa Investment Buyers</li>
              <li>Beachfront Property Investors</li>
              <li>Land Buyers</li>
            </ul>

            <ul className="space-y-3">
              <li>Hotel & Resort Investors</li>
              <li>Holiday Rental Property Buyers</li>
              <li>Property Development Investors</li>
            </ul>

          </div>

        </div>

      </section>


      {/* WHY US */}

      <section className="py-20">

        <div className="max-w-5xl mx-auto px-6">

          <h2 className="text-3xl font-bold text-center">
            Why Partner With ZanziInvest
          </h2>

          <div className="grid md:grid-cols-3 gap-10 mt-12 text-center">

            <div>
              <h3 className="font-semibold">International Investors</h3>
              <p className="text-muted-foreground mt-2">
                Our platform targets investors from Europe, the Middle East
                and other international markets.
              </p>
            </div>

            <div>
              <h3 className="font-semibold">Targeted Property Leads</h3>
              <p className="text-muted-foreground mt-2">
                Investors submit detailed requests including budget,
                preferred location and property type.
              </p>
            </div>

            <div>
              <h3 className="font-semibold">Free Trial Leads</h3>
              <p className="text-muted-foreground mt-2">
                Try our service with 3–5 free investor inquiries before
                joining the network.
              </p>
            </div>

          </div>

        </div>

      </section>


      {/* APPLY */}

      <section id="apply" className="py-20 bg-muted/40">

        <div className="max-w-xl mx-auto px-6 text-center">

          <h2 className="text-3xl font-bold">
            Apply to Receive Investor Leads
          </h2>

          <p className="mt-4 text-muted-foreground">
            Submit your details to receive your first 3–5 investor leads
            and experience how ZanziInvest works.
          </p>

          <form className="mt-8 space-y-4">

            <input
              type="text"
              placeholder="Company Name"
              className="w-full p-3 border rounded-lg"
            />

            <input
              type="text"
              placeholder="Contact Person"
              className="w-full p-3 border rounded-lg"
            />

            <input
              type="email"
              placeholder="Email Address"
              className="w-full p-3 border rounded-lg"
            />

            <input
              type="text"
              placeholder="WhatsApp Number"
              className="w-full p-3 border rounded-lg"
            />

            <button
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
