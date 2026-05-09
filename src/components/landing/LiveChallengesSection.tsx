import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Clock, Flame } from 'lucide-react';
import { MOCK_CHALLENGES } from '@/lib/constants';
import ChallengeCard from '@/components/ChallengeCard';

const LiveChallengesSection: React.FC = () => {
  const featured = MOCK_CHALLENGES.slice(0, 3);

  return (
    <section className="relative py-24" id="challenges">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4"
        >
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-3 block">
              Live Now
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground">
              Trending challenges
            </h2>
          </div>
          <Link
            to="/challenges"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
          >
            View all challenges <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Challenge Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((challenge, i) => (
            <motion.div
              key={challenge.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <ChallengeCard challenge={challenge} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LiveChallengesSection;
