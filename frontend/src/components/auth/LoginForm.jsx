"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [persona, setPersona] = useState("Investor");
  const [language, setLanguage] = useState("English");

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, we'd save this to a global state or cookie
    console.log("Logging in with:", { email, persona, language });
    router.push("/my-et");
  };

  return (
    <div className="w-full max-w-md bg-white border border-gray-100 p-10 shadow-2xl shadow-red-900/5 transition-all">
      <div className="mb-10 text-center">
        <span className="text-4xl font-serif font-black tracking-tighter text-red-900">ET <span className="text-gray-900 underline decoration-red-500 decoration-4 underline-offset-4">AI</span></span>
        <p className="mt-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Premium Financial Intelligence</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Email */}
        <div>
          <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Email Address</label>
          <input 
            type="email" 
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@company.com"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-red-900/10 focus:border-red-900 transition-all font-medium"
          />
        </div>

        {/* Persona Selection */}
        <div>
          <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Select Your Persona</label>
          <div className="grid grid-cols-2 gap-3">
            {["Investor", "Student", "Policy Maker", "Techie"].map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPersona(p)}
                className={`py-2 text-[11px] font-bold uppercase tracking-tight border transition-all active:scale-95 ${
                  persona === p 
                    ? "bg-red-900 border-red-900 text-white shadow-lg shadow-red-900/20" 
                    : "bg-white border-gray-100 text-gray-400 hover:border-gray-300"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Language Selection */}
        <div>
          <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Primary Language</label>
          <select 
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-100 text-sm focus:outline-none focus:border-red-900 font-medium"
          >
            {["English", "Hindi", "Tamil", "Telugu", "Bengali"].map((l) => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
        </div>

        <button 
          type="submit"
          className="mt-4 w-full bg-black text-white py-4 text-xs font-black uppercase tracking-[0.2em] hover:bg-red-900 transition-all active:scale-[0.98] shadow-xl shadow-black/10"
        >
          Access Intelligence
        </button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-[10px] text-gray-400 font-medium italic">
          New to ET AI? <a href="#" className="text-red-800 font-bold hover:underline">Request an Invite</a>
        </p>
      </div>
    </div>
  );
}
