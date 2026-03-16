import { Game } from '../types';
import { GAMES_PART1 } from './games_part1';
import { GAMES_PART2 } from './games_part2';
import { GAMES_PART3 } from './games_part3';
import { GAMES_PART4 } from './games_part4';
import { GAMES_PART5 } from './games_part5';
import { GAMES_PART6 } from './games_part6';

/**
 * CONFIGURATION: Set your external repository base URLs here.
 * If your games are hosted at https://example.github.io/my-games/
 * set GAME_BASE_URL to that address.
 */
export const GAME_BASE_URL = 'https://raw.githack.com/x8rr/cherri/master';
export const ASSET_BASE_URL = 'https://raw.githack.com/x8rr/cherri/master';

const ALL_GAMES_RAW: Game[] = [
  ...GAMES_PART1,
  ...GAMES_PART2,
  ...GAMES_PART3,
  ...GAMES_PART4,
  ...GAMES_PART5,
  ...GAMES_PART6
];

// Helper to resolve URLs
const resolveUrl = (url: string, base: string) => {
  if (!url) return '';
  if (url.startsWith('http') || url.startsWith('//')) return url;
  return `${base}${url}`;
};

export const MOCK_GAMES: Game[] = ALL_GAMES_RAW.map(game => ({
  ...game,
  url: resolveUrl(game.url, GAME_BASE_URL),
  thumbnail: resolveUrl(game.thumbnail, ASSET_BASE_URL)
}));

/**
 * Fetches games from a GitHub repository structure.
 */
export async function fetchGamesFromRepo(repoUrl: string): Promise<Game[]> {
  try {
    const response = await fetch(repoUrl);
    if (!response.ok) throw new Error('Failed to fetch repo contents');
    const data = await response.json();
    
    return data
      .filter((item: any) => item.type === 'dir')
      .map((dir: any) => ({
        id: dir.name,
        title: dir.name.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()),
        url: `https://raw.githack.com/${repoUrl.split('/')[4]}/${repoUrl.split('/')[5]}/master/${dir.name}/index.html`,
        thumbnail: `https://picsum.photos/seed/${dir.name}/400/250`,
        description: `Play ${dir.name} now!`
      }));
  } catch (error) {
    console.error('Error fetching games:', error);
    return MOCK_GAMES;
  }
}
