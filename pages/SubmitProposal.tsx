import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlassCard } from '../components/GlassCard';
import { SECTORS } from '../constants';
import { UploadCloud, ArrowLeft, CheckCircle2, Loader2, FileText, DollarSign, Calendar } from 'lucide-react';
import { useNotification } from '../context/NotificationContext';
import { motion } from 'framer-motion';

export const SubmitProposal: React.FC = () => {
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    
    const newProposal = {
      id: `APP-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      title: formData.get('title') as string,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'pending', // Default status for new submissions
      raised: 0,
      goal: Number(formData.get('goal')),
      progress: 0
    };

    // Simulate API call & Persistence
    setTimeout(() => {
      const existing = JSON.parse(localStorage.getItem('submittedProposals') || '[]');
      localStorage.setItem('submittedProposals', JSON.stringify([newProposal, ...existing]));
      
      setIsSubmitting(false);
      showNotification('success', 'Proposal Submitted Successfully! Sent for verification.');
      navigate('/track-status');
    }, 2000);
  };

  return (
    <div className="pt-32 pb-20 px-4 min-h-screen max-w-4xl mx-auto">
      <button onClick={() => navigate(-1)} className="mb-6 flex items-center text-gray-400 hover:text-white transition-colors">
        <ArrowLeft size={20} className="mr-2" /> Back to Dashboard
      </button>

      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Submit <span className="text-blue-400">Proposal</span></h1>
        <p className="text-gray-400">Create a new funding request. All submissions undergo a strict 48-hour verification process.</p>
      </div>

      <GlassCard className="p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Section 1: Basic Details */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold border-b border-white/10 pb-2 flex items-center gap-2">
              <FileText size={20} className="text-blue-400" /> Project Details
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="col-span-2">
                <label className="block text-xs uppercase text-gray-500 mb-1">Project Title *</label>
                <input name="title" required type="text" className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-blue-400 transition-colors" placeholder="e.g., Solar Power for Rural Clinics" />
              </div>

              <div>
                <label className="block text-xs uppercase text-gray-500 mb-1">Sector *</label>
                <select name="sector" required className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-blue-400 transition-colors appearance-none">
                  <option value="">Select a Sector</option>
                  {SECTORS.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase text-gray-500 mb-1">Location *</label>
                <input name="location" required type="text" className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-blue-400 transition-colors" placeholder="City, State" />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase text-gray-500 mb-1">Impact Summary *</label>
              <textarea name="description" required rows={4} className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-blue-400 transition-colors" placeholder="Describe the problem, your solution, and the expected outcome..."></textarea>
            </div>
          </div>

          {/* Section 2: Funding & Timeline */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold border-b border-white/10 pb-2 flex items-center gap-2">
              <DollarSign size={20} className="text-green-400" /> Funding & Timeline
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase text-gray-500 mb-1">Total Funds Needed (₹) *</label>
                <input name="goal" required type="number" className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-green-400 transition-colors" placeholder="500000" />
              </div>
              
              <div>
                <label className="block text-xs uppercase text-gray-500 mb-1">Project Duration (Months) *</label>
                <input name="duration" required type="number" className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-green-400 transition-colors" placeholder="12" />
              </div>
            </div>
          </div>

          {/* Section 3: Documents */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold border-b border-white/10 pb-2 flex items-center gap-2">
              <UploadCloud size={20} className="text-csrOrange" /> Documentation
            </h3>

            <div 
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer ${dragActive ? 'border-blue-400 bg-blue-400/10' : 'border-white/20 hover:bg-white/5'}`}
              onDragEnter={() => setDragActive(true)}
              onDragLeave={() => setDragActive(false)}
            >
              <UploadCloud className="mx-auto text-gray-400 mb-4" size={48} />
              <p className="font-bold text-lg mb-1">Upload Project Proposal & Budget</p>
              <p className="text-sm text-gray-500 mb-4">PDF, DOCX up to 10MB</p>
              <button type="button" className="bg-white/10 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-white/20 transition">
                Browse Files
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/20 transition-all transform hover:scale-[1.01] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" /> Submitting Proposal...
                </>
              ) : (
                <>
                  Submit for Verification <CheckCircle2 size={20} />
                </>
              )}
            </button>
            <p className="text-center text-xs text-gray-500 mt-4">By submitting, you agree to our CSR Compliance Terms & Conditions.</p>
          </div>

        </form>
      </GlassCard>
    </div>
  );
};