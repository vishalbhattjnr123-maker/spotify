import { useEffect } from "react";

function Premimum() {
  return (
    <div className="text-white p-4 md:p-8 pb-20">
      {/* ========== PREMIUM HERO ========== */}
      <section className="bg-[#1d75de] rounded-lg p-8 md:p-12 mb-10 text-white relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-black mb-6 leading-tight">
            Listen without limits. Try 3 months<br />
            of Premium Standard for ₹99.
          </h1>

          <p className="text-lg md:text-xl font-medium mb-6">
            Only ₹199/month after. Cancel anytime.
          </p>

          <div className="inline-block bg-[#00000033] px-3 py-1 rounded-full text-sm font-bold mb-8">
            ⏰ Offer ends in 13 days
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <button className="bg-[#121212] text-white px-8 py-3 rounded-full font-bold hover:bg-black transition-transform transform hover:scale-105">
              Try 3 months for ₹99
            </button>
            <button className="bg-transparent border-2 border-[#ffffff4d] text-white px-8 py-3 rounded-full font-bold hover:bg-[#ffffff1a] transition-all">
              View all plans
            </button>
          </div>

          <p className="text-xs text-[#ffffffb3] max-w-xl">
            Premium Standard only. ₹99 for 3 months, then ₹199 per month after.
            Offer only available if you haven't tried Premium before.
            <span className="underline cursor-pointer"> Terms apply.</span><br />
            Offer ends December 31, 2025.
          </p>
        </div>
      </section>

      {/* ========== PLAN INTRO ========== */}
      <section className="text-center mb-16">
        <h2 className="text-2xl md:text-4xl font-bold mb-6">
          Choose the Premium plan that's right for you.<br />
          You've got options.
        </h2>
        <p className="text-[#b3b3b3] text-sm md:text-base">
          Choose a Premium plan and listen to the podcasts and ad-free music you want,
          when you want.<br />
          Pay in various ways. Cancel anytime.
        </p>
      </section>

      {/* ========== PLANS GRID ========== */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {/* LITE */}
        <div className="bg-[#242424] rounded-lg p-6 flex flex-col hover:bg-[#2a2a2a] transition-colors relative">
          <div className="mb-4 border-b border-[#ffffff1a] pb-4">
             <span className="bg-[#ffd2d7] text-black text-xs font-bold px-2 py-1 rounded uppercase tracking-wider mb-2 inline-block">One-time payment</span>
            <h2 className="text-2xl font-bold mb-1">Lite</h2>
            <p className="text-sm font-medium">₹139 / month</p>
             <small className="text-[#b3b3b3] text-xs block mt-1">1 account</small>
          </div>
          <ul className="flex-1 space-y-3 mb-8 text-sm md:text-base">
            <li className="flex gap-2"><span className="text-xl leading-none">•</span> 1 Lite account</li>
            <li className="flex gap-2"><span className="text-xl leading-none">•</span> High audio quality (up to ~160kbps)</li>
            <li className="flex gap-2"><span className="text-xl leading-none">•</span> Cancel anytime</li>
          </ul>
          <button className="w-full bg-[#ffd2d7] text-black font-bold py-3 rounded-full hover:scale-105 transition-transform">Get Premium Lite</button>
        </div>

        {/* STANDARD */}
        <div className="bg-[#242424] rounded-lg p-6 flex flex-col hover:bg-[#2a2a2a] transition-colors relative border-2 border-[#1DB954]">
          <div className="absolute top-0 left-0 bg-[#1DB954] text-black text-xs font-bold px-3 py-1 rounded-br-lg rounded-tl-lg">
             Best Value
          </div>
          <div className="mb-4 border-b border-[#ffffff1a] pb-4 mt-6">
            <h2 className="text-2xl font-bold mb-1 text-[#1DB954]">Standard</h2>
            <p className="text-sm font-medium">₹99 for 3 months</p>
            <small className="text-[#b3b3b3] text-xs block mt-1">₹199 / month after</small>
          </div>
          <ul className="flex-1 space-y-3 mb-8 text-sm md:text-base">
            <li className="flex gap-2"><span className="text-xl leading-none">•</span> 1 Standard account</li>
            <li className="flex gap-2"><span className="text-xl leading-none">•</span> Download to listen offline</li>
            <li className="flex gap-2"><span className="text-xl leading-none">•</span> Very high audio quality (up to ~320kbps)</li>
            <li className="flex gap-2"><span className="text-xl leading-none">•</span> Cancel anytime</li>
            <li className="flex gap-2"><span className="text-xl leading-none">•</span> Subscribe or one-time payment</li>
          </ul>
          <button className="w-full bg-[#1DB954] text-black font-bold py-3 rounded-full hover:scale-105 transition-transform">Try 3 months for ₹99</button>
        </div>

        {/* PLATINUM */}
        <div className="bg-[#242424] rounded-lg p-6 flex flex-col hover:bg-[#2a2a2a] transition-colors relative">
          <div className="mb-4 border-b border-[#ffffff1a] pb-4">
             <span className="bg-[#ffd2d7] text-black text-xs font-bold px-2 py-1 rounded uppercase tracking-wider mb-2 inline-block">One-time payment</span>
            <h2 className="text-2xl font-bold mb-1">Platinum</h2>
            <p className="text-sm font-medium">₹299 / month</p>
             <small className="text-[#b3b3b3] text-xs block mt-1">Up to 3 accounts</small>
          </div>
          <ul className="flex-1 space-y-3 mb-8 text-sm md:text-base">
            <li className="flex gap-2"><span className="text-xl leading-none">•</span> Up to 3 Platinum accounts</li>
            <li className="flex gap-2"><span className="text-xl leading-none">•</span> Download to listen offline</li>
            <li className="flex gap-2"><span className="text-xl leading-none">•</span> Lossless audio (24-bit / 44.1kHz)</li>
            <li className="flex gap-2"><span className="text-xl leading-none">•</span> Your personal AI DJ</li>
            <li className="flex gap-2"><span className="text-xl leading-none">•</span> AI playlist creation</li>
            <li className="flex gap-2"><span className="text-xl leading-none">•</span> Cancel anytime</li>
          </ul>
          <button className="w-full bg-[#ffd2d7] text-black font-bold py-3 rounded-full hover:scale-105 transition-transform">Get Premium Platinum</button>
        </div>
      </div>
    </div>
  );
}

export default Premimum;
