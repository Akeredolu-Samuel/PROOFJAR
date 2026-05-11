import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, DollarSign, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

const FACTS = [
  { stat: '91.4%', label: 'of New Year\u2019s resolutions fail by February', src: 'University of Scranton' },
  { stat: '3x', label: 'higher success rate when financial stakes are involved', src: 'Dominican University Study' },
  { stat: '$76B', label: 'lost annually in unused gym memberships alone', src: 'Statistic Brain' },
];

const HeroSection: React.FC = () => {
  const { connected } = useWallet();

  return (
    <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden py-20">
      {/* Background Effects */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full bg-primary/8 blur-[180px]" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[400px] bg-amber-500/5 rounded-full blur-[120px]" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      {/* Floating financial particles */}
      {['💰', '🔐', '📈', '✅', '🫙'].map((emoji, i) => (
        <motion.span
          key={i}
          className="absolute text-2xl opacity-20 select-none pointer-events-none"
          style={{
            left: `${10 + i * 18}%`,
            top: `${20 + (i % 2) * 40}%`,
          }}
          animate={{ y: [0, -20, 0], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut' }}
        >
          {emoji}
        </motion.span>
      ))}

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
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Live on Solana Devnet</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 backdrop-blur-md"
            >
              <TrendingUp className="w-3 h-3 text-amber-400" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400">Colosseum Hackathon 2025</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md"
            >
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">AI-Verified Proofs</span>
            </motion.div>
          </div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-6"
          >
            PUT YOUR MONEY<br />
            <span className="text-gradient">WHERE YOUR</span><br />
            GOALS ARE.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-6 font-medium leading-relaxed"
          >
            <strong className="text-foreground">ProofJar</strong> is Solana's on-chain{' '}
            <strong className="text-primary">financial accountability protocol</strong>. Lock real SOL into commitment jars,
            submit AI-verified proof of completion, and earn back your stake — plus the stakes of those who quit.
          </motion.p>

          {/* Fact Banner */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-500/10 border border-amber-500/20 mb-12 text-sm text-amber-300 font-medium"
          >
            <DollarSign className="w-4 h-4 text-amber-400 flex-shrink-0" />
            Behavioral economics research shows financial commitment devices{' '}
            <strong className="text-amber-200">increase goal completion by 3x</strong>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-20"
          >
            {connected ? (
              <Link
                to="/create"
                className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-primary text-primary-foreground font-black text-base transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_hsl(var(--primary)/0.4)]"
              >
                Create a Jar
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary to-emerald-400 opacity-0 group-hover:opacity-20 transition-opacity" />
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
              View Active Jars
            </Link>
          </motion.div>

          {/* Behavioral Economics Facts */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto"
          >
            {FACTS.map((fact, i) => (
              <div key={i} className="group relative px-6 py-6 rounded-2xl glass-card transition-all hover:bg-white/10 text-left">
                <p className="text-3xl font-black text-gradient mb-2 stat-glow">{fact.stat}</p>
                <p className="text-sm text-foreground font-semibold mb-1">{fact.label}</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Source: {fact.src}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
