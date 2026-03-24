import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { TabCloakProvider } from './context/TabCloakContext';
import { ProxyProvider } from './context/ProxyContext';
import { PasswordGate } from './components/PasswordGate';
import { Hub } from './components/Hub';
import { Runner } from './components/Runner';
import { Home } from './components/Home';
import { Navbar } from './components/Navbar';
import { Apps } from './components/Apps';
import { Browser } from './components/Browser';
import { Movies } from './components/Placeholders';
import { Settings } from './components/Settings';
import { ParticleBackground } from './components/ParticleBackground';
import { Gamepad2 } from 'lucide-react';

export default function App() {
  return (
    <ThemeProvider>
      <TabCloakProvider>
        <ProxyProvider>
          <PasswordGate>
            <Router>
              <div className="min-h-screen bg-bg text-text-primary selection:bg-accent/30 flex flex-col relative overflow-hidden">
                <ParticleBackground />
                <div className="relative z-20 flex flex-col min-h-screen">
                  <Navbar />

                  <main className="flex-grow">
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/games" element={<Hub />} />
                      <Route path="/apps" element={<Apps />} />
                      <Route path="/browser" element={<Browser />} />
                      <Route path="/movies" element={<Movies />} />
                      <Route path="/settings" element={<Settings />} />
                      <Route path="/play/:id" element={<Runner />} />
                    </Routes>
                  </main>

                  {/* Footer */}
                  <footer className="border-t border-border py-12 px-6">
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                      <Link to="/" className="flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity">
                        <Gamepad2 className="w-5 h-5" />
                        <span className="font-bold tracking-tighter uppercase">SKRIMPY GAMES</span>
                      </Link>
                      <div className="text-text-secondary text-sm">
                        © 2026 Nebula Entertainment. All rights reserved.
                      </div>
                      <div className="flex gap-6">
                        <a href="#" className="text-text-secondary hover:text-accent transition-colors text-sm">Privacy</a>
                        <a href="#" className="text-text-secondary hover:text-accent transition-colors text-sm">Terms</a>
                        <a href="#" className="text-text-secondary hover:text-accent transition-colors text-sm">Cookies</a>
                      </div>
                    </div>
                  </footer>
                </div>
              </div>
            </Router>
          </PasswordGate>
        </ProxyProvider>
      </TabCloakProvider>
    </ThemeProvider>
  );
}
