import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { useWallet } from '@solana/wallet-adapter-react';
import {
  ArrowLeft, Users, Clock, Coins, Flame, Trophy, Shield,
  Upload, Link as LinkIcon, FileText, Bot, CheckCircle2,
  XCircle, Loader2, Share2, ExternalLink, AlertCircle
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { MOCK_CHALLENGES } from '@/lib/constants';

const ChallengeDetail: React.FC = () => {
  const { id } = useParams();
  const { connected } = useWallet();
  const [showProofModal, setShowProofModal] = useState(false);
  const [proofContent, setProofContent] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<null | { status: string; confidence: number; summary: string }>(null);

  const challenge = MOCK_CHALLENGES.find((c) => c.id === id);

  if (!challenge) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-20 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <span className="text-5xl block mb-4">🔍</span>
            <h2 className="text-xl font-bold text-foreground mb-2">Challenge not found</h2>
            <Link to="/challenges" className="text-sm text-primary hover:underline">Back to challenges</Link>
          </div>
        </main>
      </div>
    );
  }

  const daysLeft = Math.max(0, Math.ceil((new Date(challenge.endsAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24)));

  const handleSubmitProof = async () => {
    setVerifying(true);
    setVerificationResult(null);
    // Simulate AI verification
    await new Promise((r) => setTimeout(r, 3000));
    setVerifying(false);
    setVerificationResult({
      status: 'verified',
      confidence: 94,
      summary: 'Proof verified successfully. Content matches challenge requirements. No fraud detected.',
    });
  };

  // Mock participants
  const participants = [
    { address: '7xKX...m4Rp', completions: 5, total: 7, streak: 5 },
    { address: '3bPQ...xK2L', completions: 4, total: 7, streak: 4 },
    { address: '9mFx...pR7N', completions: 6, total: 7, streak: 3 },
    { address: '5kYh...wQ3J', completions: 3, total: 7, streak: 2 },
    { address: '2nWz...tH6M', completions: 7, total: 7, streak: 7 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20 pb-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Back */}
          <Link to="/challenges" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to challenges
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Challenge Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 rounded-2xl glass-card"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">
                    <span className="w-1 h-1 rounded-full bg-primary status-live" />
                    Active
                  </span>
                  <span className="text-xs text-muted-foreground capitalize">{challenge.category}</span>
                </div>

                <h1 className="text-2xl font-black text-foreground mb-2">{challenge.title}</h1>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">{challenge.description}</p>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { icon: Coins, label: 'Stake', value: `${challenge.stakeAmount} SOL`, color: 'text-amber' },
                    { icon: Users, label: 'Participants', value: `${challenge.participants}/${challenge.maxParticipants}`, color: 'text-muted-foreground' },
                    { icon: Clock, label: 'Days Left', value: `${daysLeft}`, color: 'text-muted-foreground' },
                    { icon: Trophy, label: 'Total Pool', value: `${challenge.totalPool} SOL`, color: 'text-primary' },
                  ].map((stat) => (
                    <div key={stat.label} className="p-3 rounded-xl bg-secondary/50 text-center">
                      <stat.icon className={`w-4 h-4 mx-auto mb-1 ${stat.color}`} />
                      <p className="text-sm font-bold text-foreground">{stat.value}</p>
                      <p className="text-[10px] text-muted-foreground">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Participants Leaderboard */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="p-6 rounded-2xl glass-card"
              >
                <h2 className="text-base font-bold text-foreground mb-4 flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-primary" />
                  Participants
                </h2>
                <div className="space-y-2">
                  {participants
                    .sort((a, b) => b.completions - a.completions)
                    .map((p, i) => (
                      <div key={p.address} className="flex items-center gap-3 p-3 rounded-xl bg-secondary/30">
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          i === 0 ? 'bg-amber/20 text-amber' :
                          i === 1 ? 'bg-muted text-muted-foreground' :
                          i === 2 ? 'bg-amber/10 text-amber/60' :
                          'bg-secondary text-muted-foreground'
                        }`}>
                          {i + 1}
                        </span>
                        <span className="font-mono text-xs text-muted-foreground flex-1">{p.address}</span>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Flame className="w-3 h-3 text-amber" />
                            {p.streak}
                          </div>
                          <span className="text-xs font-medium text-foreground">
                            {p.completions}/{p.total}
                          </span>
                          <div className="w-16 h-1.5 rounded-full bg-secondary overflow-hidden">
                            <div
                              className="h-full rounded-full bg-primary"
                              style={{ width: `${(p.completions / p.total) * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              {/* Join / Submit Proof */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="p-5 rounded-2xl glass-card"
              >
                {connected ? (
                  <div className="space-y-3">
                    <button className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:brightness-110 transition-all shadow-[0_0_20px_hsl(var(--primary)/0.2)]">
                      Join Challenge ({challenge.stakeAmount} SOL)
                    </button>
                    <button
                      onClick={() => setShowProofModal(true)}
                      className="w-full py-3 rounded-xl border border-primary/30 bg-primary/5 text-primary font-semibold text-sm hover:bg-primary/10 transition-all"
                    >
                      Submit Proof
                    </button>
                    <button className="w-full py-2.5 rounded-xl border border-border bg-secondary/50 text-muted-foreground font-medium text-xs hover:text-foreground transition-all flex items-center justify-center gap-1.5">
                      <Share2 className="w-3.5 h-3.5" /> Share Challenge
                    </button>
                  </div>
                ) : (
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-3">Connect wallet to participate</p>
                    <div className="flex justify-center">
                      <button className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm">
                        Connect Wallet
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>

              {/* AI Verification Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="p-5 rounded-2xl glass-card"
              >
                <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-1.5">
                  <Bot className="w-4 h-4 text-primary" /> AI Verification
                </h3>
                <div className="space-y-3 text-xs text-muted-foreground">
                  <div className="flex items-start gap-2">
                    <Shield className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Proofs analyzed by AI agents for authenticity and fraud detection</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Confidence scores assigned to each submission</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Coins className="w-3.5 h-3.5 text-amber mt-0.5 flex-shrink-0" />
                    <span>Powered by x402 pay-per-verification micropayments</span>
                  </div>
                </div>
              </motion.div>

              {/* Challenge Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="p-5 rounded-2xl glass-card"
              >
                <h3 className="text-sm font-bold text-foreground mb-3">Details</h3>
                <div className="space-y-2.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Created by</span>
                    <span className="font-mono text-foreground">{challenge.creator}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Proof type</span>
                    <span className="text-foreground capitalize">{challenge.proofType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Frequency</span>
                    <span className="text-foreground capitalize">{challenge.frequency}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Started</span>
                    <span className="text-foreground">{challenge.createdAt}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Ends</span>
                    <span className="text-foreground">{challenge.endsAt}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      {/* Proof Submission Modal */}
      <AnimatePresence>
        {showProofModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
            onClick={() => !verifying && setShowProofModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md p-6 rounded-2xl glass-card border border-border bg-card shadow-elevated"
            >
              <h2 className="text-lg font-bold text-foreground mb-1">Submit Proof</h2>
              <p className="text-sm text-muted-foreground mb-5">{challenge.title}</p>

              {!verificationResult ? (
                <>
                  <div className="mb-4">
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      {challenge.proofType === 'link' ? 'Paste URL' : 
                       challenge.proofType === 'screenshot' ? 'Upload or paste image URL' :
                       'Describe your progress'}
                    </label>
                    <textarea
                      placeholder={
                        challenge.proofType === 'link' ? 'https://x.com/...' :
                        challenge.proofType === 'screenshot' ? 'Paste image URL or describe...' :
                        'What did you accomplish today?'
                      }
                      rows={4}
                      value={proofContent}
                      onChange={(e) => setProofContent(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all resize-none text-sm"
                    />
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowProofModal(false)}
                      className="px-4 py-2.5 rounded-xl border border-border text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSubmitProof}
                      disabled={!proofContent || verifying}
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:brightness-110 transition-all disabled:opacity-50"
                    >
                      {verifying ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          AI Verifying...
                        </>
                      ) : (
                        <>
                          <Bot className="w-4 h-4" />
                          Submit & Verify
                        </>
                      )}
                    </button>
                  </div>

                  {verifying && (
                    <div className="mt-4 p-4 rounded-xl bg-primary/5 border border-primary/10">
                      <div className="flex items-center gap-2 mb-2">
                        <Bot className="w-4 h-4 text-primary animate-pulse" />
                        <span className="text-sm font-medium text-primary">AI Agent Analyzing...</span>
                      </div>
                      <div className="space-y-1.5 text-xs text-muted-foreground">
                        <p>Checking content authenticity...</p>
                        <p>Running fraud detection...</p>
                        <p>Calculating confidence score...</p>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="space-y-4">
                  <div className={`p-4 rounded-xl border ${
                    verificationResult.status === 'verified'
                      ? 'bg-primary/5 border-primary/20'
                      : 'bg-destructive/5 border-destructive/20'
                  }`}>
                    <div className="flex items-center gap-2 mb-2">
                      {verificationResult.status === 'verified' ? (
                        <CheckCircle2 className="w-5 h-5 text-primary" />
                      ) : (
                        <XCircle className="w-5 h-5 text-destructive" />
                      )}
                      <span className="text-sm font-bold text-foreground capitalize">
                        {verificationResult.status}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{verificationResult.summary}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Confidence Score</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-1.5 rounded-full bg-secondary overflow-hidden">
                          <div
                            className="h-full rounded-full bg-primary"
                            style={{ width: `${verificationResult.confidence}%` }}
                          />
                        </div>
                        <span className="text-sm font-bold text-primary">{verificationResult.confidence}%</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-secondary/50 text-xs text-muted-foreground">
                    Verification recorded on-chain. Results sent to smart contract for completion tracking.
                  </div>

                  <button
                    onClick={() => {
                      setShowProofModal(false);
                      setVerificationResult(null);
                      setProofContent('');
                    }}
                    className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm"
                  >
                    Done
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default ChallengeDetail;
