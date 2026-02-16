"use client";
import React, { useEffect, useRef, useState } from "react";
import { Testimonial } from "@/types";
import { apiService } from "@/services/apiService";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// ✅ Fallback testimonials if API returns empty
const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Aarav Shrestha",
    course: "MERN Stack",
    quote:
      "Hands-on labs and mentor code reviews helped me bridge theory to production. Landed a junior dev role within a month.",
    placement: "Junior Developer @Local Startup",
    image: "https://i.pravatar.cc/150?u=aarav",
    // @ts-ignore
    rating: 5,
  },
  {
    id: "t2",
    name: "Prerana Karki",
    course: "UI/UX Design",
    quote:
      "From wireframes to dev-ready handoffs, the process was industry-aligned. My portfolio finally clicked for recruiters.",
    placement: "Product Designer (Internship) @Design Studio",
    image: "https://i.pravatar.cc/150?u=prerana",
    // @ts-ignore
    rating: 5,
  },
  {
    id: "t3",
    name: "Suman Rai",
    course: "Digital Marketing",
    quote:
      "Live campaigns and analytics reviews were the best part. I now run performance ads for three clients.",
    placement: "Performance Marketer @Freelance",
    image: "https://i.pravatar.cc/150?u=suman",
    // @ts-ignore
    rating: 4.5,
  },
  {
    id: "t4",
    name: "Nisha Adhikari",
    course: "Robotics & IoT",
    quote:
      "Hardware + firmware + dashboards in one track. The lab access made it truly practical.",
    placement: "Embedded Intern @Electronics Co.",
    image: "https://i.pravatar.cc/150?u=nisha",
    // @ts-ignore
    rating: 5,
  },
  {
    id: "t5",
    name: "Bibek Thapa",
    course: "Web Design",
    quote:
      "Tight feedback loops and real client briefs. I started freelancing with confidence.",
    placement: "Frontend Freelancer",
    image: "https://i.pravatar.cc/150?u=bibek",
    // @ts-ignore
    rating: 4.5,
  },
  {
    id: "t6",
    name: "Saraswati Maharjan",
    course: "Data Science",
    quote:
      "Projects were grounded in real datasets. Interview prep support was a big plus.",
    placement: "Data Analyst Trainee @Finance Firm",
    image: "https://i.pravatar.cc/150?u=saraswati",
    // @ts-ignore
    rating: 5,
  },
];

import { FaStar, FaStarHalfStroke, FaQuoteRight, FaBriefcase, FaChevronLeft, FaChevronRight, FaQuoteLeft } from 'react-icons/fa6';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      setLoading(true);
      setError(false);
      try {
        const data = await apiService.getTestimonials();
        setTestimonials(
          ((data && data.length > 0 ? data : DEFAULT_TESTIMONIALS) as Testimonial[])
        );
      } catch (e) {
        console.error("Testimonial Fetch Error:", e);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  const renderStars = (rating = 5) => {
    const stars = [];
    const full = Math.floor(rating);
    const half = rating % 1 !== 0;
    for (let i = 1; i <= 5; i++) {
      if (i <= full) {
        stars.push(<FaStar key={i} className="text-xs text-yellow-500" />);
      } else if (i === full + 1 && half) {
        stars.push(<FaStarHalfStroke key={i} className="text-xs text-yellow-500" />);
      } else {
        stars.push(<FaStar key={i} className="text-xs text-slate-200" />);
      }
    }
    return stars;
  };

  return (
    <section
      id="testimonials"
      className="py-32 px-6 relative overflow-hidden bg-white"
    >
      {/* Premium Architectural Grid Background */}
      <div className="absolute inset-x-0 bottom-0 h-[800px] pointer-events-none opacity-[0.05] architect-grid" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#f8fbff] via-white to-white" />

      {/* Atmospheric Accents */}
      <div className="absolute top-[20%] right-0 w-[500px] h-[500px] bg-[#00548B]/5 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 left-0 -translate-x-1/2 w-[600px] h-[600px] bg-blue-50/50 blur-[100px] rounded-full" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="flex flex-col items-center text-center space-y-8 mb-24">
          <div className="inline-flex items-center gap-3 bg-slate-50 text-slate-500 px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-slate-100">
            <FaQuoteLeft className="text-[#00548B] shadow-[0_0_8px_#00548B]" /> Institutional Merit
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[0.85] max-w-5xl">
            Success by 
            <span className="text-[#00548B]">Architectural</span> Design.
          </h2>
          <p className="text-slate-500 font-medium text-xl md:text-2xl max-w-3xl leading-relaxed">
            Discover how our graduates are building elite careers using fundamental <span className="text-slate-900 font-black">engineering blueprints</span> mastered in our labs.
          </p>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-96 bg-white rounded-[3rem] animate-pulse shadow-sm border border-slate-100"></div>
            ))}
          </div>
        ) : (
          <div className="relative">
            <div className="absolute -top-14 right-0 flex items-center gap-2 z-20">
              <button
                ref={prevRef}
                className="h-12 w-12 rounded-2xl bg-white border border-slate-100 text-slate-400 hover:text-[#00548B] hover:shadow-xl transition-all flex items-center justify-center shadow-sm active:scale-90"
              >
                <FaChevronLeft className="text-sm" />
              </button>
              <button
                ref={nextRef}
                className="h-12 w-12 rounded-2xl bg-white border border-slate-100 text-slate-400 hover:text-[#00548B] hover:shadow-xl transition-all flex items-center justify-center shadow-sm active:scale-90"
              >
                <FaChevronRight className="text-sm" />
              </button>
            </div>

            <Swiper
              modules={[Autoplay, Pagination, Navigation, A11y]}
              autoplay={{ delay: 6000, disableOnInteraction: false }}
              loop
              speed={800}
              spaceBetween={32}
              slidesPerView={1}
              breakpoints={{
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              pagination={{ clickable: true }}
              navigation={{
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              }}
              onBeforeInit={(swiper) => {
                // @ts-ignore
                swiper.params.navigation.prevEl = prevRef.current;
                // @ts-ignore
                swiper.params.navigation.nextEl = nextRef.current;
              }}
              className="!pb-20"
            >
              {testimonials.map((testimonial) => {
                const displayImg =
                  (testimonial as any).imageUrl ||
                  (testimonial as any).image ||
                  `https://i.pravatar.cc/150?u=${testimonial.name}`;
                const rating = Number((testimonial as any).rating ?? 5);

                return (
                  <SwiperSlide key={testimonial.id || (testimonial as any)._id}>
                    <div className="relative group h-full">
                      {/* Visual Stack Layers */}
                      <div className="absolute inset-4 bg-slate-50 rounded-[3.5rem] rotate-2 scale-[1.02] transition-all duration-700 group-hover:rotate-6" />

                      <div className="relative bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-[0_48px_96px_-48px_rgba(0,84,139,0.12)] flex flex-col h-full transition-all duration-700 group-hover:-translate-y-3 group-hover:shadow-[0_64px_128px_-48px_rgba(0,84,139,0.18)]">
                        <div className="absolute top-10 right-10 text-7xl text-slate-50 group-hover:text-[#00548B]/5 transition-colors">
                          <FaQuoteRight />
                        </div>

                        <div className="flex-grow space-y-8">
                          <div className="flex items-center gap-1.5 bg-slate-50 w-fit px-3 py-1.5 rounded-full border border-slate-100/50 shadow-inner">
                            {renderStars(rating)}
                          </div>
                          <p className="text-slate-600 text-lg font-medium leading-relaxed italic relative z-10">
                            “{testimonial.quote}”
                          </p>
                        </div>

                        <div className="mt-12 pt-8 border-t border-slate-50 flex items-center gap-6">
                          <div className="w-16 h-16 rounded-2xl p-1 bg-white border border-slate-100 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-700 shadow-sm">
                            <img
                              src={displayImg}
                              alt={testimonial.name}
                              className="w-full h-full rounded-[1.1rem] object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-black text-slate-900 text-lg leading-none mb-2 tracking-tight">
                              {testimonial.name}
                            </h4>
                            <p className="text-[#00548B] text-[9px] font-black uppercase tracking-[0.2em] mb-1.5 flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#00548B] shadow-[0_0_8px_#00548B]"></span>
                              {testimonial.course}
                            </p>
                            {testimonial.placement && (
                              <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-bold tracking-tight">
                                <FaBriefcase className="text-slate-300" /> {testimonial.placement}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
