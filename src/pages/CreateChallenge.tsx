import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import {
  SystemProgram, Transaction, PublicKey, LAMPORTS_PER_SOL,
} from '@solana/web3.js';
import {
  ArrowLeft, ArrowRight, Target, Coins, Clock, Users,
  Upload, Link as LinkIcon, FileText, CheckCircle2,
  Dumbbell, BookOpen, Code2, Share2, Heart, BookMarked,
  Palette, Sparkles, Loader2, ExternalLink, Copy, Check,
  Lock, Trophy,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CHALLENGE_CATEGORIES, PROOF_TYPES } from '@/lib/constants';

// ProofJar devnet escrow vault
const PROOFJAR_VAULT = new PublicKey('7UX2i7SucgLMQcfZ75s3VXmZZY4YRUyJN9X1RgfMoDUi');

const categoryIcons: Record<string, React.ElementType> = {
  fitness: Dumbbell, learning: BookOpen, building: Code2, social: Share2,
  health: Heart, reading: BookMarked, creative: Palette, custom: Sparkles,
};
const proofIcons: Record<string, React.ElementType> = {
  screenshot: Upload, link: LinkIcon, text: FileText,
};

interface CreatedJar {
  id: string;
  title: string;
  category: string;
  stakeAmount: string;
  duration: string;
  frequency: string;
  proofType: string;
  maxParticipants: string;
  txSignature: string;
}

const CreatedJarCard: React.FC<{ jar: CreatedJar }> = ({ jar }) => {
  const [copied, setCopied] = useState(false);
  const shortSig = `${jar.txSignature.slice(0, 8)}...${jar.txSignature.slice(-8)}`;
  const explorerUrl = `https://explorer.solana.com/tx/${jar.txSignature}?cluster=devnet`;

  const handleCopy = () => {
    navigator.clipboard.writeText(`${window.location.origin}/challenge/${jar.id}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="space-y-6"
    >
      {/* Success Header */}
      <div className="text-center py-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', bounce: 0.5, delay: 0.2 }}
          className="text-7xl mb-4 inline-block"
        >
          🫙
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-2xl font-black text-foreground mb-2">Jar Created On-Chain! 🎉</h2>
          <p className="text-sm text-muted-foreground">
            Your SOL is locked in the ProofJar vault. Time to prove yourself.
          </p>
        </motion.div>
      </div>

      {/* Jar Card */}
      <div className="relative p-6 rounded-2xl glass-card border border-primary/20 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-emerald-400 to-primary" />

        {/* Jar ID + Title */}
        <div className="flex items-start justify-between mb-5">
          <div>
            <span className="text-[10px] font-mono text-primary/70 uppercase tracking-widest">
              {jar.id}
            </span>
            <h3 className="text-xl font-black text-foreground mt-1">{jar.title}</h3>
          </div>
          <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-primary/10 text-primary border border-primary/20">
            Active
          </span>
        </div>

        {/* SOL Staked — hero stat */}
        <div className="flex items-center justify-between p-4 rounded-xl bg-primary/5 border border-primary/15 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center">
              <Lock className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-medium">SOL Locked in Vault</p>
              <p className="text-2xl font-black text-gradient stat-glow">{jar.stakeAmount} SOL</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[11px] text-muted-foreground uppercase tracking-wider">Potential Pool</p>
            <p className="text-lg font-bold text-emerald-400">
              {(parseFloat(jar.stakeAmount) * parseInt(jar.maxParticipants)).toFixed(1)} SOL
            </p>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-2 mb-5">
          {[
            { label: 'Duration', value: `${jar.duration} days` },
            { label: 'Frequency', value: jar.frequency },
            { label: 'Max Players', value: jar.maxParticipants },
            { label: 'Proof Type', value: PROOF_TYPES.find(p => p.id === jar.proofType)?.label || jar.proofType },
          ].map(item => (
            <div key={item.label} className="p-3 rounded-lg bg-secondary/50">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">{item.label}</p>
              <p className="text-sm font-semibold text-foreground capitalize">{item.value}</p>
            </div>
          ))}
        </div>

        {/* Transaction Signature */}
        <div className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/15 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">Transaction (Devnet)</p>
            <p className="text-xs font-mono text-emerald-400 truncate">{shortSig}</p>
          </div>
          <a
            href={explorerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs font-medium hover:bg-emerald-500/20 transition-colors"
          >
            View <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3">
        <button
          onClick={handleCopy}
          className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-primary/20 bg-primary/10 text-primary font-semibold text-sm hover:bg-primary/20 transition-all"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Invite Link Copied!' : 'Copy Invite Link'}
        </button>
        <Link
          to="/challenges"
          className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:brightness-110 transition-all shadow-[0_0_25px_hsl(var(--primary)/0.3)]"
        >
          <Trophy className="w-4 h-4" />
          View All Jars
        </Link>
      </div>
    </motion.div>
  );
};

const CreateChallenge: React.FC = () => {
  const { connected, publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [isCreating, setIsCreating] = useState(false);
  const [txError, setTxError] = useState<string | null>(null);
  const [createdJar, setCreatedJar] = useState<CreatedJar | null>(null);

  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    stakeAmount: '0.1',
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
            <span className="text-6xl block mb-5">🫙</span>
            <h2 className="text-2xl font-bold text-foreground mb-2">Connect to Create a Jar</h2>
            <p className="text-muted-foreground mb-6 max-w-xs mx-auto">
              Connect your Phantom wallet to lock SOL and create your accountability jar on Solana Devnet.
            </p>
            <WalletMultiButton />
          </div>
        </main>
      </div>
    );
  }

  const handleCreate = async () => {
    if (!publicKey) return;
    setIsCreating(true);
    setTxError(null);

    try {
      const lamports = Math.floor(parseFloat(form.stakeAmount) * LAMPORTS_PER_SOL);
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: PROOFJAR_VAULT,
          lamports,
        })
      );

      const { blockhash } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = publicKey;

      const sig = await sendTransaction(transaction, connection);
      await connection.confirmTransaction(sig, 'confirmed');

      const jarId = `JAR-${Math.floor(Math.random() * 9000) + 1000}`;
      setCreatedJar({
        id: jarId,
        ...form,
        txSignature: sig,
      });
      setStep(4);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Transaction failed. Please try again.';
      setTxError(msg.length > 120 ? msg.slice(0, 120) + '...' : msg);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20 pb-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <Link to="/challenges" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to challenges
          </Link>

          {/* Header */}
          <AnimatePresence mode="wait">
            {step < 4 && (
              <motion.div
                key="header"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-8"
              >
                <h1 className="text-2xl font-black text-foreground mb-1">Create a Jar 🫙</h1>
                <p className="text-sm text-muted-foreground">
                  Lock SOL on Solana Devnet — your commitment is now on-chain.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Step Indicator */}
          {step < 4 && (
            <div className="flex items-center gap-2 mb-8">
              {[1, 2, 3].map((s) => (
                <React.Fragment key={s}>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      step >= s ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'
                    }`}
                  >
                    {step > s ? <CheckCircle2 className="w-4 h-4" /> : s}
                  </div>
                  {s < 3 && <div className={`flex-1 h-px ${step > s ? 'bg-primary' : 'bg-border'}`} />}
                </React.Fragment>
              ))}
            </div>
          )}

          <AnimatePresence mode="wait">
            {/* Step 1: Details */}
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Jar Title</label>
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
                    placeholder="Describe the rules and how you'll prove completion..."
                    rows={3}
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
                              : 'border-border bg-secondary/50 text-muted-foreground hover:text-foreground'
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
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 flex items-center gap-1.5">
                      <Coins className="w-4 h-4 text-primary" /> Stake Amount (SOL)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="0.01"
                      value={form.stakeAmount}
                      onChange={(e) => setForm({ ...form, stakeAmount: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                    />
                    <p className="text-[11px] text-muted-foreground mt-1">Will be deducted from your wallet</p>
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
                      className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                    />
                  </div>
                </div>

                {/* Potential pool preview */}
                <div className="p-4 rounded-xl bg-primary/5 border border-primary/15 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Max prize pool if full</span>
                  <span className="text-lg font-black text-gradient">
                    {(parseFloat(form.stakeAmount || '0') * parseInt(form.maxParticipants || '1')).toFixed(2)} SOL
                  </span>
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
                      className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
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
                            form.frequency === freq ? 'border-primary bg-primary/10 text-primary' : 'border-border bg-secondary/50 text-muted-foreground'
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
                            form.proofType === pt.id ? 'border-primary bg-primary/10 text-primary' : 'border-border bg-secondary/50 text-muted-foreground hover:text-foreground'
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
                  <button onClick={() => setStep(1)} className="px-6 py-3 rounded-xl border border-border bg-secondary/50 text-foreground font-medium text-sm hover:bg-secondary transition-all">
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

            {/* Step 3: Review + Sign */}
            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                <div className="p-6 rounded-2xl glass-card space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="text-3xl">🫙</span>
                    <div>
                      <h3 className="text-lg font-bold text-foreground">{form.title || 'Untitled Jar'}</h3>
                      <p className="text-sm text-muted-foreground">{form.description || 'No description'}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border/50">
                    {[
                      { label: 'Category', value: CHALLENGE_CATEGORIES.find(c => c.id === form.category)?.label || '-' },
                      { label: 'Proof Type', value: PROOF_TYPES.find(p => p.id === form.proofType)?.label || '-' },
                      { label: 'Duration', value: `${form.duration} days` },
                      { label: 'Frequency', value: form.frequency },
                      { label: 'Max Players', value: form.maxParticipants },
                      { label: 'Max Pool', value: `${(parseFloat(form.stakeAmount) * parseInt(form.maxParticipants)).toFixed(2)} SOL` },
                    ].map((item) => (
                      <div key={item.label} className="p-3 rounded-lg bg-secondary/50">
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">{item.label}</p>
                        <p className="text-sm font-semibold text-foreground capitalize">{item.value}</p>
                      </div>
                    ))}
                  </div>

                  {/* Stake highlight */}
                  <div className="p-4 rounded-xl bg-primary/5 border border-primary/15">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Your stake (locked in vault)</p>
                        <p className="text-xs text-muted-foreground mt-0.5">Signing a real Solana Devnet transaction</p>
                      </div>
                      <span className="text-2xl font-black text-gradient stat-glow">{form.stakeAmount} SOL</span>
                    </div>
                  </div>

                  {/* Wallet confirmation note */}
                  <div className="p-3 rounded-xl bg-amber-500/5 border border-amber-500/20 text-xs text-amber-400 flex items-start gap-2">
                    <span className="text-base leading-none">⚡</span>
                    <span>Your Phantom wallet will prompt you to approve a transaction. This is real Devnet SOL — make sure you have enough for the stake + gas fee (~0.000005 SOL).</span>
                  </div>
                </div>

                {txError && (
                  <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/30 text-sm text-destructive">
                    ❌ {txError}
                  </div>
                )}

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(2)}
                    disabled={isCreating}
                    className="px-6 py-3 rounded-xl border border-border bg-secondary/50 text-foreground font-medium text-sm hover:bg-secondary transition-all disabled:opacity-50"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleCreate}
                    disabled={isCreating}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:brightness-110 transition-all shadow-[0_0_25px_hsl(var(--primary)/0.3)] disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isCreating ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Confirming on-chain...
                      </>
                    ) : (
                      <>
                        <Target className="w-4 h-4" />
                        Sign & Lock {form.stakeAmount} SOL
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 4: Created Jar Display */}
            {step === 4 && createdJar && (
              <motion.div key="step4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <CreatedJarCard jar={createdJar} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CreateChallenge;
