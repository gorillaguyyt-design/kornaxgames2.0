import React from 'react';
import { Play } from 'lucide-react';
import { Game } from '../types';
import { Link } from 'react-router-dom';

interface GameCardProps {
  game: Game;
}

export const GameCard: React.FC<GameCardProps> = ({ game }) => {
  return (
    <div className="group relative bg-surface border border-border rounded-xl overflow-hidden transition-all duration-300 hover:border-accent hover:shadow-[0_0_20px_rgba(124,58,237,0.2)] flex flex-col h-full">
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={game.thumbnail} 
          alt={game.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Link 
            to={`/play/${game.id}`}
            className="bg-accent text-white p-4 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
          >
            <Play className="w-6 h-6 fill-current" />
          </Link>
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <Link to={`/play/${game.id}`}>
            <h3 className="text-lg font-bold text-text-primary group-hover:text-accent transition-colors">
              {game.title}
            </h3>
          </Link>
          {game.category && (
            <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-1 bg-white/5 rounded-md text-text-secondary">
              {game.category}
            </span>
          )}
        </div>
        
        <p className="text-sm text-text-secondary line-clamp-2 flex-grow">
          {game.description}
        </p>
      </div>
    </div>
  );
};
