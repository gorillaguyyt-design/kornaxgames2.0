import { Link, useLocation } from 'react-router-dom';
import { Gamepad2, Settings } from 'lucide-react';
import { motion } from 'motion/react';

export function Navbar() {
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-40 w-full bg-bg/80 backdrop-blur-xl border-b border-border">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <motion.div 
            whileHover={{ rotate: 12, scale: 1.1 }}
            className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(124,58,237,0.5)] group-hover:shadow-[0_0_30px_rgba(124,58,237,0.7)] transition-all"
          >
            <Gamepad2 className="w-6 h-6 text-white" />
          </motion.div>
          <span className="font-black text-2xl tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-white/50">NEBULA</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-2">
          {[
            { path: '/games', label: 'GAMES' },
            { path: '/apps', label: 'APPS' },
            { path: '/movies', label: 'MOVIES' },
            { path: '/browser', label: 'BROWSER' }
          ].map((item) => (
            <Link 
              key={item.path}
              to={item.path} 
              className="relative px-4 py-2 text-sm font-black tracking-widest text-text-secondary hover:text-white transition-colors group"
            >
              {item.label}
              {location.pathname === item.path && (
                <motion.div 
                  layoutId="nav-underline"
                  className="absolute bottom-0 left-4 right-4 h-0.5 bg-accent shadow-[0_0_10px_rgba(124,58,237,0.5)]"
                />
              )}
            </Link>
          ))}
        </div>

        <div className="flex items-center">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Link 
              to="/settings" 
              className="p-4 bg-white/5 hover:bg-white/10 border-2 border-white/10 hover:border-accent/50 rounded-2xl text-text-secondary hover:text-accent hover:shadow-[0_0_30px_rgba(124,58,237,0.4)] transition-all flex items-center justify-center"
              title="Settings"
            >
              <Settings className="w-7 h-7" strokeWidth={2.5} />
            </Link>
          </motion.div>
        </div>
      </div>
    </nav>
  );
}
