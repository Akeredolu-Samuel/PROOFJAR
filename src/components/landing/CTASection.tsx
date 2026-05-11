import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Flame } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

const CTASection: React.FC = () => {
  const { connected } = useWallet();

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/[0.04] to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/6 blur-[160px]" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <Flame className="w-5 h-5 text-amber-400" />
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Financial Accountability Protocol</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-foreground mb-5 leading-tight">
            Stop setting goals.<br />
            <span className="text-gradient">Start staking them.</span>
          </h2>

          <p className="text-lg text-muted-foreground mb-4 max-w-xl mx-auto">
            The science is clear — financial commitment devices work. ProofJar puts that on Solana,
            verified by AI, settled on-chain. No excuses. No shortcuts. Just proof.
          </p>

          <p className="text-sm text-muted-foreground/70 italic mb-10">
            "People who commit to their goals publicly and financially are{' '}
            <strong className="text-foreground not-italic">65% more likely to achieve them</strong>."
            — American Society of Training & Development
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {connected ? (
              <Link
                to="/create"
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-bold hover:brightness-110 transition-all shadow-[0_0_30px_hsl(var(--primary)/0.3)]"
              >
                Create Your First Jar
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            ) : (
              <WalletMultiButton />
            )}
            <Link to="/challenges" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-white/10 bg-white/5 text-foreground font-medium hover:bg-white/10 transition-all">
              Browse Active Jars
            </Link>
          </div>

          <p className="mt-8 text-xs text-muted-foreground">
            Live on Solana Devnet · Real transactions · No real SOL needed for testing
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
