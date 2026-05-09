import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Flame, Coins, BarChart3, Medal, Crown, Star } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { MOCK_LEADERBOARD } from '@/lib/constants';

type SortKey = 'reputation' | 'streak' | 'totalEarned' | 'challengesWon';

const tabs: { key: SortKey; label: string; icon: React.ElementType }[] = [
  { key: 'reputation', label: 'Reputation', icon: BarChart3 },
  { key: 'streak', label: 'Streaks', icon: Flame },
  { key: 'totalEarned', label: 'Earnings', icon: Coins },
  { key: 'challengesWon', label: 'Wins', icon: Trophy },
];

const rankStyles: Record<number, { bg: string; text: string; icon: React.ElementType }> = {
  1: { bg: 'bg-amber/20', text: 'text-amber', icon: Crown },
  2: { bg: 'bg-muted', text: 'text-muted-foreground', icon: Medal },
  3: { bg: 'bg-amber/10', text: 'text-amber/60', icon: Star },
};

const Leaderboard: React.FC = () => {
  const [sortBy, setSortBy] = useState<SortKey>('reputation');

  const sorted = [...MOCK_LEADERBOARD].sort((a, b) => b[sortBy] - a[sortBy]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20 pb-12">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <h1 className="text-2xl font-black text-foreground mb-1">Leaderboard</h1>
            <p className="text-sm text-muted-foreground">Top performers in the ProofJar protocol</p>
          </motion.div>

          {/* Sort Tabs */}
          <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setSortBy(tab.key)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                  sortBy === tab.key
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-muted-foreground hover:text-foreground'
                }`}
              >
                <tab.icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Top 3 Podium */}
          <div className="grid grid-cols-3 gap-3 mb-8">
            {[sorted[1], sorted[0], sorted[2]].map((user, i) => {
              if (!user) return null;
              const actualRank = i === 0 ? 2 : i === 1 ? 1 : 3;
              const style = rankStyles[actualRank] || { bg: 'bg-secondary', text: 'text-muted-foreground', icon: Star };
              const RankIcon = style.icon;

              return (
                <motion.div
                  key={user.address}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`p-4 rounded-2xl glass-card text-center ${actualRank === 1 ? 'ring-1 ring-amber/30' : ''} ${
                    actualRank === 1 ? 'order-2 -mt-4' : actualRank === 2 ? 'order-1 mt-2' : 'order-3 mt-2'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full ${style.bg} flex items-center justify-center mx-auto mb-2`}>
                    <RankIcon className={`w-5 h-5 ${style.text}`} />
                  </div>
                  <p className="font-mono text-xs text-muted-foreground mb-1">{user.address}</p>
                  <p className="text-xl font-black text-foreground mb-0.5">
                    {sortBy === 'totalEarned' ? `${user[sortBy]}` : user[sortBy]}
                  </p>
                  <p className="text-[10px] text-muted-foreground capitalize">
                    {sortBy === 'totalEarned' ? 'SOL' : sortBy === 'streak' ? 'days' : sortBy}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Full List */}
          <div className="space-y-2">
            {sorted.map((user, i) => (
              <motion.div
                key={user.address}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.03 }}
                className="flex items-center gap-4 p-4 rounded-xl glass-card"
              >
                <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                  i === 0 ? 'bg-amber/20 text-amber' :
                  i === 1 ? 'bg-muted text-muted-foreground' :
                  i === 2 ? 'bg-amber/10 text-amber/60' :
                  'bg-secondary text-muted-foreground'
                }`}>
                  {i + 1}
                </span>

                <span className="font-mono text-xs text-muted-foreground flex-1">{user.address}</span>

                <div className="flex items-center gap-4 text-xs">
                  <div className="hidden sm:flex items-center gap-1 text-muted-foreground">
                    <BarChart3 className="w-3 h-3" />
                    <span className={sortBy === 'reputation' ? 'text-primary font-semibold' : ''}>{user.reputation}</span>
                  </div>
                  <div className="hidden sm:flex items-center gap-1 text-muted-foreground">
                    <Flame className="w-3 h-3 text-amber" />
                    <span className={sortBy === 'streak' ? 'text-primary font-semibold' : ''}>{user.streak}d</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Trophy className="w-3 h-3" />
                    <span className={sortBy === 'challengesWon' ? 'text-primary font-semibold' : ''}>{user.challengesWon}</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Coins className="w-3 h-3 text-amber" />
                    <span className={`font-medium ${sortBy === 'totalEarned' ? 'text-primary font-semibold' : 'text-foreground'}`}>
                      {user.totalEarned}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Leaderboard;
