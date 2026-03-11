import React from 'react';
import UploadForm from './components/UploadForm';
import { Sparkles } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-slate-900 text-slate-100">
      <div className="max-w-2xl w-full flex flex-col items-center">
        <div className="mb-8 flex items-center justify-center space-x-3 text-emerald-400 delay-150 animate-fade-in-down">
          <Sparkles className="w-10 h-10 animate-pulse" />
          <h1 className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
            Sales Insight Automator
          </h1>
        </div>
        <p className="text-center text-slate-400 mb-10 text-lg">
          Upload your quarterly sales data (.csv or .xlsx) and let AI distill it into actionable executive summaries delivered straight to your inbox.
        </p>
        <div className="w-full bg-slate-800 p-8 rounded-2xl shadow-xl border border-slate-700/50 backdrop-blur-sm">
          <UploadForm />
        </div>
      </div>
    </div>
  );
}

export default App;
