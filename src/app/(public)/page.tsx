"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaInstagram, FaLinkedin, FaChevronRight, FaChevronDown, FaCheck, FaBars } from "react-icons/fa";
import { MdEmail, MdGroups, MdAutoMode, MdFlashOn, MdQuestionAnswer, MdVerifiedUser } from "react-icons/md";

export default function Home() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const features = [
    {
      title: "Bio-Sync",
      description: "Seamlessly integrates with Oura, Apple Health, and Google Fit to monitor your recovery.",
      icon: <MdFlashOn className="text-3xl text-accent" />,
      tag: "Real-time"
    },
    {
      title: "Context AI",
      description: "Knows your upcoming meetings and local weather to predict energy dips before they hit.",
      icon: <MdAutoMode className="text-3xl text-amber" />,
      tag: "Predictive"
    },
    {
      title: "Smart Intercept",
      description: "Suggests high-performance fuel swaps when you're near a restaurant or approaching mealtime.",
      icon: <MdGroups className="text-3xl text-accent" />,
      tag: "Intervention"
    }
  ];

  const faqs = [
    {
      q: "How does Nourish connect with my health data?",
      a: "We use secure API integrations with Apple HealthKit, Google Fit, and Oura Cloud. Your data is encrypted and used only to calibrate our predictive model."
    },
    {
      q: "Does it work with any restaurant?",
      a: "Yes. Our computer vision engine can analyze any physical menu or digital list, cross-referencing it with your biological needs in real-time."
    },
    {
      q: "Is there a monthly subscription?",
      a: "Nourish offers a tiered membership. Our 'Performance' tier provides full AI interceptions and AR overlays for a flat monthly fee."
    }
  ];

  const memberships = [
    {
      name: "Core",
      price: "$0",
      features: ["Manual Data Import", "Daily Summary", "Basic AI Nutrition Advice"],
      isPopular: false
    },
    {
      name: "Performance",
      price: "$19",
      features: ["Full Wearable Sync", "Context-Aware Interceptions", "AR Menu Overlay", "Priority Support"],
      isPopular: true
    },
    {
      name: "Elite",
      price: "$49",
      features: ["Blood Marker Integration", "1-on-1 AI Performance Coach", "Family Sharing", "Alpha Hardware Access"],
      isPopular: false
    }
  ];

  return (
    <div className="min-h-screen bg-brand-cream text-black selection:bg-brand-green selection:text-white overflow-x-hidden relative">
      <div className="glow-border" />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-[60] px-4 sm:px-8 py-5 transition-smooth">
        <div className="max-w-7xl mx-auto flex items-center justify-between glass px-6 py-3 rounded-2xl sm:rounded-full shadow-premium relative">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-brand-green rounded-xl flex items-center justify-center font-bold text-white text-2xl transition-smooth group-hover:rotate-12 group-hover:scale-110 shadow-green">N</div>
            <span className="font-extrabold text-xl sm:text-2xl tracking-tighter text-black">Nourish</span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-sm font-bold opacity-60 hover:opacity-100 transition-smooth text-black">Features</Link>
            <Link href="#pricing" className="text-sm font-bold opacity-60 hover:opacity-100 transition-smooth text-black">Pricing</Link>
            <Link href="#faq" className="text-sm font-bold opacity-60 hover:opacity-100 transition-smooth text-black">FAQ</Link>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <Link
              href="/auth/login"
              className="hidden sm:inline-block px-8 py-3 bg-black text-white rounded-full text-sm font-bold hover:bg-brand-green transition-smooth shadow-premium"
            >
              Login
            </Link>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-black opacity-60 hover:opacity-100 transition-smooth"
            >
              <FaBars className="text-xl" />
            </button>
          </div>

          {/* Mobile Menu Dropdown */}
          {mobileMenuOpen && (
            <div className="absolute top-full left-0 w-full mt-2 glass rounded-2xl p-6 shadow-premium md:hidden animate-in fade-in slide-in-from-top-2">
              <div className="flex flex-col gap-4">
                <Link href="#features" onClick={() => setMobileMenuOpen(false)} className="text-lg font-bold text-black">Features</Link>
                <Link href="#pricing" onClick={() => setMobileMenuOpen(false)} className="text-lg font-bold text-black">Pricing</Link>
                <Link href="#faq" onClick={() => setMobileMenuOpen(false)} className="text-lg font-bold text-black">FAQ</Link>
                <hr className="border-black/10" />
                <Link href="/auth/login" onClick={() => setMobileMenuOpen(false)} className="py-4 bg-black text-white text-center rounded-xl font-bold">Login</Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      <main>
        {/* Section 1: Hero */}
        <section className="relative pt-40 pb-24 px-6 overflow-hidden flex flex-col items-center text-center">
          <div
            className="relative z-20 max-w-5xl animate-entrance-delay-300"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2 mb-8 bg-brand-green/5 rounded-full border border-brand-green/10">
              <span className="flex w-2 h-2 rounded-full bg-brand-green animate-pulse" />
              <span className="text-brand-green text-[10px] sm:text-xs font-black tracking-widest uppercase">Biology-Integrated Intelligence</span>
            </div>
            
            <h1 className="font-extrabold text-[2.5rem] sm:text-[4.5rem] md:text-[6.5rem] leading-[0.95] tracking-tighter mb-8 text-balance text-black">
              The Last Nutrition <br />
              <span className="text-brand-green">App You&apos;ll Ever Log.</span>
            </h1>

            <p className="max-w-3xl mx-auto text-lg sm:text-2xl font-semibold opacity-70 mb-12 leading-snug text-black">
              Nourish isn&apos;t a diary. It&apos;s a <span className="text-black underline underline-offset-4 decoration-brand-amber">predictive system</span> that synchronizes your glucose, recovery, and schedule to guide your very next bite.
            </p>


          </div>

          {/* Interactive Mockup Container */}
          <div className="relative w-full max-w-6xl mx-auto px-4 animate-entrance-delay-500">
             <div className="relative glass rounded-[2.5rem] sm:rounded-[3.5rem] p-2 sm:p-6 shadow-premium border border-white">
                <div className="aspect-[16/10] sm:aspect-[16/9] w-full bg-black rounded-[2rem] sm:rounded-[3rem] relative overflow-hidden flex flex-col items-center justify-center shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-black via-black to-brand-green/10" />
                    
                    {/* Simplified UI Mockup */}
                    <div className="relative z-10 w-full px-6 sm:px-12 flex justify-between items-center mb-8 sm:mb-16">
                        <div className="text-left">
                            <span className="text-[8px] sm:text-[10px] font-bold text-brand-green tracking-[0.2em] uppercase">Daily Fuel Status</span>
                            <div className="text-2xl sm:text-5xl font-black text-white tracking-tighter">Optimal Mode</div>
                        </div>
                        <div className="hidden sm:flex items-center gap-4">
                           <div className="px-4 py-2 bg-white/5 rounded-full text-white text-xs font-bold border border-white/10 uppercase tracking-widest">Lvl 4 Intensity</div>
                        </div>
                    </div>

                    <div className="relative z-10 w-full px-6 sm:px-12">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                            {[
                              {l: "Sleep", v: "8.2h", c: "brand-green"},
                              {l: "Strain", v: "14.2", c: "brand-amber"},
                              {l: "Glucose", v: "Stable", c: "brand-green"},
                              {l: "Recover", v: "84%", c: "brand-green"}
                            ].map((s, i) => (
                                <div key={i} className="bg-white/5 p-4 sm:p-6 rounded-3xl border border-white/5 backdrop-blur-md">
                                    <div className="text-[10px] font-bold text-white/30 uppercase mb-2 tracking-widest">{s.l}</div>
                                    <div className={`text-xl sm:text-2xl font-black text-${s.c}`}>{s.v}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
             </div>
          </div>
        </section>

        {/* Section 2: Features Grid */}
        <section id="features" className="py-24 sm:py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
              <div className="max-w-2xl">
                <span className="text-brand-green font-bold text-xs sm:text-sm uppercase tracking-widest mb-4 block">The Core Framework</span>
                <h2 className="text-4xl sm:text-7xl font-black tracking-tighter leading-[0.9] text-black">Built for the <br />1% of high performers.</h2>
              </div>
              <p className="max-w-sm text-lg opacity-60 font-semibold md:mb-4 text-black">Standard tracking is for historians. Predictive nutrition is for builders.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
              {features.map((feature, idx) => (
                <div key={idx} className="glass p-12 rounded-[3.5rem] shadow-premium hover:-translate-y-2 transition-smooth group relative overflow-hidden border border-white">
                  <div className="mb-10 w-20 h-20 bg-brand-cream rounded-3xl flex items-center justify-center shadow-premium transition-smooth group-hover:bg-brand-green group-hover:text-white group-hover:rotate-12">
                    {feature.icon}
                  </div>
                  <span className="text-[10px] font-bold text-brand-amber uppercase tracking-[0.3em] mb-4 block">{feature.tag}</span>
                  <h3 className="text-3xl font-black mb-6 tracking-tight text-black">{feature.title}</h3>
                  <p className="opacity-60 leading-relaxed font-bold text-base sm:text-lg text-black">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 3: Visual Clarity with next/image */}
        <section className="py-32 px-6 bg-black overflow-hidden relative">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-10 relative z-10">
              <h2 className="text-4xl sm:text-7xl font-black leading-[0.9] text-brand-cream tracking-tighter">
                Visual <br /><span className="text-brand-amber">Clarity.</span>
              </h2>
              <p className="text-xl text-brand-cream/70 leading-relaxed font-semibold">
                Nourish Overlay uses AR to show you the biometric impact of your food choices instantly. No searching, no guesswork. Just vision.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center gap-4 p-5 glass rounded-2xl border border-white/5 transition-smooth hover:border-brand-amber/30">
                  <div className="w-2 h-2 rounded-full bg-brand-amber" />
                  <span className="text-brand-cream text-sm font-bold opacity-80 uppercase tracking-widest">Sugar Crash Prediction</span>
                </div>
                <div className="flex items-center gap-4 p-5 glass rounded-2xl border border-white/5 transition-smooth hover:border-brand-green/30">
                  <div className="w-2 h-2 rounded-full bg-brand-green" />
                  <span className="text-brand-cream text-sm font-bold opacity-80 uppercase tracking-widest">Optimal Prep Indicator</span>
                </div>
              </div>
            </div>
            
            <div className="relative group">
                <div className="relative aspect-square sm:aspect-[4/3] bg-brand-green/10 rounded-[4rem] overflow-hidden shadow-2xl transition-smooth">
                    <Image 
                      src="https://images.unsplash.com/photo-1543353071-873f17a7a088?q=80&w=2070&auto=format&fit=crop"
                      alt="Product Experience"
                      fill
                      className="object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60" />
                    
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm space-y-4 px-4">
                        <div className="glass p-4 rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20">
                             <div className="flex items-center gap-3">
                                 <div className="w-3 h-3 rounded-full bg-brand-amber animate-pulse" />
                                 <span className="text-white font-black text-[10px] uppercase tracking-widest">Inflammatory Response: High</span>
                             </div>
                        </div>
                        <div className="glass p-4 rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20">
                             <div className="flex items-center gap-3">
                                 <div className="w-3 h-3 rounded-full bg-brand-green" />
                                 <span className="text-white font-black text-[10px] uppercase tracking-widest">Biometric Match: 94%</span>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </section>

        {/* Section 4: Pricing/Membership */}
        <section id="pricing" className="py-24 sm:py-32 px-6 bg-black text-brand-cream relative z-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-24">
              <h2 className="text-4xl sm:text-7xl font-black tracking-tighter mb-6">Access the Network.</h2>
              <p className="text-xl opacity-60 font-semibold">One system. Three ways to integrate.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {memberships.map((tier, idx) => (
                <div key={idx} className={`relative p-12 rounded-[3.5rem] border ${tier.isPopular ? 'bg-white text-black border-white shadow-2xl scale-105 z-10' : 'border-white/10 glass shadow-premium'}`}>
                  {tier.isPopular && <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-brand-amber text-black text-xs font-black uppercase tracking-widest rounded-full shadow-lg">Most Effective</div>}
                  
                  <div className="text-xl font-bold mb-2 opacity-60">{tier.name}</div>
                  <div className="text-6xl font-black mb-10 tracking-tighter">{tier.price}<span className="text-lg opacity-40">/mo</span></div>
                  
                  <ul className="space-y-4 mb-12">
                    {tier.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-3 font-bold text-sm">
                        <FaCheck className={`text-xs ${tier.isPopular ? 'text-brand-green' : 'text-brand-amber'}`} />
                        <span className={tier.isPopular ? 'opacity-80' : 'opacity-60'}>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/auth/login"
                    className={`w-full py-5 rounded-2xl text-center font-bold text-lg transition-smooth block ${tier.isPopular ? 'bg-brand-green text-white shadow-green' : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'}`}
                  >
                    Select Plan
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 5: FAQ */}
        <section id="faq" className="py-24 sm:py-32 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-16 justify-center">
              <MdQuestionAnswer className="text-4xl text-brand-green" />
              <h2 className="text-4xl sm:text-6xl font-black tracking-tighter text-black">Your Questions.</h2>
            </div>
            
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="glass rounded-3xl overflow-hidden border border-white shadow-premium">
                  <button 
                    onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                    className="w-full p-8 flex items-center justify-between text-left hover:bg-white/40 transition-smooth"
                  >
                    <span className="text-xl font-black tracking-tight text-black">{faq.q}</span>
                    <FaChevronDown className={`transition-smooth text-black ${activeFaq === idx ? 'rotate-180' : ''}`} />
                  </button>
                  {activeFaq === idx && (
                    <div className="px-8 pb-8 animate-in fade-in slide-in-from-top-2 duration-300">
                      <p className="text-lg opacity-60 font-semibold leading-relaxed text-black">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 6: Trust Banner */}
        <section className="py-20 bg-black text-white overflow-hidden border-y border-white/5">
           <div className="max-w-7xl mx-auto px-6">
              <div className="flex items-center gap-4 justify-center mb-10 opacity-30">
                <MdVerifiedUser className="text-2xl" />
                <span className="text-xs font-black uppercase tracking-[0.5em]">Validated System Performance</span>
              </div>
              <div className="flex flex-wrap justify-center gap-12 sm:gap-24 grayscale opacity-20 hover:opacity-100 transition-smooth cursor-default">
                  <span className="text-2xl font-black italic tracking-tighter">FORBES</span>
                  <span className="text-2xl font-black italic tracking-tighter">TECHCRUNCH</span>
                  <span className="text-2xl font-black italic tracking-tighter">WIRED</span>
                  <span className="text-2xl font-black italic tracking-tighter">BLOOMBERG</span>
              </div>
           </div>
        </section>

        {/* Section 7: Final CTA */}
        <section className="py-32 px-6 mt-12 mb-12">
           <div className="max-w-5xl mx-auto glass p-12 sm:p-24 rounded-[4rem] text-center shadow-premium relative overflow-hidden border border-white">
              <h2 className="text-4xl sm:text-8xl font-black tracking-tighter mb-8 leading-[0.85] text-black">
                Peak Focus <br />Is a Choice.
              </h2>
              <p className="text-xl sm:text-2xl font-bold opacity-60 mb-12 max-w-2xl mx-auto text-black">
                Join the exclusive network of professionals automating their metabolic clarity.
              </p>
              <Link
                href="/auth/login"
                className="inline-block px-16 py-6 bg-black text-white rounded-3xl text-xl font-black transition-smooth hover:bg-brand-green hover:shadow-green hover:-translate-y-1 shadow-premium"
              >
                Log In to Network
              </Link>
              
              <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-brand-green/20 rounded-full blur-[120px]" />
              <div className="absolute -top-20 -left-20 w-80 h-80 bg-brand-amber/20 rounded-full blur-[120px]" />
           </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-24 px-6 border-t border-black/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
            <div className="col-span-1 md:col-span-2 space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center font-bold text-white text-2xl">N</div>
                <span className="font-black text-4xl tracking-tighter uppercase text-black">Nourish</span>
              </div>
              <p className="max-w-sm text-lg font-bold opacity-30 leading-snug text-black">
                Predictive biology for high-performance lives. Automating metabolic clarity through context-aware AI.
              </p>
              <div className="flex gap-6">
                <a href="#" className="p-3 bg-black/5 text-black rounded-xl hover:bg-brand-green hover:text-white transition-smooth"><FaInstagram /></a>
                <a href="#" className="p-3 bg-black/5 text-black rounded-xl hover:bg-brand-green hover:text-white transition-smooth"><FaLinkedin /></a>
                <a href="#" className="p-3 bg-black/5 text-black rounded-xl hover:bg-brand-green hover:text-white transition-smooth"><MdEmail /></a>
              </div>
            </div>
            
            <div className="space-y-6">
              <h4 className="font-black text-xs uppercase tracking-widest opacity-20 text-black">System</h4>
              <nav className="flex flex-col gap-3 font-bold">
                <Link href="#features" className="hover:text-brand-green transition-smooth text-black">Features</Link>
                <Link href="#pricing" className="hover:text-brand-green transition-smooth text-black">Memberships</Link>
                <Link href="#faq" className="hover:text-brand-green transition-smooth text-black">Intelligence</Link>
              </nav>
            </div>

            <div className="space-y-6">
              <h4 className="font-black text-xs uppercase tracking-widest opacity-20 text-black">Network</h4>
              <nav className="flex flex-col gap-3 font-bold">
                <a href="#" className="hover:text-brand-green transition-smooth text-black">Privacy Protocol</a>
                <a href="#" className="hover:text-brand-green transition-smooth text-black">Status: Active</a>
                <a href="#" className="hover:text-brand-green transition-smooth text-black">API Docs</a>
              </nav>
            </div>
          </div>
          
          <div className="pt-12 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-6">
             <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-30 text-black">© 2026 NOURISH HEALTH SYSTEMS. ALL RIGHTS RESERVED.</span>
             <div className="flex gap-8 text-[10px] font-black uppercase tracking-[0.2em] opacity-30 text-black">
                <a href="#">Security</a>
                <a href="#">Terms</a>
                <a href="#">Compliance</a>
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
