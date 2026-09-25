import React, { useState } from 'react';
import { useRealEstate } from '../context/RealEstateContext';
import { X, Calendar, Clock, CheckCircle2, Video, UserCheck, Shield } from 'lucide-react';

export const ScheduleVisitModal: React.FC = () => {
  const { scheduleVisitProperty, closeScheduleVisit, submitInquiry } = useRealEstate();

  const [date, setDate] = useState('');
  const [time, setTime] = useState('11:00');
  const [tourType, setTourType] = useState<'In-Person Private Viewing' | 'Virtual Video Walkthrough'>('In-Person Private Viewing');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!scheduleVisitProperty) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitInquiry({
      type: 'schedule_tour',
      name,
      email,
      phone,
      propertyId: scheduleVisitProperty.id,
      propertyTitle: scheduleVisitProperty.title,
      preferredDate: `${date} at ${time}`,
      tourType,
      message: `Scheduled ${tourType} on ${date} at ${time}. Notes: ${notes || 'None'}`,
    });
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl p-6 sm:p-8 text-neutral-100">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-neutral-800 mb-6">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-400">
              Private Tour Request
            </span>
            <h3 className="font-serif text-2xl font-bold text-white mt-0.5">
              Schedule a Visit
            </h3>
          </div>
          <button
            onClick={closeScheduleVisit}
            className="p-1.5 rounded-lg bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="font-serif text-2xl font-bold text-white">Viewing Requested</h4>
            <p className="text-xs text-neutral-300 max-w-sm mx-auto leading-relaxed">
              Your appointment request for <strong className="text-white">"{scheduleVisitProperty.title}"</strong> on <strong className="text-amber-400">{date} at {time}</strong> ({tourType}) has been logged. Our concierge will call {phone} to confirm access arrangements.
            </p>
            <div className="pt-4">
              <button
                onClick={closeScheduleVisit}
                className="w-full py-2.5 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-semibold text-xs uppercase tracking-wider rounded-lg transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="p-3 bg-neutral-950 rounded-lg border border-neutral-800 text-xs">
              <span className="text-neutral-400">Selected Property:</span>
              <p className="font-semibold text-white truncate mt-0.5">{scheduleVisitProperty.title}</p>
              <p className="text-neutral-400 text-[11px]">{scheduleVisitProperty.location.address}, {scheduleVisitProperty.location.city}</p>
            </div>

            {/* Tour Type toggle */}
            <div className="space-y-1">
              <label className="text-[11px] font-medium uppercase tracking-wider text-neutral-400">Viewing Format</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setTourType('In-Person Private Viewing')}
                  className={`p-3 rounded-lg border text-left text-xs transition-colors flex items-center gap-2 ${
                    tourType === 'In-Person Private Viewing'
                      ? 'border-amber-400 bg-neutral-950 text-white font-semibold'
                      : 'border-neutral-800 bg-neutral-950/50 text-neutral-400 hover:border-neutral-700'
                  }`}
                >
                  <UserCheck className="w-4 h-4 text-amber-400" />
                  <span>In-Person Tour</span>
                </button>
                <button
                  type="button"
                  onClick={() => setTourType('Virtual Video Walkthrough')}
                  className={`p-3 rounded-lg border text-left text-xs transition-colors flex items-center gap-2 ${
                    tourType === 'Virtual Video Walkthrough'
                      ? 'border-amber-400 bg-neutral-950 text-white font-semibold'
                      : 'border-neutral-800 bg-neutral-950/50 text-neutral-400 hover:border-neutral-700'
                  }`}
                >
                  <Video className="w-4 h-4 text-amber-400" />
                  <span>Virtual Video Tour</span>
                </button>
              </div>
            </div>

            {/* Date & Time selection */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] font-medium uppercase tracking-wider text-neutral-400 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  <span>Preferred Date *</span>
                </label>
                <input
                  type="date"
                  required
                  min={new Date().toISOString().split('T')[0]}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-medium uppercase tracking-wider text-neutral-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Preferred Time *</span>
                </label>
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="09:00">09:00 AM</option>
                  <option value="11:00">11:00 AM</option>
                  <option value="14:00">02:00 PM</option>
                  <option value="16:00">04:00 PM</option>
                  <option value="18:00">06:00 PM (Sunset)</option>
                </select>
              </div>
            </div>

            {/* Contact details */}
            <div className="space-y-3 pt-2">
              <input
                type="text"
                required
                placeholder="Full Name *"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="email"
                  required
                  placeholder="Email Address *"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                />
                <input
                  type="tel"
                  required
                  placeholder="Phone / WhatsApp *"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                />
              </div>
              <textarea
                rows={2}
                placeholder="Special security notes or questions..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="flex items-center gap-1.5 text-[11px] text-neutral-400 pt-1">
              <Shield className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Identity verification and NDAs provided for high-profile viewings.</span>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-neutral-950 font-bold text-xs uppercase tracking-wider rounded-lg shadow-lg shadow-amber-500/10 transition-all mt-4"
            >
              Confirm Visit Request
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
