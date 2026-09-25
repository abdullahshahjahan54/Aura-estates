import React, { useState } from 'react';
import { useRealEstate } from '../context/RealEstateContext';
import { Agent } from '../types';
import { Phone, Mail, MessageSquare, Award, Sparkles, X, Send, CheckCircle2 } from 'lucide-react';

export const AgentsSection: React.FC = () => {
  const { agents, submitInquiry } = useRealEstate();
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  
  // Direct agent inquiry state
  const [inqName, setInqName] = useState('');
  const [inqEmail, setInqEmail] = useState('');
  const [inqPhone, setInqPhone] = useState('');
  const [inqMsg, setInqMsg] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAgent) return;
    submitInquiry({
      type: 'inquiry',
      name: inqName,
      email: inqEmail,
      phone: inqPhone,
      message: `Direct mandate inquiry for ${selectedAgent.name}: ${inqMsg}`,
    });
    setSubmitted(true);
  };

  return (
    <section id="agents-section" className="py-24 bg-neutral-950 text-neutral-100 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-amber-400 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Fiduciary Advisory</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white mb-4">
            Meet Our Senior Advisory Partners
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Seasoned practitioners who have transacted billions in prime residential, commercial, and development assets on behalf of international family offices.
          </p>
        </div>

        {/* Agents Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {agents.map((agent) => (
            <div
              key={agent.id}
              className="group bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden hover:border-neutral-700 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[4/5] overflow-hidden bg-neutral-950">
                  <img
                    src={agent.photo}
                    alt={agent.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-80" />
                  
                  <div className="absolute bottom-3 left-3 text-white">
                    <span className="text-[11px] font-mono text-amber-400 uppercase tracking-wider">{agent.specialization}</span>
                    <h3 className="font-serif text-xl font-bold">{agent.name}</h3>
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <p className="text-xs text-amber-400 font-medium">{agent.position}</p>
                  
                  <div className="flex items-center justify-between text-xs py-2 border-y border-neutral-800 text-neutral-400 font-mono">
                    <span>{agent.experienceYears} Years Exp.</span>
                    <span className="text-white font-semibold">{agent.closedVolume} Closed</span>
                  </div>

                  <p className="text-xs text-neutral-400 line-clamp-3 leading-relaxed font-light">
                    {agent.bio}
                  </p>
                </div>
              </div>

              {/* Action Buttons for Call, WhatsApp, and Profile Modal */}
              <div className="p-5 pt-0 space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={`tel:${agent.phone.replace(/[^0-9+]/g, '')}`}
                    className="py-2 px-2 bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 rounded text-[11px] font-semibold text-neutral-300 flex items-center justify-center gap-1 transition-colors"
                  >
                    <Phone className="w-3 h-3 text-amber-400" />
                    <span>Call</span>
                  </a>

                  <a
                    href={`https://wa.me/${agent.whatsapp.replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(agent.name)},%20I%20would%20like%20to%20consult%20on%20prime%20property%20acquisitions.`}
                    target="_blank"
                    rel="noreferrer"
                    className="py-2 px-2 bg-emerald-950/40 hover:bg-emerald-950/60 border border-emerald-500/40 rounded text-[11px] font-semibold text-emerald-300 flex items-center justify-center gap-1 transition-colors"
                  >
                    <MessageSquare className="w-3 h-3 text-emerald-400" />
                    <span>WhatsApp</span>
                  </a>
                </div>

                <button
                  onClick={() => {
                    setSelectedAgent(agent);
                    setSubmitted(false);
                  }}
                  className="w-full py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-100 text-xs font-medium rounded transition-colors text-center"
                >
                  Direct Inquiry & Profile
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Agent Profile & Mandate Modal */}
        {selectedAgent && (
          <div className="fixed inset-0 z-50 bg-neutral-950/90 backdrop-blur-md flex items-center justify-center p-4">
            <div className="relative w-full max-w-xl bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl p-6 sm:p-8 text-neutral-100">
              <button
                onClick={() => setSelectedAgent(null)}
                className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-4 mb-6">
                <img
                  src={selectedAgent.photo}
                  alt={selectedAgent.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-amber-400"
                />
                <div>
                  <h3 className="font-serif text-2xl font-bold text-white">{selectedAgent.name}</h3>
                  <p className="text-xs text-amber-400">{selectedAgent.position}</p>
                  <p className="text-[11px] text-neutral-400 font-mono mt-0.5">{selectedAgent.specialization}</p>
                </div>
              </div>

              {submitted ? (
                <div className="text-center py-6 space-y-3">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                  <h4 className="font-serif text-xl font-bold text-white">Direct Message Sent</h4>
                  <p className="text-xs text-neutral-300">
                    Thank you. {selectedAgent.name} has been notified and will reply directly to {inqEmail}.
                  </p>
                  <button
                    onClick={() => setSelectedAgent(null)}
                    className="mt-3 px-4 py-2 bg-amber-400 text-neutral-950 font-bold text-xs uppercase rounded"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-3">
                  <p className="text-xs text-neutral-300 leading-relaxed font-light mb-2">
                    {selectedAgent.bio}
                  </p>

                  <div className="space-y-1">
                    <label className="text-[11px] uppercase tracking-wider text-neutral-400">Direct Consultation Mandate</label>
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name *"
                      value={inqName}
                      onChange={(e) => setInqName(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="email"
                      required
                      placeholder="Email Address *"
                      value={inqEmail}
                      onChange={(e) => setInqEmail(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white"
                    />
                    <input
                      type="tel"
                      required
                      placeholder="Phone / Mobile *"
                      value={inqPhone}
                      onChange={(e) => setInqPhone(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white"
                    />
                  </div>

                  <textarea
                    rows={3}
                    required
                    placeholder="Briefly state your acquisition target, budget, or portfolio requirements..."
                    value={inqMsg}
                    onChange={(e) => setInqMsg(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white"
                  />

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message to {selectedAgent.name.split(' ')[0]}</span>
                  </button>
                </form>
              )}

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
