import React from 'react';
import { 
  ShieldCheck, 
  Award, 
  Scale, 
  MapPin, 
  UserCheck, 
  Clock, 
  HeartHandshake, 
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const trustPillars = [
    {
      title: 'Verified Properties',
      description: 'Every property on Aura Estates undergoes exhaustive title verification, deed scrutiny, and municipal lien checks before listing.',
      icon: ShieldCheck
    },
    {
      title: 'Experienced Professionals',
      description: 'Our partners hold average tenures of 15+ years in high-stakes real estate transactions, commercial syndications, and private family offices.',
      icon: Award
    },
    {
      title: 'Transparent Deals',
      description: 'Complete transparency with zero hidden escrow surcharges, clear fee schedules, and direct access to independent survey audits.',
      icon: Scale
    },
    {
      title: 'Prime Locations',
      description: 'Curated footholds in high-barrier locations with permanent supply constraints that protect against downturns.',
      icon: MapPin
    },
    {
      title: 'Personalized Property Search',
      description: 'Bespoke mandates tailored to your architectural style, privacy criteria, school zoning, and tax residency objectives.',
      icon: UserCheck
    },
    {
      title: 'Professional Consultation',
      description: 'Strategic tax, legal, and financial optimization in partnership with top tier trust attorneys and chartered accountants.',
      icon: HeartHandshake
    },
    {
      title: 'Fast Response & Concierge',
      description: 'Dedicated private client managers ensure guaranteed sub-2-hour responses to inquiries and priority private viewing bookings.',
      icon: Clock
    },
    {
      title: 'Customer Satisfaction',
      description: 'Over 98% of our annual transaction volume originates from returning private clients, sovereign partners, and peer referrals.',
      icon: CheckCircle2
    }
  ];

  return (
    <section id="why-us-section" className="py-24 bg-neutral-900 border-t border-neutral-800 text-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-amber-400 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Uncompromising Excellence</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white mb-4">
            Why Discerning Clients Choose Us
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            In prime real estate, reputation is everything. We combine rigorous institutional discipline with intimate local access to secure your property aspirations.
          </p>
        </div>

        {/* Quantified Rigor Proof Bar adhering to SKILL.md Claim-to-Proof Adjacency */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 bg-neutral-950 border border-neutral-800 rounded-2xl mb-16 text-center font-mono">
          <div>
            <div className="text-3xl sm:text-4xl font-bold text-amber-400 tabular-nums">$1.4B+</div>
            <div className="text-xs text-neutral-400 mt-1 uppercase tracking-wider font-sans">Transaction Volume</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-bold text-amber-400 tabular-nums">98.6%</div>
            <div className="text-xs text-neutral-400 mt-1 uppercase tracking-wider font-sans">Client Satisfaction</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-bold text-amber-400 tabular-nums">12,400+</div>
            <div className="text-xs text-neutral-400 mt-1 uppercase tracking-wider font-sans">Deals Transacted</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-bold text-amber-400 tabular-nums">16 Yrs</div>
            <div className="text-xs text-neutral-400 mt-1 uppercase tracking-wider font-sans">Market Leadership</div>
          </div>
        </div>

        {/* Trust Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="p-6 bg-neutral-950 border border-neutral-800 rounded-xl hover:border-amber-500/30 transition-all duration-300 space-y-3"
              >
                <div className="w-10 h-10 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-amber-400">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg font-bold text-white">
                  {pillar.title}
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed font-light">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
