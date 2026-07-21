import { ArrowRight, Globe, Image as ImageIcon, Ruler, Trophy, Maximize2 } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import ImageLightbox from '../components/ImageLightbox';

const Home = () => {
  const [lightbox, setLightbox] = useState({ isOpen: false, src: '', title: '' });

  const openLightbox = (src, title) => {
    setLightbox({ isOpen: true, src, title });
  };

  const closeLightbox = () => {
    setLightbox({ isOpen: false, src: '', title: '' });
  };

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center px-6">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10" />
          <img src="/assets/Home_01_CET.png" alt="Luxury Villa" className="w-full h-full object-cover object-right" />
        </div>
        <div className="max-w-7xl mx-auto w-full relative z-20 grid grid-cols-1 md:grid-cols-2">
          <ScrollReveal className="flex flex-col gap-6">
            <p className="text-gold font-medium uppercase tracking-wider text-sm">3D Visualization Studio</p>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-[1.1]">
              <span className="block">Sell your project</span>
              <span className="block">Before it's built.</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-md mt-2">
              Cinematic architectural visualization and emotional storytelling designed to help developers sell the vision before construction begins.
            </p>
            <div className="flex items-center gap-6 mt-4">
              <Link to="/contact" className="btn-primary">
                Get Started <ArrowRight size={18} />
              </Link>
              <Link to="/projects" className="text-white font-medium hover:text-gold transition-colors flex items-center gap-2">
                View Our Work <ArrowRight size={18} />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-24 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal className="flex flex-col gap-6">
              <p className="text-gold font-medium uppercase tracking-wider text-sm">Our Story</p>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                Helping Buyers Experience the Future Before It Exists.
              </h2>
              <p className="text-gray-400 text-lg">
                Most unbuilt developments struggle to create emotional connection before construction begins.
              </p>
              <p className="text-gray-400 text-lg">
                Pixel Island transforms concepts, plans, and ideas into cinematic visual experiences that help developers present projects with confidence, clarity, and premium market perception.
              </p>
              <p className="text-gray-400 text-lg mb-4">
                Through high-end CGI, walkthroughs, and immersive visualization, we help bring future developments to life before the first brick is laid.
              </p>
              <div>
                <Link to="/about" className="btn-secondary inline-flex w-auto">
                  Learn More <ArrowRight size={18} />
                </Link>
              </div>
            </ScrollReveal>
            <ScrollReveal 
              delay={200} 
              className="relative cursor-pointer group rounded-xl overflow-hidden"
              onClick={() => openLightbox('/assets/Home_01_CE.png', 'Helping Buyers Experience the Future')}
            >
               <img src="/assets/Home_01_CET.png" alt="Modern Architecture" className="rounded-xl w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700" />
               <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                 <Maximize2 size={32} className="text-gold" />
               </div>
            </ScrollReveal>
          </div>

          {/* Stats Bar */}
          <ScrollReveal delay={150}>
            <div className="mt-24 card grid grid-cols-2 md:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-[#333]">
              <div className="flex items-center gap-4 p-4">
                 <div className="text-gold"><Trophy size={32} /></div>
                 <div>
                   <h4 className="text-2xl font-bold">6+</h4>
                   <p className="text-xs text-gray-400 uppercase tracking-wider">Years of Experience</p>
                 </div>
              </div>
              <div className="flex items-center gap-4 p-4">
                 <div className="text-gold"><Ruler size={32} /></div>
                 <div>
                   <h4 className="text-2xl font-bold">4000+</h4>
                   <p className="text-xs text-gray-400 uppercase tracking-wider">Visualization Hours</p>
                 </div>
              </div>
              <div className="flex items-center gap-4 p-4">
                 <div className="text-gold"><Globe size={32} /></div>
                 <div>
                   <h4 className="text-2xl font-bold">20+</h4>
                   <p className="text-xs text-gray-400 uppercase tracking-wider">Visualized Projects</p>
                 </div>
              </div>
              <div className="flex items-center gap-4 p-4">
                 <div className="text-gold"><ImageIcon size={32} /></div>
                 <div className="flex items-center h-full">
                   <h4 className="text-sm font-bold uppercase tracking-wider">Luxury-Driven Design</h4>
                 </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* What Sets Us Apart */}
      <section className="py-24 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="mb-16">
            <p className="text-gold font-medium uppercase tracking-wider text-sm mb-4">What Sets Us Apart</p>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight max-w-3xl">
              High-end visualization designed for modern developments.
            </h2>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
             {/* Panel 1 */}
             <div 
               onClick={() => openLightbox('/assets/Home_02_CE.png', 'Strategic Visuals')}
               className="card flex flex-col gap-4 p-0 overflow-hidden group cursor-pointer hover:border-gold/60 transition-all shadow-lg relative"
             >
               <div className="h-48 overflow-hidden relative">
                 <img src="/assets/Home_02_CET.png" alt="Strategic Visuals" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                 <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <Maximize2 size={24} className="text-gold" />
                 </div>
               </div>
               <div className="p-6">
                 <div className="flex items-center gap-3 mb-3">
                   <div className="text-gold"><ImageIcon size={24} /></div>
                   <h3 className="text-xl font-bold group-hover:text-gold transition-colors">Strategic Visuals</h3>
                 </div>
                 <p className="text-gray-400 text-sm">Designed to elevate project presentation and buyer confidence.</p>
               </div>
             </div>

             {/* Panel 2 */}
             <div 
               onClick={() => openLightbox('/assets/Home_03_CE.png', 'Attention to Detail')}
               className="card flex flex-col gap-4 p-0 overflow-hidden group cursor-pointer hover:border-gold/60 transition-all shadow-lg relative"
             >
               <div className="h-48 overflow-hidden relative">
                 <img src="/assets/Home_03_CET.png" alt="Attention to Detail" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                 <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <Maximize2 size={24} className="text-gold" />
                 </div>
               </div>
               <div className="p-6">
                 <div className="flex items-center gap-3 mb-3">
                   <div className="text-gold"><Ruler size={24} /></div>
                   <h3 className="text-xl font-bold group-hover:text-gold transition-colors">Attention to Detail</h3>
                 </div>
                 <p className="text-gray-400 text-sm">High-end visuals crafted to reflect the true value of your development.</p>
               </div>
             </div>

             {/* Panel 3 */}
             <div 
               onClick={() => openLightbox('/assets/Home_04_CE.png', 'Precision Execution')}
               className="card flex flex-col gap-4 p-0 overflow-hidden group cursor-pointer hover:border-gold/60 transition-all shadow-lg relative"
             >
               <div className="h-48 overflow-hidden relative">
                 <img src="/assets/Home_04_CET.png" alt="Precision Execution" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                 <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <Maximize2 size={24} className="text-gold" />
                 </div>
               </div>
               <div className="p-6">
                 <div className="flex items-center gap-3 mb-3">
                   <div className="text-gold"><Globe size={24} /></div>
                   <h3 className="text-xl font-bold group-hover:text-gold transition-colors">Precision Execution</h3>
                 </div>
                 <p className="text-gray-400 text-sm">Efficient execution built around precision and quality.</p>
               </div>
             </div>

             {/* Panel 4 */}
             <div 
               onClick={() => openLightbox('/assets/Home_05_CE.png', 'Developer-Focused')}
               className="card flex flex-col gap-4 p-0 overflow-hidden group cursor-pointer hover:border-gold/60 transition-all shadow-lg relative"
             >
               <div className="h-48 overflow-hidden relative">
                 <img src="/assets/Home_05_CET.png" alt="Developer-Focused" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                 <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <Maximize2 size={24} className="text-gold" />
                 </div>
               </div>
               <div className="p-6">
                 <div className="flex items-center gap-3 mb-3">
                   <div className="text-gold"><Trophy size={24} /></div>
                   <h3 className="text-xl font-bold group-hover:text-gold transition-colors">Developer-Focused</h3>
                 </div>
                 <p className="text-gray-400 text-sm">Designed for modern developers and premium projects.</p>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 px-6 bg-black mb-12">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="card p-0 overflow-hidden grid grid-cols-1 lg:grid-cols-2">
              <div 
                className="h-64 lg:h-auto cursor-pointer group relative overflow-hidden"
                onClick={() => openLightbox('/assets/Home_06_CE.png', 'Let\'s Bring Your Project to Life')}
              >
                 <img src="/assets/Home_06_CET.png" alt="Bring Project to Life" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                 <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <Maximize2 size={32} className="text-gold" />
                 </div>
              </div>
              <div className="p-12 md:p-16 flex flex-col justify-center bg-[#0d0d0d]">
                 <p className="text-gold font-medium uppercase tracking-wider text-xs mb-4">Ready to Get Started?</p>
                 <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
                   Let's Bring Your Project to Life.
                 </h2>
                 <p className="text-gray-400 mb-8 max-w-md">
                   High-end visualization designed to help developers present projects with clarity and confidence.
                 </p>
                 <div>
                   <Link to="/contact" className="btn-primary inline-flex">
                     Get Started <ArrowRight size={18} />
                   </Link>
                 </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* LIGHTBOX PREVIEW */}
      <ImageLightbox
        isOpen={lightbox.isOpen}
        onClose={closeLightbox}
        imageSrc={lightbox.src}
        title={lightbox.title}
      />
    </div>
  );
};

export default Home;
