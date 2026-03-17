import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { Rocket, Shield, Zap, Globe, ChevronRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const TAGLINES = [
  "PR IS ALWAYS WATCHING",
  "Grayson I dont have a proxy for you",
  "school is bunz",
  "class is for geeks",
  "doing my homework",
  "IM GETTING LANSCHOOLED",
  "Anthony is diamond dumpster in siege"
];

export function Home() {
  const { buttonColor } = useTheme();
  const [prClicks, setPrClicks] = useState(0);
  const [showScare, setShowScare] = useState(false);
  const [anthonyClicks, setAnthonyClicks] = useState(0);
  const [showAnthonyScare, setShowAnthonyScare] = useState(false);
  
  const tagline = useMemo(() => {
    const lastTagline = sessionStorage.getItem('lastTagline');
    let availableTaglines = TAGLINES;
    
    // Try to avoid the same tagline twice in a row
    if (lastTagline && TAGLINES.length > 1) {
      availableTaglines = TAGLINES.filter(t => t !== lastTagline);
    }
    
    const selected = availableTaglines[Math.floor(Math.random() * availableTaglines.length)];
    sessionStorage.setItem('lastTagline', selected);
    return selected;
  }, []);

  useEffect(() => {
    if (prClicks >= 3) {
      setShowScare(true);
      const audio = new Audio('/scare.mp3'); // Ensure you upload scare.mp3 to the public folder
      audio.play().catch(e => console.error("Audio play failed:", e));
      
      const timer = setTimeout(() => {
        setShowScare(false);
        setPrClicks(0);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [prClicks]);

  useEffect(() => {
    if (anthonyClicks >= 3) {
      setShowAnthonyScare(true);
      const timer = setTimeout(() => {
        setShowAnthonyScare(false);
        setAnthonyClicks(0);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [anthonyClicks]);

  const renderTagline = () => {
    if (tagline === "PR IS ALWAYS WATCHING") {
      return (
        <>
          <span 
            className="cursor-pointer hover:text-accent transition-colors"
            onClick={() => setPrClicks(prev => prev + 1)}
          >
            PR
          </span>
          {" IS ALWAYS WATCHING"}
        </>
      );
    }
    if (tagline === "Anthony is diamond dumpster in siege") {
      return (
        <>
          <span 
            className="cursor-pointer hover:text-accent transition-colors"
            onClick={() => setAnthonyClicks(prev => prev + 1)}
          >
            Anthony
          </span>
          {" is diamond dumpster in siege"}
        </>
      );
    }
    return tagline;
  };

  return (
    <div className="flex flex-col items-center overflow-hidden bg-bg relative">
      <AnimatePresence>
        {showScare && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0, 1, 0.5, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, repeat: 5 }}
            className="fixed inset-0 z-[100] bg-black flex items-center justify-center pointer-events-none"
          >
            <img 
              src="/pr.png" // Ensure you upload the image you sent to the public folder and name it pr.png
              alt="WATCHING"
              className="max-w-full max-h-full object-contain"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        )}
        {showAnthonyScare && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0, 1, 0.5, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, repeat: 5 }}
            className="fixed inset-0 z-[100] bg-black flex items-center justify-center pointer-events-none"
          >
            <img 
              src="/twan.png"
              alt="DUMPSTER"
              className="max-w-full max-h-full object-contain"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative w-full py-32 px-6 min-h-[80vh] flex items-center">
        {/* Animated Background Blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-accent/20 via-transparent to-transparent" />
          <div className="absolute -bottom-32 left-0 right-0 h-[600px] bg-gradient-to-t from-bg via-bg/80 to-transparent" />
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
            
            <h1 className="text-7xl md:text-9xl font-black tracking-tighter mb-8 leading-[0.85] bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/20 uppercase">
              KORNAX<br />GAMES
            </h1>
            
            <p className="text-xl md:text-2xl text-text-secondary max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
              {renderTagline()}
            </p>
            
            <div className="flex flex-wrap justify-center gap-6">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link 
                  to="/games" 
                  className="group px-10 py-5 bg-btn hover:bg-btn-hover text-white rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all min-w-[240px]"
                  style={{ boxShadow: `0 0 40px ${buttonColor}66` }}
                >
                  Launch Games
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link 
                  to="/apps" 
                  className="px-10 py-5 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-2xl font-black text-lg flex items-center justify-center transition-all min-w-[240px]"
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
