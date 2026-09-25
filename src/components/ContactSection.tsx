import React, { useState } from 'react';
import { useRealEstate } from '../context/RealEstateContext';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  MessageSquare, 
  Building,
  Sparkles 
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { properties, submitInquiry } = useRealEstate();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Acquisition Inquiry');
  const [propertyRef, setPropertyRef] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitInquiry({
      type: 'contact_general',
      name,
      email,
      phone,
      propertyId: propertyRef || undefined,
      propertyTitle: propertyRef ? properties.find(p => p.id === propertyRef)?.title : undefined,
      message: `[Subject: ${subject}] ${message}`,
    });
    setSubmitted(true);
  };

  return (
    <section id="contact-section" className="py-24 bg-neutral-900 border-t border-neutral-800 text-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-amber-400 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Direct Concierge Access</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white mb-4">
            Contact Aura Estates
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Schedule a private consultation at one of our global flagship offices or connect directly with our international property team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Office Contact Info */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="p-6 bg-neutral-950 border border-neutral-800 rounded-xl space-y-5">
              <h3 className="font-serif text-xl font-bold text-white">Global Headquarters</h3>
              
              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block text-sm">Beverly Hills Flagship</strong>
                    <span className="text-neutral-400">450 North Rodeo Drive, Suite 800<br />Beverly Hills, CA 90210, United States</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                  <div>
                    <span className="text-neutral-400 block">Toll-Free Concierge:</span>
                    <a href="tel:+18005552872" className="text-white hover:text-amber-300 font-mono text-sm">+1 (800) 555-AURA (2872)</a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                  <div>
                    <span className="text-neutral-400 block">Private Fiduciary Email:</span>
                    <a href="mailto:concierge@auraestates.luxury" className="text-white hover:text-amber-300 font-mono">concierge@auraestates.luxury</a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div>
                    <span className="text-neutral-400 block">WhatsApp Direct:</span>
                    <a href="https://wa.me/13108492910" target="_blank" rel="noreferrer" className="text-emerald-400 hover:text-emerald-300 font-mono">
                      +1 (310) 849-2910
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-2 border-t border-neutral-800">
                  <Clock className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                  <div className="text-neutral-400">
                    <span className="text-neutral-200 block font-medium">Opening Hours</span>
                    Monday – Friday: 09:00 – 19:00 PST<br />
                    Saturday: 10:00 – 16:00 PST (By Appointment)<br />
                    Sunday: Private Client Emergency Dispatch
                  </div>
                </div>
              </div>
            </div>

            {/* Regional Offices */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl space-y-1 text-xs">
                <span className="font-serif text-sm font-bold text-white block">London Office</span>
                <p className="text-neutral-400">14 Upper Grosvenor St, Mayfair, London W1K 7PJ</p>
                <p className="text-amber-400 font-mono pt-1">+44 20 7946 0912</p>
              </div>

              <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl space-y-1 text-xs">
                <span className="font-serif text-sm font-bold text-white block">Dubai Office</span>
                <p className="text-neutral-400">Gate Village 04, DIFC, Dubai, UAE</p>
                <p className="text-amber-400 font-mono pt-1">+971 4 362 7000</p>
              </div>
            </div>

          </div>

          {/* Contact Inquiry Form */}
          <div className="lg:col-span-7 bg-neutral-950 border border-neutral-800 rounded-xl p-6 sm:p-8">
            <h3 className="font-serif text-2xl font-bold text-white mb-2">Send an Inquiry</h3>
            <p className="text-xs text-neutral-400 mb-6">
              Our managing partners respond personally to all genuine client inquiries within 2 hours.
            </p>

            {submitted ? (
              <div className="text-center py-12 space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-serif text-2xl font-bold text-white">Message Transmitted</h4>
                <p className="text-xs text-neutral-300 max-w-sm mx-auto leading-relaxed">
                  Thank you, <strong className="text-white">{name}</strong>. Your inquiry has been routed to our Senior Concierge. A partner will reach you shortly at <strong className="text-amber-400">{email}</strong>.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setMessage('');
                  }}
                  className="mt-4 px-5 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold rounded"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] font-medium uppercase tracking-wider text-neutral-400">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Lady Evelyn Montgomery"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-medium uppercase tracking-wider text-neutral-400">Phone / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+1 (555) 234-5678"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] font-medium uppercase tracking-wider text-neutral-400">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="client@familyoffice.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-medium uppercase tracking-wider text-neutral-400">Inquiry Subject *</label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="Acquisition Inquiry">Property Acquisition</option>
                      <option value="Listing Consultation">Selling / Listing Property</option>
                      <option value="Commercial Investment">Commercial Asset Investment</option>
                      <option value="Private Viewing">Schedule Private Viewing</option>
                      <option value="General Mandate">General Mandate Counsel</option>
                    </select>
                  </div>
                </div>

                {/* Property Reference Selector */}
                <div className="space-y-1">
                  <label className="text-[11px] font-medium uppercase tracking-wider text-neutral-400">Property Reference (Optional)</label>
                  <select
                    value={propertyRef}
                    onChange={(e) => setPropertyRef(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="">General Inquiry (No Specific Property)</option>
                    {properties.map(p => (
                      <option key={p.id} value={p.id}>
                        {p.title} ({p.location.neighborhood}, {p.location.city})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div className="space-y-1">
                  <label className="text-[11px] font-medium uppercase tracking-wider text-neutral-400">Message / Mandate Criteria *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Provide details on your desired property characteristics, timing, or private inspection schedule..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-neutral-950 font-bold text-xs uppercase tracking-wider rounded-lg shadow-lg shadow-amber-500/10 transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Confidential Inquiry</span>
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
