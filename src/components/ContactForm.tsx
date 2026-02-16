'use client';
import React, { useState } from 'react';
import { apiService } from '@/services/apiService';
import { FaEnvelopeOpenText, FaLocationDot, FaPaperPlane, FaHeadset } from 'react-icons/fa6';

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<{ type: 'idle' | 'loading' | 'success' | 'error'; message?: string }>({ type: 'idle' });
  const [siteSettings, setSiteSettings] = useState<any>(null);

  React.useEffect(() => {
    const fetchSettings = async () => {
      const data = await apiService.getSiteSettings();
      if (data) setSiteSettings(data);
    };
    fetchSettings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: 'loading' });
    const response = await apiService.submitContact(formData);
    if (response) {
      setStatus({ type: 'success', message: 'Thank you! We have received your message.' });
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus({ type: 'idle' }), 5000);
    } else {
      setStatus({ type: 'error', message: 'Something went wrong. Please try again.' });
    }
  };

  return (
    <section id="contact" className="py-32 px-6 relative overflow-hidden bg-white">
      {/* Premium Architectural Grid Background */}
      <div className="absolute inset-x-0 top-0 h-[800px] pointer-events-none opacity-[0.05] architect-grid" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#f8fbff] via-white to-white" />

      {/* Atmospheric Cinematic Accents */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-[#00548B]/5 blur-[120px] rounded-full" />

      <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-24 relative z-10">
        <div className="space-y-12">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-3 bg-white text-slate-500 px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-slate-100 shadow-sm">
              <FaHeadset className="text-[#00548B] shadow-[0_0_8px_#00548B]" /> Architecture Support
            </div>
            <h2 className="text-3xl md:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-[0.85]">
              Architecting Your
              <span className="text-[#00548B]">Future</span> Scale.
            </h2>
            <p className="text-slate-500 font-medium text-xl md:text-2xl max-w-lg leading-relaxed">
              Whether you're seeking elite certification or technical infrastructure solutions, our architects are ready to <span className="text-slate-900 font-black">engineer</span> your path.
            </p>
          </div>

          <div className="grid gap-8">
            {[
              { icon: <FaEnvelopeOpenText />, title: "Intelligence HQ", detail: siteSettings?.email || "support@sangalotech.com" },
              { icon: <FaLocationDot />, title: "Technical Lab", detail: siteSettings?.address || "Lokenthali, Bhaktapur, Nepal" }
            ].map((item, idx) => (
              <div key={idx} className="group relative">
                {/* Visual Stack Layers */}
                <div className="absolute inset-0 bg-slate-50 rounded-[2.5rem] rotate-1 translate-y-2 scale-[0.98] transition-all duration-700 group-hover:rotate-2" />
                <div className="relative flex items-center gap-8 p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-[0_32px_64px_-32px_rgba(0,0,0,0.04)] transition-all duration-700 group-hover:-translate-y-2">
                  <div className="w-16 h-16 bg-slate-50 text-[#00548B] rounded-2xl flex items-center justify-center text-2xl shadow-inner group-hover:bg-slate-900 group-hover:text-white transition-all duration-500">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 text-[10px] uppercase tracking-[0.25em] mb-2">{item.title}</h4>
                    <p className="text-slate-500 font-bold text-lg">{item.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative group">
          {/* Visual Stack Layers for Form */}
          <div className="absolute inset-8 bg-slate-50 rounded-[4rem] rotate-2 scale-[1.02] transition-all duration-700 group-hover:rotate-6 shadow-inner" />

          <div className="relative bg-white p-10 md:p-16 rounded-[4rem] border border-slate-100 shadow-[0_96px_128px_-48px_rgba(0,84,139,0.12)]">
            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="grid md:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00548B] shadow-[0_0_8px_#00548B]"></span> Engineer Identity
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-8 py-6 outline-none focus:bg-white focus:ring-4 focus:ring-[#00548B]/5 transition-all font-bold text-slate-900 placeholder:text-slate-300"
                    placeholder="Full Name"
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00548B] shadow-[0_0_8px_#00548B]"></span> Communication Port
                  </label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-8 py-6 outline-none focus:bg-white focus:ring-4 focus:ring-[#00548B]/5 transition-all font-bold text-slate-900 placeholder:text-slate-300"
                    placeholder="Email Address"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00548B] shadow-[0_0_8px_#00548B]"></span> Specification Brief
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-8 py-6 outline-none focus:bg-white focus:ring-4 focus:ring-[#00548B]/5 transition-all font-bold text-slate-900 placeholder:text-slate-300 resize-none"
                  placeholder="Describe your technical inquiry..."
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={status.type === 'loading'}
                className="w-full bg-slate-950 text-white font-black py-7 rounded-[2rem] hover:bg-[#00548B] transition-all shadow-[0_32px_64px_-16px_rgba(0,84,139,0.4)] active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-4 text-[10px] uppercase tracking-[0.3em]"
              >
                {status.type === 'loading' ? 'Transmitting Data...' : (
                  <>Establish Connection <FaPaperPlane className="text-xs" /></>
                )}
              </button>
              {status.type === 'success' && (
                <div className="text-center p-6 bg-emerald-50 text-emerald-600 rounded-2xl font-black text-xs uppercase tracking-widest border border-emerald-100 animate-in fade-in slide-in-from-bottom-4">
                  {status.message}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
