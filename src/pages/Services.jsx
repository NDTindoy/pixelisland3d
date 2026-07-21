import { ArrowRight, Box, Play, Layers, Map, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import ScrollReveal from '../components/ScrollReveal';
import ImageLightbox from '../components/ImageLightbox';

const servicesData = [
  {
    id: 'villa',
    title: 'High-End Villa Renderings',
    desc: 'Photorealistic visuals crafted to showcase design, lifestyle, and investment value.',
    image: '/assets/Services_01_CET.png',
    fullImage: '/assets/Services_01_CE.png',
    type: 'home'
  },
  {
    id: 'hospitality',
    title: 'Luxury Hospitality',
    desc: 'Cinematic visualization for resorts, hotels, beach clubs, and wellness destinations.',
    image: '/assets/Services_02_CET.png',
    fullImage: '/assets/Services_02_CE.png',
    type: 'map'
  },
  {
    id: 'large-scale',
    title: 'Large-Scale Developments',
    desc: 'Masterplans and visualizations designed to communicate scale, vision, and impact.',
    image: '/assets/Services_03_CET.png',
    fullImage: '/assets/Services_03_CE.png',
    type: 'layers'
  },
  {
    id: 'mixed-use',
    title: 'Mixed-Use Developments',
    desc: 'Visualization designed for mixed-use, hospitality, retail, and commercial developments.',
    image: '/assets/Services_04_CET.png',
    fullImage: '/assets/Services_04_CE.png',
    type: 'box'
  },
  {
    id: 'walkthrough',
    title: 'Cinematic Walkthrough',
    desc: 'Story-driven animations that bring architecture to life with emotion and flow.',
    image: '/assets/Services_05_CET.png',
    fullImage: '/assets/Services_05_CE.png',
    type: 'play'
  }
];

// Duplicate array for endless seamless loop
const infiniteData = [...servicesData, ...servicesData, ...servicesData];

const Services = () => {
  const [currentIndex, setCurrentIndex] = useState(servicesData.length);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const isHovered = useRef(false);
  const [lightbox, setLightbox] = useState({ isOpen: false, src: '', title: '' });

  const openLightbox = (src, title) => {
    setLightbox({ isOpen: true, src, title });
  };

  const closeLightbox = () => {
    setLightbox({ isOpen: false, src: '', title: '' });
  };

  // Auto-scroll every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered.current) {
        handleNext();
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleNext = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  };

  const handleTransitionEnd = () => {
    if (currentIndex >= servicesData.length * 2) {
      setIsTransitioning(false);
      setCurrentIndex(servicesData.length);
    } else if (currentIndex < servicesData.length) {
      setIsTransitioning(false);
      setCurrentIndex(servicesData.length * 2 - 1);
    }
  };

  const renderIcon = (type) => {
    switch (type) {
      case 'home':
        return (
          <svg className="w-6 h-6 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
          </svg>
        );
      case 'map':
        return <Map size={24} strokeWidth={1.5} />;
      case 'layers':
        return <Layers size={24} strokeWidth={1.5} />;
      case 'box':
        return <Box size={24} strokeWidth={1.5} />;
      case 'play':
        return <Play size={24} strokeWidth={1.5} />;
      default:
        return <Box size={24} strokeWidth={1.5} />;
    }
  };

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
          <ScrollReveal 
            delay={200} 
            className="relative cursor-pointer group rounded-xl overflow-hidden"
            onClick={() => openLightbox('/assets/Services_01_CE.png', 'Cinematic Visualization for Modern Developments')}
          >
            <img src="/assets/Services_01_CET.png" alt="Modern Architecture" className="rounded-xl w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Maximize2 size={32} className="text-gold" />
            </div>
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

      {/* Portfolio Carousel Container matching 4 panels visible layout */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div 
              className="relative border border-[#222] bg-[#050505] rounded-2xl p-4 md:p-6"
              onMouseEnter={() => (isHovered.current = true)}
              onMouseLeave={() => (isHovered.current = false)}
            >
              
              {/* Left Arrow Button centered on left edge */}
              <button 
                onClick={handlePrev}
                className="absolute -left-5 md:-left-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full border border-gold/50 bg-black text-gold hover:text-white hover:border-gold transition-all flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95"
                aria-label="Previous"
              >
                <ChevronLeft size={24} />
              </button>

              {/* Right Arrow Button centered on right edge */}
              <button 
                onClick={handleNext}
                className="absolute -right-5 md:-right-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full border border-gold/50 bg-black text-gold hover:text-white hover:border-gold transition-all flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95"
                aria-label="Next"
              >
                <ChevronRight size={24} />
              </button>

              {/* Hidden Scrollbar Container */}
              <div className="overflow-hidden w-full py-1">
                <div 
                  className={`flex gap-4 md:gap-5 ${isTransitioning ? 'transition-transform duration-700 ease-in-out' : ''}`}
                  style={{
                    transform: `translateX(calc(-${currentIndex} * (100% / 4 + 5px)))`
                  }}
                  onTransitionEnd={handleTransitionEnd}
                >
                  {infiniteData.map((item, index) => (
                    <div 
                      key={`${item.id}-${index}`} 
                      className="w-[85%] sm:w-[45%] md:w-[31%] lg:w-[calc((100%-60px)/4)] flex-shrink-0"
                    >
                      <div 
                        onClick={() => openLightbox(item.fullImage, item.title)}
                        className="card p-0 overflow-hidden flex flex-col h-full bg-[#0d0d0d] border border-[#222] rounded-xl hover:border-gold/50 transition-all group cursor-pointer"
                      >
                        <div className="w-full aspect-[4/5] overflow-hidden relative">
                          <img 
                            src={item.image} 
                            alt={item.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Maximize2 size={24} className="text-gold" />
                          </div>
                        </div>
                        <div className="p-5 flex flex-col gap-2.5 flex-grow bg-[#0d0d0d]">
                          <div className="flex items-start gap-2.5">
                             <div className="text-gold mt-0.5 flex-shrink-0">
                               {renderIcon(item.type)}
                             </div>
                             <h4 className="font-bold uppercase tracking-wider text-sm md:text-base leading-tight text-white group-hover:text-gold transition-colors">{item.title}</h4>
                          </div>
                          <p className="text-xs text-gray-400 leading-relaxed pl-8">{item.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
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

export default Services;
