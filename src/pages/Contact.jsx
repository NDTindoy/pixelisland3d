import { Clock, Lock, FileText, Settings } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';

const Contact = () => {
  return (
    <div className="flex flex-col w-full bg-black min-h-screen">
      <section className="pt-16 pb-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Left Column */}
          <ScrollReveal className="flex flex-col gap-12">
            <div>
              <p className="text-gold font-medium uppercase tracking-wider text-sm mb-4">Project Discovery</p>
              <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
                Tell us about your project.
              </h1>
              <p className="text-gray-400 text-lg max-w-md">
                Share a few details so we can better understand your project and goals.
              </p>
            </div>

            <div className="flex flex-col gap-8">
              <div className="flex gap-4">
                <div className="text-gold mt-1"><Clock size={32} /></div>
                <div>
                  <h3 className="text-xl font-bold mb-1">Quick response</h3>
                  <p className="text-gray-400">We typically reply within 24 hours.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-gold mt-1"><Settings size={32} /></div>
                <div>
                  <h3 className="text-xl font-bold mb-1">Tailored to your project</h3>
                  <p className="text-gray-400">Every project inquiry is reviewed carefully.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-gold mt-1"><FileText size={32} /></div>
                <div>
                  <h3 className="text-xl font-bold mb-1">Clear plan & pricing</h3>
                  <p className="text-gray-400">You'll receive a clear scope and quote.</p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Column - Form */}
          <ScrollReveal delay={200} className="card bg-[#0d0d0d] p-8 md:p-10 border-[#222]">
             <form className="flex flex-col gap-8">
                
                {/* YOUR DETAILS */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="text-gold"><Lock size={18} /></div>
                    <h3 className="font-bold text-sm uppercase tracking-wider">Your Details</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium">Full Name <span className="text-gold">*</span></label>
                      <input type="text" placeholder="John Smith" className="bg-[#1a1a1a] border border-[#333] rounded-md px-4 py-3 focus:outline-none focus:border-gold transition-colors" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium">Company / Developer Name</label>
                      <input type="text" placeholder="Smith Developments LLC" className="bg-[#1a1a1a] border border-[#333] rounded-md px-4 py-3 focus:outline-none focus:border-gold transition-colors" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium">Email Address <span className="text-gold">*</span></label>
                      <input type="email" placeholder="john@smithdev.com" className="bg-[#1a1a1a] border border-[#333] rounded-md px-4 py-3 focus:outline-none focus:border-gold transition-colors" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium">Phone Number</label>
                      <input type="tel" placeholder="+1 (555) 000-0000" className="bg-[#1a1a1a] border border-[#333] rounded-md px-4 py-3 focus:outline-none focus:border-gold transition-colors" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium">Where are you based? <span className="text-gold">*</span></label>
                    <input type="text" placeholder="City, Country" className="bg-[#1a1a1a] border border-[#333] rounded-md px-4 py-3 focus:outline-none focus:border-gold transition-colors" />
                  </div>
                </div>

                <div className="h-px bg-[#222] my-2" />

                {/* YOUR PROJECT */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="text-gold"><FileText size={18} /></div>
                    <h3 className="font-bold text-sm uppercase tracking-wider">Your Project</h3>
                  </div>
                  
                  <div className="flex flex-col gap-6 mb-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium">Project Type <span className="text-gold">*</span></label>
                      <select className="bg-[#1a1a1a] border border-[#333] rounded-md px-4 py-3 focus:outline-none focus:border-gold transition-colors appearance-none">
                        <option>Select project type...</option>
                        <option>Residential</option>
                        <option>Commercial</option>
                        <option>Hospitality</option>
                        <option>Mixed-Use</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium">What areas need to be visualized? <span className="text-gold">*</span></label>
                      <select className="bg-[#1a1a1a] border border-[#333] rounded-md px-4 py-3 focus:outline-none focus:border-gold transition-colors appearance-none">
                        <option>Select...</option>
                        <option>Exterior only</option>
                        <option>Interior only</option>
                        <option>Exterior & Interior</option>
                        <option>Masterplan</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-3">
                      <label className="text-sm font-medium">What services are you interested in? <span className="text-gold">*</span></label>
                      <div className="flex flex-col gap-2">
                        {['Still Renders (Exterior & Interior images)', '3D Animation / Walkthrough Video', 'Virtual Tour (360° interactive)', "Bird's Eye / Aerial View", '2D or 3D Floor Plans', 'Construction Sequence Animation', 'AI Integration / Custom Solution', 'Not sure yet - need guidance'].map((service, i) => (
                          <label key={i} className="flex items-center gap-3 bg-[#1a1a1a] border border-[#333] rounded-md p-3 cursor-pointer hover:border-gray-500 transition-colors">
                            <input type="checkbox" className="accent-gold w-4 h-4" />
                            <span className="text-sm text-gray-300">{service}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col gap-3">
                      <label className="text-sm font-medium">When do you need the deliverables by? <span className="text-gold">*</span></label>
                      <div className="flex flex-wrap gap-3">
                        {['ASAP (within 2 weeks)', '2-4 Weeks', '1-2 Months', '2-4 Months', 'No hard deadline'].map((time, i) => (
                          <button key={i} type="button" className="px-4 py-2 rounded-full border border-[#333] text-sm hover:border-gold transition-colors text-gray-300 hover:text-white">
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium">Briefly describe your project</label>
                      <textarea rows={4} placeholder="E.g. We're developing a 12-unit residential building in Miami and need renders for our investor deck and marketing materials..." className="bg-[#1a1a1a] border border-[#333] rounded-md px-4 py-3 focus:outline-none focus:border-gold transition-colors resize-none"></textarea>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium">How did you find Pixel Island 3D?</label>
                      <select className="bg-[#1a1a1a] border border-[#333] rounded-md px-4 py-3 focus:outline-none focus:border-gold transition-colors appearance-none">
                        <option>Select...</option>
                        <option>Google Search</option>
                        <option>Social Media</option>
                        <option>Referral</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Lock size={12} className="text-gold" />
                    <span>Your info is kept strictly confidential.</span>
                  </div>
                  <button type="submit" className="btn-primary w-full sm:w-auto justify-center">
                    Submit & Schedule Call &rarr;
                  </button>
                </div>
             </form>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default Contact;
