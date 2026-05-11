import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Bot, Zap, Users, BarChart3, Coins, Shield, Fingerprint, Globe } from 'lucide-react';

const features = [
  {
    icon: Lock,
    title: 'Non-Custodial Escrow',
    description: 'SOL locked in PDA vaults controlled by code, not humans. No one can touch your funds but the smart contract.',
    tag: 'Solana PDAs',
  },
  {
    icon: Bot,
    title: 'AI Proof Verification',
    description: 'Gemini-powered agents analyze screenshots, URLs, and text entries — assigning confidence scores on every submission.',
    tag: 'Gemini API',
  },
  {
    icon: Zap,
    title: 'Instant Payouts',
    description: 'Smart contracts distribute the prize pool to winners automatically. No manual claims, no waiting.',
    tag: 'Automated Settlement',
  },
  {
    icon: Users,
    title: 'Social Accountability',
    description: 'Invite peers to your jar. Public jars create community pressure — proven by behavioral economics research.',
    tag: 'Commitment Devices',
  },
  {
    icon: BarChart3,
    title: 'On-Chain Reputation',
    description: 'Completion rate, streak, and trust score stored on-chain. Your accountability history is your credit score here.',
    tag: 'Immutable Record',
  },
  {
    icon: Coins,
    title: 'x402 Micropayments',
    description: 'Pay-per-verification API. No subscriptions or API keys — just SOL streaming for each proof check.',
    tag: 'x402 Protocol',
  },
  {
    icon: Shield,
    title: 'Anti-Cheat Detection',
    description: 'AI models detect fake screenshots, timestamp manipulation, and duplicate submissions before funds are released.',
    tag: 'Fraud Prevention',
  },
  {
    icon: Fingerprint,
    title: 'Proof on Chain',
    description: 'Every verification stored on-chain with AI confidence scores, timestamps, and summaries. Permanent receipt.',
    tag: 'Immutable Proofs',
  },
  {
    icon: Globe,
    title: 'Open Protocol',
    description: 'Any app can plug into ProofJar\'s verification layer via x402 APIs. Build accountability into anything.',
    tag: 'Composable',
  },
];

const FeaturesSection: React.FC = () => {
  return (
    <section className="relative py-24" id="features">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-3 block">
            Protocol Infrastructure
          </span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground mb-4">
            Built for real accountability
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Every feature engineered around one truth: <strong className="text-foreground">people keep commitments when money is on the line.</strong>
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group p-6 rounded-2xl glass-card transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
                  <feature.icon className="w-5 h-5 text-primary" />
                </div>
                <span className="text-[10px] font-mono text-primary/60 bg-primary/5 px-2 py-0.5 rounded-md border border-primary/10">
                  {feature.tag}
                </span>
              </div>
              <h3 className="text-base font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
