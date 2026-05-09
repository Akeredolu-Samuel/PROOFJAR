import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import {
  ArrowLeft, ArrowRight, Target, Coins, Clock, Users,
  Upload, Link as LinkIcon, FileText, CheckCircle2,
  Dumbbell, BookOpen, Code2, Share2, Heart, BookMarked, Palette, Sparkles
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CHALLENGE_CATEGORIES, PROOF_TYPES } from '@/lib/constants';

const categoryIcons: Record<string, React.ElementType> = {
  fitness: Dumbbell, learning: BookOpen, building: Code2, social: Share2,
  health: Heart, reading: BookMarked, creative: Palette, custom: Sparkles,
};

const proofIcons: Record<string, React.ElementType> = {
  screenshot: Upload, link: LinkIcon, text: FileText,
};

const CreateChallenge: React.FC = () => {
  const { connected } = useWallet();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    stakeAmount: '1',
    maxParticipants: '25',
    duration: '7',
    frequency: 'daily' as 'daily' | 'weekly',
    proofType: '',
  });

  if (!connected) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-16 flex items-center justify-center min-h-[80vh]">
          <div className="text-center p-8">
            <span className="text-5xl block mb-4">🫙</span>
            <h2 className="text-2xl font-bold text-foreground mb-3">Connect to Create</h2>
            <p className="text-muted-foreground mb-6">Connect your wallet to create a challenge.</p>
            <WalletMultiButton />
          </div>
        </main>
      </div>
    );
  }

  const handleCreate = () => {
    // In production, this would call the Solana program
    navigate('/challenges');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20 pb-12">
        <div className="container mx-auto px-4 max-w-2xl">
          {/* Back */}
          <Link to="/challenges" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to challenges
          </Link>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-2xl font-black text-foreground mb-1">Create Challenge</h1>
            <p className="text-sm text-muted-foreground">Set up your accountability challenge on Solana</p>
          </motion.div>

          {/* Step Indicator */}
          <div className="flex items-center gap-2 mb-8">
            {[1, 2, 3].map((s) => (
              <React.Fragment key={s}>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    step >= s
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-muted-foreground'
                  }`}
                >
                  {step > s ? <CheckCircle2 className="w-4 h-4" /> : s}
                </div>
                {s < 3 && (
                  <div className={`flex-1 h-px ${step > s ? 'bg-primary' : 'bg-border'}`} />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Step 1: Details */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Challenge Title</label>
                <input
                  type="text"
                  placeholder="e.g., Ship a project this week"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/30 transition-all"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Description</label>
                <textarea
                  placeholder="Describe the challenge requirements and rules..."
                  rows={4}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/30 transition-all resize-none"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-3 block">Category</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {CHALLENGE_CATEGORIES.map((cat) => {
                    const Icon = categoryIcons[cat.id] || Sparkles;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setForm({ ...form, category: cat.id })}
                        className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border text-xs font-medium transition-all ${
                          form.category === cat.id
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-border bg-secondary/50 text-muted-foreground hover:text-foreground hover:border-border'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        {cat.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                onClick={() => setStep(2)}
                disabled={!form.title || !form.category}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}

          {/* Step 2: Settings */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 flex items-center gap-1.5">
                    <Coins className="w-4 h-4 text-amber" /> Stake Amount (SOL)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0.1"
                    value={form.stakeAmount}
                    onChange={(e) => setForm({ ...form, stakeAmount: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/30 transition-all"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-muted-foreground" /> Max Participants
                  </label>
                  <input
                    type="number"
                    min="2"
                    max="100"
                    value={form.maxParticipants}
                    onChange={(e) => setForm({ ...form, maxParticipants: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/30 transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-muted-foreground" /> Duration (days)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="90"
                    value={form.duration}
                    onChange={(e) => setForm({ ...form, duration: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/30 transition-all"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Frequency</label>
                  <div className="flex gap-2">
                    {(['daily', 'weekly'] as const).map((freq) => (
                      <button
                        key={freq}
                        onClick={() => setForm({ ...form, frequency: freq })}
                        className={`flex-1 py-3 rounded-xl border text-sm font-medium transition-all capitalize ${
                          form.frequency === freq
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-border bg-secondary/50 text-muted-foreground'
                        }`}
                      >
                        {freq}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-3 block">Proof Type</label>
                <div className="grid grid-cols-3 gap-3">
                  {PROOF_TYPES.map((pt) => {
                    const Icon = proofIcons[pt.id] || Upload;
                    return (
                      <button
                        key={pt.id}
                        onClick={() => setForm({ ...form, proofType: pt.id })}
                        className={`flex flex-col items-center gap-2 p-4 rounded-xl border text-xs font-medium transition-all ${
                          form.proofType === pt.id
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-border bg-secondary/50 text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        {pt.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="px-6 py-3 rounded-xl border border-border bg-secondary/50 text-foreground font-medium text-sm hover:bg-secondary transition-all"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!form.proofType}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:brightness-110 transition-all disabled:opacity-50"
                >
                  Review <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Review */}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="p-6 rounded-2xl glass-card space-y-4">
                <h3 className="text-lg font-bold text-foreground">{form.title || 'Untitled Challenge'}</h3>
                <p className="text-sm text-muted-foreground">{form.description || 'No description'}</p>

                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border/50">
                  {[
                    { label: 'Category', value: CHALLENGE_CATEGORIES.find(c => c.id === form.category)?.label || '-' },
                    { label: 'Stake', value: `${form.stakeAmount} SOL` },
                    { label: 'Duration', value: `${form.duration} days` },
                    { label: 'Frequency', value: form.frequency },
                    { label: 'Max Players', value: form.maxParticipants },
                    { label: 'Proof Type', value: PROOF_TYPES.find(p => p.id === form.proofType)?.label || '-' },
                  ].map((item) => (
                    <div key={item.label} className="p-3 rounded-lg bg-secondary/50">
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">{item.label}</p>
                      <p className="text-sm font-semibold text-foreground capitalize">{item.value}</p>
                    </div>
                  ))}
                </div>

                <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Your stake (locked in vault)</span>
                    <span className="text-lg font-black text-gradient">{form.stakeAmount} SOL</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-3 rounded-xl border border-border bg-secondary/50 text-foreground font-medium text-sm hover:bg-secondary transition-all"
                >
                  Back
                </button>
                <button
                  onClick={handleCreate}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:brightness-110 transition-all shadow-[0_0_25px_hsl(var(--primary)/0.3)]"
                >
                  <Target className="w-4 h-4" />
                  Create & Stake SOL
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CreateChallenge;
