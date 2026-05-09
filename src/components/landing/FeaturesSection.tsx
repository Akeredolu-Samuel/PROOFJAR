import React from 'react';
import { motion } from 'framer-motion';
import {
  Shield, Bot, Zap, Users, BarChart3, Lock,
  Globe, Coins, Fingerprint
} from 'lucide-react';

const features = [
  {
    icon: Lock,
    title: 'On-Chain Escrow',
    description: 'SOL locked in PDA-controlled vaults. No intermediaries, no trust required.',
  },
  {
    icon: Bot,
    title: 'AI Proof Verification',
    description: 'Intelligent agents analyze screenshots, links, and text to verify goal completion.',
  },
  {
    icon: Zap,
    title: 'Automatic Payouts',
    description: 'Smart contracts distribute rewards instantly when verification is complete.',
  },
  {
    icon: Users,
    title: 'Social Accountability',
    description: 'Challenge friends or join public challenges. Peer pressure meets financial incentives.',
  },
  {
    icon: BarChart3,
    title: 'Reputation System',
    description: 'On-chain reputation scores based on completion rates, streaks, and consistency.',
  },
  {
    icon: Coins,
    title: 'x402 Micropayments',
    description: 'Pay-per-verification API endpoints. No subscriptions, no API keys, just Solana.',
  },
  {
    icon: Shield,
    title: 'Anti-Cheat Detection',
    description: 'AI models detect fake screenshots, duplicate submissions, and suspicious patterns.',
  },
  {
    icon: Fingerprint,
    title: 'Proof References',
    description: 'Every verification stored on-chain with confidence scores and AI summaries.',
  },
  {
    icon: Globe,
    title: 'Public Infrastructure',
    description: 'Open protocol. Any app can plug into ProofJar verification via x402 APIs.',
  },
];

const FeaturesSection: React.FC = () => {
  return (
    <section className="relative py-24" id="features">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-3 block">
            Protocol Features
          </span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground mb-4">
            Internet-native accountability
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Everything you need to turn personal goals into verifiable, incentivized commitments on Solana.
          </p>
        </motion.div>

        {/* Feature Grid */}
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
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                <feature.icon className="w-5 h-5 text-primary" />
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
