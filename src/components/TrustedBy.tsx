"use client";
import React, { useEffect, useState } from "react";
import { Partner } from "@/types";
// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, A11y } from "swiper/modules";
import "swiper/css";

// Optional: If you already had apiService, keep it:
import { apiService } from "@/services/apiService";

// Local fallback (used if API returns nothing)
const FALLBACK_PARTNERS: Partner[] = [
  // Replace with your own brand assets if you want
  { id: "p1", name: "Partner One", logoUrl: "https://sangalotech.com/wp-content/uploads/2025/02/1.png" },
  { id: "p2", name: "Partner Two", logoUrl: "https://sangalotech.com/wp-content/uploads/2025/02/2.png" },
  { id: "p3", name: "Partner Three", logoUrl: "https://sangalotech.com/wp-content/uploads/2025/02/3.png" },
  { id: "p4", name: "Partner Four", logoUrl: "https://sangalotech.com/wp-content/uploads/2025/02/4.png" },
  { id: "p5", name: "Partner Five", logoUrl: "https://sangalotech.com/wp-content/uploads/2025/02/5.png" },
  { id: "p6", name: "Partner Six", logoUrl: "https://sangalotech.com/wp-content/uploads/2025/02/6.png" },
  { id: "p7", name: "Partner Seven", logoUrl: "https://sangalotech.com/wp-content/uploads/2025/02/7.png" },
  { id: "p8", name: "Partner Eight", logoUrl: "https://sangalotech.com/wp-content/uploads/2025/02/8.png" },
];

const TrustedBy = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const data = await apiService.getPartners();
        setPartners((data && data.length > 0 ? data : FALLBACK_PARTNERS) as Partner[]);
      } catch (err) {
        setPartners(FALLBACK_PARTNERS);
      } finally {
        setLoading(false);
      }
    };
    fetchPartners();
  }, []);

  if (loading || partners.length === 0) return null;

  return (
    <section className="py-24 bg-white overflow-hidden border-t border-slate-100 relative">
      {/* Premium Architectural Grid Background */}
      <div className="absolute inset-x-0 top-0 h-full pointer-events-none opacity-[0.03] architect-grid" />

      <div className="max-w-[1400px] mx-auto px-6 mb-5 text-center space-y-4 relative z-10">
        <div className="inline-flex items-center gap-3 bg-slate-50 text-slate-500 px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-[0.2em] border border-slate-100 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00548B] shadow-[0_0_8px_#00548B]" /> Strategic Alliances
        </div>
        <h3 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight leading-none">
          Trusted by <span className="text-[#00548B]">Industry Architects.</span>
        </h3>
        <p className="text-slate-400 font-medium text-sm md:text-base max-w-2xl mx-auto italic">
          Empowering organizations across the nation through disruptive technological solutions.
        </p>
      </div>

      <div className="relative z-10">
        {/* Superior Fading Edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 md:w-64 bg-gradient-to-r from-white via-white/80 to-transparent z-20" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 md:w-64 bg-gradient-to-l from-white via-white/80 to-transparent z-20" />

        <Swiper
          modules={[Autoplay, A11y]}
          loop
          speed={5000}
          autoplay={{ delay: 0, disableOnInteraction: false }}
          slidesPerView={2}
          spaceBetween={40}
          breakpoints={{
            640: { slidesPerView: 3, spaceBetween: 60 },
            1024: { slidesPerView: 5, spaceBetween: 80 },
            1440: { slidesPerView: 6, spaceBetween: 100 },
          }}
          className="!px-10 py-8"
        >
          {[...partners, ...partners].map((partner, i) => (
            <SwiperSlide key={`${partner.id}-${i}`} className="!w-auto flex items-center justify-center">
              <div className="h-12 md:h-16 w-auto flex items-center justify-center filter grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all duration-700 cursor-pointer group">
                <img
                  src={partner.logoUrl}
                  alt={partner.name}
                  title={partner.name}
                  className="h-8 md:h-10 w-auto object-contain group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TrustedBy;