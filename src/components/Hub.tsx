import React, { useState, useMemo } from 'react';
import { Search, Gamepad2, TrendingUp, LayoutGrid } from 'lucide-react';
import { MOCK_GAMES } from '../data/games';
import { GameCard } from './GameCard';
import { motion } from 'motion/react';

export const Hub: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredGames = useMemo(() => {
    return MOCK_GAMES.filter(game => 
      game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.category?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <div className="min-h-screen pb-20">
      {/* Hero Section */}
      <header className="relative py-24 px-6">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-accent/20 via-accent/5 to-transparent" />
          <div className="absolute -bottom-16 left-0 right-0 h-64 bg-gradient-to-t from-bg via-bg/50 to-transparent" />
          <motion.div 
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.05, 0.15, 0.05]
            }}
            transition={{ duration: 15, repeat: Infinity }}
            className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full blur-[150px] bg-accent rounded-full -translate-y-1/2" 
          />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold uppercase tracking-widest mb-6">
              <TrendingUp className="w-3 h-3" />
              Trending Now
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-text-primary mb-6 tracking-tighter leading-none">
              GAMES <span className="text-accent">LIBRARY</span>
            </h1>
            <p className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto mb-10 font-medium">
              Discover and play high-performance web games directly in your browser. No downloads required.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-xl mx-auto relative group"
          >
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-text-secondary group-focus-within:text-accent transition-colors">
              <Search className="w-6 h-6" />
            </div>
            <input 
              type="text"
              placeholder="Search games, categories..."
              className="w-full bg-surface/50 backdrop-blur-xl border border-border rounded-2xl py-5 pl-14 pr-6 text-text-primary focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all text-xl font-medium placeholder:text-text-secondary/50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </motion.div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-accent/10 rounded-lg text-accent">
              <LayoutGrid className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-bold text-text-primary">Library</h2>
          </div>
          <div className="text-sm text-text-secondary">
            Showing {filteredGames.length} games
          </div>
        </div>

        {filteredGames.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredGames.map((game, index) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <GameCard game={game} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="inline-flex p-6 bg-surface border border-border rounded-full mb-6">
              <Gamepad2 className="w-12 h-12 text-text-secondary opacity-20" />
            </div>
            <h3 className="text-xl font-bold text-text-primary mb-2">No games found</h3>
            <p className="text-text-secondary">Try adjusting your search or browse our categories.</p>
          </div>
        )}
      </main>
    </div>
  );
};
