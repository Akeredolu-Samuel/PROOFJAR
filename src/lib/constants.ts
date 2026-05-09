export const CHALLENGE_CATEGORIES = [
  { id: 'fitness', label: 'Fitness', icon: 'Dumbbell' },
  { id: 'learning', label: 'Learning', icon: 'BookOpen' },
  { id: 'building', label: 'Build in Public', icon: 'Code2' },
  { id: 'social', label: 'Social Media', icon: 'Share2' },
  { id: 'health', label: 'Health', icon: 'Heart' },
  { id: 'reading', label: 'Reading', icon: 'BookMarked' },
  { id: 'creative', label: 'Creative', icon: 'Palette' },
  { id: 'custom', label: 'Custom', icon: 'Sparkles' },
] as const;

export const PROOF_TYPES = [
  { id: 'screenshot', label: 'Screenshot', description: 'Upload a screenshot as proof' },
  { id: 'link', label: 'Link/URL', description: 'Submit a link (tweet, commit, etc.)' },
  { id: 'text', label: 'Text Entry', description: 'Describe what you accomplished' },
] as const;

export const VERIFICATION_STATUSES = {
  pending: { label: 'Pending', color: 'amber' },
  verified: { label: 'Verified', color: 'emerald' },
  rejected: { label: 'Rejected', color: 'destructive' },
  reviewing: { label: 'Reviewing', color: 'muted' },
} as const;

export const MOCK_STATS = {
  totalStaked: 12847.5,
  activeChallenges: 1243,
  proofsVerified: 48291,
  totalUsers: 8712,
};

export interface Challenge {
  id: string;
  title: string;
  description: string;
  category: string;
  stakeAmount: number;
  participants: number;
  maxParticipants: number;
  duration: number;
  frequency: 'daily' | 'weekly';
  proofType: string;
  creator: string;
  createdAt: string;
  endsAt: string;
  status: 'active' | 'completed' | 'expired';
  totalPool: number;
  completionRate: number;
}

export interface UserProfile {
  address: string;
  reputation: number;
  streak: number;
  challengesWon: number;
  challengesJoined: number;
  totalEarned: number;
  totalStaked: number;
  rank: number;
}

export interface ProofSubmission {
  id: string;
  challengeId: string;
  userId: string;
  type: string;
  content: string;
  submittedAt: string;
  status: 'pending' | 'verified' | 'rejected' | 'reviewing';
  confidence: number;
  aiSummary: string;
}

export const MOCK_CHALLENGES: Challenge[] = [
  {
    id: '1',
    title: 'Ship a project this week',
    description: 'Build and deploy a complete project before the deadline. Share your progress daily.',
    category: 'building',
    stakeAmount: 2.5,
    participants: 18,
    maxParticipants: 25,
    duration: 7,
    frequency: 'daily',
    proofType: 'link',
    creator: '7xKX...m4Rp',
    createdAt: '2026-05-01',
    endsAt: '2026-05-08',
    status: 'active',
    totalPool: 45,
    completionRate: 72,
  },
  {
    id: '2',
    title: 'Exercise 4x this week',
    description: 'Complete at least 4 workout sessions. Submit a photo or screenshot of your workout.',
    category: 'fitness',
    stakeAmount: 1.0,
    participants: 42,
    maxParticipants: 50,
    duration: 7,
    frequency: 'weekly',
    proofType: 'screenshot',
    creator: '3bPQ...xK2L',
    createdAt: '2026-05-02',
    endsAt: '2026-05-09',
    status: 'active',
    totalPool: 42,
    completionRate: 65,
  },
  {
    id: '3',
    title: 'Post daily on X for 30 days',
    description: 'Maintain a daily posting streak on X/Twitter for an entire month. Build your audience.',
    category: 'social',
    stakeAmount: 5.0,
    participants: 31,
    maxParticipants: 100,
    duration: 30,
    frequency: 'daily',
    proofType: 'link',
    creator: '9mFx...pR7N',
    createdAt: '2026-04-15',
    endsAt: '2026-05-15',
    status: 'active',
    totalPool: 155,
    completionRate: 58,
  },
  {
    id: '4',
    title: 'Read 10 pages daily',
    description: 'Read at least 10 pages of a book every day. Share a photo of your progress.',
    category: 'reading',
    stakeAmount: 0.5,
    participants: 67,
    maxParticipants: 100,
    duration: 14,
    frequency: 'daily',
    proofType: 'screenshot',
    creator: '5kYh...wQ3J',
    createdAt: '2026-05-03',
    endsAt: '2026-05-17',
    status: 'active',
    totalPool: 33.5,
    completionRate: 81,
  },
  {
    id: '5',
    title: 'No sugar challenge',
    description: 'Go 21 days without refined sugar. Log your meals and submit daily check-ins.',
    category: 'health',
    stakeAmount: 3.0,
    participants: 24,
    maxParticipants: 30,
    duration: 21,
    frequency: 'daily',
    proofType: 'text',
    creator: '2nWz...tH6M',
    createdAt: '2026-04-28',
    endsAt: '2026-05-19',
    status: 'active',
    totalPool: 72,
    completionRate: 54,
  },
  {
    id: '6',
    title: 'Study 2 hours daily',
    description: 'Dedicate 2 hours minimum to focused learning each day. Share what you learned.',
    category: 'learning',
    stakeAmount: 1.5,
    participants: 55,
    maxParticipants: 75,
    duration: 14,
    frequency: 'daily',
    proofType: 'text',
    creator: '8jLq...vB4D',
    createdAt: '2026-05-04',
    endsAt: '2026-05-18',
    status: 'active',
    totalPool: 82.5,
    completionRate: 70,
  },
];

export const MOCK_USER: UserProfile = {
  address: '7xKX...m4Rp',
  reputation: 847,
  streak: 12,
  challengesWon: 8,
  challengesJoined: 14,
  totalEarned: 23.5,
  totalStaked: 15.0,
  rank: 42,
};

export const MOCK_LEADERBOARD: UserProfile[] = [
  { address: '9mFx...pR7N', reputation: 2340, streak: 45, challengesWon: 32, challengesJoined: 38, totalEarned: 124.5, totalStaked: 85.0, rank: 1 },
  { address: '3bPQ...xK2L', reputation: 2180, streak: 38, challengesWon: 28, challengesJoined: 35, totalEarned: 98.2, totalStaked: 72.0, rank: 2 },
  { address: '5kYh...wQ3J', reputation: 1950, streak: 31, challengesWon: 25, challengesJoined: 31, totalEarned: 87.8, totalStaked: 64.0, rank: 3 },
  { address: '2nWz...tH6M', reputation: 1820, streak: 28, challengesWon: 22, challengesJoined: 28, totalEarned: 76.3, totalStaked: 58.0, rank: 4 },
  { address: '8jLq...vB4D', reputation: 1690, streak: 24, challengesWon: 19, challengesJoined: 25, totalEarned: 65.1, totalStaked: 50.0, rank: 5 },
  { address: '4pRt...hN8F', reputation: 1540, streak: 21, challengesWon: 17, challengesJoined: 23, totalEarned: 54.7, totalStaked: 42.0, rank: 6 },
  { address: '6wVx...cM1G', reputation: 1390, streak: 18, challengesWon: 15, challengesJoined: 20, totalEarned: 43.2, totalStaked: 35.0, rank: 7 },
  { address: '1aKz...yS5E', reputation: 1250, streak: 15, challengesWon: 13, challengesJoined: 18, totalEarned: 38.6, totalStaked: 30.0, rank: 8 },
];

export const MOCK_ACTIVITY = [
  { user: '9mFx...pR7N', action: 'verified proof', challenge: 'Post daily on X', time: '2m ago', type: 'verification' as const },
  { user: '3bPQ...xK2L', action: 'joined challenge', challenge: 'Exercise 4x weekly', time: '5m ago', type: 'join' as const },
  { user: '5kYh...wQ3J', action: 'won payout', challenge: 'Read 10 pages daily', time: '12m ago', type: 'payout' as const },
  { user: '2nWz...tH6M', action: 'submitted proof', challenge: 'No sugar challenge', time: '18m ago', type: 'submission' as const },
  { user: '8jLq...vB4D', action: 'created challenge', challenge: 'Study 2 hours daily', time: '25m ago', type: 'creation' as const },
  { user: '4pRt...hN8F', action: 'verified proof', challenge: 'Ship a project', time: '31m ago', type: 'verification' as const },
  { user: '7xKX...m4Rp', action: 'staked 2.5 SOL', challenge: 'Build in public', time: '42m ago', type: 'stake' as const },
];
