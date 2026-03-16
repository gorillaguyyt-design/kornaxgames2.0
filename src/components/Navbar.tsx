import { Link } from 'react-router-dom';
import { Gamepad2, Settings } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="sticky top-0 z-40 w-full bg-bg/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(124,58,237,0.4)] group-hover:scale-110 transition-transform">
            <Gamepad2 className="w-5 h-5 text-white" />
          </div>
          <span className="font-black text-xl tracking-tighter">NEBULA</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          <Link to="/games" className="text-sm font-semibold text-text-secondary hover:text-accent transition-colors">GAMES</Link>
          <Link to="/apps" className="text-sm font-semibold text-text-secondary hover:text-accent transition-colors">APPS</Link>
          <Link to="/movies" className="text-sm font-semibold text-text-secondary hover:text-accent transition-colors">MOVIES</Link>
          <Link to="/browser" className="text-sm font-semibold text-text-secondary hover:text-accent transition-colors">BROWSER</Link>
        </div>

        <div className="flex items-center gap-4">
          <Link 
            to="/settings" 
            className="p-2 hover:bg-white/5 rounded-lg text-text-secondary hover:text-accent transition-all"
            title="Settings"
          >
            <Settings className="w-5 h-5" />
          </Link>
          <button className="px-5 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-bold hover:bg-white/10 transition-all">
            SIGN IN
          </button>
        </div>
      </div>
    </nav>
  );
}
