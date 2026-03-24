import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Maximize2, Minimize2, RefreshCw, Share2, ExternalLink } from 'lucide-react';
import { MOCK_GAMES } from '../data/games';
import { apps } from '../data/apps';
import { motion, AnimatePresence } from 'motion/react';

export const Runner: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const item = MOCK_GAMES.find(g => g.id === id) || apps.find(a => a.id === id);
  const game = item ? {
    title: 'title' in item ? item.title : item.name,
    url: item.url
  } : null;

  useEffect(() => {
    if (!game) {
      navigate('/');
    }
  }, [game, navigate]);

  const toggleFullscreen = () => {
    if (!iframeRef.current) return;

    if (!document.fullscreenElement) {
      iframeRef.current.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const reloadGame = () => {
    if (iframeRef.current) {
      setIsLoading(true);
      iframeRef.current.src = iframeRef.current.src;
    }
  };

  if (!game) return null;

  const isRelativeUrl = game.url.startsWith('/') && !game.url.startsWith('//');
  const hasNoBaseUrl = isRelativeUrl && window.location.origin === new URL(game.url, window.location.origin).origin;

  return (
    <div className="fixed inset-0 bg-bg flex flex-col z-50">
      {/* Top Navigation Bar */}
      <nav className="h-16 bg-surface border-b border-border px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <Link 
            to="/" 
            className="p-2 hover:bg-white/5 rounded-lg text-text-secondary hover:text-text-primary transition-colors"
            title="Back to Gallery"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="h-6 w-[1px] bg-border mx-2" />
          <div>
            <h1 className="text-sm font-bold text-text-primary leading-none mb-1">{game.title}</h1>
            <p className="text-[10px] text-text-secondary uppercase tracking-widest font-semibold">Playing Now</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={reloadGame}
            className="p-2 hover:bg-white/5 rounded-lg text-text-secondary hover:text-text-primary transition-colors"
            title="Reload Game"
          >
            <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
          <button 
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              alert('Link copied to clipboard!');
            }}
            className="p-2 hover:bg-white/5 rounded-lg text-text-secondary hover:text-text-primary transition-colors"
            title="Share Game"
          >
            <Share2 className="w-5 h-5" />
          </button>
          <div className="h-6 w-[1px] bg-border mx-2" />
          <button 
            onClick={toggleFullscreen}
            className="flex items-center gap-2 px-4 py-2 bg-btn hover:bg-btn-hover text-white rounded-lg font-semibold transition-all"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            <span className="text-sm hidden sm:inline">{isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}</span>
          </button>
        </div>
      </nav>

      {/* Game Container */}
      <div className="flex-grow relative bg-black">
        {hasNoBaseUrl ? (
          <div className="absolute inset-0 z-20 bg-surface flex flex-col items-center justify-center p-8 text-center">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-6">
              <ExternalLink className="w-8 h-8 text-accent" />
            </div>
            <h2 className="text-2xl font-bold text-text-primary mb-4">Configuration Required</h2>
            <p className="text-text-secondary max-w-md mb-8">
              This game uses a relative path (<code className="text-accent">{game.url}</code>). 
              To play it, you must set the <code className="text-accent">GAME_BASE_URL</code> in <code className="text-white">src/data/games.ts</code>.
            </p>
            <Link to="/" className="px-6 py-3 bg-btn hover:bg-btn-hover text-white rounded-xl font-bold transition-all">
              Return to Hub
            </Link>
          </div>
        ) : (
          <>
            <AnimatePresence>
              {isLoading && (
                <motion.div 
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-10 bg-bg flex flex-col items-center justify-center"
                >
                  <div className="w-16 h-16 border-4 border-accent/20 border-t-accent rounded-full animate-spin mb-6" />
                  <h2 className="text-xl font-bold text-text-primary mb-2">Initializing Game</h2>
                  <p className="text-text-secondary text-sm">Loading assets and preparing environment...</p>
                </motion.div>
              )}
            </AnimatePresence>

            <iframe
              ref={iframeRef}
              src={game.url}
              className="w-full h-full border-none"
              onLoad={() => setIsLoading(false)}
              /* Added sandbox for security and to prevent top-level navigation loops */
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals allow-presentation"
              allow="autoplay; fullscreen; keyboard; gamepad"
              title={game.title}
            />
          </>
        )}
      </div>

      {/* Footer Info (Optional) */}
      <div className="h-12 bg-surface border-t border-border px-6 flex items-center justify-between text-[10px] text-text-secondary shrink-0">
        <div className="flex items-center gap-4">
          <span>STATUS: ONLINE</span>
          <span>LATENCY: 12ms</span>
          <span>ENGINE: HTML5</span>
        </div>
        <a 
          href={game.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-1 hover:text-accent transition-colors"
        >
          OPEN IN NEW TAB <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
};
