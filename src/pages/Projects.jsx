import { useState } from 'react';
import { ArrowRight, Map } from 'lucide-react';
import { Link } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';

const Projects = () => {
  const [filter, setFilter] = useState('All');
  const filters = ['All', 'Commercial', 'Residential', 'Resorts', 'Villas'];

  const projects = [
    { id: 1, image: '/assets/Project_01_BeachFront_CET.png', category: 'Resorts' },
    { id: 2, image: '/assets/Project_02_Villas_Complex_CET.png', category: 'Villas' },
    { id: 3, image: '/assets/Project_03_Modern_Residence_CET.png', category: 'Residential' },
    { id: 4, image: '/assets/Project_04_Tropical_Resort_CET.png', category: 'Resorts' },
    { id: 5, image: '/assets/Project_05_Modern_Villa_CET.png', category: 'Villas' },
    { id: 6, image: '/assets/Project_06_Caftop_Villa_C_CET.png', category: 'Residential' },
  ];

  const filteredProjects = filter === 'All' ? projects : projects.filter(p => p.category === filter);

  return (
    <div className="flex flex-col w-full bg-black min-h-screen">
      {/* Hero Section */}
      <section className="pt-16 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <p className="text-gold font-medium uppercase tracking-wider text-sm mb-4">Our Work</p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.1] max-w-2xl mb-6">
              <span className="block">Visuals that bring</span>
              <span className="block">ideas to life.</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl">
              A curated collection of architectural visualizations, cinematic renders, and immersive experiences crafted for luxury real estate and modern developments.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Filters */}
      <section className="pb-8 px-6">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal delay={100} className="flex flex-wrap gap-4">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-6 py-2 rounded-md font-medium transition-colors border ${
                  filter === f 
                    ? 'bg-gold text-black border-gold' 
                    : 'bg-transparent text-white border-[#333] hover:border-gold'
                }`}
              >
                {f}
              </button>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="pb-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, idx) => (
            <ScrollReveal key={project.id} delay={(idx % 3) * 150}>
              <div className="relative group overflow-hidden rounded-xl bg-[#0d0d0d] aspect-[4/3] border border-[#222] hover:border-gold/50 transition-all">
                <img 
                  src={project.image} 
                  alt={`Project ${project.id}`} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                   <Link to="/contact" className="text-white font-medium bg-black/80 px-6 py-2 rounded-full hover:text-gold transition-colors">
                      View Project
                   </Link>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* CTA Bottom */}
      <section className="py-12 px-6 mb-12">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="card p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 bg-[#0d0d0d]">
               <div className="flex items-center gap-6">
                  <div className="text-gold bg-gold/10 p-4 rounded-full">
                    <Map size={48} strokeWidth={1} />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold mb-2">Have a project in mind?</h3>
                    <p className="text-gray-400">Let's bring your vision to life.</p>
                  </div>
               </div>
               <Link to="/contact" className="btn-secondary whitespace-nowrap">
                  Get Started <ArrowRight size={18} />
               </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default Projects;
