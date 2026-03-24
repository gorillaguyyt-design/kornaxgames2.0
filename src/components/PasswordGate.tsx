import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, ShieldCheck, Gamepad2, ArrowRight } from 'lucide-react';

interface PasswordGateProps {
  children: React.ReactNode;
}

export function PasswordGate({ children }: PasswordGateProps) {
  const [password, setPassword] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const CORRECT_PASSWORD = 'skrimps';

  useEffect(() => {
    const authorized = localStorage.getItem('site_authorized') === 'true';
    if (authorized) {
      setIsAuthorized(true);
    }
    setIsLoading(false);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.toLowerCase() === CORRECT_PASSWORD) {
      setIsAuthorized(true);
      localStorage.setItem('site_authorized', 'true');
      setError(false);
    } else {
      setError(true);
      setPassword('');
      // Shake animation effect handled by motion
    }
  };

  if (isLoading) return null;

  if (isAuthorized) {
    return <>{children}</>;
  }

  return (
    <div className="fixed inset-0 z-[100] bg-bg flex items-center justify-center p-6 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/5 blur-[120px] rounded-full" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-surface border border-border p-8 md:p-10 rounded-[2.5rem] shadow-2xl shadow-black/50">
          <div className="flex flex-col items-center text-center mb-10">
            <motion.div
              initial={{ rotate: -10 }}
              animate={{ rotate: 0 }}
              className="w-20 h-20 bg-accent rounded-3xl flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(249,115,22,0.4)]"
            >
              <Gamepad2 className="w-10 h-10 text-white" />
            </motion.div>
            <div className="flex items-center gap-2 px-4 py-1.5 bg-white/5 rounded-full border border-white/10">
              <Lock className="w-3.5 h-3.5 text-accent" />
              <span className="text-[10px] font-black uppercase tracking-widest text-text-secondary">Restricted Access</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary ml-2">
                Enter Access Key
              </label>
              <motion.div
                animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
                transition={{ duration: 0.4 }}
                className="relative"
              >
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`w-full bg-bg border-2 px-6 py-4 rounded-2xl font-bold transition-all focus:outline-none focus:ring-4 focus:ring-accent/20 ${
                    error ? 'border-red-500/50 text-red-500' : 'border-white/5 focus:border-accent'
                  }`}
                  autoFocus
                />
                <AnimatePresence>
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="absolute -bottom-6 left-2 text-[10px] font-bold text-red-500 uppercase tracking-wider"
                    >
                      Invalid Access Key
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>

            <button
              type="submit"
              className="w-full group flex items-center justify-center gap-3 bg-accent hover:bg-accent/90 text-white py-5 rounded-2xl font-black tracking-tighter uppercase transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-accent/20"
            >
              Verify Identity
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-white/5 flex flex-col items-center gap-4">
            <div className="flex items-center gap-2 text-text-secondary">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Secure Environment</span>
            </div>
            <p className="text-[9px] text-text-secondary/50 text-center leading-relaxed max-w-[200px]">
              Unauthorized access is prohibited. All activities are logged for security purposes.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
