import { motion } from 'motion/react';
import { Layout, ExternalLink } from 'lucide-react';
import { apps } from '../data/apps';

export const Apps = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col items-center text-center mb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-20 h-20 bg-accent/10 rounded-3xl flex items-center justify-center mb-8"
        >
          <Layout className="w-10 h-10 text-accent" />
        </motion.div>
        <h1 className="text-4xl font-black tracking-tighter mb-4 uppercase">Apps</h1>
        <p className="text-text-secondary max-w-md">
          Discover a curated collection of powerful web applications.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {apps.map((app, index) => (
          <motion.a
            key={app.name}
            href={app.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ y: -5 }}
            className="group relative bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col items-center gap-4 hover:bg-white/10 hover:border-accent/50 transition-all"
          >
            <div className="w-16 h-16 relative flex items-center justify-center">
              <img
                src={app.img}
                alt={app.name}
                className="w-full h-full object-contain filter group-hover:drop-shadow-[0_0_10px_rgba(124,58,237,0.5)] transition-all"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="font-bold text-sm tracking-tight text-center group-hover:text-accent transition-colors">
              {app.name}
            </span>
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <ExternalLink className="w-4 h-4 text-accent" />
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  );
};
