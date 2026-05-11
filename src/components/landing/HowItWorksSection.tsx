import React from 'react';
import { motion } from 'framer-motion';
import { Target, Wallet, Upload, Bot, Trophy } from 'lucide-react';

const steps = [
  {
    icon: Target,
    title: 'Create a Jar',
    description: 'Define your goal, set a deadline, choose your proof type, and invite participants.',
    detail: 'Fitness, learning, building, health, reading + more',
  },
  {
    icon: Wallet,
    title: 'Lock SOL On-Chain',
    description: 'Sign a real Solana transaction. Your SOL goes into a non-custodial PDA vault — locked by code.',
    detail: 'Real devnet transactions · Phantom wallet',
  },
  {
    icon: Upload,
    title: 'Submit Proof Daily',
    description: 'Upload a screenshot, share a link, or write a text entry. Whatever your challenge requires.',
    detail: 'Daily or weekly · Multiple proof formats',
  },
  {
    icon: Bot,
    title: 'AI Verifies It',
    description: 'Gemini-powered agents analyze your proof, detect fraud, and assign a confidence score on-chain.',
    detail: 'Powered by x402 pay-per-call micropayments',
  },
  {
    icon: Trophy,
    title: 'Winners Take the Pot',
    description: 'Achievers get automatic payouts. Quitters\' stakes go to those who showed up. No manual claims.',
    detail: 'Smart contract auto-distributes funds',
  },
];

const HowItWorksSection: React.FC = () => {
  return (
    <section className="relative py-24 overflow-hidden" id="how-it-works">
      <div className="container mx-auto px-4">
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
            From goal to on-chain payout in 5 steps
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            A fully automated accountability loop — powered by Solana smart contracts and AI verification agents. 
            No trust required at any step.
          </p>
        </motion.div>

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
              {i < steps.length - 1 && (
                <div className="absolute left-[27px] top-[68px] w-px h-[calc(100%-40px)] bg-gradient-to-b from-primary/40 to-border/20" />
              )}

              <div className="flex gap-5 mb-8">
                <div className="relative flex-shrink-0">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <step.icon className="w-6 h-6 text-primary" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                </div>

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
