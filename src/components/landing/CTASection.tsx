import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

const CTASection: React.FC = () => {
  const { connected } = useWallet();

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/[0.03] to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[150px]" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <span className="text-5xl mb-6 block">🫙</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-foreground mb-5 leading-tight">
            Ready to put your <span className="text-gradient">money where your mouth is?</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
            Join thousands of people using ProofJar to turn accountability into an internet-native 
            financial coordination layer powered by Solana.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {connected ? (
              <Link
                to="/create"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold hover:brightness-110 transition-all shadow-[0_0_30px_hsl(var(--primary)/0.3)]"
              >
                Create Your First Challenge
                <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <WalletMultiButton />
            )}
          </div>

          <p className="mt-8 text-xs text-muted-foreground">
            Currently live on Solana Devnet. No real SOL required for testing.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
