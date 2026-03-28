import LoginForm from "@/components/auth/LoginForm";

export const metadata = {
  title: "Login | ET AI Intelligence",
  description: "Access your personalized financial intelligence dashboard.",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-900/5 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-red-900/5 rounded-full blur-[120px]"></div>

      <div className="z-10 w-full flex justify-center">
        <LoginForm />
      </div>

      {/* Trust Quote */}
      <div className="z-10 mt-12 text-center max-w-sm">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] mb-4">Trusted by 2M+ Professionals</p>
        <p className="text-sm font-serif italic text-gray-500 leading-relaxed">
          "The most advanced financial news adaptation engine I've ever used. It translates market noise into actionable intelligence."
        </p>
        <p className="mt-4 text-[10px] font-black text-gray-800 uppercase tracking-widest">— Senior Portfolio Manager, HDFC</p>
      </div>
    </div>
  );
}
