"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { SERVICES } from '@/constants';
import { apiService } from '@/services/apiService';
import { ServiceItem } from '@/types';
import { FaArrowRight, FaRocket, FaLaptopCode, FaMobileAlt, FaChartPie, FaPenNib, FaShoppingCart, FaCloud } from 'react-icons/fa';

const iconMap: Record<string, any> = {
  's1': FaLaptopCode,
  's2': FaMobileAlt,
  's3': FaChartPie,
  's4': FaPenNib,
  's5': FaShoppingCart,
  's6': FaCloud,
};

export default function ServicesPage() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await apiService.getServices();
        setServices(data.length > 0 ? data : SERVICES);
      } catch (err) {
        console.error("Failed to fetch services:", err);
        setServices(SERVICES);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <main className="min-h-screen bg-[#0a0c10] text-slate-200 overflow-hidden relative">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[120px]" />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

      <section className="relative z-10 pt-32 pb-24 px-6 max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-bold mb-6 backdrop-blur-md">
            <FaRocket className="animate-pulse" />
            <span>Empowering Your Vision</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-200 to-slate-500 mb-8 tracking-tighter">
            Digital Excellence <br className="hidden md:block" /> Reimagined
          </h1>
          <p className="max-w-3xl mx-auto text-slate-400 text-lg md:text-xl font-medium leading-relaxed">
            We blend cutting-edge technology with visionary design to build digital products
            that don't just work—they inspire.
          </p>
        </motion.div>

        {/* Services Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-80 bg-slate-900/50 rounded-3xl border border-white/5 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = iconMap[service.id] || FaLaptopCode;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="group relative"
                >
                  <Link href={`/services/${service.slug}`} className="block h-full">
                    <div className="h-full p-8 rounded-[2.5rem] bg-slate-900/40 border border-white/5 backdrop-blur-xl hover:border-blue-500/30 transition-all duration-500 overflow-hidden">
                      {/* Hover Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      <div className="relative z-10">
                        <div className="w-16 h-16 rounded-2xl bg-blue-600/10 flex items-center justify-center mb-8 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-lg shadow-blue-900/10">
                          {service.icon?.startsWith('fa') ? (
                            <i className={`${service.icon} text-3xl text-blue-500 group-hover:text-white transition-colors duration-500`}></i>
                          ) : (
                            <Icon className="text-3xl text-blue-500 group-hover:text-white transition-colors duration-500" />
                          )}
                        </div>

                        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors duration-300 tracking-tight">
                          {service.title}
                        </h3>

                        <p className="text-slate-400 font-medium leading-relaxed mb-8 group-hover:text-slate-300 transition-colors duration-300">
                          {service.description}
                        </p>

                        <div className="flex items-center gap-2 text-blue-500 font-bold group-hover:gap-4 transition-all duration-300">
                          <span>Explore More</span>
                          <FaArrowRight className="text-sm" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-32 p-12 rounded-[3.5rem] bg-gradient-to-r from-blue-600 to-indigo-700 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl -ml-32 -mb-32" />

          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tighter">
              Ready to build the future?
            </h2>
            <p className="text-white/80 text-lg font-medium mb-10 max-w-2xl mx-auto">
              Let's turn your ambitious ideas into reality with our premium digital solutions.
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-3 bg-white text-blue-600 px-8 py-4 rounded-full font-bold hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              Start Your Journey <FaArrowRight />
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
