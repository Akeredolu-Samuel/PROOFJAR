import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Zap, Bot, BrainCircuit } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

const HeroSection: React.FC = () => {
  const { connected } = useWallet();

  return (
    <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden py-20">
      {/* Background Effects */}
      <div className="absolute inset-0 grid-pattern opacity-40" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/10 blur-[140px] glow-pulse" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[100px]" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge Row */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-md"
            >
              <span className="w-2 h-2 rounded-full bg-primary status-live" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Live on Solana</span>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md"
            >
              <BrainCircuit className="w-3 h-3 text-emerald-400" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">AI Verified</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 backdrop-blur-md"
            >
              <span className="text-[10px] font-bold uppercase tracking-widest text-amber-500">DEV3 Standard</span>
            </motion.div>
          </div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter leading-[0.95] mb-8"
          >
            STAKE YOUR GOALS.<br />
            <span className="text-gradient">PROVE WITH AI.</span><br />
            EARN THE POT.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-12 font-medium leading-relaxed"
          >
            ProofJar is the world&apos;s first <strong>AI-Powered Accountability Protocol</strong>. 
            Deposit SOL into secure vaults, submit photographic or textual proof, and let our 
            autonomous agents verify your progress. Break the cycle of procrastination with 
            on-chain skin in the game.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-20"
          >
            {connected ? (
              <Link
                to="/challenges"
                className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-primary text-primary-foreground font-black text-base transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_hsl(var(--primary)/0.4)]"
              >
                Launch App
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
            ) : (
              <div className="hover:scale-105 transition-transform">
                <WalletMultiButton />
              </div>
            )}
            <Link
              to="/challenges"
              className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl border border-white/10 bg-white/5 text-foreground font-bold text-base backdrop-blur-xl hover:bg-white/10 transition-all"
            >
              View Leaderboard
            </Link>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            {[
              { icon: Shield, label: 'Vault Security', desc: 'Non-custodial Solana vaults' },
              { icon: Bot, label: 'AI Verification', desc: 'Gemini-powered proof checks' },
              { icon: Zap, label: 'Auto-Disbursement', desc: 'Instant reward settlement' },
            ].map((item, i) => (
              <div key={i} className="group relative px-6 py-5 rounded-2xl glass-card transition-all hover:bg-white/10">
                <div className="p-3 rounded-xl bg-primary/10 w-fit mb-4 group-hover:bg-primary/20 transition-colors">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-black text-foreground uppercase tracking-wider">{item.label}</p>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
