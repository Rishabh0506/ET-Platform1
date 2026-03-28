import OnboardingForm from "@/components/auth/OnboardingForm";

export const metadata = {
  title: "Onboarding | ET AI",
  description: "Begin your personalized financial intelligence journey.",
};

export default function OnboardingPage() {
  return (
    <div className="min-h-screen bg-off-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}></div>
      
      <div className="z-10 w-full flex justify-center">
        <OnboardingForm />
      </div>

      {/* Trust Footer */}
      <div className="z-10 mt-12 text-center">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-4">Secured by Enterprise Intelligence</p>
        <div className="flex gap-8 justify-center opacity-30 grayscale">
           <span className="text-lg font-serif font-black text-slate-900 tracking-tighter">ET AI</span>
           <span className="text-lg font-serif font-black text-slate-900 tracking-tighter">FIN-SEC</span>
        </div>
      </div>
    </div>
  );
}
