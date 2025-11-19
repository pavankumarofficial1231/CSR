import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GlassCard } from '../components/GlassCard';
import { ArrowLeft, TrendingUp, PieChart, FileCheck, AlertCircle, Download, ExternalLink, CheckCircle2, Image as ImageIcon, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { UserRole } from '../types';

export const ImpactReports: React.FC = () => {
  const navigate = useNavigate();

  // Explicitly pass Company role to maintain dashboard state
  const handleBack = () => {
    navigate('/dashboard', { state: { role: UserRole.COMPANY } });
  };

  const mockProjects = [
    {
      id: 'P-101',
      name: 'Digital Literacy for Rural Schools',
      allocated: 5000000,
      utilized: 4250000,
      status: 'Implementation',
      phase: 'Phase 3: Training',
      progress: 75,
      evidenceImg: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=500&q=80',
      lastUpdate: '2 days ago'
    },
    {
      id: 'P-102',
      name: 'Clean Water RO Installation',
      allocated: 1500000,
      utilized: 1500000,
      status: 'Completed',
      phase: 'Handover to Gram Panchayat',
      progress: 100,
      evidenceImg: 'https://images.unsplash.com/photo-1593113598340-e2663d36c090?auto=format&fit=crop&w=500&q=80',
      lastUpdate: 'Completed'
    },
    {
      id: 'P-103',
      name: 'Sustainable Farming Kits',
      allocated: 2500000,
      utilized: 500000,
      status: 'Planning',
      phase: 'Phase 1: Vendor Procurement',
      progress: 20,
      evidenceImg: null,
      lastUpdate: '1 week ago'
    }
  ];

  return (
    <div className="pt-32 pb-20 px-4 max-w-7xl mx-auto min-h-screen">
      <button onClick={handleBack} className="mb-6 flex items-center text-gray-400 hover:text-white transition-colors">
        <ArrowLeft size={20} className="mr-2" /> Back to Dashboard
      </button>

      <div className="flex justify-between items-end mb-8">
        <div>
            <h1 className="text-4xl font-bold mb-2">Impact <span className="text-blue-400">Reports</span></h1>
            <p className="text-gray-400">Real-time financial tracking and verified visual evidence.</p>
        </div>
        <button className="bg-csrOrange hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-bold text-sm flex items-center gap-2 transition-colors">
            <Download size={16} /> Export Annual Report (CSR-1)
        </button>
      </div>

      {/* KPI CARDS */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <GlassCard className="p-6 flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400">
                <TrendingUp size={28} />
            </div>
            <div>
                <p className="text-gray-400 text-xs uppercase">Total Budget Deployed</p>
                <h3 className="text-2xl font-bold">₹90,00,000</h3>
                <span className="text-green-400 text-xs font-bold">+12% vs Last Year</span>
            </div>
        </GlassCard>
        <GlassCard className="p-6 flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-green-500/10 flex items-center justify-center text-green-400">
                <PieChart size={28} />
            </div>
            <div>
                <p className="text-gray-400 text-xs uppercase">Funds Utilized</p>
                <h3 className="text-2xl font-bold">69.4%</h3>
                <span className="text-gray-500 text-xs">₹62.5L / ₹90L</span>
            </div>
        </GlassCard>
        <GlassCard className="p-6 flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-csrOrange/10 flex items-center justify-center text-csrOrange">
                <FileCheck size={28} />
            </div>
            <div>
                <p className="text-gray-400 text-xs uppercase">Active Projects</p>
                <h3 className="text-2xl font-bold">12</h3>
                <span className="text-blue-400 text-xs font-bold">Across 4 Sectors</span>
            </div>
        </GlassCard>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* SPENDING TRACKAGE LIST */}
        <div className="lg:col-span-2 space-y-6">
             <h2 className="text-xl font-bold flex items-center gap-2"><AlertCircle className="text-csrOrange" size={20} /> Implementation Tracker</h2>
             
             <div className="space-y-4">
                {mockProjects.map((project) => {
                    const percent = (project.utilized / project.allocated) * 100;
                    return (
                        <GlassCard key={project.id} className="p-6">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-2">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-bold text-lg">{project.name}</h3>
                                        {project.status === 'Completed' && <CheckCircle2 size={16} className="text-green-400" />}
                                    </div>
                                    <p className="text-xs text-gray-500 font-mono">ID: {project.id}</p>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                                    project.status === 'Completed' ? 'bg-green-500/10 border-green-500/20 text-green-400' :
                                    project.status === 'Planning' ? 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400' :
                                    'bg-blue-500/10 border-blue-500/20 text-blue-400'
                                }`}>
                                    {project.status}
                                </span>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-400 mb-6">
                                <div>
                                    <p className="text-xs uppercase text-gray-600">Allocated</p>
                                    <p className="text-white">₹{(project.allocated/100000).toFixed(1)}L</p>
                                </div>
                                <div>
                                    <p className="text-xs uppercase text-gray-600">Utilized</p>
                                    <p className="text-white font-bold text-green-400">₹{(project.utilized/100000).toFixed(1)}L</p>
                                </div>
                                <div>
                                    <p className="text-xs uppercase text-gray-600">Phase</p>
                                    <p className="text-white">{project.phase}</p>
                                </div>
                            </div>

                            {/* Visual Progress Timeline */}
                            <div className="mb-6">
                                <div className="flex justify-between text-[10px] uppercase text-gray-500 mb-2 font-bold tracking-wider">
                                    <span>Start</span>
                                    <span>Implementation</span>
                                    <span>Completion</span>
                                </div>
                                <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden relative">
                                    <motion.div 
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${project.progress}%` }}
                                        transition={{ duration: 1 }}
                                        className={`h-full rounded-full ${project.progress === 100 ? 'bg-green-400' : 'bg-blue-500'}`}
                                    />
                                    {/* Markers */}
                                    <div className="absolute top-0 left-0 w-full h-full flex justify-between px-1">
                                        <div className="w-0.5 h-full bg-black/20"></div>
                                        <div className="w-0.5 h-full bg-black/20"></div>
                                        <div className="w-0.5 h-full bg-black/20"></div>
                                    </div>
                                </div>
                                <div className="flex justify-between mt-1 text-xs text-gray-500">
                                    <span>0%</span>
                                    <span>{project.progress}% Complete</span>
                                </div>
                            </div>

                            {/* Site Evidence Images */}
                            <div className="border-t border-white/10 pt-4">
                                <p className="text-xs uppercase text-gray-500 mb-3 flex items-center gap-1">
                                    <ImageIcon size={12} /> Verified Site Evidence
                                </p>
                                <div className="flex gap-3 overflow-x-auto pb-2">
                                    {project.evidenceImg ? (
                                        <div className="relative group w-24 h-16 rounded-lg overflow-hidden cursor-pointer border border-white/10">
                                            <img src={project.evidenceImg} alt="Evidence" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Eye size={16} className="text-white" />
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="w-24 h-16 rounded-lg bg-white/5 border border-dashed border-white/10 flex items-center justify-center">
                                            <span className="text-[10px] text-gray-600">Pending Upload</span>
                                        </div>
                                    )}
                                    <div className="w-24 h-16 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
                                        <span className="text-[10px] text-blue-400">+ View All</span>
                                    </div>
                                </div>
                            </div>

                        </GlassCard>
                    )
                })}
             </div>
        </div>

        {/* SECTOR ANALYSIS (Simple Visualization) */}
        <div className="space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-2"><TrendingUp className="text-green-400" size={20} /> Sector Breakdown</h2>
            <GlassCard className="p-6 h-fit">
                <div className="space-y-6">
                    {[
                        { name: 'Education', val: 45, color: 'bg-blue-500' },
                        { name: 'Healthcare', val: 30, color: 'bg-green-400' },
                        { name: 'Agriculture', val: 15, color: 'bg-yellow-400' },
                        { name: 'Environment', val: 10, color: 'bg-teal-400' }
                    ].map((s) => (
                        <div key={s.name}>
                            <div className="flex justify-between text-sm mb-2">
                                <span>{s.name}</span>
                                <span className="font-bold">{s.val}%</span>
                            </div>
                            <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                                <motion.div 
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${s.val}%` }}
                                    className={`h-full ${s.color}`}
                                />
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-8 pt-6 border-t border-white/10 text-center">
                    <p className="text-gray-400 text-xs mb-4">Compliance Status</p>
                    <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 px-4 py-2 rounded-full text-green-400 font-bold text-sm">
                        <CheckCircle2 size={16} /> 100% Compliant (FY 23-24)
                    </div>
                </div>
            </GlassCard>
        </div>
      </div>
    </div>
  );
};