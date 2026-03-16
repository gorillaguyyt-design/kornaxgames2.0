import React from 'react';
import { Play } from 'lucide-react';
import { Game } from '../types';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

interface GameCardProps {
  game: Game;
}

export const GameCard: React.FC<GameCardProps> = ({ game }) => {
  return (
    <motion.div 
      whileHover={{ y: -8 }}
      className="group relative bg-surface border border-border rounded-2xl overflow-hidden transition-all duration-300 hover:border-accent hover:shadow-[0_20px_40px_rgba(124,58,237,0.15)] flex flex-col h-full"
    >
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={game.thumbnail} 
          alt={game.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-bg/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="relative z-10"
          >
            <Link 
              to={`/play/${game.id}`}
              className="bg-accent text-white p-5 rounded-full shadow-[0_0_30px_rgba(124,58,237,0.5)] flex items-center justify-center"
            >
              <Play className="w-8 h-8 fill-current" />
            </Link>
          </motion.div>
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-3">
          <Link to={`/play/${game.id}`}>
            <h3 className="text-xl font-bold text-text-primary group-hover:text-accent transition-colors tracking-tight">
              {game.title}
            </h3>
          </Link>
          {game.category && (
            <span className="text-[10px] uppercase tracking-widest font-black px-2 py-1 bg-accent/10 rounded-md text-accent border border-accent/20">
              {game.category}
            </span>
          )}
        </div>
        
        <p className="text-sm text-text-secondary line-clamp-2 flex-grow leading-relaxed">
          {game.description}
        </p>
        
        <div className="mt-4 pt-4 border-t border-border/50 flex items-center justify-between">
          <div className="flex -space-x-2">
            {[1,2,3].map(i => (
              <div key={i} className="w-6 h-6 rounded-full border-2 border-surface bg-white/10" />
            ))}
          </div>
          <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">
            {Math.floor(Math.random() * 100) + 10}k Plays
          </span>
        </div>
      </div>
    </motion.div>
  );
};
