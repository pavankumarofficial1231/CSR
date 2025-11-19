import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlassCard } from '../components/GlassCard';
import { ArrowLeft, Clock, CheckCircle2, AlertCircle, ArrowRight, Search, Filter } from 'lucide-react';
import { UserRole } from '../types';

// Mock Data for status tracking (Historical)
const HISTORY_PROJECTS = [
  {
    id: 'APP-2024-001',
    title: 'Clean Water Initiative Phase 2',
    date: 'Oct 24, 2023',
    status: 'active',
    raised: 1500000,
    goal: 2000000,
    progress: 75
  },
  {
    id: 'APP-2023-892',
    title: 'Community Solar Grid',
    date: 'Dec 01, 2023',
    status: 'rejected',
    raised: 0,
    goal: 1200000,
    progress: 0,
    reason: "Budget documentation incomplete."
  }
];

export const TrackStatus: React.FC = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<any[]>([]);

  // Load submitted proposals from local storage and merge with history
  useEffect(() => {
    const savedProposals = JSON.parse(localStorage.getItem('submittedProposals') || '[]');
    setProjects([...savedProposals, ...HISTORY_PROJECTS]);
  }, []);

  // Helper to navigate back with explicit NGO state
  const handleBack = () => {
    navigate('/dashboard', { state: { role: UserRole.NGO } });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="bg-green-500/20 text-green-400 border border-green-500/30 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 w-fit"><CheckCircle2 size={12} /> Verified & Live</span>;
      case 'pending':
        return <span className="bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 w-fit"><Clock size={12} /> Under Review</span>;
      case 'rejected':
        return <span className="bg-red-500/20 text-red-400 border border-red-500/30 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 w-fit"><AlertCircle size={12} /> Action Needed</span>;
      default:
        return null;
    }
  };

  return (
    <div className="pt-32 pb-20 px-4 min-h-screen max-w-6xl mx-auto">
      <button onClick={handleBack} className="mb-6 flex items-center text-gray-400 hover:text-white transition-colors">
        <ArrowLeft size={20} className="mr-2" /> Back to Dashboard
      </button>

      <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-bold mb-2">Track <span className="text-green-400">Status</span></h1>
          <p className="text-gray-400">Monitor your applications and funding progress in real-time.</p>
        </div>
        <div className="flex gap-3">
           <button className="bg-white/5 border border-white/10 p-3 rounded-lg text-gray-300 hover:bg-white/10"><Search size={20} /></button>
           <button className="bg-white/5 border border-white/10 p-3 rounded-lg text-gray-300 hover:bg-white/10"><Filter size={20} /></button>
        </div>
      </div>

      <div className="space-y-4">
        {projects.length === 0 && (
            <div className="text-center py-12 opacity-50">
                <p>No proposals submitted yet.</p>
            </div>
        )}
        {projects.map((project) => (
          <GlassCard key={project.id} hoverEffect={true} className="p-6 flex flex-col md:flex-row items-center gap-6">
            
            {/* Icon / Status Indicator */}
            <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${
              project.status === 'active' ? 'bg-green-500/10 text-green-400' :
              project.status === 'rejected' ? 'bg-red-500/10 text-red-400' :
              'bg-yellow-500/10 text-yellow-400'
            }`}>
              {project.status === 'active' ? <CheckCircle2 size={24} /> :
               project.status === 'rejected' ? <AlertCircle size={24} /> :
               <Clock size={24} />}
            </div>

            {/* Details */}
            <div className="flex-1 w-full">
              <div className="flex flex-col md:flex-row justify-between md:items-center mb-2 gap-2">
                 <h3 className="text-xl font-bold">{project.title}</h3>
                 <span className="text-xs font-mono text-gray-500">ID: {project.id}</span>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                <span>Submitted: {project.date}</span>
                <span>•</span>
                {getStatusBadge(project.status)}
              </div>

              {/* Conditional Content based on Status */}
              {(project.status === 'active' || project.status === 'pending') && (
                <div className="w-full">
                   <div className="flex justify-between text-xs mb-1">
                      <span className="text-green-400 font-bold">₹{project.raised.toLocaleString()} Raised</span>
                      <span>Goal: ₹{project.goal.toLocaleString()}</span>
                   </div>
                   <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-green-400 rounded-full" style={{ width: `${project.progress || (project.raised/project.goal)*100}%` }}></div>
                   </div>
                </div>
              )}

              {project.status === 'rejected' && (
                <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-lg text-sm text-red-300">
                   <strong>Reason for Rejection:</strong> {project.reason} <br/>
                   <span className="underline cursor-pointer hover:text-white">Click here to edit and resubmit proposal.</span>
                </div>
              )}
            </div>

            {/* Action */}
            <div className="shrink-0">
              <button className="p-3 rounded-full bg-white/5 hover:bg-white/20 transition-colors">
                <ArrowRight size={20} className="text-gray-300" />
              </button>
            </div>

          </GlassCard>
        ))}
      </div>
    </div>
  );
};