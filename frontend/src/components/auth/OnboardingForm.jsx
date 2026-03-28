"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function OnboardingForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    persona: "Investor",
    language: "English",
    interests: [],
  });

  const personas = [
    { id: "Investor", desc: "Focus on ROI & Portfolio Impact", icon: "📈" },
    { id: "Trader", desc: "Real-time trends & Volatility", icon: "⚡" },
    { id: "Student", desc: "Learning & Macro-Economy", icon: "🎓" },
  ];

  const languages = ["English", "Hindi", "Tamil", "Telugu", "Bengali"];
  const interestChips = ["Markets", "Tech", "Policy", "Crypto", "Startups", "IPO", "Energy", "Banking"];

  const toggleInterest = (interest) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const finish = () => {
    console.log("Onboarding Complete:", formData);
    router.push("/my-et");
  };

  return (
    <div className="w-full max-w-xl bg-white border border-slate-100 p-12 shadow-3xl shadow-slate-900/10 rounded-sm relative overflow-hidden">
      {/* Step Indicator */}
      <div className="flex gap-2 mb-12">
        {[1, 2, 3, 4].map(s => (
          <div 
            key={s} 
            className={`h-1 flex-1 rounded-full transition-all duration-500 ${step >= s ? "bg-red-800" : "bg-slate-100"}`}
          ></div>
        ))}
      </div>

      {step === 1 && (
        <div className="step-enter">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-red-800 mb-2 block">Step 01</span>
          <h2 className="text-4xl font-serif font-black text-slate-950 mb-4 tracking-tighter">Choose Your Persona</h2>
          <p className="text-slate-500 mb-10 font-medium">How should ET AI adapt its intelligence for you?</p>
          
          <div className="flex flex-col gap-4">
            {personas.map(p => (
              <button
                key={p.id}
                onClick={() => { setFormData({...formData, persona: p.id}); nextStep(); }}
                className={`p-6 border text-left rounded-sm transition-all group ${formData.persona === p.id ? "border-red-800 bg-red-50/30 shadow-lg" : "border-slate-100 hover:border-slate-300"}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">{p.icon}</span>
                  <div className={`h-4 w-4 rounded-full border-2 transition-all ${formData.persona === p.id ? "border-red-800 bg-red-800" : "border-slate-200"}`}></div>
                </div>
                <h3 className="font-black text-slate-950 uppercase tracking-widest text-xs mb-1 group-hover:text-red-900">{p.id}</h3>
                <p className="text-xs text-slate-500 font-medium">{p.desc}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="step-enter">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-red-800 mb-2 block">Step 02</span>
          <h2 className="text-4xl font-serif font-black text-slate-950 mb-4 tracking-tighter">Your Language</h2>
          <p className="text-slate-500 mb-10 font-medium">Select your primary adaptation language.</p>
          
          <div className="grid grid-cols-2 gap-4">
            {languages.map(l => (
              <button
                key={l}
                onClick={() => { setFormData({...formData, language: l}); nextStep(); }}
                className={`py-4 px-6 border rounded-sm text-sm font-black uppercase tracking-widest transition-all ${formData.language === l ? "bg-slate-950 text-white border-slate-950 shadow-xl" : "bg-white text-slate-500 border-slate-100 hover:border-slate-300"}`}
              >
                {l}
              </button>
            ))}
          </div>
          <button onClick={prevStep} className="mt-10 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-red-800 transition-colors">← Back</button>
        </div>
      )}

      {step === 3 && (
        <div className="step-enter">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-red-800 mb-2 block">Step 03</span>
          <h2 className="text-4xl font-serif font-black text-slate-950 mb-4 tracking-tighter">Your Interests</h2>
          <p className="text-slate-500 mb-10 font-medium">Select topics to fine-tune your feed.</p>
          
          <div className="flex flex-wrap gap-3">
            {interestChips.map(c => (
              <button
                key={c}
                onClick={() => toggleInterest(c)}
                className={`px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${formData.interests.includes(c) ? "bg-red-800 text-white shadow-lg shadow-red-900/20" : "bg-slate-50 text-slate-500 hover:bg-slate-100"}`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="mt-12 flex items-center justify-between">
            <button onClick={prevStep} className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-red-800 transition-colors">← Back</button>
            <button 
              onClick={nextStep}
              disabled={formData.interests.length === 0}
              className={`px-10 py-4 text-[10px] font-black uppercase tracking-widest shadow-2xl transition-all ${formData.interests.length > 0 ? "bg-slate-950 text-white hover:bg-red-900" : "bg-slate-100 text-slate-300 cursor-not-allowed"}`}
            >
              Continue →
            </button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="step-enter text-center">
          <div className="mb-8 flex justify-center">
             <div className="h-20 w-20 bg-green-50 rounded-full flex items-center justify-center text-green-600 text-4xl animate-bounce">
                ✓
             </div>
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-red-800 mb-2 block">Final Step</span>
          <h2 className="text-4xl font-serif font-black text-slate-950 mb-4 tracking-tighter text-balance">Your Intelligence Layer is Ready.</h2>
          <p className="text-slate-500 mb-12 font-medium">We've adapted the world's financial news for the {formData.persona} in you.</p>
          
          <div className="bg-slate-50 p-6 rounded-sm mb-12 text-left border-l-4 border-red-800">
             <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Build Profile</div>
             <div className="text-sm font-bold text-slate-900 font-serif italic">
               "{formData.persona} / {formData.language} / {formData.interests.join(' · ')}"
             </div>
          </div>

          <button 
            onClick={finish}
            className="w-full bg-slate-950 text-white py-5 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-red-800 transition-all active:scale-95 shadow-2xl shadow-slate-900/30"
          >
            Build My Newsroom
          </button>
        </div>
      )}
    </div>
  );
}
