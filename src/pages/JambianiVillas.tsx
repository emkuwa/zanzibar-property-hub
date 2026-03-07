import React from 'react';
import Navbar from '../components/Navbar';

const JambianiVillas = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-6 py-32 text-center">
        <h1 className="text-4xl font-display font-bold">Jambiani Luxury Villas</h1>
        <p className="mt-4 text-muted-foreground">Information about our Jambiani investment opportunities is coming soon.</p>
        <button 
          onClick={() => window.history.back()}
          className="mt-8 px-6 py-2 bg-primary text-white rounded-lg"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default JambianiVillas;
