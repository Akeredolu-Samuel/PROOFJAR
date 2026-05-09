import React from 'react';
import { motion } from 'framer-motion';
import { Target, Wallet, Upload, Bot, Trophy, ArrowDown } from 'lucide-react';

const steps = [
  {
    icon: Target,
    title: 'Create a Challenge',
    description: 'Define your goal, set duration, choose verification type, and invite participants.',
    detail: 'Daily posting, fitness goals, learning streaks, building in public',
  },
  {
    icon: Wallet,
    title: 'Stake SOL',
    description: 'Lock SOL into an on-chain escrow vault. Your skin in the game.',
    detail: 'Funds secured by Solana smart contracts with PDA vaults',
  },
  {
    icon: Upload,
    title: 'Submit Proof',
    description: 'Upload screenshots, share links, or submit text as proof of completion.',
    detail: 'Daily or weekly submissions depending on challenge frequency',
  },
  {
    icon: Bot,
    title: 'AI Verification',
    description: 'AI agents analyze your proof, detect fraud, and assign confidence scores.',
    detail: 'Powered by x402 pay-per-verification micropayments',
  },
  {
    icon: Trophy,
    title: 'Earn Rewards',
    description: 'Winners receive automatic payouts. Reputation scores update on-chain.',
    detail: 'Smart contract distributes funds based on completion rate',
  },
];

const HowItWorksSection: React.FC = () => {
  return (
    <section className="relative py-24 overflow-hidden" id="how-it-works">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-3 block">
            How It Works
          </span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground mb-4">
            From goal to payout in 5 steps
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            A fully automated accountability loop powered by Solana smart contracts and AI verification agents.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="max-w-2xl mx-auto">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative"
            >
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="absolute left-[27px] top-[68px] w-px h-[calc(100%-40px)] bg-gradient-to-b from-primary/30 to-border/30" />
              )}

              <div className="flex gap-5 mb-8">
                {/* Icon */}
                <div className="relative flex-shrink-0">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <step.icon className="w-6 h-6 text-primary" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                </div>

                {/* Content */}
                <div className="pt-1">
                  <h3 className="text-lg font-bold text-foreground mb-1">{step.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{step.description}</p>
                  <span className="inline-block text-xs font-mono text-primary/70 bg-primary/5 px-2.5 py-1 rounded-md border border-primary/10">
                    {step.detail}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
