import { ArrowRight, Box, Play, Layers, Map } from 'lucide-react';
import { Link } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';

const Services = () => {
  return (
    <div className="flex flex-col w-full bg-black">
      {/* Hero Section */}
      <section className="pt-16 pb-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <ScrollReveal className="flex flex-col gap-6">
            <p className="text-gold font-medium uppercase tracking-wider text-sm">What We Do</p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1]">
              <span className="block">Cinematic</span>
              <span className="block">Visualization</span>
              <span className="block">for Modern</span>
              <span className="block">Developments.</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-md">
              Story-driven architectural visualization designed to help buyers emotionally experience projects before they're built.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={200} className="relative">
            <img src="/assets/Services_01_CET.png" alt="Modern Architecture" className="rounded-xl w-full h-auto object-cover" />
          </ScrollReveal>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <ScrollReveal delay={100} className="card p-10 flex flex-col gap-6 bg-[#0d0d0d] hover:bg-[#111]">
            <div className="text-gold"><Box size={36} strokeWidth={1.5} /></div>
            <h3 className="text-3xl font-bold">3D Architectural Rendering</h3>
            <p className="text-gray-400">
              Photorealistic exterior, interior, and aerial renders designed to showcase the full potential of your project.
            </p>
          </ScrollReveal>
          
          <ScrollReveal delay={200} className="card p-10 flex flex-col gap-6 bg-[#0d0d0d] hover:bg-[#111]">
            <div className="text-gold"><Play size={36} strokeWidth={1.5} /></div>
            <h3 className="text-3xl font-bold">3D Animation & Walkthroughs</h3>
            <p className="text-gray-400">
              Cinematic walkthroughs and story-driven animations designed to help buyers emotionally connect to future developments.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={300} className="card p-10 flex flex-col gap-6 bg-[#0d0d0d] hover:bg-[#111]">
            <div className="text-gold"><Layers size={36} strokeWidth={1.5} /></div>
            <h3 className="text-3xl font-bold">Real-Time & Interactive Experiences</h3>
            <p className="text-gray-400">
              Interactive visualization experiences that allow clients to explore projects in real time.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={400} className="card p-10 flex flex-col gap-6 bg-[#0d0d0d] hover:bg-[#111]">
            <div className="text-gold"><Map size={36} strokeWidth={1.5} /></div>
            <h3 className="text-3xl font-bold">Masterplanning & Aerials</h3>
            <p className="text-gray-400">
              High-end masterplans and aerial visuals designed to showcase the full scope of a development.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Portfolio Horizontal Section / Carousel */}
      <section className="py-20 px-6 overflow-hidden relative">
        <div className="max-w-7xl mx-auto relative group/carousel">
          
          {/* Navigation Buttons */}
          <div className="flex items-center justify-between absolute -top-12 right-0 gap-3 mb-4 z-10">
            <button 
              onClick={() => {
                document.getElementById('services-carousel').scrollBy({ left: -350, behavior: 'smooth' });
              }}
              className="w-10 h-10 rounded-full border border-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:border-gold transition-colors bg-black/50 backdrop-blur-sm"
              aria-label="Previous"
            >
              &#8592;
            </button>
            <button 
              onClick={() => {
                document.getElementById('services-carousel').scrollBy({ left: 350, behavior: 'smooth' });
              }}
              className="w-10 h-10 rounded-full border border-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:border-gold transition-colors bg-black/50 backdrop-blur-sm"
              aria-label="Next"
            >
              &#8594;
            </button>
          </div>

          <ScrollReveal>
            <div 
              id="services-carousel" 
              className="flex gap-6 overflow-x-auto pb-8 pt-4 snap-x no-scrollbar scroll-smooth"
            >
              {/* Card 1: High-End Villa Renderings */}
              <div className="min-w-[300px] md:min-w-[340px] max-w-[340px] snap-start">
                <div className="card p-0 overflow-hidden flex flex-col h-full bg-[#0d0d0d] border border-[#222] rounded-xl hover:border-gold/50 transition-all">
                  <div className="w-full aspect-[4/5] overflow-hidden">
                    <img src="/assets/Services_01_CET.png" alt="High-End Villa Renderings" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="p-6 flex flex-col gap-3 flex-grow bg-[#0d0d0d]">
                    <div className="flex items-start gap-3">
                       <div className="text-gold mt-0.5">
                         <svg className="w-6 h-6 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="1.5">
                           <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                         </svg>
                       </div>
                       <h4 className="font-bold uppercase tracking-wider text-base leading-tight text-white">High-End Villa Renderings</h4>
                    </div>
                    <p className="text-xs text-gray-400 leading-relaxed pl-9">Photorealistic visuals crafted to showcase design, lifestyle, and investment value.</p>
                  </div>
                </div>
              </div>

              {/* Card 2: Luxury Hospitality */}
              <div className="min-w-[300px] md:min-w-[340px] max-w-[340px] snap-start">
                <div className="card p-0 overflow-hidden flex flex-col h-full bg-[#0d0d0d] border border-[#222] rounded-xl hover:border-gold/50 transition-all">
                  <div className="w-full aspect-[4/5] overflow-hidden">
                    <img src="/assets/Services_02_CET.png" alt="Luxury Hospitality" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="p-6 flex flex-col gap-3 flex-grow bg-[#0d0d0d]">
                    <div className="flex items-start gap-3">
                       <div className="text-gold mt-0.5"><Map size={24} strokeWidth={1.5} /></div>
                       <h4 className="font-bold uppercase tracking-wider text-base leading-tight text-white">Luxury Hospitality</h4>
                    </div>
                    <p className="text-xs text-gray-400 leading-relaxed pl-9">Cinematic visualization for resorts, hotels, beach clubs, and wellness destinations.</p>
                  </div>
                </div>
              </div>
              
              {/* Card 3: Large-Scale Developments */}
              <div className="min-w-[300px] md:min-w-[340px] max-w-[340px] snap-start">
                <div className="card p-0 overflow-hidden flex flex-col h-full bg-[#0d0d0d] border border-[#222] rounded-xl hover:border-gold/50 transition-all">
                  <div className="w-full aspect-[4/5] overflow-hidden">
                    <img src="/assets/Services_03_CET.png" alt="Large-Scale Developments" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="p-6 flex flex-col gap-3 flex-grow bg-[#0d0d0d]">
                    <div className="flex items-start gap-3">
                       <div className="text-gold mt-0.5"><Layers size={24} strokeWidth={1.5} /></div>
                       <h4 className="font-bold uppercase tracking-wider text-base leading-tight text-white">Large-Scale Developments</h4>
                    </div>
                    <p className="text-xs text-gray-400 leading-relaxed pl-9">Masterplans and visualizations designed to communicate scale, vision, and impact.</p>
                  </div>
                </div>
              </div>

              {/* Card 4: Mixed-Use Developments */}
              <div className="min-w-[300px] md:min-w-[340px] max-w-[340px] snap-start">
                <div className="card p-0 overflow-hidden flex flex-col h-full bg-[#0d0d0d] border border-[#222] rounded-xl hover:border-gold/50 transition-all">
                  <div className="w-full aspect-[4/5] overflow-hidden">
                    <img src="/assets/Services_04_CET.png" alt="Mixed-Use Developments" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="p-6 flex flex-col gap-3 flex-grow bg-[#0d0d0d]">
                    <div className="flex items-start gap-3">
                       <div className="text-gold mt-0.5"><Box size={24} strokeWidth={1.5} /></div>
                       <h4 className="font-bold uppercase tracking-wider text-base leading-tight text-white">Mixed-Use Developments</h4>
                    </div>
                    <p className="text-xs text-gray-400 leading-relaxed pl-9">Visualization designed for mixed-use, hospitality, retail, and commercial developments.</p>
                  </div>
                </div>
              </div>

              {/* Card 5: Cinematic Walkthrough */}
              <div className="min-w-[300px] md:min-w-[340px] max-w-[340px] snap-start">
                <div className="card p-0 overflow-hidden flex flex-col h-full bg-[#0d0d0d] border border-[#222] rounded-xl hover:border-gold/50 transition-all">
                  <div className="w-full aspect-[4/5] overflow-hidden">
                    <img src="/assets/Services_05_CET.png" alt="Cinematic Walkthrough" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="p-6 flex flex-col gap-3 flex-grow bg-[#0d0d0d]">
                    <div className="flex items-start gap-3">
                       <div className="text-gold mt-0.5"><Play size={24} strokeWidth={1.5} /></div>
                       <h4 className="font-bold uppercase tracking-wider text-base leading-tight text-white">Cinematic Walkthrough</h4>
                    </div>
                    <p className="text-xs text-gray-400 leading-relaxed pl-9">Story-driven animations that bring architecture to life with emotion and flow.</p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
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

export default Services;
