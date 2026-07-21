import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Building2, 
  Camera, 
  Calendar, 
  CheckCircle2, 
  Play, 
  ChevronLeft, 
  ChevronRight, 
  X, 
  ArrowRight,
  ArrowLeft,
  Map,
  Maximize2
} from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';

const BeachfrontResort = () => {
  const [activeCarouselIdx, setActiveCarouselIdx] = useState(0);
  const [lightboxImg, setLightboxImg] = useState(null);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const conceptImages = [
    { id: '01', src: '/assets/BF_SKP_01.png', title: 'Sketchup Aerial Concept' },
    { id: '02', src: '/assets/BF_SKP_02.png', title: 'Sketchup Villa Courtyard' },
    { id: '03', src: '/assets/BF_SKP_03.png', title: 'Sketchup Pool Perspective' },
    { id: '04', src: '/assets/BF_SKP_04.png', title: 'Sketchup Site Masterplan' },
  ];

  const carouselSlides = [
    {
      src: '/assets/Beachfront_Pool_Deck.png',
      caption: 'Rendered beachfront pool deck',
      subcaption: 'Architecture retained, atmosphere elevated',
    },
    {
      src: '/assets/Gallery_Aerial_Masterplan.png',
      caption: 'Aerial masterplan visualization',
      subcaption: 'Seamless integration with tropical coastline',
    },
    {
      src: '/assets/Gallery_Twilight_Pool.png',
      caption: 'Twilight resort pool experience',
      subcaption: 'Warm ambient lighting & dusk atmosphere',
    },
    {
      src: '/assets/Gallery_Dining_Terrace.png',
      caption: 'Luxury beachfront dining terrace',
      subcaption: 'Coastal leisure and hospitality design',
    },
  ];

  const galleryStills = [
    {
      title: 'Aerial Masterplan',
      subtitle: 'Portfolio still',
      src: '/assets/Gallery_Aerial_Masterplan.png',
    },
    {
      title: 'Twilight Pool',
      subtitle: 'Portfolio still',
      src: '/assets/Gallery_Twilight_Pool.png',
    },
    {
      title: 'Dining Terrace',
      subtitle: 'Portfolio still',
      src: '/assets/Gallery_Dining_Terrace.png',
    },
  ];

  const prevSlide = () => {
    setActiveCarouselIdx((prev) => (prev === 0 ? carouselSlides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setActiveCarouselIdx((prev) => (prev === carouselSlides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="flex flex-col w-full bg-black min-h-screen">
      {/* Back Navigation Bar */}
      <div className="max-w-7xl mx-auto w-full px-6 pt-6 pb-2">
        <Link 
          to="/projects" 
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gold transition-colors font-medium group"
        >
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
          Back to Projects
        </Link>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto w-full px-6 pb-24 space-y-12">
        
        {/* HERO BANNER SECTION */}
        <ScrollReveal className="w-full">
          <div className="relative w-full aspect-[21/9] min-h-[360px] md:min-h-[460px] rounded-2xl overflow-hidden border border-[#222] group shadow-2xl">
            <img 
              src="/assets/Beachfront_Pool_Deck.png" 
              alt="Tropical Lagoon Villa Resort" 
              className="w-full h-full object-cover"
            />
            {/* Dark gradient overlay for text legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/30 flex flex-col justify-between p-6 md:p-12">
              <div className="max-w-2xl">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-3 font-serif">
                  Tropical Lagoon <br />
                  <span className="text-[#e5c158]">Villa Resort</span>
                </h1>
                <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl font-light">
                  A cinematic beachfront retreat where tropical architecture, coastal leisure, and warm resort living come together.
                </p>
              </div>

              {/* Play Video Button on bottom-right of hero image */}
              <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10">
                <button 
                  onClick={() => setIsVideoOpen(true)}
                  aria-label="Play Resort Animation Video"
                  className="w-14 h-14 md:w-20 md:h-20 rounded-full bg-black/60 border border-gold/60 backdrop-blur-md flex items-center justify-center text-gold hover:text-black hover:bg-gold hover:scale-105 transition-all shadow-lg hover:shadow-gold/20 group/btn"
                >
                  <Play size={26} className="fill-current ml-1 transition-transform group-hover/btn:scale-110" />
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* METADATA BAR */}
        <ScrollReveal delay={100} className="w-full">
          <div className="bg-[#0d0d0d] border border-[#222] rounded-xl p-6 md:p-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
            <div className="flex items-start gap-4">
              <div className="text-gold p-2 rounded-lg bg-gold/10 shrink-0">
                <MapPin size={22} />
              </div>
              <div>
                <p className="text-[11px] font-semibold tracking-wider text-gray-400 uppercase">LOCATION</p>
                <p className="text-white font-medium text-sm md:text-base mt-0.5">Tropical Coastline</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="text-gold p-2 rounded-lg bg-gold/10 shrink-0">
                <Building2 size={22} />
              </div>
              <div>
                <p className="text-[11px] font-semibold tracking-wider text-gray-400 uppercase">PROJECT TYPE</p>
                <p className="text-white font-medium text-sm md:text-base mt-0.5">Beachfront Resort</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="text-gold p-2 rounded-lg bg-gold/10 shrink-0">
                <Camera size={22} />
              </div>
              <div>
                <p className="text-[11px] font-semibold tracking-wider text-gray-400 uppercase">DELIVERABLES</p>
                <p className="text-white font-medium text-sm md:text-base mt-0.5">3D Renders, Animation, VR</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="text-gold p-2 rounded-lg bg-gold/10 shrink-0">
                <Calendar size={22} />
              </div>
              <div>
                <p className="text-[11px] font-semibold tracking-wider text-gray-400 uppercase">YEAR</p>
                <p className="text-white font-medium text-sm md:text-base mt-0.5">2024</p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* PROJECT OVERVIEW */}
        <ScrollReveal delay={150} className="w-full">
          <div className="space-y-6">
            <p className="text-gold font-semibold uppercase tracking-wider text-xs">PROJECT OVERVIEW</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start">
              <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                A boutique beachfront destination designed for slow luxury, social connection, and memorable guest experiences. The visualization package captures the resort across planning, final renders, gallery stills, and motion-ready moments.
              </p>

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="text-gold mt-1 shrink-0">
                    <CheckCircle2 size={20} className="stroke-[1.5]" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-sm uppercase tracking-wide">ARCHITECTURAL VISUALIZATION</h4>
                    <p className="text-gray-400 text-xs md:text-sm mt-0.5">Photorealistic exterior and amenity renders</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="text-gold mt-1 shrink-0">
                    <CheckCircle2 size={20} className="stroke-[1.5]" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-sm uppercase tracking-wide">ANIMATION & WALKTHROUGHS</h4>
                    <p className="text-gray-400 text-xs md:text-sm mt-0.5">Cinematic flythroughs and promotional clips</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="text-gold mt-1 shrink-0">
                    <CheckCircle2 size={20} className="stroke-[1.5]" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-sm uppercase tracking-wide">PRESENTATION MATERIALS</h4>
                    <p className="text-gray-400 text-xs md:text-sm mt-0.5">High-impact stills for marketing and onboarding</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* CONCEPT TO VISUALIZATION */}
        <ScrollReveal delay={200} className="w-full space-y-6">
          <p className="text-gold font-semibold uppercase tracking-wider text-xs">CONCEPT TO VISUALIZATION</p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* BEFORE / CONCEPT PRESENTATION (SKETCHUP) */}
            <div className="space-y-4">
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                BEFORE / CONCEPT PRESENTATION (SKETCHUP)
              </p>
              
              <div className="grid grid-cols-2 gap-3">
                {conceptImages.map((img) => (
                  <div 
                    key={img.id}
                    onClick={() => setLightboxImg(img.src)}
                    className="relative group aspect-[4/3] rounded-lg overflow-hidden border border-[#222] bg-[#0d0d0d] cursor-pointer hover:border-gold/60 transition-all"
                  >
                    <img 
                      src={img.src} 
                      alt={img.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute bottom-2 left-2 bg-black/80 text-white text-[11px] font-mono px-2 py-0.5 rounded border border-[#333]">
                      {img.id}
                    </div>
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Maximize2 size={20} className="text-gold" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AFTER / FINAL VISUALIZATION CAROUSEL */}
            <div className="space-y-4">
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                AFTER / FINAL VISUALIZATION CAROUSEL
              </p>

              <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-[#222] bg-[#0d0d0d] group shadow-xl">
                <img 
                  src={carouselSlides[activeCarouselIdx].src} 
                  alt={carouselSlides[activeCarouselIdx].caption}
                  className="w-full h-full object-cover transition-all duration-700"
                />

                {/* Left Arrow Button */}
                <button
                  onClick={prevSlide}
                  aria-label="Previous Slide"
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 border border-[#333] backdrop-blur-md text-white hover:text-gold hover:border-gold transition-all flex items-center justify-center"
                >
                  <ChevronLeft size={20} />
                </button>

                {/* Right Arrow Button */}
                <button
                  onClick={nextSlide}
                  aria-label="Next Slide"
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 border border-[#333] backdrop-blur-md text-white hover:text-gold hover:border-gold transition-all flex items-center justify-center"
                >
                  <ChevronRight size={20} />
                </button>

                {/* Bottom Overlay Caption */}
                <div 
                  onClick={() => setLightboxImg(carouselSlides[activeCarouselIdx].src)}
                  className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-5 cursor-pointer"
                >
                  <p className="text-white text-sm font-semibold tracking-wide">
                    {carouselSlides[activeCarouselIdx].caption}
                  </p>
                  <p className="text-gray-400 text-xs mt-0.5">
                    {carouselSlides[activeCarouselIdx].subcaption}
                  </p>
                </div>

                {/* Dots indicator */}
                <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-black/50 px-3 py-1.5 rounded-full border border-[#333] backdrop-blur-md">
                  {carouselSlides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveCarouselIdx(i)}
                      className={`h-2 rounded-full transition-all ${
                        activeCarouselIdx === i ? 'w-5 bg-gold' : 'w-2 bg-gray-500 hover:bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

          </div>
        </ScrollReveal>

        {/* CURATED GALLERY */}
        <ScrollReveal delay={250} className="w-full space-y-6">
          <p className="text-gold font-semibold uppercase tracking-wider text-xs">CURATED GALLERY</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {galleryStills.map((still, idx) => (
              <div
                key={idx}
                onClick={() => setLightboxImg(still.src)}
                className="relative group aspect-[16/10] rounded-xl overflow-hidden border border-[#222] bg-[#0d0d0d] cursor-pointer hover:border-gold/60 transition-all shadow-lg"
              >
                <img 
                  src={still.src} 
                  alt={still.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-5">
                  <h4 className="text-white font-bold text-base group-hover:text-gold transition-colors">{still.title}</h4>
                  <p className="text-gray-400 text-xs mt-0.5">{still.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* BOTTOM CTA CARD */}
        <ScrollReveal delay={300} className="w-full pt-6">
          <div className="card p-8 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8 bg-[#0d0d0d] border-[#222]">
            <div className="flex items-center gap-6">
              <div className="text-gold bg-gold/10 p-4 rounded-full">
                <Map size={44} strokeWidth={1} />
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-bold mb-2 text-white">Have a project in mind?</h3>
                <p className="text-gray-400 text-sm md:text-base">Let's bring your vision to life with photorealistic 3D visualization.</p>
              </div>
            </div>
            <Link to="/contact" className="btn-primary whitespace-nowrap px-8 py-3.5 text-base">
              Get Started <ArrowRight size={18} />
            </Link>
          </div>
        </ScrollReveal>

      </div>

      {/* LIGHTBOX MODAL */}
      {lightboxImg && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-lg flex items-center justify-center p-4"
          onClick={() => setLightboxImg(null)}
        >
          <button 
            onClick={() => setLightboxImg(null)}
            className="absolute top-6 right-6 text-white/70 hover:text-white p-2 rounded-full bg-white/10 transition-colors"
          >
            <X size={28} />
          </button>
          <img 
            src={lightboxImg} 
            alt="Enlarged view" 
            className="max-w-full max-h-[90vh] object-contain rounded-lg border border-[#333] shadow-2xl"
          />
        </div>
      )}

      {/* VIDEO PLAYER MODAL */}
      {isVideoOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-lg flex items-center justify-center p-4"
          onClick={() => setIsVideoOpen(false)}
        >
          <div 
            className="relative w-full max-w-5xl bg-black rounded-2xl overflow-hidden border border-[#333] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-4 right-4 z-10 text-white/80 hover:text-white p-2 rounded-full bg-black/60 border border-[#333] backdrop-blur-md transition-colors"
            >
              <X size={24} />
            </button>
            <video 
              src="/assets/BeachFront_Resort_Video.mp4" 
              controls 
              autoPlay 
              className="w-full h-auto max-h-[80vh] rounded-2xl object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default BeachfrontResort;
