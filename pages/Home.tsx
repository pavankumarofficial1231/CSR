import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Building2, FilePlus2, ArrowRight, CheckCircle2, ShieldCheck, BarChart3, FolderSearch, PieChart, BadgeCheck } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { SECTORS, PARTNERS } from '../constants';
import { UserRole } from '../types';
import * as Icons from 'lucide-react';
import { useNotification } from '../context/NotificationContext';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { showNotification } = useNotification();
  
  // Retrieve role from localStorage (persisted) or state (direct)
  const storedRole = localStorage.getItem('csrUserRole') as UserRole;
  const userRole = location.state?.role || storedRole || UserRole.COMPANY;
  
  const isCompany = userRole === UserRole.COMPANY;

  // Handle Hash Scrolling (Fix for Menu Links)
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        // Small timeout to ensure DOM is ready and override any scroll-to-top behavior
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  // Show Welcome Notification once on mount
  useEffect(() => {
    // Check if we just logged in (optional check to avoid spamming)
    const hasWelcomed = sessionStorage.getItem('hasWelcomed');
    if (!hasWelcomed) {
      setTimeout(() => {
        if (isCompany) {
          showNotification('info', 'Welcome back, Corporate Partner. Your impact data is synced.');
        } else {
          showNotification('info', 'Welcome, NGO Partner. Grant opportunities updated.');
        }
        sessionStorage.setItem('hasWelcomed', 'true');
      }, 1000);
    }
  }, []);

  return (
    <div className="min-h-screen">
      {/* 1. HERO SECTION (DASHBOARD HEADER) */}
      <section className="relative pt-32 pb-20 px-6 min-h-[80vh] flex flex-col justify-center items-center overflow-hidden">
        {/* Background Blobs */}
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-csrOrange/20 rounded-full blur-[100px] opacity-50 animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[100px] opacity-30" />

        <div className="mb-6 text-sm font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400">
            {isCompany ? 'Corporate Dashboard' : 'NGO Partner Portal'}
        </div>

        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold text-center mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"
        >
          {isCompany ? (
             <>Invest in <span className="text-csrOrange">Verified</span> Impact.</>
          ) : (
             <>Fund Your <span className="text-blue-400">Vision</span>.</>
          )}
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-gray-400 text-lg md:text-xl max-w-2xl text-center mb-12"
        >
          {isCompany 
            ? "Browse accredited projects, track your funds in real-time, and generate compliant CSR reports."
            : "Connect with top corporate donors, submit project proposals, and track your funding status."
          }
        </motion.p>

        {/* Hero Action Cards - Customized by Role */}
        <div className="grid md:grid-cols-2 gap-6 w-full max-w-4xl">
          {isCompany ? (
            <>
              <GlassCard 
                hoverEffect={true} 
                onClick={() => {
                  const element = document.getElementById('sectors');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex flex-col items-center text-center py-12 border-csrOrange/30 group"
              >
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 text-csrOrange group-hover:bg-csrOrange group-hover:text-white transition-colors">
                  <FolderSearch size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-2">Browse Sectors</h3>
                <p className="text-gray-400 text-sm mb-4">Explore verified projects in Education, Health, and more.</p>
                <span className="flex items-center text-csrOrange font-semibold text-sm">Start Exploring <ArrowRight size={16} className="ml-2" /></span>
              </GlassCard>

              <GlassCard 
                hoverEffect={true}
                onClick={() => navigate('/impact-reports')}
                className="flex flex-col items-center text-center py-12 border-white/10 cursor-pointer"
              >
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 text-blue-400">
                  <PieChart size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-2">Impact Reports</h3>
                <p className="text-gray-400 text-sm mb-4">View analytics on your deployed funds and social ROI.</p>
                <span className="flex items-center text-blue-400 font-semibold text-sm">View Dashboard <ArrowRight size={16} className="ml-2" /></span>
              </GlassCard>
            </>
          ) : (
            <>
              <GlassCard 
                hoverEffect={true} 
                onClick={() => navigate('/submit-proposal')}
                className="flex flex-col items-center text-center py-12 border-blue-400/30 group cursor-pointer"
              >
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                  <FilePlus2 size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-2">Submit Proposal</h3>
                <p className="text-gray-400 text-sm mb-4">Create a new funding request for your social cause.</p>
                <span className="flex items-center text-blue-400 font-semibold text-sm">Create New <ArrowRight size={16} className="ml-2" /></span>
              </GlassCard>

              <GlassCard 
                hoverEffect={true}
                onClick={() => navigate('/track-status')}
                className="flex flex-col items-center text-center py-12 border-white/10 cursor-pointer"
              >
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 text-green-400">
                  <BarChart3 size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-2">Track Status</h3>
                <p className="text-gray-400 text-sm mb-4">Check the verification and funding status of your projects.</p>
                <span className="flex items-center text-green-400 font-semibold text-sm">Check Status <ArrowRight size={16} className="ml-2" /></span>
              </GlassCard>
            </>
          )}
        </div>
      </section>

      {/* 3. TAGLINE & MARQUEE */}
      <section className="py-16 px-4 text-center">
        <GlassCard className="max-w-5xl mx-auto mb-12 !py-8">
          <h2 className="text-2xl md:text-3xl font-light italic text-gray-200">
            "Enabling <span className="text-csrOrange font-semibold">transparent</span> CSR impact across verified causes."
          </h2>
        </GlassCard>

        <div className="relative flex overflow-x-hidden group">
          <div className="animate-marquee whitespace-nowrap flex gap-12 items-center">
            {[...PARTNERS, ...PARTNERS].map((partner, idx) => (
              <div key={idx} className="inline-flex items-center justify-center px-8 py-4 bg-white/5 border border-white/10 rounded-xl backdrop-blur-md text-gray-300 font-bold text-lg hover:border-csrOrange/50 transition-colors cursor-default gap-2">
                {partner}
                <BadgeCheck className="text-blue-400 fill-blue-400/20" size={20} strokeWidth={2.5} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SECTORS SECTION */}
      <section id="sectors" className="py-20 max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl md:text-4xl font-bold">Browse by <span className="text-csrOrange">Sector</span></h2>
          <div className="h-1 w-20 bg-csrOrange rounded-full hidden md:block"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {SECTORS.map((sector, idx) => {
            // Dynamic icon rendering
            const IconComponent = (Icons as any)[sector.icon] || Icons.HelpCircle;

            return (
              <GlassCard 
                key={sector.id} 
                delay={idx * 0.1}
                hoverEffect={true}
                onClick={() => navigate(`/projects/${sector.id}`)}
                className="flex flex-col items-start h-full group"
              >
                <div className="p-3 bg-white/5 rounded-lg mb-4 text-csrOrange group-hover:bg-csrOrange group-hover:text-white transition-colors">
                  <IconComponent size={28} />
                </div>
                <h3 className="text-xl font-bold mb-2">{sector.name}</h3>
                <div className="mt-auto pt-4 w-full flex justify-between items-center border-t border-white/10 text-sm text-gray-400">
                  <span>{sector.projectCount}+ Projects</span>
                  <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all" />
                </div>
              </GlassCard>
            );
          })}
        </div>
      </section>

      {/* 6. ABOUT US (Reordered as per plan to appear after sectors but before Contact) */}
      <section id="about" className="py-20 bg-gradient-to-b from-transparent to-black/20">
        <div className="max-w-7xl mx-auto px-6">
           <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Why Trust <span className="text-csrOrange">Us?</span></h2>
           
           <div className="grid md:grid-cols-3 gap-8">
              <GlassCard className="text-center py-10">
                <div className="mx-auto w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-400 mb-6">
                   <BarChart3 size={32} />
                </div>
                <h3 className="text-xl font-bold mb-3">Transparency</h3>
                <p className="text-gray-400">Every rupee is traceable end-to-end. We utilize blockchain ledgers for fund tracking.</p>
              </GlassCard>

              <GlassCard className="text-center py-10 border-csrOrange/30 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-csrOrange to-yellow-500"></div>
                <div className="mx-auto w-16 h-16 bg-csrOrange/10 rounded-full flex items-center justify-center text-csrOrange mb-6">
                   <CheckCircle2 size={32} />
                </div>
                <h3 className="text-xl font-bold mb-3">Impact First</h3>
                <p className="text-gray-400">We ensure measurable change across sectors with quarterly impact auditing.</p>
              </GlassCard>

              <GlassCard className="text-center py-10">
                <div className="mx-auto w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center text-green-400 mb-6">
                   <ShieldCheck size={32} />
                </div>
                <h3 className="text-xl font-bold mb-3">Verified Trust</h3>
                <p className="text-gray-400">Only government-compliant companies and NGOs appear on our platform.</p>
              </GlassCard>
           </div>
        </div>
      </section>

      {/* 7. CONTACT US */}
      <section id="contact" className="py-20 max-w-5xl mx-auto px-6">
        <GlassCard className="grid md:grid-cols-2 gap-12 p-10">
          <div>
            <h2 className="text-3xl font-bold mb-6">Get in <span className="text-csrOrange">Touch</span></h2>
            <p className="text-gray-300 mb-8">Have questions about registration or project submission? Our CSR support team is here to help.</p>
            
            <div className="space-y-4 text-gray-300">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">📍</div>
                <div>
                  <p className="text-xs text-gray-500 uppercase">Head Office</p>
                  <p>Cyber Hub, DLF Phase 2, Gurugram</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                 <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">📧</div>
                 <div>
                  <p className="text-xs text-gray-500 uppercase">Helpline</p>
                  <p>support@csrimpact.org</p>
                </div>
              </div>
            </div>
          </div>

          <form className="space-y-4" onSubmit={(e) => {
            e.preventDefault();
            showNotification('success', 'Message Sent! We will contact you shortly.');
          }}>
            <div>
              <label className="text-xs uppercase text-gray-500 mb-1 block">Full Name *</label>
              <input 
                required 
                type="text" 
                className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-csrOrange transition-colors" 
                placeholder="John Doe" 
              />
            </div>
            <div>
              <label className="text-xs uppercase text-gray-500 mb-1 block">Email Address *</label>
              <input 
                required 
                type="email" 
                className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-csrOrange transition-colors" 
                placeholder="john@company.com" 
              />
            </div>
            <div>
              <label className="text-xs uppercase text-gray-500 mb-1 block">Message *</label>
              <textarea 
                required 
                rows={4} 
                className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-csrOrange transition-colors" 
                placeholder="How can we help?"
              ></textarea>
            </div>
            <button className="w-full bg-csrOrange text-white font-bold py-3 rounded-lg hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/20">
              Send Message
            </button>
          </form>
        </GlassCard>
      </section>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
      `}</style>
    </div>
  );
};