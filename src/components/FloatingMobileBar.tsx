import React from 'react';
import { Phone, MessageSquare } from 'lucide-react';

export const FloatingMobileBar: React.FC = () => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-neutral-950/95 backdrop-blur-md border-t border-neutral-800 px-4 py-2 flex items-center justify-between gap-3 h-14">
      <a
        href="tel:+18005552872"
        className="flex-1 py-2 px-3 bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 rounded-lg text-xs font-semibold text-neutral-200 flex items-center justify-center gap-1.5 transition-colors"
      >
        <Phone className="w-3.5 h-3.5 text-amber-400" />
        <span>Call Now</span>
      </a>

      <a
        href="https://wa.me/13108492910?text=Hi%20Aura%20Estates,%20I%20am%20inquiring%20about%20your%20prime%20property%20listings."
        target="_blank"
        rel="noreferrer"
        className="flex-1 py-2 px-3 bg-emerald-950/60 hover:bg-emerald-950/80 border border-emerald-500/40 rounded-lg text-xs font-semibold text-emerald-300 flex items-center justify-center gap-1.5 transition-colors"
      >
        <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
        <span>WhatsApp</span>
      </a>
    </div>
  );
};
