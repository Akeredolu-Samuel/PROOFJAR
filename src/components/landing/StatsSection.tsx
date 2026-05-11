import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  { value: '12,847', suffix: ' SOL', label: 'Total Locked in Vaults', sub: '≈ $1.8M at current price' },
  { value: '1,243', suffix: '', label: 'Active Jars', sub: 'Across 8 categories' },
  { value: '48,291', suffix: '', label: 'Proofs Verified by AI', sub: '94.2% accuracy rate' },
  { value: '8,712', suffix: '', label: 'Accountable Users', sub: 'Avg 3.1x goal completion' },
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
              className="text-center p-6 rounded-2xl glass-card hover:-translate-y-1 transition-transform duration-300"
            >
              <p className="text-3xl sm:text-4xl font-black text-foreground stat-glow mb-1">
                {stat.value}
                {stat.suffix && <span className="text-lg text-primary ml-0.5">{stat.suffix}</span>}
              </p>
              <p className="text-sm font-semibold text-foreground/80 mb-1">{stat.label}</p>
              <p className="text-[11px] text-muted-foreground">{stat.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
