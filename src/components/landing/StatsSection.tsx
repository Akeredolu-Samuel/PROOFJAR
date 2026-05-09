import React from 'react';
import { motion } from 'framer-motion';
import { MOCK_STATS } from '@/lib/constants';

const stats = [
  { label: 'Total SOL Staked', value: MOCK_STATS.totalStaked.toLocaleString(), suffix: 'SOL' },
  { label: 'Active Challenges', value: MOCK_STATS.activeChallenges.toLocaleString(), suffix: '' },
  { label: 'Proofs Verified', value: MOCK_STATS.proofsVerified.toLocaleString(), suffix: '' },
  { label: 'Total Users', value: MOCK_STATS.totalUsers.toLocaleString(), suffix: '' },
];

const StatsSection: React.FC = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/[0.02] to-background" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center p-6 rounded-2xl glass-card"
            >
              <p className="text-3xl sm:text-4xl font-black text-foreground stat-glow mb-1">
                {stat.value}
                {stat.suffix && <span className="text-lg text-primary ml-1">{stat.suffix}</span>}
              </p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
