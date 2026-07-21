import { useState } from 'react';
import { Clock, Lock, FileText, Settings, CheckCircle2, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import { submitInquiry } from '../lib/firebase';

const SERVICES_OPTIONS = [
  'Still Renders (Exterior & Interior images)',
  '3D Animation / Walkthrough Video',
  'Virtual Tour (360° interactive)',
  "Bird's Eye / Aerial View",
  '2D or 3D Floor Plans',
  'Construction Sequence Animation',
  'AI Integration / Custom Solution',
  'Not sure yet - need guidance'
];

const TIMELINE_OPTIONS = [
  'ASAP (within 2 weeks)',
  '2-4 Weeks',
  '1-2 Months',
  '2-4 Months',
  'No hard deadline'
];

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    email: '',
    phone: '',
    location: '',
    projectType: '',
    areaVisualized: '',
    services: [],
    deadline: '',
    description: '',
    referral: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errorMessage) setErrorMessage('');
  };

  const handleServiceToggle = (serviceName) => {
    setFormData(prev => {
      const exists = prev.services.includes(serviceName);
      const updated = exists 
        ? prev.services.filter(s => s !== serviceName)
        : [...prev.services, serviceName];
      return { ...prev, services: updated };
    });
    if (errorMessage) setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    // Basic Validation
    if (!formData.fullName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (!formData.location.trim()) {
      setErrorMessage('Please specify your location/city.');
      return;
    }

    setIsSubmitting(true);

    try {
      await submitInquiry(formData);
      setIsSubmitting(false);
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('Submission error:', err);
      setIsSubmitting(false);
      setErrorMessage('There was a problem submitting your inquiry. Please try again.');
    }
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      company: '',
      email: '',
      phone: '',
      location: '',
      projectType: '',
      areaVisualized: '',
      services: [],
      deadline: '',
      description: '',
      referral: ''
    });
    setIsSubmitted(false);
    setErrorMessage('');
  };

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

          {/* Right Column - Form or Success Card */}
          <ScrollReveal delay={200} className="card bg-[#0d0d0d] p-8 md:p-10 border-[#222]">
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center text-center py-12 px-4 gap-6">
                <div className="w-16 h-16 rounded-full bg-gold/20 text-gold flex items-center justify-center mb-2 animate-bounce">
                  <CheckCircle2 size={40} />
                </div>
                <h2 className="text-3xl font-bold text-white">Inquiry Received!</h2>
                <p className="text-gray-400 max-w-md leading-relaxed">
                  Thank you <span className="text-gold font-medium">{formData.fullName}</span>! Your project details have been successfully submitted. Our visualization team will review your inquiry and get back to you within 24 hours.
                </p>
                <div className="bg-[#141414] border border-[#262626] rounded-xl p-6 w-full text-left my-2 flex flex-col gap-3">
                  <div className="flex justify-between items-center text-xs text-gray-500 border-b border-[#222] pb-3">
                    <span>STATUS: <strong className="text-gold">Received & Pending Review</strong></span>
                    <span>{new Date().toLocaleDateString()}</span>
                  </div>
                  <div className="text-sm text-gray-300">
                    <p><strong>Email:</strong> {formData.email}</p>
                    {formData.projectType && <p className="mt-1"><strong>Project Type:</strong> {formData.projectType}</p>}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={resetForm}
                  className="btn-secondary mt-4 flex items-center gap-2"
                >
                  Submit Another Inquiry <ArrowRight size={16} />
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                
                {/* YOUR DETAILS */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="text-gold"><Lock size={18} /></div>
                    <h3 className="font-bold text-sm uppercase tracking-wider">Your Details</h3>
                  </div>

                  {errorMessage && (
                    <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm flex items-center gap-3">
                      <AlertCircle size={18} className="shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium">Full Name <span className="text-gold">*</span></label>
                      <input 
                        type="text" 
                        required
                        value={formData.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                        placeholder="John Smith" 
                        className="bg-[#1a1a1a] border border-[#333] rounded-md px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors" 
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium">Company / Developer Name</label>
                      <input 
                        type="text" 
                        value={formData.company}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                        placeholder="Smith Developments LLC" 
                        className="bg-[#1a1a1a] border border-[#333] rounded-md px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors" 
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium">Email Address <span className="text-gold">*</span></label>
                      <input 
                        type="email" 
                        required
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="john@smithdev.com" 
                        className="bg-[#1a1a1a] border border-[#333] rounded-md px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors" 
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium">Phone Number</label>
                      <input 
                        type="tel" 
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="+1 (555) 000-0000" 
                        className="bg-[#1a1a1a] border border-[#333] rounded-md px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors" 
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium">Where are you based? <span className="text-gold">*</span></label>
                    <input 
                      type="text" 
                      required
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      placeholder="City, Country" 
                      className="bg-[#1a1a1a] border border-[#333] rounded-md px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors" 
                    />
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
                      <label className="text-sm font-medium">Project Type</label>
                      <select 
                        value={formData.projectType}
                        onChange={(e) => handleInputChange('projectType', e.target.value)}
                        className="bg-[#1a1a1a] border border-[#333] rounded-md px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors appearance-none"
                      >
                        <option value="">Select project type...</option>
                        <option value="Residential">Residential</option>
                        <option value="Commercial">Commercial</option>
                        <option value="Hospitality">Hospitality</option>
                        <option value="Mixed-Use">Mixed-Use</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium">What areas need to be visualized?</label>
                      <select 
                        value={formData.areaVisualized}
                        onChange={(e) => handleInputChange('areaVisualized', e.target.value)}
                        className="bg-[#1a1a1a] border border-[#333] rounded-md px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors appearance-none"
                      >
                        <option value="">Select...</option>
                        <option value="Exterior only">Exterior only</option>
                        <option value="Interior only">Interior only</option>
                        <option value="Exterior & Interior">Exterior & Interior</option>
                        <option value="Masterplan">Masterplan</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-3">
                      <label className="text-sm font-medium">What services are you interested in?</label>
                      <div className="flex flex-col gap-2">
                        {SERVICES_OPTIONS.map((service, i) => (
                          <label key={i} className="flex items-center gap-3 bg-[#1a1a1a] border border-[#333] rounded-md p-3 cursor-pointer hover:border-gray-500 transition-colors">
                            <input 
                              type="checkbox" 
                              checked={formData.services.includes(service)}
                              onChange={() => handleServiceToggle(service)}
                              className="accent-gold w-4 h-4 rounded" 
                            />
                            <span className="text-sm text-gray-300">{service}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col gap-3">
                      <label className="text-sm font-medium">When do you need the deliverables by?</label>
                      <div className="flex flex-wrap gap-3">
                        {TIMELINE_OPTIONS.map((time, i) => {
                          const isSelected = formData.deadline === time;
                          return (
                            <button 
                              key={i} 
                              type="button" 
                              onClick={() => handleInputChange('deadline', time)}
                              className={`px-4 py-2 rounded-full border text-sm transition-colors ${
                                isSelected 
                                  ? 'bg-gold border-gold text-black font-semibold' 
                                  : 'border-[#333] text-gray-300 hover:border-gold hover:text-white'
                              }`}
                            >
                              {time}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium">Briefly describe your project</label>
                      <textarea 
                        rows={4} 
                        value={formData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        placeholder="E.g. We're developing a 12-unit residential building in Miami and need renders for our investor deck and marketing materials..." 
                        className="bg-[#1a1a1a] border border-[#333] rounded-md px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors resize-none"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium">How did you find Pixel Island 3D?</label>
                      <select 
                        value={formData.referral}
                        onChange={(e) => handleInputChange('referral', e.target.value)}
                        className="bg-[#1a1a1a] border border-[#333] rounded-md px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors appearance-none"
                      >
                        <option value="">Select...</option>
                        <option value="Google Search">Google Search</option>
                        <option value="Social Media">Social Media</option>
                        <option value="Referral">Referral</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Lock size={12} className="text-gold" />
                    <span>Your info is kept strictly confidential.</span>
                  </div>
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="btn-primary w-full sm:w-auto justify-center disabled:opacity-50 disabled:cursor-not-allowed min-w-[220px]"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="animate-spin" size={18} /> Submitting...
                      </span>
                    ) : (
                      <>Submit & Schedule Call &rarr;</>
                    )}
                  </button>
                </div>
              </form>
            )}
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default Contact;
