import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PROJECTS } from '../constants';
import { GlassCard } from '../components/GlassCard';
import { ArrowLeft, Calendar, Target, Share2, BadgeCheck, X, Loader2, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNotification } from '../context/NotificationContext';

export const ProjectDetails: React.FC = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  
  // Donation State
  const [showDonateModal, setShowDonateModal] = useState(false);
  const [donateAmount, setDonateAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const projectData = PROJECTS.find(p => p.id === projectId);
  
  // Use local state to reflect donation updates immediately without page reload
  const [raised, setRaised] = useState(projectData?.fundsRaised || 0);
  const [donorCount, setDonorCount] = useState(projectData?.donors.length || 0);

  if (!projectData) return <div className="pt-32 text-center">Project not found</div>;

  const progress = Math.min(100, (raised / projectData.fundsRequired) * 100);

  const handleDonate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!donateAmount || Number(donateAmount) <= 0) return;

    setIsProcessing(true);

    // Simulate Payment Gateway Interaction
    setTimeout(() => {
      setIsProcessing(false);
      setRaised(prev => prev + Number(donateAmount));
      setDonorCount(prev => prev + 1);
      setShowDonateModal(false);
      showNotification('success', `Thank you! ₹${Number(donateAmount).toLocaleString()} donation processed successfully.`);
      setDonateAmount('');
    }, 2500);
  };

  return (
    <div className="pt-32 pb-20 px-4 max-w-6xl mx-auto min-h-screen relative">
       <button onClick={() => navigate(-1)} className="mb-6 flex items-center text-gray-400 hover:text-white transition-colors">
        <ArrowLeft size={20} className="mr-2" /> Back
      </button>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-6">
          <div className="rounded-2xl overflow-hidden h-[450px] relative shadow-2xl group">
            <img src={projectData.image} alt={projectData.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            
            {/* Prominent Verified Badge - Top Right */}
            {projectData.verified && (
                <div className="absolute top-6 right-6 z-20">
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, type: "spring" }}
                        className="flex items-center gap-2 bg-blue-600/90 backdrop-blur-md border border-white/20 text-white px-5 py-2.5 rounded-full shadow-[0_0_30px_rgba(37,99,235,0.5)]"
                    >
                        <div className="bg-white rounded-full p-0.5">
                            <BadgeCheck size={20} className="text-blue-600 fill-blue-600" />
                        </div>
                        <span className="font-bold text-sm tracking-wide uppercase">Verified Project</span>
                    </motion.div>
                </div>
            )}

            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-[#0A1A2F] via-[#0A1A2F]/90 to-transparent p-8 pt-32">
               <div className="flex items-center gap-2 mb-3">
                  <span className="bg-csrOrange text-white text-xs font-bold px-3 py-1.5 rounded-lg uppercase tracking-wider shadow-lg shadow-orange-500/20">{projectData.sector}</span>
               </div>
               <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">{projectData.title}</h1>
            </div>
          </div>

          <GlassCard className="p-8">
            <h2 className="text-xl font-bold mb-4 border-b border-white/10 pb-4">About the Project</h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              {projectData.description}
              <br /><br />
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            
            <h3 className="text-lg font-bold mb-3 mt-8">Timeline</h3>
            <div className="flex gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-lg"><Calendar size={16} /> Start: Jan 2024</div>
              <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-lg"><Target size={16} /> End: Dec 2024</div>
            </div>
          </GlassCard>
        </div>

        {/* Sidebar / Funding Card */}
        <div className="md:col-span-1">
          <div className="sticky top-32 space-y-6">
            <GlassCard className="p-6 border-t-4 border-t-csrOrange">
              <div className="mb-6">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-3xl font-bold text-white">₹{raised.toLocaleString()}</span>
                  <span className="text-gray-400 text-sm mb-1">of ₹{projectData.fundsRequired.toLocaleString()}</span>
                </div>
                <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1.5 }}
                    className="h-full bg-csrOrange rounded-full"
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>{progress.toFixed(0)}% Funded</span>
                  <span>{projectData.daysLeft} Days Left</span>
                </div>
              </div>

              <button 
                onClick={() => setShowDonateModal(true)}
                className="w-full bg-csrOrange hover:bg-orange-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-orange-500/20 mb-4 transition-all transform hover:scale-[1.02]"
              >
                Donate Now
              </button>
              <button className="w-full bg-white/5 hover:bg-white/10 text-white font-semibold py-3 rounded-xl border border-white/10 transition-colors flex justify-center items-center gap-2">
                <Share2 size={18} /> Share Project
              </button>
            </GlassCard>

            <GlassCard className="p-6">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                Creator
              </h3>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center font-bold text-xl">
                  {projectData.creator.charAt(0)}
                </div>
                <div>
                  <p className="font-bold">{projectData.creator}</p>
                  <p className="text-xs text-blue-400 flex items-center gap-1 font-semibold">
                    <BadgeCheck size={14} className="fill-blue-400/20" /> KYC Verified
                  </p>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-6">
               <h3 className="font-bold mb-4">Recent Donors ({donorCount})</h3>
               <ul className="space-y-3 text-sm">
                  {projectData.donors.map((d, i) => (
                    <li key={i} className="flex items-center justify-between p-2 bg-white/5 rounded-lg">
                      <span>{d}</span>
                      {d !== 'Anonymous' && <BadgeCheck size={16} className="text-blue-400 fill-blue-400/10" />}
                    </li>
                  ))}
                  {donorCount > projectData.donors.length && (
                    <li className="flex items-center justify-center p-2 text-gray-500 text-xs">
                      + {donorCount - projectData.donors.length} recent anonymous donors
                    </li>
                  )}
               </ul>
            </GlassCard>
          </div>
        </div>
      </div>

      {/* DONATION MODAL */}
      <AnimatePresence>
        {showDonateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => !isProcessing && setShowDonateModal(false)}
            />
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-md bg-[#0A1A2F] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-white/10 flex justify-between items-center">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  Make a Donation <Heart className="text-red-500 fill-red-500" size={20} />
                </h3>
                <button 
                  onClick={() => setShowDonateModal(false)}
                  disabled={isProcessing}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="p-6">
                <p className="text-gray-400 text-sm mb-6">
                  You are donating to <span className="text-white font-bold">{projectData.title}</span>. 
                  Your contribution is directly tracked on the blockchain.
                </p>

                <form onSubmit={handleDonate}>
                  <div className="mb-6">
                    <label className="block text-xs uppercase text-gray-500 mb-2">Enter Amount (₹)</label>
                    <div className="relative">
                      <span className="absolute left-4 top-3.5 text-gray-400 font-bold">₹</span>
                      <input 
                        type="number" 
                        autoFocus
                        required
                        min="1"
                        value={donateAmount}
                        onChange={(e) => setDonateAmount(e.target.value)}
                        className="w-full bg-black/20 border border-white/10 rounded-xl p-3 pl-8 text-lg font-bold text-white focus:outline-none focus:border-csrOrange transition-colors"
                        placeholder="5000"
                      />
                    </div>
                    <div className="flex gap-2 mt-3">
                      {[1000, 5000, 10000].map((amt) => (
                        <button 
                          key={amt}
                          type="button"
                          onClick={() => setDonateAmount(amt.toString())}
                          className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg py-2 text-xs font-medium transition-colors"
                        >
                          ₹{amt.toLocaleString()}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button 
                    type="submit"
                    disabled={isProcessing}
                    className="w-full bg-csrOrange hover:bg-orange-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-orange-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="animate-spin" /> Processing Secure Payment...
                      </>
                    ) : (
                      "Confirm Donation"
                    )}
                  </button>
                </form>
              </div>
              
              <div className="bg-white/5 p-4 text-center text-[10px] text-gray-500 border-t border-white/10">
                <p>Secured by 256-bit SSL Encryption. Tax benefits may apply.</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};