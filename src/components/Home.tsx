import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Rocket, Shield, Zap, Globe } from 'lucide-react';

export function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="relative w-full py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/10 to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/50">
              NEBULA HUB
            </h1>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto mb-10">
              The ultimate destination for games, apps, and entertainment. 
              Experience the next generation of web-based discovery.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                to="/games" 
                className="px-8 py-4 bg-accent hover:bg-accent-hover text-white rounded-2xl font-bold text-lg shadow-[0_0_30px_rgba(124,58,237,0.3)] transition-all hover:scale-105 active:scale-95"
              >
                Launch Games
              </Link>
              <Link 
                to="/apps" 
                className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-2xl font-bold text-lg transition-all hover:scale-105 active:scale-95"
              >
                Explore Apps
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
        {[
          { icon: Rocket, title: "Lightning Fast", desc: "Optimized performance for seamless browsing and gaming." },
          { icon: Shield, title: "Secure", desc: "Built-in protection to keep your experience safe and private." },
          { icon: Zap, title: "Instant Play", desc: "No downloads required. Click and play your favorite titles." },
          { icon: Globe, title: "Universal", desc: "Access your hub from any device, anywhere in the world." }
        ].map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="p-8 bg-surface border border-border rounded-3xl hover:border-accent/50 transition-colors group"
          >
            <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <feature.icon className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
            <p className="text-text-secondary text-sm leading-relaxed">{feature.desc}</p>
          </motion.div>
        ))}
      </section>
    </div>
  );
}
