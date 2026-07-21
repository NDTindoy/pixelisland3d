import { useState } from 'react';
import { ArrowRight, Map } from 'lucide-react';
import { Link } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';

const Projects = () => {
  const [filter, setFilter] = useState('All');
  const filters = ['All', 'Commercial', 'Residential', 'Resorts', 'Villas'];

  const projects = [
    { 
      id: 1, 
      title: 'Beachfront Resort',
      subtitle: 'Tropical Lagoon Villa Resort',
      image: '/assets/Project_01_BeachFront_CET.png', 
      category: 'Resorts',
      link: '/projects/beachfront-resort'
    },
    { 
      id: 2, 
      title: 'Villas Complex',
      subtitle: 'Luxury Villa Development',
      image: '/assets/Project_02_Villas_Complex_CET.png', 
      category: 'Villas',
      link: '/projects/beachfront-resort'
    },
    { 
      id: 3, 
      title: 'Modern Residence',
      subtitle: 'Contemporary Private Home',
      image: '/assets/Project_03_Modern_Residence_CET.png', 
      category: 'Residential',
      link: '/projects/beachfront-resort'
    },
    { 
      id: 4, 
      title: 'Tropical Resort',
      subtitle: 'Coastal Leisure Destination',
      image: '/assets/Project_04_Tropical_Resort_CET.png', 
      category: 'Resorts',
      link: '/projects/beachfront-resort'
    },
    { 
      id: 5, 
      title: 'Modern Villa',
      subtitle: 'Cliffside Architectural Retreat',
      image: '/assets/Project_05_Modern_Villa_CET.png', 
      category: 'Villas',
      link: '/projects/beachfront-resort'
    },
    { 
      id: 6, 
      title: 'Hilltop Residence',
      subtitle: 'Panorarnic Villa Concept',
      image: '/assets/Project_06_Caftop_Villa_C_CET.png', 
      category: 'Residential',
      link: '/projects/beachfront-resort'
    },
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
              <Link 
                to={project.link} 
                className="block relative group overflow-hidden rounded-xl bg-[#0d0d0d] aspect-[4/3] border border-[#222] hover:border-gold/50 transition-all cursor-pointer shadow-lg"
              >
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                
                {/* Title badge overlay at bottom */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-5 flex items-end justify-between transition-opacity duration-300">
                  <div>
                    <h3 className="text-white font-bold text-lg group-hover:text-gold transition-colors">{project.title}</h3>
                    <p className="text-gray-400 text-xs mt-0.5">{project.subtitle}</p>
                  </div>
                  <span className="text-xs text-gold border border-gold/40 bg-black/60 px-3 py-1 rounded-full opacity-90 group-hover:opacity-100 group-hover:bg-gold group-hover:text-black transition-all">
                    View Project
                  </span>
                </div>
              </Link>
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
