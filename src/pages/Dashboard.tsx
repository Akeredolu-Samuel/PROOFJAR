import React from 'react';
import { motion } from 'framer-motion';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import {
  Flame, Trophy, Target, Coins, TrendingUp, BarChart3,
  ArrowUpRight, Clock, CheckCircle2, AlertCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChallengeCard from '@/components/ChallengeCard';
import { MOCK_USER, MOCK_CHALLENGES } from '@/lib/constants';

const statCards = [
  { label: 'Reputation', value: MOCK_USER.reputation, icon: BarChart3, suffix: 'pts', trend: '+12%' },
  { label: 'Current Streak', value: MOCK_USER.streak, icon: Flame, suffix: 'days', trend: 'Active' },
  { label: 'Challenges Won', value: MOCK_USER.challengesWon, icon: Trophy, suffix: '', trend: '+2 this month' },
  { label: 'Total Earned', value: MOCK_USER.totalEarned, icon: Coins, suffix: 'SOL', trend: '+3.2 SOL' },
];

const Dashboard: React.FC = () => {
  const { connected } = useWallet();

  if (!connected) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-16 flex items-center justify-center min-h-[80vh]">
          <div className="text-center p-8">
            <span className="text-5xl block mb-4">🫙</span>
            <h2 className="text-2xl font-bold text-foreground mb-3">Connect Your Wallet</h2>
            <p className="text-muted-foreground mb-6 max-w-md">
              Connect your Solana wallet to view your dashboard, track challenges, and manage your accountability journey.
            </p>
            <WalletMultiButton />
          </div>
        </main>
      </div>
    );
  }

  const activeChallenges = MOCK_CHALLENGES.filter(c => c.status === 'active').slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
              <div>
                <h1 className="text-2xl font-black text-foreground mb-1">Dashboard</h1>
                <p className="text-sm text-muted-foreground font-mono">{MOCK_USER.address}</p>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
                <span className="text-xs font-medium text-primary">Rank #{MOCK_USER.rank}</span>
                <TrendingUp className="w-3.5 h-3.5 text-primary" />
              </div>
            </div>
          </motion.div>

          {/* Stat Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {statCards.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="p-5 rounded-2xl glass-card"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                    <stat.icon className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-xs text-primary font-medium">{stat.trend}</span>
                </div>
                <p className="text-2xl font-black text-foreground mb-0.5">
                  {stat.value}
                  {stat.suffix && <span className="text-sm text-muted-foreground ml-1">{stat.suffix}</span>}
                </p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Active Challenges & Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Active Challenges */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-foreground">Active Challenges</h2>
                <Link to="/challenges" className="text-xs text-primary hover:underline flex items-center gap-1">
                  View all <ArrowUpRight className="w-3 h-3" />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {activeChallenges.map((challenge) => (
                  <ChallengeCard key={challenge.id} challenge={challenge} compact />
                ))}
                {/* Create New CTA */}
                <Link
                  to="/create"
                  className="flex flex-col items-center justify-center p-6 rounded-2xl border-2 border-dashed border-border hover:border-primary/30 transition-colors text-center group"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/15 transition-colors">
                    <Target className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-sm font-semibold text-foreground mb-1">Create Challenge</p>
                  <p className="text-xs text-muted-foreground">Start your next accountability goal</p>
                </Link>
              </div>
            </div>

            {/* Quick Stats Panel */}
            <div>
              <h2 className="text-lg font-bold text-foreground mb-4">Quick Stats</h2>
              <div className="p-5 rounded-2xl glass-card space-y-5">
                {/* Streak */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Streak Progress</span>
                    <span className="text-sm font-bold text-foreground">{MOCK_USER.streak} days</span>
                  </div>
                  <div className="flex gap-1">
                    {Array.from({ length: 14 }, (_, i) => (
                      <div
                        key={i}
                        className={`h-6 flex-1 rounded-sm ${
                          i < MOCK_USER.streak % 14
                            ? 'bg-primary'
                            : 'bg-secondary'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Win Rate */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Win Rate</span>
                    <span className="text-sm font-bold text-primary">
                      {Math.round((MOCK_USER.challengesWon / MOCK_USER.challengesJoined) * 100)}%
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-secondary overflow-hidden">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: `${(MOCK_USER.challengesWon / MOCK_USER.challengesJoined) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Net Profit */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-muted-foreground">Net Earnings</span>
                    <span className="text-sm font-bold text-primary">
                      +{(MOCK_USER.totalEarned - MOCK_USER.totalStaked).toFixed(1)} SOL
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Staked: {MOCK_USER.totalStaked} SOL</span>
                    <span>Earned: {MOCK_USER.totalEarned} SOL</span>
                  </div>
                </div>

                {/* Recent Proofs */}
                <div className="pt-3 border-t border-border/50">
                  <p className="text-sm font-medium text-foreground mb-3">Recent Proofs</p>
                  <div className="space-y-2">
                    {[
                      { status: 'verified', title: 'Daily X post #12', time: '2h ago' },
                      { status: 'verified', title: 'Workout session', time: '1d ago' },
                      { status: 'pending', title: 'Study notes upload', time: '3h ago' },
                    ].map((proof, i) => (
                      <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg bg-secondary/50">
                        {proof.status === 'verified' ? (
                          <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                        ) : (
                          <Clock className="w-4 h-4 text-amber flex-shrink-0" />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-foreground truncate">{proof.title}</p>
                          <p className="text-[10px] text-muted-foreground">{proof.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
