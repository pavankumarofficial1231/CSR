import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PROJECTS, SECTORS } from '../constants';
import { GlassCard } from '../components/GlassCard';
import { ArrowLeft, Users, Clock, BadgeCheck } from 'lucide-react';

export const ProjectList: React.FC = () => {
  const { sectorId } = useParams();
  const navigate = useNavigate();
  
  const sectorInfo = SECTORS.find(s => s.id === sectorId);
  const sectorProjects = PROJECTS.filter(p => p.sector === sectorId) || [];

  if (!sectorInfo) return <div className="pt-32 text-center">Sector not found</div>;

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-screen">
      <button onClick={() => navigate(-1)} className="mb-8 flex items-center text-gray-400 hover:text-white transition-colors">
        <ArrowLeft size={20} className="mr-2" /> Back to Sectors
      </button>

      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-2">{sectorInfo.name} <span className="text-csrOrange">Projects</span></h1>
        <p className="text-gray-400">Explore verified opportunities to make a difference in {sectorInfo.name.toLowerCase()}.</p>
      </div>

      {sectorProjects.length === 0 ? (
        <div className="text-center py-20 opacity-50">No active projects in this sector currently.</div>
      ) : (
        <div className="grid gap-6">
          {sectorProjects.map((project) => (
            <GlassCard 
              key={project.id} 
              hoverEffect={true}
              className="flex flex-col md:flex-row gap-6 items-center"
            >
              <div className="w-full md:w-1/3 h-48 rounded-xl overflow-hidden relative">
                 <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                 <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md text-white text-xs px-2 py-1 rounded-full flex items-center">
                    <Clock size={12} className="mr-1" /> {project.daysLeft} days left
                 </div>
              </div>
              
              <div className="flex-1 w-full">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-2xl font-bold">{project.title}</h3>
                  {project.verified && <BadgeCheck size={24} className="text-blue-400 fill-blue-400/10" />}
                </div>
                <p className="text-gray-400 mb-4 line-clamp-2">{project.description}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                   <div>
                      <p className="text-xs text-gray-500 uppercase">Raised</p>
                      <p className="text-csrOrange font-bold">₹{(project.fundsRaised / 100000).toFixed(1)} Lakhs</p>
                   </div>
                   <div>
                      <p className="text-xs text-gray-500 uppercase">Goal</p>
                      <p className="font-bold">₹{(project.fundsRequired / 100000).toFixed(1)} Lakhs</p>
                   </div>
                </div>

                <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden mb-4">
                   <div 
                    className="h-full bg-csrOrange rounded-full" 
                    style={{ width: `${(project.fundsRaised / project.fundsRequired) * 100}%` }}
                   />
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 flex items-center"><Users size={14} className="mr-1"/> By {project.creator}</span>
                  <button 
                    onClick={() => navigate(`/project/${project.id}`)}
                    className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-lg text-sm font-semibold transition-colors border border-white/10"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  );
};