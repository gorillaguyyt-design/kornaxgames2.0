import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Globe, ArrowLeft, ArrowRight, RotateCw, Shield, Search, Lock, ShieldCheck } from 'lucide-react';
import { useProxy } from '../context/ProxyContext';

export const Browser = () => {
  const [url, setUrl] = useState('https://www.google.com/search?igu=1');
  const [inputUrl, setInputUrl] = useState('https://google.com');
  const { proxyMode } = useProxy();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleNavigate = (e: React.FormEvent) => {
    e.preventDefault();
    let targetUrl = inputUrl.trim();
    
    if (!targetUrl) return;

    // Check if it's a URL or a search query
    const isUrl = targetUrl.includes('.') && !targetUrl.includes(' ');
    
    if (isUrl) {
      if (!targetUrl.startsWith('http')) {
        targetUrl = 'https://' + targetUrl;
      }
    } else {
      // Search query
      targetUrl = `https://www.google.com/search?q=${encodeURIComponent(targetUrl)}`;
    }
    
    if (proxyMode === 'libcurl') {
      setUrl(`/api/proxy?url=${encodeURIComponent(targetUrl)}`);
    } else {
      // Epoxy mode
      setUrl(`/api/proxy?url=${encodeURIComponent(targetUrl)}&mode=epoxy`);
    }
  };

  const goBack = () => {
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage({ type: 'NEBULA_BACK' }, '*');
    }
  };

  const goForward = () => {
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage({ type: 'NEBULA_FORWARD' }, '*');
    }
  };

  const reload = () => {
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage({ type: 'NEBULA_RELOAD' }, '*');
    } else if (iframeRef.current) {
      // Fallback
      iframeRef.current.src = iframeRef.current.src;
    }
  };

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'NEBULA_NAVIGATE') {
        setInputUrl(event.data.url);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 h-[calc(100vh-120px)] flex flex-col">
      <div className="flex flex-col items-center text-center mb-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mb-4"
        >
          <Globe className="w-8 h-8 text-accent" />
        </motion.div>
        <h1 className="text-3xl font-black tracking-tighter uppercase">Web Browser</h1>
      </div>

      <div className="flex-grow bg-surface border border-border rounded-[2.5rem] overflow-hidden flex flex-col shadow-2xl">
        {/* Browser Toolbar */}
        <div className="bg-white/5 border-b border-border p-4 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <button 
              onClick={goBack}
              className="p-2 hover:bg-white/10 rounded-lg text-text-secondary transition-colors"
              title="Go Back"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button 
              onClick={goForward}
              className="p-2 hover:bg-white/10 rounded-lg text-text-secondary transition-colors"
              title="Go Forward"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
            <button 
              onClick={reload} 
              className="p-2 hover:bg-white/10 rounded-lg text-text-secondary transition-colors"
              title="Reload"
            >
              <RotateCw className="w-4 h-4" />
            </button>
            <div className="w-px h-4 bg-border mx-1" />
            <div className="flex items-center gap-1.5 px-2 py-1 bg-emerald-500/10 rounded-md border border-emerald-500/20" title="Session Isolated: Your main browser cookies are not shared.">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider">Isolated</span>
            </div>
          </div>

          <form onSubmit={handleNavigate} className="flex-grow relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
              <Shield className="w-3 h-3 text-emerald-500" />
              <div className="w-[1px] h-3 bg-border" />
            </div>
            <input
              type="text"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl py-2.5 pl-12 pr-4 text-sm font-medium focus:outline-none focus:border-accent/50 transition-all"
              placeholder="Search or enter URL..."
            />
            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 hover:bg-white/10 rounded-lg text-text-secondary">
              <Search className="w-3 h-3" />
            </button>
          </form>

          <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/10">
            <Lock className="w-3 h-3 text-emerald-500" />
            <span className="text-[10px] font-black tracking-widest text-text-secondary uppercase">
              {proxyMode}
            </span>
          </div>
        </div>

        {/* Browser Content */}
        <div className="flex-grow relative bg-white">
          <iframe
            ref={iframeRef}
            src={url}
            className="w-full h-full border-none"
            title="Browser Content"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
          
          {/* Overlay for blocked sites warning */}
          <div className="absolute bottom-4 right-4 max-w-xs bg-black/80 backdrop-blur-md p-4 rounded-2xl border border-white/10 text-[10px] text-text-secondary">
            <p className="mb-2 uppercase font-black tracking-widest text-white">Browser Note</p>
            <p>Some sites may block iframing for security. For a full "Rammerhead" experience, you would typically host a dedicated proxy server.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
