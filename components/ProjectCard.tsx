
import React from 'react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  onClick: (p: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  return (
    <div 
      onClick={() => onClick(project)}
      className="glass rounded-xl overflow-hidden group cursor-pointer hover:border-sky-500/50 transition-all duration-300 transform hover:-translate-y-1"
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60"></div>
        <div className="absolute top-4 left-4">
          <span className="px-2 py-1 text-xs font-semibold bg-sky-500 text-white rounded-md uppercase tracking-wider">
            {project.category}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 group-hover:text-sky-400 transition-colors">{project.title}</h3>
        <p className="text-slate-400 text-sm mb-4 line-clamp-2">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.slice(0, 3).map(tag => (
            <span key={tag} className="px-2 py-0.5 text-[10px] font-medium bg-slate-800 border border-slate-700 text-slate-300 rounded uppercase">
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="text-[10px] text-slate-500">+{project.tags.length - 3} more</span>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 border-t border-slate-800 pt-4">
          {project.metrics.map(m => (
            <div key={m.name}>
              <p className="text-[10px] text-slate-500 uppercase font-bold">{m.name}</p>
              <p className="text-lg font-bold flex items-center gap-1">
                {m.value}%
                {m.trend === 'up' ? (
                  <i className="fa-solid fa-caret-up text-emerald-400 text-xs"></i>
                ) : (
                  <i className="fa-solid fa-caret-down text-rose-400 text-xs"></i>
                )}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
