"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { slugify } from "@/utils/slug";
import { FaCalendarCheck, FaClock, FaArrowRightLong, FaUserGroup, FaBolt } from "react-icons/fa6";
import { apiService } from "@/services/apiService";
import { UpcomingBatch } from "@/types";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, A11y, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const InteractiveBatchCard: React.FC<{
  batch: UpcomingBatch;
}> = ({ batch }) => {
  const cardRef = React.useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState(
    "perspective(1000px) rotateX(0deg) rotateY(0deg)"
  );
  const [shinePos, setShinePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // 3D Tilt Logic
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    setTransform(
      `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
    );

    // Direct shine position tracking
    setShinePos({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
  };

  const handleMouseLeave = () => {
    setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
    setIsHovered(false);
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "TBA";
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return dateStr;
      return new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }).format(date);
    } catch (e) {
      return dateStr;
    }
  };

  const seatsPercentage = Math.max(0, Math.min(100, ((20 - batch.seatsLeft) / 20) * 100));

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ transform }}
      className="group relative bg-white border border-slate-200 rounded-[3.5rem] p-10 transition-all duration-700 flex flex-col shadow-2xl shadow-slate-200/50 hover:shadow-xl hover:shadow-[#00548B]/10 overflow-hidden h-full"
    >
      {/* Cinematic Metallic Shine Overlay */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-20"
        style={{
          background: `radial-gradient(circle at ${shinePos.x}% ${shinePos.y}%, rgba(0,84,139,0.05) 0%, transparent 70%)`,
        }}
      />

      <div className="relative z-10 flex flex-col h-full">
        {/* Header Tags */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_8px_#10b981]" />
            </span>
            <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">
              {batch.status}
            </span>
          </div>
          <div className="bg-slate-100 px-4 py-1.5 rounded-full border border-slate-200 flex items-center gap-2">
            <FaBolt className="text-amber-500 text-[10px]" />
            <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest leading-none">High Demand</span>
          </div>
        </div>

        {/* Course Title */}
        <Link href={`/courses/${slugify(batch.courseTitle)}`} className="mb-10 block group/title no-underline">
          <h3 className="text-3xl md:text-2xl font-black text-slate-900 group-hover/title:text-[#00548B] transition-colors leading-[1] tracking-tight">
            {batch.courseTitle}
          </h3>
          <div className="h-1.5 w-0 group-hover/title:w-20 bg-[#00548B] shadow-[0_0_12px_#00548B] transition-all duration-700 mt-4 rounded-full" />
        </Link>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-10 mb-12">
          <div className="space-y-2">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.25em] block">Launch</span>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-[#00548B] border border-slate-200">
                <FaCalendarCheck className="text-sm" />
              </div>
              <span className="text-sm font-black text-slate-700">{formatDate(batch.startDate)}</span>
            </div>
          </div>
          <div className="space-y-2">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.25em] block">Schedule</span>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-[#00548B] border border-slate-200">
                <FaClock className="text-sm" />
              </div>
              <span className="text-sm font-black text-slate-700">{batch.time.split("-")[0]}</span>
            </div>
          </div>
        </div>

        {/* Capacity Tracking */}
        <div className="space-y-4 mb-12 mt-auto">
          <div className="flex justify-between items-end">
            <div className="flex items-center gap-2">
              <FaUserGroup className="text-slate-500 text-xs" />
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Cohort Capacity</span>
            </div>
            <span className="text-xs font-black text-[#00548B] animate-pulse">{batch.seatsLeft} Slots Available</span>
          </div>
          <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200 p-[2px]">
            <div
              className="h-full bg-gradient-to-r from-[#00548B] to-blue-500 transition-all duration-1000 ease-out rounded-full shadow-[0_0_15px_rgba(0,84,139,0.5)]"
              style={{ width: `${100 - seatsPercentage}%` }}
            />
          </div>
        </div>

        {/* Action Button */}
        <Link
          href={`/onlineform?course=${encodeURIComponent(batch.courseTitle)}&batch=${batch.id || (batch as any)._id}`}
          className="relative group/btn flex items-center justify-center gap-3 w-full bg-slate-900 py-6 rounded-[2rem] font-black text-[10px] tracking-[0.25em] uppercase overflow-hidden transition-all duration-500 shadow-xl active:scale-95 no-underline"
        >
          <span className="relative z-10 flex items-center gap-3 text-white group-hover/btn:text-white transition-colors duration-500">
            Secure Seat
            <FaArrowRightLong className="transition-transform duration-500 group-hover/btn:translate-x-3" />
          </span>
          <div className="absolute inset-0 bg-[#00548B] translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
        </Link>
      </div>
    </div>
  );
};

const UpcomingBatches = () => {
  const [batches, setBatches] = useState<UpcomingBatch[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        const batchData = await apiService.getBatches();
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const filteredBatches = (batchData || []).filter((batch: UpcomingBatch) => {
          if (!batch.startDate || batch.startDate === "TBA") return true;
          const batchDate = new Date(batch.startDate);
          if (isNaN(batchDate.getTime())) return true;
          return batchDate >= today;
        });
        setBatches(filteredBatches);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  return (
    <section id="upcoming-batches" className="py-32 px-6 relative overflow-hidden bg-white">
      {/* Dynamic Deep Architecture Grid */}
      <div className="absolute inset-x-0 top-0 h-[800px] pointer-events-none opacity-[0.03] architect-grid" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white via-[#00548B]/5 to-white" />

      {/* Atmospheric Cinematic Glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00548B]/5 blur-[150px] rounded-full" />
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-blue-600/5 blur-[120px] rounded-full" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-4 space-y-2">
          <div className="inline-flex items-center gap-3 bg-white px-6 py-2.5 rounded-full border border-slate-200 shadow-2xl group hover:scale-105 transition-all">
            <div className="flex -space-x-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-slate-100 overflow-hidden">
                  <img src={`https://i.pravatar.cc/100?img=${i + 15}`} alt="user" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 mb-4">
              600+ Engineers in Training
            </span>
          </div>

          <h2 className="text-3xl md:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-[0.85] max-w-5xl">
            Live Lab Batches
          </h2>
          <p className="text-slate-600 font-medium text-xl md:text-2xl max-w-3xl leading-relaxed">
            Choose your specialization and secure your seat in our next intensive live cohort. <span className="text-slate-900">Limited capacity</span> per batch for elite-tier guidance.
          </p>
        </div>

        {/* Content Container */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={`skeleton-${i}`} className="h-[550px] bg-slate-50 rounded-[3.5rem] border border-slate-100 animate-pulse" />
            ))}
          </div>
        ) : batches.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-[4rem] p-24 text-center shadow-2xl shadow-slate-200/50">
            <div className="w-24 h-24 bg-[#00548B]/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-[#00548B]/20">
              <FaCalendarCheck className="text-4xl text-[#00548B]" />
            </div>
            <h3 className="text-3xl font-black text-slate-900 mb-4">Curating New Batches</h3>
            <p className="text-slate-600 font-medium max-w-md mx-auto">We are currently optimizing our curriculum for the next cycle. Pre-register for immediate priority updates.</p>
          </div>
        ) : (
          <>
            {/* === MOBILE: Swiper === */}
            <div className="lg:hidden">
              <Swiper
                modules={[Autoplay, Pagination, A11y, Keyboard]}
                slidesPerView={1}
                spaceBetween={24}
                breakpoints={{
                  768: { slidesPerView: 2 }
                }}
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                className="!pb-16"
              >
                {batches.map((batch) => (
                  <SwiperSlide key={batch.id || (batch as any)._id} className="h-full">
                    <InteractiveBatchCard batch={batch} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* === DESKTOP: Grid === */}
            <div className="hidden lg:grid grid-cols-3 gap-10 p-4">
              {batches.map((batch) => (
                <InteractiveBatchCard
                  key={batch.id || (batch as any)._id}
                  batch={batch}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default UpcomingBatches;