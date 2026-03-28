export default function DashboardPreview() {
  return (
    <section className="py-20 px-6 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Mock Dashboard UI Overlay */}
        <div className="relative mx-auto max-w-5xl rounded-lg border border-slate-200 bg-slate-50 p-4 shadow-3xl shadow-slate-900/10 overflow-hidden transform hover:-rotate-1 transition-transform duration-700">
          <div className="bg-white rounded-md border border-slate-100 overflow-hidden">
            {/* Header Mock */}
            <div className="h-12 bg-slate-900 flex items-center px-6 justify-between">
              <div className="flex gap-2">
                <div className="h-2 w-2 rounded-full bg-red-500"></div>
                <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
              </div>
              <div className="w-48 h-2 bg-slate-800 rounded-full"></div>
              <div className="w-8 h-8 rounded-full bg-slate-700"></div>
            </div>

            {/* Content Mock */}
            <div className="p-8 grid grid-cols-12 gap-8">
              <div className="col-span-8 flex flex-col gap-6">
                <div className="h-6 w-3/4 bg-slate-100 rounded"></div>
                <div className="h-40 w-full bg-slate-50 rounded border border-dashed border-slate-200 flex items-center justify-center">
                  <span className="text-[10px] font-black uppercase text-slate-300 tracking-widest italic">AI Analysis Preview</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-32 bg-slate-50 rounded"></div>
                  <div className="h-32 bg-slate-50 rounded"></div>
                </div>
              </div>
              <div className="col-span-4 bg-slate-900 rounded p-6 flex flex-col gap-4">
                <div className="h-4 w-1/2 bg-slate-800 rounded"></div>
                <div className="h-20 w-full bg-slate-800 rounded"></div>
                <div className="h-20 w-full bg-slate-800 rounded"></div>
              </div>
            </div>
          </div>

          {/* Floating UI Elements for Depth */}
          <div className="absolute top-1/2 -right-12 p-6 bg-white border border-slate-100 shadow-2xl rounded-sm transform translate-y-[-50%] group">
             <div className="flex items-center gap-3 mb-2">
               <span className="h-2 w-2 rounded-full bg-green-500"></span>
               <span className="text-[9px] font-black uppercase text-slate-400">Live Impact</span>
             </div>
             <div className="text-lg font-black text-slate-900 tracking-tighter">+₹5.1L</div>
          </div>
        </div>

        <div className="mt-20 text-center">
          <h2 className="text-sm font-black uppercase tracking-[0.3em] text-slate-400 mb-4">Built for clarity</h2>
          <p className="text-5xl font-serif font-black text-slate-950 tracking-tighter">Command the markets.</p>
        </div>
      </div>
    </section>
  );
}
