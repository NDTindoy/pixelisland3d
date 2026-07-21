import { ArrowRight, Trophy, Globe, Ruler, Heart, User, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';

const About = () => {
  return (
    <div className="flex flex-col w-full bg-black">
      {/* Hero Section */}
      <section className="pt-16 pb-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <ScrollReveal className="flex flex-col gap-6">
            <p className="text-gold font-medium uppercase tracking-wider text-sm">About Us</p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1]">
              <span className="block">We help developers</span>
              <span className="block">bring visions to life.</span>
            </h1>
            <p className="text-gray-400 text-lg">
              Pixel Island is a 3D visualization studio based in Bali, helping developers and real estate brands turn their projects into compelling visuals that sell.
            </p>
            <p className="text-gray-400 text-lg">
              We combine creativity, technical expertise, and a deep understanding of real estate marketing to deliver visuals that do more than look good - they get results.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={200} className="relative">
            <img src="/assets/About_01_CET.png" alt="About Architecture" className="rounded-xl w-full h-auto object-cover" />
          </ScrollReveal>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="px-6 mb-24">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="card grid grid-cols-2 md:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-[#333] bg-[#0d0d0d]">
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
                   <h4 className="text-2xl font-bold">150+</h4>
                   <p className="text-xs text-gray-400 uppercase tracking-wider">Projects Completed</p>
                 </div>
              </div>
              <div className="flex items-center gap-4 p-4">
                 <div className="text-gold"><Globe size={32} /></div>
                 <div>
                   <h4 className="text-2xl font-bold">20+</h4>
                   <p className="text-xs text-gray-400 uppercase tracking-wider">Countries Served</p>
                 </div>
              </div>
              <div className="flex items-center gap-4 p-4">
                 <div className="text-gold"><User size={32} /></div>
                 <div>
                   <h4 className="text-2xl font-bold">100%</h4>
                   <p className="text-xs text-gray-400 uppercase tracking-wider">Client Satisfaction</p>
                 </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Our Approach */}
      <section className="px-6 mb-24">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <p className="text-gold font-medium uppercase tracking-wider text-sm mb-12">Our Approach</p>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <ScrollReveal delay={100} className="flex gap-4">
               <div className="text-gold mt-1"><Heart size={32} /></div>
               <div>
                 <h3 className="text-2xl font-bold mb-2">Strategic Thinking</h3>
                 <p className="text-gray-400 text-lg">We understand what sells.</p>
               </div>
            </ScrollReveal>
            <ScrollReveal delay={250} className="flex gap-4">
               <div className="text-gold mt-1"><CheckCircle size={32} /></div>
               <div>
                 <h3 className="text-2xl font-bold mb-2">Attention to Detail</h3>
                 <p className="text-gray-400 text-lg">We perfect every pixel.</p>
               </div>
            </ScrollReveal>
            <ScrollReveal delay={400} className="flex gap-4">
               <div className="text-gold mt-1"><Trophy size={32} /></div>
               <div>
                 <h3 className="text-2xl font-bold mb-2">Results Driven</h3>
                 <p className="text-gray-400 text-lg">We focus on impact.</p>
               </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Full Width Image */}
      <section className="px-6 mb-24">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <img src="/assets/About_02_CET.png" alt="Luxury View" className="w-full h-auto rounded-xl object-cover" />
          </ScrollReveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className="pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="card p-0 overflow-hidden grid grid-cols-1 lg:grid-cols-2 bg-[#0d0d0d]">
              <div className="h-64 lg:h-auto">
                 <img src="/assets/About_03_CET.png" alt="Bring Project to Life" className="w-full h-full object-cover" />
              </div>
              <div className="p-12 md:p-16 flex flex-col justify-center">
                 <p className="text-gold font-medium uppercase tracking-wider text-xs mb-4">Ready to Get Started?</p>
                 <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                   Let's Bring Your Project to Market.
                 </h2>
                 <p className="text-gray-400 mb-8 max-w-md">
                   Ready to create visuals that sell? We're ready when you are.
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
    </div>
  );
};

export default About;
