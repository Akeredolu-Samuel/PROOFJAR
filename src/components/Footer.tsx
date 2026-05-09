import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, ExternalLink } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-border/50 bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-3">
              <span className="text-xl">🫙</span>
              <span className="text-lg font-bold text-foreground">
                Proof<span className="text-gradient">Jar</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              AI-powered on-chain accountability protocol on Solana. Stake on your goals, prove your progress, earn your rewards.
            </p>
          </div>

          {/* Protocol */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">Protocol</h4>
            <div className="flex flex-col gap-2">
              <Link to="/challenges" className="text-sm text-muted-foreground hover:text-primary transition-colors">Explore Challenges</Link>
              <Link to="/create" className="text-sm text-muted-foreground hover:text-primary transition-colors">Create Challenge</Link>
              <Link to="/leaderboard" className="text-sm text-muted-foreground hover:text-primary transition-colors">Leaderboard</Link>
              <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-primary transition-colors">Dashboard</Link>
            </div>
          </div>

          {/* Developers */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">Developers</h4>
            <div className="flex flex-col gap-2">
              <span className="text-sm text-muted-foreground">API Documentation</span>
              <span className="text-sm text-muted-foreground">Smart Contracts</span>
              <span className="text-sm text-muted-foreground">x402 Integration</span>
              <span className="text-sm text-muted-foreground">SDK</span>
            </div>
          </div>

          {/* Community */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">Community</h4>
            <div className="flex flex-col gap-2">
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5">
                <Twitter className="w-3.5 h-3.5" /> Twitter
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5">
                <Github className="w-3.5 h-3.5" /> GitHub
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5">
                <ExternalLink className="w-3.5 h-3.5" /> Discord
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            Built on Solana. Powered by AI verification and x402 payments.
          </p>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="w-1.5 h-1.5 rounded-full bg-primary status-live" />
            Devnet
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
