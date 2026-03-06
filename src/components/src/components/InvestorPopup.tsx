import { useState, useEffect } from "react";

const InvestorPopup = () => {

  const [open, setOpen] = useState(false);

  useEffect(() => {

    const timer = setTimeout(() => {
      setOpen(true);
    }, 5000);

    return () => clearTimeout(timer);

  }, []);

  if (!open) return null;

  return (

    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      <div className="bg-white p-8 rounded-xl max-w-md text-center shadow-xl">

        <h3 className="text-2xl font-bold mb-3">
          Get Zanzibar Investment Opportunities
        </h3>

        <p className="text-gray-600 mb-6">
          Discover beachfront villas and high-return property investments in Zanzibar.
        </p>

        <a
          href="#investor-form"
          className="inline-block px-6 py-3 bg-black text-white rounded-lg"
        >
          View Investment Deals
        </a>

        <button
          onClick={() => setOpen(false)}
          className="block mt-4 text-sm text-gray-500"
        >
          Close
        </button>

      </div>

    </div>

  );

};

export default InvestorPopup;
