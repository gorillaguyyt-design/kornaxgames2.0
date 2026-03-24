import { motion } from 'motion/react';
import { Globe, ExternalLink, Shield, Zap, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { apps } from '../data/apps';

import { useProxy } from '../context/ProxyContext';

export function Browser() {
  const { selectedNodeId } = useProxy();
  const browsers = apps.filter(app => app.id.startsWith('rammerhead'));

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col items-center text-center mb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-20 h-20 bg-accent/10 rounded-3xl flex items-center justify-center mb-8"
        >
          <Globe className="w-10 h-10 text-accent" />
        </motion.div>
        <h1 className="text-4xl font-black tracking-tighter mb-4 uppercase">Web Browser</h1>
        <p className="text-text-secondary max-w-md">
          Access the open web through our high-speed, secure proxy nodes.
        </p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8"
        >
          <Link
            to={`/play/${selectedNodeId}`}
            className="inline-flex items-center gap-3 px-8 py-4 bg-accent hover:bg-accent/90 text-white rounded-2xl font-black tracking-tighter uppercase shadow-[0_0_30px_rgba(124,58,237,0.3)] hover:scale-105 active:scale-95 transition-all"
          >
            <Zap className="w-5 h-5" /> Launch Default Browser
          </Link>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {browsers.map((browser, index) => {
          const isSelected = browser.id === selectedNodeId;
          return (
            <motion.div
              key={browser.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`group relative bg-surface border rounded-3xl p-8 transition-all overflow-hidden ${
                isSelected ? 'border-accent shadow-[0_0_30px_rgba(124,58,237,0.15)]' : 'border-border hover:border-accent/50'
              }`}
            >
              {/* Background Glow */}
              <div className={`absolute -right-20 -top-20 w-40 h-40 blur-3xl rounded-full transition-all ${
                isSelected ? 'bg-accent/15' : 'bg-accent/5 group-hover:bg-accent/10'
              }`} />
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center">
                    <Search className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-bold">{browser.name}</h3>
                      {isSelected && (
                        <span className="px-2 py-0.5 bg-accent/20 text-accent text-[8px] font-black uppercase tracking-widest rounded-full">Default</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-green-500">
                        <Zap className="w-3 h-3" /> Online
                      </span>
                      <span className="w-1 h-1 bg-white/20 rounded-full" />
                      <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-text-secondary">
                        <Shield className="w-3 h-3" /> Encrypted
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-text-secondary mb-8 leading-relaxed">
                  A high-performance Rammerhead node providing unrestricted access to the web with advanced unblocking capabilities.
                </p>

                <Link
                  to={`/play/${browser.id}`}
                  className={`w-full flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-bold transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg ${
                    isSelected ? 'bg-accent text-white shadow-accent/20' : 'bg-btn hover:bg-btn-hover text-white shadow-accent/10'
                  }`}
                >
                  Launch Browser <ExternalLink className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-20 p-8 bg-white/5 border border-white/10 rounded-3xl max-w-2xl mx-auto text-center">
        <h4 className="font-bold mb-2">Why use our browser?</h4>
        <p className="text-sm text-text-secondary">
          Our browser nodes use advanced proxy technology to bypass network filters and keep your browsing private. 
          Each node is independent, so if one is blocked, you can try another.
        </p>
      </div>
    </div>
  );
}
