import { motion } from 'motion/react';
import { Settings as SettingsIcon, ExternalLink, Shield, Palette, Bell } from 'lucide-react';

export function Settings() {
  const openAboutBlank = () => {
    const win = window.open();
    if (!win) {
      alert('Popup blocked! Please allow popups to use this feature.');
      return;
    }
    
    win.document.body.style.margin = '0';
    win.document.body.style.height = '100vh';
    
    const iframe = win.document.createElement('iframe');
    iframe.style.border = 'none';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.margin = '0';
    iframe.src = window.location.origin;
    
    win.document.body.appendChild(iframe);
  };

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
          <div className="flex items-start justify-between gap-4 mb-6">
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
          
          <div className="p-6 bg-bg/50 rounded-2xl border border-border">
            <h3 className="font-bold mb-2">About:Blank Cloaking</h3>
            <p className="text-sm text-text-secondary mb-6">
              Opens the current website in a new <code className="bg-white/5 px-1 rounded text-accent">about:blank</code> tab. 
              This prevents the site from appearing in your browser history and can help bypass some basic filters.
            </p>
            <button
              onClick={openAboutBlank}
              className="flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-hover text-white rounded-xl font-bold transition-all hover:scale-105 active:scale-95"
            >
              <ExternalLink className="w-4 h-4" />
              Open in about:blank
            </button>
          </div>
        </section>

        {/* Appearance Section (Placeholder) */}
        <section className="p-8 bg-surface border border-border rounded-3xl opacity-50">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-white/5 rounded-lg">
              <Palette className="w-5 h-5 text-text-secondary" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Appearance</h2>
              <p className="text-sm text-text-secondary">Customize the look and feel (Coming Soon)</p>
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
