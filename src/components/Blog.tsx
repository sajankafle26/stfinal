"use client";
import React, { useState, useEffect, useRef } from "react";
// Types & data
import { Blog as BlogType } from "@/types";
import { apiService } from "@/services/apiService";
import { BLOGS as STATIC_BLOGS } from "@/constants";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, A11y, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { FaArrowRight, FaCalendarDays, FaBookOpen } from 'react-icons/fa6';

const Blog = () => {
  const [blogs, setBlogs] = useState<BlogType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      setError(false);
      try {
        const data = await apiService.getBlogs();
        const source = data && data.length > 0 ? data : STATIC_BLOGS;
        const normalized: BlogType[] = source.map((blog: any) => ({
          id: blog.id,
          title: blog.title,
          image: blog.image,
          date: blog.date,
          excerpt: blog.excerpt,
          link: blog.link ?? (blog.slug ? `/blog/${blog.slug}` : `/blog/${blog.id}`),
        }));
        setBlogs(normalized);
      } catch (err) {
        setBlogs(STATIC_BLOGS.map((blog: any) => ({ ...blog, link: `/blog/${blog.id}` })));
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <section id="blog" className="py-32 px-6 relative overflow-hidden bg-slate-950">
      {/* Dynamic Deep Architecture Grid */}
      <div className="absolute inset-x-0 bottom-0 h-[800px] pointer-events-none opacity-[0.05] architect-grid" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-slate-950 via-[#00548B]/20 to-slate-950" />

      {/* Atmospheric Cinematic Glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00548B]/10 blur-[150px] rounded-full" />
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-blue-600/5 blur-[120px] rounded-full" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-end gap-12 mb-24">
          <div className="space-y-8 max-w-3xl text-center lg:text-left mx-auto lg:mx-0">
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md text-white px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00548B] animate-pulse shadow-[0_0_8px_#00548B]" />
              Engineering Insights
            </div>
            <h2 className="text-3xl md:text-3xl lg:text-4xl font-black text-white tracking-tight leading-[0.85]">
              The Tech  
              <span className="text-[#00548B]"> Intel</span> Journal.
            </h2>
            <p className="text-slate-400 font-medium text-xl md:text-2xl leading-relaxed">
              Explore the frontiers of software architecture, industry shifts, and deep technical walkthroughs from our <span className="text-white">core engineering labs</span>.
            </p>
          </div>
          <a
            href="/blog"
            className="hidden lg:flex items-center gap-3 bg-white text-slate-950 px-10 py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl hover:bg-[#00548B] hover:text-white transition-all active:scale-95 no-underline"
          >
            Explore Journal <FaArrowRight />
          </a>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-[18rem] bg-white rounded-[3rem] animate-pulse shadow-sm border border-slate-100"></div>
            ))}
          </div>
        ) : (
          <Swiper
            modules={[Autoplay, Pagination, Navigation, A11y, Keyboard]}
            autoplay={{ delay: 6000, disableOnInteraction: false }}
            slidesPerView={1}
            spaceBetween={32}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            pagination={{ clickable: true }}
            className="!pb-20"
          >
            {blogs.map((blog) => (
              <SwiperSlide key={blog.id} className="h-auto">
                <a href={blog.link} className="group block focus:outline-none h-full no-underline">
                  <div className="relative group h-full">
                    {/* Visual Stack Layers */}
                    <div className="absolute inset-4 bg-slate-800/50 rounded-[3.5rem] rotate-2 scale-[1.02] transition-all duration-700 group-hover:rotate-6" />

                    <div className="relative bg-white border border-white/10 rounded-[3.5rem] overflow-hidden transition-all duration-700 group-hover:-translate-y-4 shadow-[0_64px_128px_-32px_rgba(0,0,0,0.5)] flex flex-col h-full">
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <img
                          src={blog.image}
                          alt={blog.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                        />
                        <div className="absolute top-6 left-6">
                          <div className="bg-slate-950/80 backdrop-blur-md text-white text-[8px] font-black uppercase tracking-[0.2em] px-5 py-2.5 rounded-full border border-white/10">
                            Theoretical Deep-Dive
                          </div>
                        </div>
                      </div>

                      <div className="p-10 flex flex-col flex-grow space-y-2">
                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.25em] text-[#00548B]">
                          <FaCalendarDays className="opacity-50" /> {blog.date}
                        </div>

                        <h3 className=" font-black text-slate-900 leading-tight group-hover:text-[#00548B] transition-colors line-clamp-2 tracking-tight">
                          {blog.title}
                        </h3>

                        <p className="text-slate-500 font-medium text-sm leading-relaxed line-clamp-3">
                          {blog.excerpt}
                        </p>

                        <div className="mt-auto pt-6 flex items-center gap-3 text-slate-900 text-[10px] font-black uppercase tracking-[0.25em] group-hover:text-[#00548B] group-hover:translate-x-3 transition-all duration-500">
                          Analyze Thesis <FaArrowRight />
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
};

export default Blog;
