import React, { useState } from 'react';
import { INITIAL_DECK_DATA } from './constants';
import SlideCard from './components/SlideCard';
import { generatePptx } from './services/pptxGenerator';
import { 
  FileDown, 
  Presentation, 
  ShieldCheck, 
  Cpu, 
  Sparkles
} from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

const App: React.FC = () => {
  const [deckData, setDeckData] = useState(INITIAL_DECK_DATA);
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      await generatePptx(deckData);
    } catch (error) {
      console.error("Failed to generate PPTX:", error);
      alert(`Something went wrong while generating your presentation. Error: ${error}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const runAiAnalysis = async () => {
    setIsAnalyzing(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `As a world-class venture capital pitch deck expert, review this deck data for a startup called ${deckData.companyName}.
      The startup focuses on IDP and Universal Design.
      Content: ${JSON.stringify(deckData.slides)}
      Provide 3 concise, high-impact improvements to make this deck more "investor-ready" for a £50k SEIS round.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });

      setAiSuggestion(response.text || "No suggestions available at this time.");
    } catch (error) {
      console.error("AI Analysis Error:", error);
      setAiSuggestion("Could not connect to Gemini AI. Check your connection or try again later.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Presentation className="text-white w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight leading-none">PitchDeck Pro</h1>
              <p className="text-xs text-slate-500 font-medium">Investor-Ready Generator</p>
            </div>
          </div>
          
          <button 
            onClick={handleDownload}
            disabled={isGenerating}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold text-sm transition-all shadow-lg hover:shadow-xl active:scale-95 ${
              isGenerating ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {isGenerating ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4 text-slate-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating...
              </span>
            ) : (
              <>
                <FileDown className="w-4 h-4" />
                Download .pptx
              </>
            )}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Intro Section */}
        <section className="mb-12 flex flex-col md:flex-row gap-8 items-start">
          <div className="flex-1 space-y-4">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Transform Your Vision into a <span className="text-blue-600">Winning Deck.</span>
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
              Preview your structured pitch below. Designed for the Warrington-based startup specializing in 
              <span className="font-semibold text-slate-800"> Intelligent Document Processing</span> and 
              <span className="font-semibold text-slate-800"> Universal Design</span>.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 text-xs font-bold rounded-full border border-green-100">
                <ShieldCheck className="w-3.5 h-3.5" />
                SEIS Ready
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 text-xs font-bold rounded-full border border-blue-100">
                <Cpu className="w-3.5 h-3.5" />
                AI-Powered
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-700 text-xs font-bold rounded-full border border-slate-200">
                Warrington, UK
              </span>
            </div>
          </div>

          {/* AI Helper Card */}
          <div className="w-full md:w-80 bg-gradient-to-br from-indigo-600 to-blue-700 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden shrink-0">
            <Sparkles className="absolute -top-4 -right-4 w-24 h-24 text-white/10" />
            <h3 className="text-lg font-bold mb-2 flex items-center gap-2 relative z-10">
              Gemini AI Advisor
            </h3>
            <p className="text-blue-100 text-xs mb-4 leading-relaxed relative z-10">
              Get an instant strategic review of your content before you send it to investors.
            </p>
            <button 
              onClick={runAiAnalysis}
              disabled={isAnalyzing}
              className="w-full py-2 bg-white text-blue-700 rounded-lg text-xs font-bold hover:bg-blue-50 transition-colors shadow-sm disabled:opacity-50"
            >
              {isAnalyzing ? "Analyzing..." : "Review Pitch Deck Content"}
            </button>
            {aiSuggestion && (
              <div className="mt-4 p-3 bg-white/10 rounded-lg text-xs font-medium backdrop-blur-sm animate-in fade-in slide-in-from-bottom-2 duration-300">
                <p className="italic">{aiSuggestion}</p>
              </div>
            )}
          </div>
        </section>

        {/* Slides Grid */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-slate-900">Presentation Overview</h3>
            <span className="text-sm font-medium text-slate-500">{deckData.slides.length} Professional Slides</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {deckData.slides.map((slide, index) => (
              <SlideCard key={index} slide={slide} index={index} />
            ))}
          </div>
        </section>

        {/* Debug Info - Add this temporarily */}
        <div className="mt-8 p-4 bg-slate-100 rounded-lg">
          <h4 className="font-bold text-slate-700 mb-2">Debug Info:</h4>
          <p className="text-sm text-slate-600">
            Company Name: {deckData.companyName}<br />
            Slides Count: {deckData.slides.length}<br />
            API Key Available: {process.env.API_KEY ? 'Yes' : 'No'}
          </p>
          <button 
            onClick={() => console.log('Deck Data:', deckData)}
            className="mt-2 text-xs px-3 py-1 bg-slate-200 rounded hover:bg-slate-300"
          >
            Log Deck Data to Console
          </button>
        </div>

        {/* Footer info */}
        <footer className="mt-12 pt-8 border-t border-slate-200 text-center text-slate-500 text-sm">
          <p>© 2024 PitchDeck Pro Builder. All rights reserved.</p>
          <div className="mt-2 flex items-center justify-center gap-4 font-medium">
            <a href="#" className="hover:text-blue-600 transition-colors">Privacy</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Terms</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Support</a>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default App;
