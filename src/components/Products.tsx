"use client";
import React, { useState, useEffect } from 'react';
import { apiService } from '@/services/apiService';
import { Product } from '@/types';
import { PRODUCTS } from '@/constants';
import { FaArrowUpRightFromSquare, FaLayerGroup, FaWhatsapp, FaCircleInfo } from 'react-icons/fa6';

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeTab, setActiveTab] = useState('');
  const [loading, setLoading] = useState(true);

  const [siteSettings, setSiteSettings] = useState<any>(null);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const [data, settings] = await Promise.all([
          apiService.getProducts(),
          apiService.getSiteSettings()
        ]);
        const finalData = data.length > 0 ? data : PRODUCTS;
        setProducts(finalData);
        if (settings) setSiteSettings(settings);
        if (finalData.length > 0) setActiveTab(finalData[0].id);
      } catch (e) {
        setProducts(PRODUCTS);
        setActiveTab(PRODUCTS[0].id);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const activeProduct = products.find(p => p.id === activeTab) || products[0];

  const extraLinks: Record<string, { label: string; href: string; color?: string }[]> = {
    news_portal: [
      { label: 'Live Demo', href: 'https://newsportal-brown.vercel.app/', color: 'text-[#00548B]' },
    ],
    school_mgmt: [
      { label: 'Live Demo', href: 'https://sms-lake-three.vercel.app/', color: 'text-emerald-600' },
    ],
    clinic_mgmt: [
      { label: 'Live Demo', href: 'https://cqms.vercel.app/', color: 'text-rose-600' },
    ],
  };

  const titleFallbackMap: Record<string, string> = {
    'News Portal': 'news_portal',
    'School Management System': 'school_mgmt',
    'Clinic Management System': 'clinic_mgmt',
  };

  const keyForActive = activeProduct?.id ?? titleFallbackMap[activeProduct?.title ?? ''] ?? '';
  const linksForActive = extraLinks[keyForActive] ?? [];

  const buildDemoUrl = (p: Product) => {
    const phone = siteSettings?.whatsapp || '9851228383';
    const msg = `Hello! I would like to request a demo for "${p.title}". Please share details and available time slots.`;
    return `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
  };

  if (loading || products.length === 0) {
    return (
      <section id="products" className="py-32 bg-[#eef3f7] px-6">
        <div className="max-w-[1400px] mx-auto h-[400px] flex items-center justify-center">
          <div className="animate-pulse flex flex-col items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-2xl" />
            <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Loading Ecosystem...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="products" className="py-32 px-6 relative overflow-hidden bg-white">
      {/* Premium Architectural Grid Background */}
      <div className="absolute inset-x-0 top-0 h-[800px] pointer-events-none opacity-[0.05] architect-grid" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#f8fbff] via-white to-white" />

      {/* Atmospheric Cinematic Glows */}
      <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00548B]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1400px] mx-auto relative z-10 space-y-20">
        <div className="flex flex-col items-center text-center space-y-8">
          <div className="inline-flex items-center gap-3 bg-slate-50 text-slate-500 px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-slate-100 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00548B] shadow-[0_0_8px_#00548B]" /> Product Ecosystem
          </div>
          <h2 className="text-3xl md:text-3xl font-black text-slate-900 tracking-tight leading-[0.85] max-w-4xl">
            Enterprise
            <span className="text-[#00548B]"> Grade</span> Solutions.
          </h2>
          <p className="text-slate-500 font-medium text-xl md:text-2xl max-w-2xl leading-relaxed">
            Ready-to-deploy software architectures for modern businesses, education centers, and healthcare providers.
          </p>
        </div>

        {/* Tabs: Premium Architectural Style */}
        <div className="flex flex-wrap justify-center gap-4 bg-slate-50/50 p-2 rounded-[2.5rem] border border-slate-100 backdrop-blur-sm max-w-fit mx-auto">
          {products.map(p => (
            <button
              key={p.id}
              onClick={() => setActiveTab(p.id)}
              className={`px-8 py-4 rounded-[2rem] font-black text-[10px] uppercase tracking-[0.2em] transition-all duration-500
                ${activeTab === p.id
                  ? 'bg-slate-900 text-white shadow-xl shadow-black/20 scale-105'
                  : 'bg-transparent text-slate-400 hover:text-slate-900 hover:bg-white/50'}`}
            >
              {p.title}
            </button>
          ))}
        </div>

        {/* Active Product: Architectural Showcase */}
        <div className="relative group max-w-[1200px] mx-auto">
          {/* Depth Layers */}
          <div className="absolute inset-x-10 -bottom-6 h-full bg-[#00548B]/5 rounded-[4rem] -rotate-1 z-0" />

          <div className="relative z-10 bg-white rounded-[4rem] shadow-[0_48px_128px_-32px_rgba(0,0,0,0.12)] border border-slate-100 overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-12 items-center p-8 md:p-16">
              <div className="space-y-10 order-2 lg:order-1" key={activeProduct.id}>
                <div className="space-y-6">
                  <div className="inline-block px-4 py-1.5 rounded-lg bg-blue-50 text-[#00548B] text-[9px] font-black uppercase tracking-widest border border-blue-100">
                    System Architecture {activeProduct.id.replace(/_/g, '.').toUpperCase()}
                  </div>
                  <h3 className="text-3xl md:text-3xl font-black text-slate-900 tracking-tight leading-tight">
                    {activeProduct.title}
                  </h3>
                  <div
                    className="text-lg text-slate-500 font-medium leading-relaxed prose prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ __html: activeProduct.description }}
                  />
                </div>

                <div className="flex flex-wrap gap-4">
                  <a
                    href={activeProduct.link}
                    className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-[#00548B] transition-all shadow-xl shadow-slate-900/10 active:scale-95 flex items-center gap-3"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Specs
                  </a>

                  <a
                    href={buildDemoUrl(activeProduct)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#00548B] text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-900 transition-all shadow-xl shadow-blue-900/20 active:scale-95 flex items-center gap-3"
                  >
                    <FaWhatsapp className="text-lg text-green-400" /> WhatsApp Demo
                  </a>
                </div>

                {linksForActive.length > 0 && (
                  <div className="pt-8 border-t border-slate-50 flex flex-col gap-4">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">
                      Live Infrastructure:
                    </span>
                    <div className="flex flex-wrap gap-3">
                      {linksForActive.map((lnk, idx) => (
                        <a
                          key={idx}
                          href={lnk.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`${lnk.color} bg-slate-50 px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white border border-slate-100 shadow-sm transition-all flex items-center gap-2 group/link`}
                        >
                          {lnk.label}
                          <FaArrowUpRightFromSquare className="text-[10px] group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="order-1 lg:order-2 relative group-hover:scale-[1.01] transition-transform duration-1000">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#00548B]/10 to-transparent rounded-[3rem] -rotate-2 translate-x-3 translate-y-3 -z-10" />
                <div className="rounded-[3rem] overflow-hidden border-[1px] border-slate-100 shadow-2xl bg-slate-50">
                  <img
                    src={activeProduct.image}
                    alt={activeProduct.title}
                    className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                  />
                  {/* Glass Overlay for depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;