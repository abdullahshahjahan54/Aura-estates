import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;

if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
  aiClient = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// AI Chat Endpoint for Aura Estates Real Estate Advisor
app.post('/api/ai/chat', async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    if (!aiClient) {
      return res.status(503).json({ 
        fallback: true,
        message: 'Gemini API key not configured on server. Using built-in real estate advisor engine.' 
      });
    }

    const systemInstruction = `You are Aura AI, the premier Luxury Real Estate & Investment Advisor for "Aura Estates" (https://auraestates.luxury).
Aura Estates is a top-tier international luxury brokerage operating in Beverly Hills, Manhattan Tribeca, London Mayfair, Dubai Palm Jumeirah, and Miami Brickell.

Your role:
1. Provide polished, professional, and knowledgeable advice on luxury property acquisitions, prime rentals, commercial investments, and property valuation.
2. Recommend specific properties from our portfolio:
   - "The Solarium Architectural Compound" (Bel Air, CA - $18.5M, 6 Beds, 8 Baths, 75ft infinity pool, wine cellar, 6.8% yield)
   - "The Sky Residence at 111 Franklin" (Tribeca NYC - $14.2M, 4 Beds, 5 Baths, wrap terrace, 24ft ceilings, 7.2% yield)
   - "Lumina Commercial Plaza & Towers" (Brickell Miami, FL - $48M, 68,000 sq ft, 9.4% net yield, Fortune 500 NNN tenants)
   - "Oakwood Meadow Luxury Farmhouse" (Calabasas, CA - $8.9M, 5 Beds, 6 Baths, 6 acres with equestrian barn)
   - "The Crescent Townhome at Mayfair" (London, UK - £26,500/mo, 4 Beds, Grade-II listed, private mews & lift)
   - "Ridgeview Promontory Development Parcel" (Beverly Hills - $6.5M, 2-acre RTI permitted building plot)
   - "The Palm Horizon Beachfront Villa" (Palm Jumeirah Dubai - $24.5M, 7 Beds, 9 Baths, private beach, yacht mooring, 8.5% yield)
   - "The Chelsea Gallery Penthouse" (New York, NY - $18,000/mo rent, 3 Beds, furnished designer loft with terrace)
3. Detail investment metrics when asked: explain cap rates, NNN leases, tax advantages (1031 exchange, zero income tax in Miami and Dubai), and capital appreciation.
4. Encourage users to schedule a private viewing or connect via WhatsApp with our senior agents: Victoria Sterling (Luxury Estates), Julian Vance (Commercial), Elena Rostova (Penthouses & Dubai), Marcus Thorne (Land & Estates).
Keep responses elegant, clear, and structured with concise bullet points where appropriate.`;

    const chatHistory = Array.isArray(history) 
      ? history.map((h: { role: string; content: string }) => ({
          role: h.role === 'user' ? 'user' : 'model',
          parts: [{ text: h.content }],
        }))
      : [];

    const response = await aiClient.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: [
        ...chatHistory,
        { role: 'user', parts: [{ text: message }] },
      ],
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const reply = response.text || 'I apologize, I could not process your request at this moment.';
    return res.json({ reply });
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    return res.status(500).json({ 
      fallback: true,
      error: error.message || 'Error processing AI chat request' 
    });
  }
});

// Setup Vite in Development mode
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production static serving
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
