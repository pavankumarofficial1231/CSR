import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { GlassCard } from '../components/GlassCard';
import { UserRole, Sector } from '../types';
import { SECTORS } from '../constants';
import { Building, HeartHandshake, UploadCloud, CheckCircle2, Sparkles, Bot, Loader2, ShieldCheck, Server, Database, Circle, BrainCircuit, Cpu, Lock, ScanFace } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNotification } from '../context/NotificationContext';

export const Login: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  
  // Default to Company
  const [role, setRole] = useState<UserRole>(UserRole.COMPANY);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingState, setLoadingState] = useState<'verifying' | 'success'>('verifying');
  const [verificationStep, setVerificationStep] = useState(0);

  // AI Analysis State for NGOs
  const [missionDescription, setMissionDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiProgress, setAiProgress] = useState(0);
  const [suggestedSector, setSuggestedSector] = useState<Sector | null>(null);

  const companySteps = [
    "INITIATING SECURE HANDSHAKE",
    "CONNECTING TO MCA DATABASE (API V2.1)",
    "VERIFYING CIN & GSTIN RECORDS",
    "VALIDATING TAX COMPLIANCE STATUS",
    "FINALIZING CORPORATE AUTHORIZATION"
  ];

  const ngoSteps = [
    "ESTABLISHING SECURE CONNECTION",
    "ACCESSING NGO DARPAN REGISTRY",
    "VALIDATING REGISTRATION ID",
    "CHECKING FCRA COMPLIANCE",
    "AUTHORIZING PARTNER ACCESS"
  ];

  const activeSteps = role === UserRole.COMPANY ? companySteps : ngoSteps;

  // Handle initial tab if passed via params
  useEffect(() => {
      const tab = searchParams.get('tab');
      if (tab === 'ngo') setRole(UserRole.NGO);
  }, [searchParams]);

  // Check for existing session to prevent "signed out" state on back navigation
  useEffect(() => {
    const savedRole = localStorage.getItem('csrUserRole');
    if (savedRole && !isLoading) {
      // Auto-redirect to dashboard if session exists
      navigate('/dashboard', { state: { role: savedRole } });
    }
  }, []);

  // Reset state when switching roles
  useEffect(() => {
    setSuggestedSector(null);
    setMissionDescription('');
  }, [role]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setLoadingState('verifying');
    setVerificationStep(0);

    // Save role to persist session across navigation
    localStorage.setItem('csrUserRole', role);

    // UNIFIED ANIMATION LOGIC FOR BOTH LOGIN AND REGISTER
    const stepDuration = 800;
    const targetSteps = activeSteps.length;

    const timer = setInterval(() => {
    setVerificationStep((prev) => {
        if (prev < targetSteps) return prev + 1;
        clearInterval(timer);
        return prev;
    });
    }, stepDuration);

    // Switch to success after steps complete + small buffer
    setTimeout(() => {
    setLoadingState('success');
    
    setTimeout(() => {
        const msg = isRegistering 
            ? 'Identity Verified. Redirecting to Secure Dashboard...' 
            : 'Credentials Validated. Accessing Dashboard...';
        showNotification('success', msg);
        navigate('/dashboard', { state: { role } });
    }, 1500);
    }, (targetSteps + 1) * stepDuration);
  };

  const analyzeMission = () => {
    if (!missionDescription.trim()) return;
    setIsAnalyzing(true);
    setAiProgress(0);
    setSuggestedSector(null);

    // Progress Animation
    const interval = setInterval(() => {
        setAiProgress((prev) => {
            if (prev >= 100) {
                clearInterval(interval);
                return 100;
            }
            return prev + 4; // Increment speed
        });
    }, 50);

    // Simulate AI Analysis completion
    setTimeout(() => {
        clearInterval(interval);
        setAiProgress(100);

        const text = missionDescription.toLowerCase();
        let matchId = 'edu'; // Default fallback

        // Simple keyword heuristic to simulate AI
        if (text.includes('farm') || text.includes('crop') || text.includes('soil') || text.includes('water')) matchId = 'agri';
        else if (text.includes('health') || text.includes('doctor') || text.includes('medicine') || text.includes('patient')) matchId = 'health';
        else if (text.includes('tree') || text.includes('climate') || text.includes('recycle') || text.includes('waste')) matchId = 'env';
        else if (text.includes('woman') || text.includes('women') || text.includes('girl') || text.includes('gender')) matchId = 'women';
        else if (text.includes('tech') || text.includes('digital') || text.includes('computer') || text.includes('app')) matchId = 'tech';
        else if (text.includes('school') || text.includes('teach') || text.includes('student') || text.includes('literacy')) matchId = 'edu';

        const found = SECTORS.find(s => s.id === matchId);
        
        setTimeout(() => {
            setSuggestedSector(found || SECTORS[0]);
            setIsAnalyzing(false);
            showNotification('info', 'AI Analysis Complete: Sector Suggestion Ready.');
        }, 600); // Slight delay at 100% before showing result
        
    }, 2000);
  };

  return (
    <div className="min-h-screen pt-12 pb-12 px-4 flex justify-center items-center relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
            <div className="absolute top-20 right-[20%] w-96 h-96 bg-csrOrange/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-20 left-[20%] w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]" />
        </div>

      <div className="w-full max-w-md z-10">
          <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-csrOrange rounded-lg rotate-3 flex items-center justify-center">
                    <span className="text-white font-bold text-xl -rotate-3">C</span>
                </div>
                <span className="text-white text-3xl font-bold">CSR<span className="text-csrOrange">Impact</span></span>
              </div>
              <p className="text-gray-400">The trusted ecosystem for verifiable social impact.</p>
          </div>

          <GlassCard className="p-0 overflow-hidden border-white/20 min-h-[600px] flex flex-col transition-all duration-500 relative">
            <AnimatePresence mode="wait">
            {!isLoading ? (
                <motion.div
                key="form"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col h-full"
                >
                {/* Tab Header */}
                <div className="flex border-b border-white/10 shrink-0">
                    <button 
                    type="button"
                    onClick={() => setRole(UserRole.COMPANY)}
                    className={`flex-1 py-6 font-bold text-sm transition-colors flex items-center justify-center gap-2 ${
                        role === UserRole.COMPANY ? 'bg-csrOrange/20 text-csrOrange' : 'bg-transparent text-gray-500 hover:text-gray-300'
                    }`}
                    >
                    <Building size={18} /> CSR Company
                    </button>
                    <button 
                    type="button"
                    onClick={() => setRole(UserRole.NGO)}
                    className={`flex-1 py-6 font-bold text-sm transition-colors flex items-center justify-center gap-2 ${
                        role === UserRole.NGO ? 'bg-blue-500/20 text-blue-400' : 'bg-transparent text-gray-500 hover:text-gray-300'
                    }`}
                    >
                    <HeartHandshake size={18} /> Creator / NGO
                    </button>
                </div>

                {/* Form Content */}
                <div className="p-8 flex-1 flex flex-col justify-center">
                    <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold mb-2">
                        {isRegistering ? 'Join the Platform' : 'Welcome Back'}
                    </h2>
                    <p className="text-gray-400 text-sm">
                        {role === UserRole.COMPANY ? 'Manage funds and track verified impact.' : 'Submit projects and access CSR grants.'}
                    </p>
                    </div>

                    <form className="space-y-4" onSubmit={handleLogin}>
                    {isRegistering && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-4 overflow-hidden">
                        <div>
                            <label className="block text-xs uppercase text-gray-500 mb-1">Organization Name</label>
                            <input required type="text" className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white outline-none focus:border-white/50 transition-colors" />
                        </div>
                        {role === UserRole.COMPANY ? (
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs uppercase text-gray-500 mb-1">CIN Number</label>
                                    <input required type="text" placeholder="L12345..." className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white outline-none focus:border-white/50 transition-colors" />
                                </div>
                                <div>
                                    <label className="block text-xs uppercase text-gray-500 mb-1">GSTIN</label>
                                    <input required type="text" placeholder="27AAAA..." className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white outline-none focus:border-white/50 transition-colors" />
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs uppercase text-gray-500 mb-1">NGO Reg ID (Darpan)</label>
                                    <input required type="text" className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white outline-none focus:border-white/50 transition-colors" />
                                </div>
                                
                                {/* AI Sector Analysis Section */}
                                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                                    <label className="flex items-center gap-2 text-xs uppercase text-blue-400 mb-2 font-bold">
                                        <Sparkles size={12} /> AI Sector Match
                                    </label>
                                    <textarea 
                                        rows={3}
                                        value={missionDescription}
                                        onChange={(e) => setMissionDescription(e.target.value)}
                                        placeholder="Describe your mission (e.g., 'We provide clean water to rural villages...')"
                                        className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white text-sm mb-2 focus:outline-none focus:border-blue-400/50"
                                        disabled={isAnalyzing}
                                    />
                                    
                                    {!suggestedSector ? (
                                        <>
                                          {isAnalyzing ? (
                                            <div className="mt-2 bg-teal-950/40 border border-teal-500/20 rounded-lg p-4 relative overflow-hidden backdrop-blur-sm">
                                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-teal-400 shadow-[0_0_10px_rgba(45,212,191,0.6)]" />
                                                
                                                <div className="flex items-center gap-3 mb-3 pl-2">
                                                  <div className="w-8 h-8 rounded bg-teal-500/20 flex items-center justify-center border border-teal-500/30">
                                                    <BrainCircuit size={18} className="text-teal-400 animate-pulse" />
                                                  </div>
                                                  <div>
                                                     <h4 className="text-teal-400 font-bold text-xs tracking-wider animate-pulse">AI ANALYSIS IN PROGRESS...</h4>
                                                     <p className="text-[9px] text-teal-300/70 font-mono">GENERATING TAGS & SUMMARY</p>
                                                  </div>
                                                </div>
                                                
                                                <div className="flex gap-1 pl-2">
                                                  {[...Array(10)].map((_, i) => (
                                                    <div 
                                                      key={i}
                                                      className={`h-1.5 flex-1 rounded-sm transition-all duration-200 ${
                                                         i / 10 < aiProgress / 100 
                                                         ? 'bg-teal-400 shadow-[0_0_5px_rgba(45,212,191,0.8)]' 
                                                         : 'bg-teal-900/50'
                                                      }`}
                                                    />
                                                  ))}
                                                </div>
                                                <div className="text-right mt-1 text-[10px] text-teal-400 font-mono">{Math.round(aiProgress)}%</div>
                                            </div>
                                          ) : (
                                            <button 
                                                type="button"
                                                onClick={analyzeMission}
                                                disabled={!missionDescription}
                                                className="w-full bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 text-xs font-bold py-2 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                            >
                                                <Bot size={14} /> Analyze & Suggest Sector
                                            </button>
                                          )}
                                        </>
                                    ) : (
                                        <motion.div 
                                            initial={{ opacity: 0, y: 5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="flex items-center justify-between bg-blue-500/20 border border-blue-500/30 p-2 rounded-lg"
                                        >
                                            <div className="flex items-center gap-2">
                                                <BadgeCheck size={16} className="text-blue-400" />
                                                <span className="text-sm font-bold text-white">{suggestedSector.name}</span>
                                            </div>
                                            <span className="text-[10px] uppercase tracking-wider text-blue-300 font-semibold">Recommended</span>
                                        </motion.div>
                                    )}
                                   
                                </div>
                            </div>
                        )}
                        <div className="border border-dashed border-white/20 rounded-lg p-4 text-center cursor-pointer hover:bg-white/5 transition">
                            <UploadCloud className="mx-auto text-gray-400 mb-2" size={24} />
                            <p className="text-xs text-gray-500">Upload {role === UserRole.COMPANY ? 'Incorporation' : 'Trust Deed'} Docs</p>
                        </div>
                        </motion.div>
                    )}

                    {!isRegistering && (
                        <>
                        <div>
                            <label className="block text-xs uppercase text-gray-500 mb-1">Email Address</label>
                            <input required type="email" className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white outline-none focus:border-white/50 transition-colors" placeholder="name@org.com" />
                        </div>
                        <div>
                            <label className="block text-xs uppercase text-gray-500 mb-1">Password</label>
                            <input required type="password" className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white outline-none focus:border-white/50 transition-colors" placeholder="••••••••" />
                        </div>
                        </>
                    )}

                    <button type="submit" className={`w-full py-3 rounded-lg font-bold text-white mt-4 shadow-lg transition-all transform active:scale-95 ${
                        role === UserRole.COMPANY ? 'bg-csrOrange hover:bg-orange-600 shadow-orange-500/20' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/20'
                    }`}>
                        {isRegistering ? 'Verify & Register' : 'Login to Dashboard'}
                    </button>
                    </form>

                    <div className="mt-6 text-center">
                    <p className="text-sm text-gray-500">
                        {isRegistering ? "Already have an account?" : "New to CSR Impact?"}
                        <button 
                        type="button"
                        onClick={() => setIsRegistering(!isRegistering)}
                        className={`ml-2 font-bold hover:underline ${role === UserRole.COMPANY ? 'text-csrOrange' : 'text-blue-400'}`}
                        >
                        {isRegistering ? "Login" : "Register Now"}
                        </button>
                    </p>
                    </div>
                </div>
                </motion.div>
            ) : (
                <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-20 bg-[#0A1A2F] flex flex-col justify-center items-center p-8 text-center h-full w-full"
                >
                {/* Background Scanning Effect */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <motion.div 
                        animate={{ top: ['-10%', '110%'] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="absolute left-0 w-full h-20 bg-gradient-to-b from-transparent via-white/5 to-transparent blur-md"
                    />
                </div>

                {loadingState === 'verifying' ? (
                    // ENHANCED VERIFICATION UI - STRICTLY MATCHING "AI ANALYSIS" AESTHETIC
                    <div className="flex flex-col items-center w-full max-w-sm z-10">
                        
                        <div className={`w-full bg-black/40 border rounded-xl p-6 relative overflow-hidden backdrop-blur-md mb-4 shadow-2xl ${
                            role === UserRole.COMPANY 
                            ? 'border-orange-500/30 bg-orange-950/20' 
                            : 'border-teal-500/30 bg-teal-950/20'
                        }`}>
                            {/* Glowing Side Bar */}
                            <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${
                                role === UserRole.COMPANY 
                                ? 'bg-csrOrange shadow-[0_0_15px_rgba(255,122,0,0.5)]' 
                                : 'bg-teal-400 shadow-[0_0_15px_rgba(45,212,191,0.5)]'
                            }`} />
                            
                            <div className="flex items-center gap-4 mb-6 pl-2">
                                <div className={`w-10 h-10 rounded flex items-center justify-center border ${
                                    role === UserRole.COMPANY 
                                    ? 'bg-orange-500/10 border-orange-500/30' 
                                    : 'bg-teal-500/10 border-teal-500/30'
                                }`}>
                                    {role === UserRole.COMPANY ? 
                                        <Cpu size={20} className="text-csrOrange animate-pulse" /> : 
                                        <ScanFace size={20} className="text-teal-400 animate-pulse" />
                                    }
                                </div>
                                <div className="text-left">
                                    <h4 className={`font-bold text-sm tracking-widest animate-pulse ${
                                        role === UserRole.COMPANY ? 'text-csrOrange' : 'text-teal-400'
                                    }`}>
                                        SYSTEM ACCESS IN PROGRESS...
                                    </h4>
                                    <p className={`text-[9px] font-mono mt-1 tracking-wide ${
                                        role === UserRole.COMPANY ? 'text-orange-200/50' : 'text-teal-300/60'
                                    }`}>
                                        VERIFYING ENCRYPTED CREDENTIALS
                                    </p>
                                </div>
                            </div>

                            {/* Segmented Progress Bar */}
                            <div className="flex gap-1.5 mb-2 px-1">
                                {[...Array(10)].map((_, i) => {
                                    const percentage = (verificationStep / activeSteps.length);
                                    const isActive = (i / 10) < percentage;
                                    return (
                                        <div 
                                            key={i}
                                            className={`h-1.5 flex-1 rounded-[1px] transition-all duration-300 ${
                                                isActive
                                                ? `${role === UserRole.COMPANY ? 'bg-csrOrange shadow-[0_0_8px_rgba(255,122,0,0.8)]' : 'bg-teal-400 shadow-[0_0_8px_rgba(45,212,191,0.8)]'}` 
                                                : 'bg-white/5'
                                            }`}
                                        />
                                    );
                                })}
                            </div>
                            <div className={`text-right text-[10px] font-bold font-mono px-1 ${
                                role === UserRole.COMPANY ? 'text-csrOrange' : 'text-teal-400'
                            }`}>
                                {Math.min(100, Math.round((verificationStep / activeSteps.length) * 100))}%
                            </div>
                        </div>

                        {/* Subtle Terminal Steps List */}
                        <div className="w-full pl-4 space-y-1.5 opacity-80">
                            {activeSteps.map((step, index) => {
                                const status = index < verificationStep ? 'done' : index === verificationStep ? 'active' : 'pending';
                                if (status === 'pending') return null; // Only show active/done to keep it clean like the screenshot
                                return (
                                    <motion.div 
                                    key={index} 
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="flex items-center gap-3 text-xs"
                                    >
                                    <span className={`font-mono uppercase tracking-wider ${
                                        status === 'active' ? (role === UserRole.COMPANY ? 'text-csrOrange' : 'text-teal-400') : 'text-gray-600'
                                    }`}>
                                        {status === 'done' ? '[OK]' : '>>'} {step}
                                    </span>
                                    </motion.div>
                                )
                            })}
                        </div>
                    </div>
                ) : (
                    // SUCCESS STATE
                    <motion.div 
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="flex flex-col items-center z-10"
                    >
                        <motion.div 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1, rotate: 360 }}
                            transition={{ type: "spring", damping: 10 }}
                            className={`w-24 h-24 rounded-full flex items-center justify-center text-white mb-8 shadow-[0_0_50px_rgba(0,0,0,0.5)] ${role === UserRole.COMPANY ? 'bg-gradient-to-br from-orange-500 to-red-600 shadow-orange-500/30' : 'bg-gradient-to-br from-blue-500 to-cyan-600 shadow-blue-500/30'}`}
                        >
                            <Lock size={40} />
                        </motion.div>
                        <h3 className="text-2xl font-bold mb-2 tracking-widest uppercase">{isRegistering ? 'Identity Verified' : 'Access Granted'}</h3>
                        <p className="text-gray-400 font-mono text-xs bg-white/5 px-4 py-1 rounded border border-white/10">
                            SESSION ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}
                        </p>
                    </motion.div>
                )}
                </motion.div>
            )}
            </AnimatePresence>
          </GlassCard>
      </div>
    </div>
  );
};

// Helper component
function BadgeCheck({ size, className }: { size: number, className?: string }) {
    return <CheckCircle2 size={size} className={className} />;
}