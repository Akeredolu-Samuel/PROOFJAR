import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, UserPlus, Coins, Upload, Sparkles, Shield, Wallet } from 'lucide-react';
import { MOCK_ACTIVITY } from '@/lib/constants';

const typeIcon: Record<string, React.ElementType> = {
  verification: CheckCircle2,
  join: UserPlus,
  payout: Coins,
  submission: Upload,
  creation: Sparkles,
  stake: Wallet,
};

const typeColor: Record<string, string> = {
  verification: 'text-primary bg-primary/10',
  join: 'text-blue-400 bg-blue-400/10',
  payout: 'text-amber bg-amber/10',
  submission: 'text-purple-400 bg-purple-400/10',
  creation: 'text-pink-400 bg-pink-400/10',
  stake: 'text-primary bg-primary/10',
};

const ActivityFeedSection: React.FC = () => {
  return (
    <section className="relative py-24">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-3 block">
            Live Activity
          </span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground">
            What's happening right now
          </h2>
        </motion.div>

        <div className="max-w-2xl mx-auto space-y-3">
          {MOCK_ACTIVITY.map((item, i) => {
            const Icon = typeIcon[item.type] || Shield;
            const color = typeColor[item.type] || 'text-muted-foreground bg-muted';

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="flex items-center gap-4 p-4 rounded-xl glass-card"
              >
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground truncate">
                    <span className="font-mono text-xs text-muted-foreground">{item.user}</span>
                    {' '}<span className="text-muted-foreground">{item.action}</span>
                  </p>
                  <p className="text-xs text-primary/70 font-medium truncate">{item.challenge}</p>
                </div>
                <span className="text-xs text-muted-foreground flex-shrink-0">{item.time}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ActivityFeedSection;
