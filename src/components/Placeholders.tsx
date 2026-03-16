import { motion } from 'motion/react';
import { Layout, Film, Globe, Settings as SettingsIcon } from 'lucide-react';

const Placeholder = ({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) => (
  <div className="max-w-7xl mx-auto px-6 py-24 flex flex-col items-center text-center">
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-20 h-20 bg-accent/10 rounded-3xl flex items-center justify-center mb-8"
    >
      <Icon className="w-10 h-10 text-accent" />
    </motion.div>
    <h1 className="text-4xl font-black tracking-tighter mb-4 uppercase">{title}</h1>
    <p className="text-text-secondary max-w-md">{desc}</p>
    <div className="mt-12 p-12 border-2 border-dashed border-border rounded-3xl w-full max-w-2xl">
      <p className="text-text-secondary font-mono text-sm">Content for {title.toLowerCase()} is coming soon...</p>
    </div>
  </div>
);

export const Movies = () => <Placeholder icon={Film} title="Movies" desc="Stream your favorite content directly in your browser." />;
export const Browser = () => <Placeholder icon={Globe} title="Browser" desc="A powerful, secure browsing experience within Nebula." />;
