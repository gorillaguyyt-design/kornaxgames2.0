import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Rocket, Shield, Zap, Globe, ChevronRight } from 'lucide-react';

export function Home() {
  return (
    <div className="flex flex-col items-center overflow-hidden">
      {/* Hero Section */}
      <section className="relative w-full py-32 px-6 overflow-hidden min-h-[80vh] flex items-center">
        {/* Animated Background Blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            animate={{ 
              x: [0, 100, 0],
              y: [0, -50, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-24 -left-24 w-96 h-96 bg-accent/20 rounded-full blur-[100px]"
          />
          <motion.div 
            animate={{ 
              x: [0, -100, 0],
              y: [0, 50, 0],
              scale: [1, 1.5, 1]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-24 -right-24 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px]"
          />
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-accent text-xs font-bold uppercase tracking-widest mb-8"
            >
              <Zap className="w-3 h-3 fill-current" />
              Version 2.0 is Live
            </motion.div>
            
            <h1 className="text-7xl md:text-9xl font-black tracking-tighter mb-8 leading-[0.85] bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/20">
              NEBULA<br />HUB
            </h1>
            
            <p className="text-xl md:text-2xl text-text-secondary max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
              The ultimate destination for games, apps, and entertainment. 
              Experience the next generation of web-based discovery.
            </p>
            
            <div className="flex flex-wrap justify-center gap-6">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link 
                  to="/games" 
                  className="group px-10 py-5 bg-accent text-white rounded-2xl font-black text-lg shadow-[0_0_40px_rgba(124,58,237,0.4)] flex items-center gap-3 transition-all"
                >
                  Launch Games
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link 
                  to="/apps" 
                  className="px-10 py-5 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-2xl font-black text-lg transition-all"
                >
                  Explore Apps
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-6 py-32 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full relative">
        <div className="absolute inset-0 bg-accent/5 blur-[150px] -z-10" />
        
        {[
          { icon: Rocket, title: "Lightning Fast", desc: "Optimized performance for seamless browsing and gaming." },
          { icon: Shield, title: "Secure", desc: "Built-in protection to keep your experience safe and private." },
          { icon: Zap, title: "Instant Play", desc: "No downloads required. Click and play your favorite titles." },
          { icon: Globe, title: "Universal", desc: "Access your hub from any device, anywhere in the world." }
        ].map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            whileHover={{ y: -10 }}
            className="p-10 bg-surface/50 backdrop-blur-xl border border-border rounded-[2.5rem] hover:border-accent/50 transition-all group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <feature.icon className="w-24 h-24" />
            </div>
            
            <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-accent group-hover:text-white transition-all duration-500">
              <feature.icon className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold mb-4 tracking-tight">{feature.title}</h3>
            <p className="text-text-secondary text-base leading-relaxed">{feature.desc}</p>
          </motion.div>
        ))}
      </section>
    </div>
  );
}
