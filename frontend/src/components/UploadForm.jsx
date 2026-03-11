import React, { useState, useRef } from 'react';
import axios from 'axios';
import { UploadCloud, Mail, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' }); 
  const [isDragActive, setIsDragActive] = useState(false);
  
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (selectedFile) => {
    const validExtensions = ['.csv', '.xlsx'];
    const fileName = selectedFile.name.toLowerCase();
    
    const isValidExtension = validExtensions.some(ext => fileName.endsWith(ext));
    if (isValidExtension) {
      setFile(selectedFile);
      setStatus({ type: '', message: '' });
    } else {
      setFile(null);
      setStatus({ type: 'error', message: 'Please upload a valid .csv or .xlsx file.' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !email) {
      setStatus({ type: 'error', message: 'Both file and email are required.' });
      return;
    }

    setLoading(true);
    setStatus({ type: '', message: '' });

    const formData = new FormData();
    formData.append('file', file);
    formData.append('email', email);

    try {
      const response = await axios.post('http://localhost:5000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      setStatus({ 
        type: 'success', 
        message: 'Success! The AI is working and will email the summary shortly.' 
      });
      setFile(null);
      setEmail('');
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Failed to process request. Please try again later.';
      setStatus({ type: 'error', message: errorMsg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div 
        className={`relative group border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center transition-all duration-300 ease-in-out cursor-pointer ${
          isDragActive ? 'border-emerald-400 bg-emerald-400/10' : 
          file ? 'border-emerald-500/50 bg-slate-800' : 'border-slate-600 hover:border-slate-400 hover:bg-slate-700/50'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input 
          ref={fileInputRef}
          type="file" 
          accept=".csv, .xlsx" 
          onChange={handleFileChange} 
          className="hidden"
        />
        <UploadCloud className={`w-12 h-12 mb-4 transition-colors ${file ? 'text-emerald-400' : 'text-slate-400 group-hover:text-emerald-300'}`} />
        <div className="text-center">
          {file ? (
            <p className="text-emerald-300 font-medium break-words overflow-hidden">
              {file.name} ({(file.size / 1024).toFixed(1)} KB)
            </p>
          ) : (
            <>
              <p className="text-slate-300 font-medium mb-1">Drag & drop your file here</p>
              <p className="text-slate-500 text-sm">or click to browse (.csv, .xlsx)</p>
            </>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium text-slate-300 ml-1">
          Recipient Email
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-slate-500" />
          </div>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full pl-10 pr-3 py-3 border border-slate-600 rounded-lg bg-slate-900/50 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-colors"
            placeholder="colleague@rabbit.ai"
          />
        </div>
      </div>

      {status.message && (
        <div className={`p-4 rounded-lg flex items-start space-x-3 transition-opacity duration-300 ${status.type === 'success' ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400' : 'bg-rose-500/10 border border-rose-500/20 text-rose-400'}`}>
          {status.type === 'success' ? <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" /> : <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />}
          <span className="text-sm font-medium">{status.message}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={loading || !file || !email}
        className="w-full flex justify-center items-center py-3.5 px-4 border border-transparent rounded-lg shadow-sm font-semibold text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
            Analyzing & Sending...
          </>
        ) : (
          'Generate Insights'
        )}
      </button>
    </form>
  );
};

export default UploadForm;
