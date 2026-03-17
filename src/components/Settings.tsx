import { motion } from 'motion/react';
import { Settings as SettingsIcon, ExternalLink, Shield, Palette, Bell, Globe, RotateCcw } from 'lucide-react';
import { useTabCloak, CloakType } from '../context/TabCloakContext';
import { useTheme } from '../context/ThemeContext';
import { useProxy, ProxyMode } from '../context/ProxyContext';

export function Settings() {
  const { cloak, setCloak } = useTabCloak();
  const { buttonColor, accentColor, setButtonColor, setAccentColor } = useTheme();
  const { proxyMode, setProxyMode } = useProxy();

  const resetTheme = () => {
    setButtonColor('#f97316');
    setAccentColor('#f97316');
  };

  const openAboutBlank = () => {
    const win = window.open('about:blank', '_blank');
    if (!win) {
      alert('Popup blocked! Please allow popups to use this feature.');
      return;
    }
    
    const doc = win.document;
    doc.title = 'Google';
    
    // Ensure the URL ends with a slash for correct relative path resolution
    let baseUrl = window.location.origin + window.location.pathname;
    if (!baseUrl.endsWith('/') && !baseUrl.endsWith('.html')) {
      baseUrl += '/';
    }

    // Add a base tag to the parent about:blank document
    const base = doc.createElement('base');
    base.href = baseUrl;
    doc.head.appendChild(base);
    
    const icon = doc.createElement('link');
    icon.rel = 'icon';
    icon.href = 'https://www.google.com/favicon.ico';
    doc.head.appendChild(icon);
    
    const iframe = doc.createElement('iframe');
    const style = iframe.style;
    
    style.position = 'fixed';
    style.top = '0';
    style.bottom = '0';
    style.left = '0';
    style.right = '0';
    style.width = '100%';
    style.height = '100%';
    style.border = 'none';
    style.margin = '0';
    style.padding = '0';
    style.overflow = 'hidden';
    
    iframe.src = baseUrl;
    
    doc.body.appendChild(iframe);
    doc.body.style.margin = '0';
    doc.body.style.padding = '0';
    doc.body.style.overflow = 'hidden';
    doc.close();
  };

  const cloakOptions: { id: CloakType; name: string; icon: string }[] = [
    { id: 'none', name: 'None', icon: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 rx=%2220%22 fill=%22%237c3aed%22/><path d=%22M30 30h40v40H30z%22 fill=%22white%22/></svg>' },
    { id: 'google', name: 'Google', icon: 'https://www.google.com/favicon.ico' },
    { id: 'quizlet', name: 'Quizlet', icon: 'https://quizlet.com/favicon.ico' },
    { id: 'kahoot', name: 'Kahoot', icon: 'https://kahoot.it/favicon.ico' },
    { id: 'blooket', name: 'Blooket', icon: 'https://www.blooket.com/favicon.ico' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="flex items-center gap-4 mb-12">
        <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center">
          <SettingsIcon className="w-6 h-6 text-accent" />
        </div>
        <div>
          <h1 className="text-3xl font-black tracking-tighter uppercase">Settings</h1>
          <p className="text-text-secondary">Manage your Nebula Hub preferences</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Cloaking Section */}
        <section className="p-8 bg-surface border border-border rounded-3xl">
          <div className="flex items-start justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/5 rounded-lg">
                <Shield className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Privacy & Cloaking</h2>
                <p className="text-sm text-text-secondary">Hide your browsing activity from history</p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-bg/50 rounded-2xl border border-border">
              <h3 className="font-bold mb-2 flex items-center gap-2">
                <ExternalLink className="w-4 h-4 text-accent" />
                About:Blank Cloaking
              </h3>
              <p className="text-sm text-text-secondary mb-6">
                Opens the current website in a new <code className="bg-white/5 px-1 rounded text-accent">about:blank</code> tab. 
              </p>
              <button
                onClick={openAboutBlank}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-btn hover:bg-btn-hover text-white rounded-xl font-bold transition-all hover:scale-105 active:scale-95"
              >
                Launch Tab
              </button>
            </div>

            <div className="p-6 bg-bg/50 rounded-2xl border border-border">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <Globe className="w-4 h-4 text-accent" />
                Tab Cloaking
              </h3>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                {cloakOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setCloak(option.id)}
                    className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${
                      cloak === option.id 
                        ? 'bg-accent/10 border-accent shadow-[0_0_15px_rgba(124,58,237,0.2)]' 
                        : 'bg-white/5 border-white/10 hover:bg-white/10'
                    }`}
                    title={option.name}
                  >
                    <img 
                      src={option.icon} 
                      alt={option.name} 
                      className="w-6 h-6 rounded-sm"
                      referrerPolicy="no-referrer"
                    />
                    <span className="text-[10px] font-bold uppercase tracking-tighter truncate w-full text-center">
                      {option.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Browser & Proxy Section */}
        <section className="p-8 bg-surface border border-border rounded-3xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-white/5 rounded-lg">
              <Globe className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Browser & Proxy</h2>
              <p className="text-sm text-text-secondary">Configure how the web browser handles traffic</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { id: 'libcurl', name: 'Libcurl', desc: 'Server-side proxy (Bypasses most blocks)' },
              { id: 'epoxy', name: 'Epoxy', desc: 'Client-side proxy (Advanced unblocking)' }
            ].map((mode) => (
              <button
                key={mode.id}
                onClick={() => setProxyMode(mode.id as ProxyMode)}
                className={`p-6 rounded-2xl border text-left transition-all ${
                  proxyMode === mode.id 
                    ? 'bg-accent/10 border-accent shadow-[0_0_20px_rgba(249,115,22,0.2)]' 
                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                }`}
              >
                <div className="font-bold mb-1">{mode.name}</div>
                <div className="text-[10px] text-text-secondary leading-tight">{mode.desc}</div>
              </button>
            ))}
          </div>
        </section>

        {/* Appearance Section */}
        <section className="p-8 bg-surface border border-border rounded-3xl">
          <div className="flex items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/5 rounded-lg">
                <Palette className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Appearance</h2>
                <p className="text-sm text-text-secondary">Customize the look and feel of Nebula Hub</p>
              </div>
            </div>
            <button
              onClick={resetTheme}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-text-secondary hover:text-text-primary rounded-xl text-sm font-bold transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              Reset Defaults
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <label className="block">
                <span className="text-sm font-bold uppercase tracking-wider text-text-secondary mb-2 block">
                  Button Color
                </span>
                <div className="flex items-center gap-4 p-4 bg-bg/50 rounded-2xl border border-border">
                  <input
                    type="color"
                    value={buttonColor}
                    onChange={(e) => setButtonColor(e.target.value)}
                    className="w-12 h-12 rounded-lg bg-transparent border-none cursor-pointer"
                  />
                  <div className="flex-grow">
                    <div className="text-sm font-mono uppercase">{buttonColor}</div>
                    <div className="text-xs text-text-secondary">Primary actions and UI buttons</div>
                  </div>
                </div>
              </label>
            </div>

            <div className="space-y-4">
              <label className="block">
                <span className="text-sm font-bold uppercase tracking-wider text-text-secondary mb-2 block">
                  Accent & Particle Color
                </span>
                <div className="flex items-center gap-4 p-4 bg-bg/50 rounded-2xl border border-border">
                  <input
                    type="color"
                    value={accentColor}
                    onChange={(e) => setAccentColor(e.target.value)}
                    className="w-12 h-12 rounded-lg bg-transparent border-none cursor-pointer"
                  />
                  <div className="flex-grow">
                    <div className="text-sm font-mono uppercase">{accentColor}</div>
                    <div className="text-xs text-text-secondary">Gradients, particles, and highlights</div>
                  </div>
                </div>
              </label>
            </div>
          </div>
        </section>

        {/* Notifications Section (Placeholder) */}
        <section className="p-8 bg-surface border border-border rounded-3xl opacity-50">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-white/5 rounded-lg">
              <Bell className="w-5 h-5 text-text-secondary" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Notifications</h2>
              <p className="text-sm text-text-secondary">Stay updated on new releases (Coming Soon)</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
