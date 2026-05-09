import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Clock, Coins, Flame, Dumbbell, BookOpen, Code2, Share2, Heart, BookMarked, Palette, Sparkles } from 'lucide-react';
import type { Challenge } from '@/lib/constants';

const categoryIcons: Record<string, React.ElementType> = {
  fitness: Dumbbell,
  learning: BookOpen,
  building: Code2,
  social: Share2,
  health: Heart,
  reading: BookMarked,
  creative: Palette,
  custom: Sparkles,
};

const categoryLabels: Record<string, string> = {
  fitness: 'Fitness',
  learning: 'Learning',
  building: 'Build in Public',
  social: 'Social Media',
  health: 'Health',
  reading: 'Reading',
  creative: 'Creative',
  custom: 'Custom',
};

interface ChallengeCardProps {
  challenge: Challenge;
  compact?: boolean;
}

const ChallengeCard: React.FC<ChallengeCardProps> = ({ challenge, compact = false }) => {
  const Icon = categoryIcons[challenge.category] || Sparkles;
  const label = categoryLabels[challenge.category] || 'Custom';
  const daysLeft = Math.max(0, Math.ceil((new Date(challenge.endsAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24)));

  return (
    <Link
      to={`/challenge/${challenge.id}`}
      className="block p-5 rounded-2xl glass-card transition-all duration-300 hover:-translate-y-1 group"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
            <Icon className="w-4 h-4 text-primary" />
          </div>
          <span className="text-xs font-medium text-muted-foreground">{label}</span>
        </div>
        <span className="inline-flex items-center gap-1 text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
          <span className="w-1 h-1 rounded-full bg-primary status-live" />
          Active
        </span>
      </div>

      {/* Title */}
      <h3 className="text-base font-bold text-foreground mb-1.5 group-hover:text-primary transition-colors">
        {challenge.title}
      </h3>

      {!compact && (
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
          {challenge.description}
        </p>
      )}

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
          <span>{challenge.participants}/{challenge.maxParticipants} joined</span>
          <span>{challenge.completionRate}% completing</span>
        </div>
        <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
          <div
            className="h-full rounded-full bg-primary transition-all duration-700"
            style={{ width: `${(challenge.participants / challenge.maxParticipants) * 100}%` }}
          />
        </div>
      </div>

      {/* Footer Stats */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Coins className="w-3.5 h-3.5 text-amber" />
            <span className="font-medium text-foreground">{challenge.stakeAmount} SOL</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Users className="w-3.5 h-3.5" />
            {challenge.participants}
          </div>
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="w-3.5 h-3.5" />
          {daysLeft}d left
        </div>
      </div>

      {/* Total Pool Tag */}
      <div className="mt-3 pt-3 border-t border-border/50 flex items-center justify-between">
        <span className="text-xs text-muted-foreground">Total Pool</span>
        <span className="text-sm font-bold text-gradient">{challenge.totalPool} SOL</span>
      </div>
    </Link>
  );
};

export default ChallengeCard;
