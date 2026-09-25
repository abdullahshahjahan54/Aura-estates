import React, { useState, useRef, useEffect } from 'react';
import { useRealEstate } from '../context/RealEstateContext';
import { Property } from '../types';
import { 
  Bot, 
  Sparkles, 
  X, 
  Send, 
  MessageSquare, 
  ArrowUpRight, 
  Calendar, 
  Building2, 
  Maximize2, 
  Minimize2,
  Phone,
  RefreshCw,
  User,
  HeartHandshake
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  recommendedProperties?: Property[];
  actionType?: 'schedule_tour' | 'sell_property' | 'whatsapp' | 'browse';
}

export const AiAssistant: React.FC = () => {
  const { properties, setSelectedProperty, openScheduleVisit, setActiveTab, formatPrice } = useRealEstate();

  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const initialWelcomeMessage: ChatMessage = {
    id: 'msg-welcome',
    sender: 'ai',
    text: `Greetings. I am Aura AI, your private Real Estate & Investment Advisor. 

I can assist you with:
• Sourcing luxury villas, penthouses, and commercial plazas
• Analyzing net rental yields (6.8% – 9.4%) and ROI projections
• Arranging confidential private viewings
• Providing instant property valuation benchmarks

How may I assist your acquisition or listing strategy today?`,
    timestamp: 'Just now',
    recommendedProperties: properties.slice(0, 2),
  };

  const [messages, setMessages] = useState<ChatMessage[]>([initialWelcomeMessage]);

  const quickPrompts = [
    'Best High-Yield Investments',
    'Modern Villas in Bel Air',
    'Commercial Plazas in Miami',
    'How do I list my property?',
    'Penthouses in Manhattan',
  ];

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // Intelligent Real Estate Fallback Engine
  const generateLocalResponse = (query: string): { text: string; recommended?: Property[]; action?: ChatMessage['actionType'] } => {
    const q = query.toLowerCase();

    if (q.includes('invest') || q.includes('yield') || q.includes('roi') || q.includes('return') || q.includes('cap rate')) {
      const investProps = properties.filter(p => p.isInvestment);
      return {
        text: `Our premier investment recommendation is **Lumina Commercial Plaza & Towers** in Brickell Miami, delivering an exceptional **9.4% net yield** backed by Fortune 500 NNN leases.\n\nFor residential alpha, **The Palm Horizon Beachfront Villa** in Dubai yields **8.5% net** with 0% local income tax, and **The Solarium Bel Air** projects **6.8% yield** with high historical capital growth.`,
        recommended: investProps.slice(0, 3),
        action: 'browse'
      };
    }

    if (q.includes('bel air') || q.includes('villa') || q.includes('house') || q.includes('calabasas') || q.includes('farmhouse')) {
      const villas = properties.filter(p => p.type === 'villa' || p.type === 'farmhouse');
      return {
        text: `We have exceptional residences available:\n\n1. **The Solarium Architectural Compound** in Bel Air ($18.5M) – 6 Beds, 8 Baths, 75ft cantilevered infinity pool overlooking downtown Los Angeles.\n2. **Oakwood Meadow Luxury Farmhouse** in Calabasas ($8.9M) – 6 private gated acres with a 4-stall equestrian facility and olive orchard.`,
        recommended: villas,
        action: 'schedule_tour'
      };
    }

    if (q.includes('penthouse') || q.includes('tribeca') || q.includes('manhattan') || q.includes('new york') || q.includes('apartment')) {
      const penthouses = properties.filter(p => p.type === 'penthouse' || p.type === 'apartment');
      return {
        text: `In New York, we are featuring **The Sky Residence at 111 Franklin** in Tribeca ($14.2M), boasting 24ft double-height ceilings, a 1,800 sq ft wrap terrace, and keyed elevator access. For leasing, we also represent **The Chelsea Gallery Penthouse** ($18,000/mo).`,
        recommended: penthouses,
        action: 'schedule_tour'
      };
    }

    if (q.includes('commercial') || q.includes('office') || q.includes('plaza') || q.includes('brickell') || q.includes('miami')) {
      const commercial = properties.filter(p => p.type === 'commercial');
      return {
        text: `Our flagship commercial holding is **Lumina Commercial Plaza & Towers** in Miami Brickell ($48,000,000). It features 68,000 sq ft of Class-A LEED Platinum office space with 98.4% occupancy on triple-net leases and a weighted average lease expiry (WALE) of 7.8 years.`,
        recommended: commercial,
        action: 'schedule_tour'
      };
    }

    if (q.includes('dubai') || q.includes('palm') || q.includes('beach')) {
      const dubai = properties.filter(p => p.location.city.toLowerCase().includes('dubai'));
      return {
        text: `On Palm Jumeirah Billionaires Row, we present **The Palm Horizon Beachfront Villa** ($24.5M). It features private white-sand beach frontage, private yacht mooring, infinity pool, 10-seat Dolby Atmos cinema, and 8.5% projected net yield in a tax-neutral jurisdiction.`,
        recommended: dubai,
        action: 'schedule_tour'
      };
    }

    if (q.includes('sell') || q.includes('list') || q.includes('valuation') || q.includes('worth')) {
      return {
        text: `To list your property with Aura Estates, navigate to our **Sell Property** portal. We provide:\n• Confidential comparative market analysis (CMA)\n• Global syndication to ultra-high-net-worth buyers and sovereign wealth funds\n• Architectural 8K videography and off-market privacy protection.\n\nWould you like me to open the seller proposal form?`,
        action: 'sell_property'
      };
    }

    if (q.includes('visit') || q.includes('tour') || q.includes('schedule') || q.includes('viewing') || q.includes('appointment')) {
      return {
        text: `We arrange both **In-Person Confidential Viewings** and **Virtual 4K Walkthroughs**. You can click "Schedule Visit" on any property card or let me open the booking form for your preferred date and time.`,
        recommended: properties.slice(0, 2),
        action: 'schedule_tour'
      };
    }

    if (q.includes('agent') || q.includes('broker') || q.includes('contact') || q.includes('phone') || q.includes('whatsapp')) {
      return {
        text: `Our senior partners are ready to assist you directly:\n• **Victoria Sterling** (Luxury Estates): +1 (310) 849-2910\n• **Julian Vance** (Commercial Plazas): +1 (212) 693-4412\n• **Elena Rostova** (Penthouses & Dubai): +44 20 7946 0912\n• **Marcus Thorne** (Land & Farmhouses): +1 (305) 552-8199\n\nYou can also click the green WhatsApp button right below this assistant for immediate chat.`,
        action: 'whatsapp'
      };
    }

    // Default general luxury response
    return {
      text: `Aura Estates represents verified premier properties across Beverly Hills, Manhattan, London Mayfair, Dubai, and Miami. We offer trophy residential estates, high-yield commercial assets (up to 9.4% net), and development acreage.\n\nCould you specify whether you are looking to purchase for residence, acquire an income-producing asset, or list a property?`,
      recommended: properties.slice(0, 2),
      action: 'browse'
    };
  };

  const handleSendMessage = async (textToSend?: string) => {
    const message = textToSend || inputMessage;
    if (!message.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `msg-user-${Date.now()}`,
      sender: 'user',
      text: message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Attempt server-side Gemini API call first
      const historyPayload = messages.slice(-6).map((m) => ({
        role: m.sender === 'user' ? 'user' : 'model',
        content: m.text,
      }));

      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message,
          history: historyPayload,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.reply && !data.fallback) {
          // Identify recommended properties mentioned in text
          const recommended = properties.filter((p) =>
            data.reply.toLowerCase().includes(p.title.toLowerCase()) ||
            data.reply.toLowerCase().includes(p.location.neighborhood.toLowerCase())
          );

          const aiMsg: ChatMessage = {
            id: `msg-ai-${Date.now()}`,
            sender: 'ai',
            text: data.reply,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            recommendedProperties: recommended.length > 0 ? recommended : undefined,
          };
          setMessages((prev) => [...prev, aiMsg]);
          setIsLoading(false);
          return;
        }
      }
    } catch (e) {
      // Fall through to real estate conversational knowledge base
    }

    // Use built-in real estate response engine
    setTimeout(() => {
      const localResult = generateLocalResponse(message);
      const aiMsg: ChatMessage = {
        id: `msg-ai-${Date.now()}`,
        sender: 'ai',
        text: localResult.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        recommendedProperties: localResult.recommended,
        actionType: localResult.action,
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsLoading(false);
    }, 600);
  };

  const handleAction = (action?: ChatMessage['actionType']) => {
    if (action === 'schedule_tour') {
      if (properties[0]) openScheduleVisit(properties[0]);
    } else if (action === 'sell_property') {
      setActiveTab('sell');
      const el = document.getElementById('sell-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (action === 'whatsapp') {
      window.open('https://wa.me/13108492910?text=Hi%20Aura%20Estates,%20I%20am%20consulting%20with%20your%20AI%20Advisor%20and%20would%20like%20to%20speak%20with%20a%20human%20broker.', '_blank');
    } else if (action === 'browse') {
      const el = document.getElementById('properties-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* ======================================================== */}
      {/* FLOATING ACTION DOCK ON THE RIGHT SIDE                     */}
      {/* Contains:                                                */}
      {/* 1. AI Assistant Button                                   */}
      {/* 2. WhatsApp Button Directly Below It                     */}
      {/* ======================================================== */}
      <div className="fixed right-4 sm:right-6 bottom-20 sm:bottom-6 z-40 flex flex-col items-end gap-3 select-none">
        
        {/* 1. AI Assistant Floating Trigger */}
        <div className="relative group">
          {/* Tooltip on hover */}
          <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900/95 border border-amber-500/40 rounded-lg text-xs text-amber-300 font-medium whitespace-nowrap shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Aura AI Property Advisor</span>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 active:scale-95 border ${
              isOpen
                ? 'bg-amber-400 text-neutral-950 border-amber-300 shadow-amber-500/30'
                : 'bg-neutral-900 text-amber-400 border-amber-500/40 hover:border-amber-400 hover:scale-105 shadow-black/60'
            }`}
            aria-label="Toggle AI Real Estate Assistant"
            title="Aura AI Real Estate Assistant"
          >
            {isOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <div className="relative">
                <Bot className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-400" />
              </div>
            )}
          </button>
        </div>

        {/* 2. WhatsApp Floating Button (Directly underneath AI Assistant) */}
        <div className="relative group">
          {/* Tooltip on hover */}
          <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900/95 border border-emerald-500/40 rounded-lg text-xs text-emerald-300 font-medium whitespace-nowrap shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            {/* WhatsApp Mini SVG */}
            <svg className="w-3.5 h-3.5 fill-emerald-400" viewBox="0 0 24 24">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.669-.699c.969.54 1.777.785 2.791.785 3.181 0 5.767-2.586 5.767-5.766 0-3.18-2.586-5.771-5.767-5.771zm3.374 8.211c-.14.394-.711.728-1.077.777-.367.049-.787.071-2.529-.652-2.127-.883-3.486-3.056-3.592-3.197-.105-.14-8.62e-4-.187-.008-.229.071-.352.378-.423.506-.593.127-.169.169-.282.254-.469.085-.187.042-.352-.021-.493-.063-.14-.572-1.38-.784-1.888-.206-.494-.416-.426-.572-.434-.148-.007-.318-.009-.488-.009-.169 0-.444.063-.677.317-.233.254-.889.869-.889 2.119s.91 2.457 1.037 2.626c.127.169 1.791 2.735 4.339 3.834.606.262 1.079.418 1.448.535.608.193 1.162.166 1.6.101.488-.073 1.503-.615 1.714-1.211.211-.596.211-1.107.148-1.213-.063-.105-.233-.169-.488-.296z"/>
            </svg>
            <span>Chat on WhatsApp</span>
          </div>

          <a
            href="https://wa.me/13108492910?text=Hi%20Aura%20Estates,%20I%20am%20inquiring%20about%20your%20prime%20property%20listings."
            target="_blank"
            rel="noreferrer"
            className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center shadow-2xl hover:scale-105 transition-all duration-300 active:scale-95 border border-emerald-400/30"
            aria-label="Direct WhatsApp Concierge"
            title="Chat directly on WhatsApp"
          >
            {/* Crisp authentic WhatsApp Icon */}
            <svg className="w-7 h-7 fill-white" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
            </svg>
          </a>
        </div>

      </div>

      {/* ======================================================== */}
      {/* AI ASSISTANT CHAT PANEL (Slides in from the right)         */}
      {/* ======================================================== */}
      {isOpen && (
        <div 
          className={`fixed z-50 bg-neutral-900/98 backdrop-blur-2xl border border-neutral-800 shadow-2xl rounded-2xl flex flex-col text-neutral-100 overflow-hidden transition-all duration-300 ${
            isExpanded 
              ? 'inset-4 sm:inset-10 sm:left-auto sm:w-[680px]' 
              : 'bottom-24 right-4 sm:right-6 w-[calc(100vw-32px)] sm:w-[440px] h-[580px] max-h-[80vh]'
          }`}
        >
          {/* Header */}
          <div className="bg-neutral-950 px-5 py-4 border-b border-neutral-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-neutral-950 shadow-md shadow-amber-500/20">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-serif text-base font-bold text-white">Aura AI Advisor</h3>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <p className="text-[11px] text-amber-400 font-mono">Luxury Real Estate Intelligence</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1.5 rounded text-neutral-400 hover:text-white transition-colors"
                title={isExpanded ? 'Minimize' : 'Expand'}
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setMessages([initialWelcomeMessage])}
                className="p-1.5 rounded text-neutral-400 hover:text-white transition-colors"
                title="Reset conversation"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded text-neutral-400 hover:text-white transition-colors"
                title="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Prompts Carousel */}
          <div className="bg-neutral-950/70 border-b border-neutral-800 px-4 py-2 flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs">
            <span className="text-[10px] text-neutral-500 uppercase tracking-wider font-mono shrink-0">Prompts:</span>
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(prompt)}
                className="px-2.5 py-1 rounded bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-amber-500/40 text-neutral-300 text-[11px] whitespace-nowrap transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs font-light">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'ai' && (
                  <div className="w-7 h-7 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                )}

                <div className={`max-w-[85%] space-y-2`}>
                  <div
                    className={`p-3.5 rounded-xl leading-relaxed whitespace-pre-line ${
                      msg.sender === 'user'
                        ? 'bg-amber-400 text-neutral-950 font-medium rounded-tr-none'
                        : 'bg-neutral-950 border border-neutral-800 text-neutral-200 rounded-tl-none'
                    }`}
                  >
                    {msg.text}
                  </div>

                  {/* Embedded Recommended Property Cards */}
                  {msg.recommendedProperties && msg.recommendedProperties.length > 0 && (
                    <div className="space-y-2 pt-1">
                      <span className="text-[10px] uppercase tracking-wider text-amber-400 font-mono font-semibold block">
                        Matching Portfolio Listings:
                      </span>
                      {msg.recommendedProperties.map((prop) => (
                        <div
                          key={prop.id}
                          onClick={() => {
                            setSelectedProperty(prop);
                          }}
                          className="p-2.5 bg-neutral-950 border border-neutral-800 hover:border-amber-400/50 rounded-lg flex items-center gap-3 cursor-pointer transition-colors group"
                        >
                          <img
                            src={prop.images[0]}
                            alt={prop.title}
                            className="w-14 h-11 rounded object-cover border border-neutral-800 shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <h5 className="font-serif font-semibold text-white group-hover:text-amber-300 truncate text-xs">
                              {prop.title}
                            </h5>
                            <div className="text-[11px] font-mono text-amber-400 font-bold">
                              {formatPrice(prop.price, prop.currency)}
                              {prop.isInvestment && <span className="text-emerald-400 font-normal ml-2">Yield {prop.projectedROI?.rentalYield}%</span>}
                            </div>
                            <div className="text-[10px] text-neutral-400 truncate">
                              {prop.location.neighborhood}, {prop.location.city}
                            </div>
                          </div>
                          <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-amber-400 shrink-0" />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Quick Action Button */}
                  {msg.actionType && (
                    <div className="pt-1">
                      <button
                        onClick={() => handleAction(msg.actionType)}
                        className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-amber-300 text-[11px] rounded-lg border border-neutral-700 flex items-center gap-1.5 transition-colors"
                      >
                        {msg.actionType === 'schedule_tour' && <Calendar className="w-3 h-3 text-amber-400" />}
                        {msg.actionType === 'sell_property' && <Building2 className="w-3 h-3 text-amber-400" />}
                        {msg.actionType === 'whatsapp' && <MessageSquare className="w-3 h-3 text-emerald-400" />}
                        <span>
                          {msg.actionType === 'schedule_tour' && 'Open Visit Booking Calendar'}
                          {msg.actionType === 'sell_property' && 'Go to Sell Property Portal'}
                          {msg.actionType === 'whatsapp' && 'Chat with Senior Broker'}
                          {msg.actionType === 'browse' && 'Browse All Matching Properties'}
                        </span>
                      </button>
                    </div>
                  )}

                  <span className="text-[10px] text-neutral-500 font-mono block text-right">
                    {msg.timestamp}
                  </span>
                </div>

                {msg.sender === 'user' && (
                  <div className="w-7 h-7 rounded-full bg-neutral-800 flex items-center justify-center text-neutral-300 shrink-0 mt-0.5">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 text-neutral-400 text-xs py-2">
                <div className="w-6 h-6 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 animate-spin">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <span className="italic font-mono text-[11px]">Analyzing portfolio & underwriting data...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input Bar */}
          <div className="p-3 bg-neutral-950 border-t border-neutral-800">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Ask about properties, yields, or locations..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                disabled={isLoading}
                className="flex-1 bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || isLoading}
                className="p-2 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 disabled:hover:bg-amber-400 text-neutral-950 rounded-lg transition-colors shadow-sm"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            <div className="flex items-center justify-between text-[10px] text-neutral-500 font-mono mt-2 px-1">
              <span>Aura AI is trained on prime global real estate datasets</span>
              <a
                href="https://wa.me/13108492910"
                target="_blank"
                rel="noreferrer"
                className="text-emerald-400 hover:underline flex items-center gap-1"
              >
                <span>Live Broker on WhatsApp</span>
              </a>
            </div>
          </div>

        </div>
      )}
    </>
  );
};
