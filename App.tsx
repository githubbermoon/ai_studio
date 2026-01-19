
import React, { useState, useMemo } from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { PROJECTS, CATEGORIES } from './constants';
import { Project } from './types';
import ProjectCard from './components/ProjectCard';
import MLAssistant from './components/MLAssistant';
import MetricVisualization from './components/MetricVisualization';

// --- Layout Components ---

const Navbar = () => (
  <nav className="glass sticky top-0 z-40 border-b border-white/10 px-6 py-4">
    <div className="max-w-7xl mx-auto flex justify-between items-center">
      <Link to="/" className="flex items-center gap-2">
        <div className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center">
          <i className="fa-solid fa-brain text-white"></i>
        </div>
        <span className="text-xl font-bold tracking-tight">NEURAL<span className="text-sky-500">FORGE</span></span>
      </Link>
      <div className="hidden md:flex items-center gap-8">
        <Link to="/" className="text-sm font-medium hover:text-sky-400 transition-colors">Portfolio</Link>
        <Link to="/lab" className="text-sm font-medium hover:text-sky-400 transition-colors">Lab Insights</Link>
        <a href="https://github.com/githubbermoon/ml-portfolio" target="_blank" className="text-slate-400 hover:text-white transition-colors">
          <i className="fa-brands fa-github text-xl"></i>
        </a>
      </div>
    </div>
  </nav>
);

const Footer = () => (
  <footer className="border-t border-slate-800 py-12 mt-20">
    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="text-slate-500 text-sm">
        © 2024 NeuralForge ML Portfolio. Powered by Gemini.
      </div>
      <div className="flex gap-6 text-slate-400">
        <a href="#" className="hover:text-white transition-colors"><i className="fa-brands fa-linkedin text-xl"></i></a>
        <a href="#" className="hover:text-white transition-colors"><i className="fa-brands fa-twitter text-xl"></i></a>
        <a href="#" className="hover:text-white transition-colors"><i className="fa-brands fa-medium text-xl"></i></a>
      </div>
    </div>
  </footer>
);

// --- Page Components ---

const PortfolioPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') return PROJECTS;
    return PROJECTS.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="max-w-7xl mx-auto px-6 pt-12">
      {/* Hero Section */}
      <section className="mb-20 text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
          Solving Complexity with <span className="gradient-text">Neural Systems</span>
        </h1>
        <p className="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
          Showcasing research and development in Deep Learning, Computer Vision, and Natural Language Processing. Specialized in production-ready AI architectures.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <button className="bg-sky-500 hover:bg-sky-600 px-8 py-3 rounded-full font-bold transition-all shadow-lg shadow-sky-500/20">
            View Projects
          </button>
          <button className="glass px-8 py-3 rounded-full font-bold hover:bg-white/5 transition-all">
            Download CV
          </button>
        </div>
      </section>

      {/* Skills Matrix */}
      <section className="mb-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Architectures', items: ['Transformers', 'CNNs', 'GNNs', 'RNNs'] },
            { label: 'Deep Learning', items: ['PyTorch', 'TensorFlow', 'JAX', 'Keras'] },
            { label: 'Data Engineering', items: ['Apache Spark', 'Kafka', 'Airflow', 'dbt'] },
            { label: 'Cloud & MLOps', items: ['Kubernetes', 'AWS SageMaker', 'MLflow', 'Docker'] }
          ].map((skill, idx) => (
            <div key={idx} className="glass p-6 rounded-2xl border border-slate-800">
              <h4 className="text-sky-400 font-bold mb-3 text-sm uppercase tracking-widest">{skill.label}</h4>
              <ul className="space-y-1">
                {skill.items.map(item => (
                  <li key={item} className="text-slate-300 font-medium">{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Project Grid */}
      <section id="projects" className="mb-20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <h2 className="text-3xl font-bold">Featured Projects</h2>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat 
                    ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/20' 
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map(project => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              onClick={(p) => setSelectedProject(p)} 
            />
          ))}
        </div>
      </section>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="glass w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/10 animate-in fade-in zoom-in duration-300">
            <div className="relative h-64 md:h-96">
              <img src={selectedProject.image} className="w-full h-full object-cover" />
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 w-10 h-10 bg-slate-900/50 rounded-full flex items-center justify-center text-white hover:bg-slate-900"
              >
                <i className="fa-solid fa-times"></i>
              </button>
            </div>
            <div className="p-8">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div>
                  <span className="text-sky-400 text-sm font-bold uppercase tracking-widest">{selectedProject.category}</span>
                  <h2 className="text-4xl font-bold mt-1">{selectedProject.title}</h2>
                </div>
                <div className="flex gap-4">
                  <a href={selectedProject.githubUrl} target="_blank" className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-5 py-2.5 rounded-xl transition-colors">
                    <i className="fa-brands fa-github"></i> Source
                  </a>
                  <button className="flex items-center gap-2 bg-sky-500 hover:bg-sky-600 px-5 py-2.5 rounded-xl transition-colors text-white font-bold">
                    <i className="fa-solid fa-rocket"></i> Live Demo
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-6">
                  <div>
                    <h4 className="text-lg font-bold mb-2">Overview</h4>
                    <p className="text-slate-300 leading-relaxed">{selectedProject.description}</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-2">Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-slate-800 border border-slate-700 text-slate-300 rounded-lg text-xs font-mono uppercase">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl">
                    <h4 className="text-sm font-bold text-slate-500 uppercase mb-4 tracking-wider">Production Metrics</h4>
                    <div className="space-y-4">
                      {selectedProject.metrics.map(m => (
                        <div key={m.name} className="flex justify-between items-center">
                          <span className="text-slate-400">{m.name}</span>
                          <span className={`font-bold ${m.trend === 'up' ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {m.value}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const LabPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 pt-12 space-y-12 pb-20">
      <header className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">ML Laboratory <span className="text-sky-500">Analytics</span></h1>
        <p className="text-slate-400">Deep dive into real-time training metrics, model architecture validations, and inference benchmarks.</p>
      </header>

      <section>
        <MetricVisualization />
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass p-6 rounded-2xl border border-slate-800">
          <div className="w-12 h-12 bg-sky-500/10 rounded-xl flex items-center justify-center mb-4 text-sky-400">
            <i className="fa-solid fa-microchip text-2xl"></i>
          </div>
          <h3 className="font-bold text-xl mb-2">Hardware Specs</h3>
          <ul className="text-sm text-slate-400 space-y-2">
            <li className="flex justify-between"><span>Compute</span> <span>4x NVIDIA A100</span></li>
            <li className="flex justify-between"><span>RAM</span> <span>256GB ECC DDR4</span></li>
            <li className="flex justify-between"><span>VRAM</span> <span>320GB Total</span></li>
          </ul>
        </div>
        
        <div className="glass p-6 rounded-2xl border border-slate-800">
          <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center mb-4 text-indigo-400">
            <i className="fa-solid fa-database text-2xl"></i>
          </div>
          <h3 className="font-bold text-xl mb-2">Dataset Stats</h3>
          <ul className="text-sm text-slate-400 space-y-2">
            <li className="flex justify-between"><span>Corpus Size</span> <span>4.2 TB</span></li>
            <li className="flex justify-between"><span>Validation Split</span> <span>15%</span></li>
            <li className="flex justify-between"><span>Data Sources</span> <span>CommonCrawl, PubMed</span></li>
          </ul>
        </div>

        <div className="glass p-6 rounded-2xl border border-slate-800">
          <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-4 text-emerald-400">
            <i className="fa-solid fa-bolt text-2xl"></i>
          </div>
          <h3 className="font-bold text-xl mb-2">Optimizations</h3>
          <ul className="text-sm text-slate-400 space-y-2">
            <li className="flex justify-between"><span>Quantization</span> <span>FP16 / INT8</span></li>
            <li className="flex justify-between"><span>Parallelism</span> <span>Distributed DP</span></li>
            <li className="flex justify-between"><span>Compilation</span> <span>TorchDynamo / Triton</span></li>
          </ul>
        </div>
      </section>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col selection:bg-sky-500 selection:text-white">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<PortfolioPage />} />
            <Route path="/lab" element={<LabPage />} />
          </Routes>
        </main>
        <Footer />
        <MLAssistant />
      </div>
    </Router>
  );
};

export default App;
