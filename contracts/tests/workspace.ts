import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Workspace } from "../target/types/workspace";
import { expect } from "chai";
import {
  PublicKey,
  SystemProgram,
  Keypair,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import { BN } from "@coral-xyz/anchor";

describe("ProofJar - AI Accountability Protocol", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const program = anchor.workspace.workspace as Program<Workspace>;

  let authority: Keypair;
  let user1: Keypair;
  let user2: Keypair;
  let configPDA: PublicKey;
  let challengePDA: PublicKey;
  let vaultPDA: PublicKey;
  let user1ProfilePDA: PublicKey;
  let user2ProfilePDA: PublicKey;
  let participationPDA: PublicKey;
  let proofRecordPDA: PublicKey;

  const feeBps = 250; // 2.5%
  const stakeAmount = new BN(0.5 * LAMPORTS_PER_SOL);
  const challengeId = new BN(0);

  before(async () => {
    authority = Keypair.generate();
    user1 = Keypair.generate();
    user2 = Keypair.generate();

    // Fund all accounts with 100 SOL
    for (const kp of [authority, user1, user2]) {
      const sig = await provider.connection.requestAirdrop(
        kp.publicKey,
        100 * LAMPORTS_PER_SOL
      );
      await provider.connection.confirmTransaction(sig);
    }

    [configPDA] = PublicKey.findProgramAddressSync(
      [Buffer.from("config"), authority.publicKey.toBuffer()],
      program.programId
    );

    [challengePDA] = PublicKey.findProgramAddressSync(
      [Buffer.from("challenge"), challengeId.toArrayLike(Buffer, "le", 8)],
      program.programId
    );

    [vaultPDA] = PublicKey.findProgramAddressSync(
      [Buffer.from("vault"), challengeId.toArrayLike(Buffer, "le", 8)],
      program.programId
    );

    [user1ProfilePDA] = PublicKey.findProgramAddressSync(
      [Buffer.from("profile"), user1.publicKey.toBuffer()],
      program.programId
    );

    [user2ProfilePDA] = PublicKey.findProgramAddressSync(
      [Buffer.from("profile"), user2.publicKey.toBuffer()],
      program.programId
    );
  });

  // ============================================================
  // INITIALIZATION TESTS (MUST PASS)
  // ============================================================

  it("Initialize Config", async () => {
    await program.methods
      .initializeConfig(feeBps, authority.publicKey)
      .accounts({
        config: configPDA,
        authority: authority.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .signers([authority])
      .rpc();

    const config = await program.account.config.fetch(configPDA);
    expect(config.authority.toBase58()).to.equal(authority.publicKey.toBase58());
    expect(config.treasury.toBase58()).to.equal(authority.publicKey.toBase58());
    expect(config.feeBps).to.equal(feeBps);
    expect(Number(config.totalChallenges.toString())).to.equal(0);
    expect(Number(config.totalUsers.toString())).to.equal(0);
    expect(Number(config.totalStaked.toString())).to.equal(0);
    expect(config.isActive).to.be.true;
    expect(config.isPaused).to.be.false;
    expect(config.version).to.equal(1);
  });

  it("Initialize User Profile for user1", async () => {
    await program.methods
      .initUserProfile()
      .accounts({
        config: configPDA,
        profile: user1ProfilePDA,
        user: user1.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .signers([user1])
      .rpc();

    const profile = await program.account.userProfile.fetch(user1ProfilePDA);
    expect(profile.user.toBase58()).to.equal(user1.publicKey.toBase58());
    expect(Number(profile.reputation.toString())).to.equal(0);
    expect(profile.currentStreak).to.equal(0);
    expect(profile.bestStreak).to.equal(0);
    expect(profile.challengesJoined).to.equal(0);
    expect(profile.challengesWon).to.equal(0);

    const config = await program.account.config.fetch(configPDA);
    expect(Number(config.totalUsers.toString())).to.equal(1);
  });

  it("Initialize User Profile for user2", async () => {
    await program.methods
      .initUserProfile()
      .accounts({
        config: configPDA,
        profile: user2ProfilePDA,
        user: user2.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .signers([user2])
      .rpc();

    const profile = await program.account.userProfile.fetch(user2ProfilePDA);
    expect(profile.user.toBase58()).to.equal(user2.publicKey.toBase58());

    const config = await program.account.config.fetch(configPDA);
    expect(Number(config.totalUsers.toString())).to.equal(2);
  });

  // ============================================================
  // CREATE CHALLENGE TESTS
  // ============================================================

  it("Create Challenge", async () => {
    const title = "30 Day Fitness Challenge";
    const description = "Complete 30 minutes of exercise daily for 30 days";
    const category = 0; // fitness
    const maxParticipants = 10;
    const durationDays = 30;
    const frequency = 0; // daily
    const proofType = 0; // screenshot

    const balanceBefore = await provider.connection.getBalance(user1.publicKey);

    await program.methods
      .createChallenge(
        title,
        description,
        category,
        stakeAmount,
        maxParticipants,
        durationDays,
        frequency,
        proofType,
        challengeId
      )
      .accounts({
        config: configPDA,
        challenge: challengePDA,
        vault: vaultPDA,
        creator: user1.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .signers([user1])
      .rpc();

    const challenge = await program.account.challenge.fetch(challengePDA);
    expect(Number(challenge.id.toString())).to.equal(0);
    expect(challenge.creator.toBase58()).to.equal(user1.publicKey.toBase58());
    expect(challenge.title).to.equal(title);
    expect(challenge.description).to.equal(description);
    expect(challenge.category).to.equal(category);
    expect(Number(challenge.stakeAmount.toString())).to.equal(
      Number(stakeAmount.toString())
    );
    expect(challenge.maxParticipants).to.equal(maxParticipants);
    expect(challenge.currentParticipants).to.equal(1);
    expect(challenge.durationDays).to.equal(durationDays);
    expect(challenge.frequency).to.equal(frequency);
    expect(challenge.proofType).to.equal(proofType);
    expect(Number(challenge.totalPool.toString())).to.equal(
      Number(stakeAmount.toString())
    );
    expect(challenge.status).to.equal(0);

    const config = await program.account.config.fetch(configPDA);
    expect(Number(config.totalChallenges.toString())).to.equal(1);
    expect(Number(config.totalStaked.toString())).to.equal(
      Number(stakeAmount.toString())
    );
  });

  // ============================================================
  // JOIN CHALLENGE TESTS
  // ============================================================

  it("Join Challenge as user2", async () => {
    [participationPDA] = PublicKey.findProgramAddressSync(
      [
        Buffer.from("participation"),
        challengePDA.toBuffer(),
        user2.publicKey.toBuffer(),
      ],
      program.programId
    );

    await program.methods
      .joinChallenge()
      .accounts({
        config: configPDA,
        challenge: challengePDA,
        vault: vaultPDA,
        participation: participationPDA,
        profile: user2ProfilePDA,
        user: user2.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .signers([user2])
      .rpc();

    const participation = await program.account.participation.fetch(
      participationPDA
    );
    expect(participation.user.toBase58()).to.equal(user2.publicKey.toBase58());
    expect(participation.challenge.toBase58()).to.equal(
      challengePDA.toBase58()
    );
    expect(Number(participation.stakedAmount.toString())).to.equal(
      Number(stakeAmount.toString())
    );
    expect(participation.proofsSubmitted).to.equal(0);
    expect(participation.proofsVerified).to.equal(0);
    expect(participation.completed).to.be.false;
    expect(participation.claimed).to.be.false;

    const challenge = await program.account.challenge.fetch(challengePDA);
    expect(challenge.currentParticipants).to.equal(2);
    expect(Number(challenge.totalPool.toString())).to.equal(
      Number(stakeAmount.mul(new BN(2)).toString())
    );

    const profile = await program.account.userProfile.fetch(user2ProfilePDA);
    expect(profile.challengesJoined).to.equal(1);
    expect(Number(profile.totalStaked.toString())).to.equal(
      Number(stakeAmount.toString())
    );
  });

  it("Fail: Join challenge twice (AlreadyJoined)", async () => {
    // Trying to create the same participation PDA again should fail
    const [dupParticipationPDA] = PublicKey.findProgramAddressSync(
      [
        Buffer.from("participation"),
        challengePDA.toBuffer(),
        user2.publicKey.toBuffer(),
      ],
      program.programId
    );

    try {
      await program.methods
        .joinChallenge()
        .accounts({
          config: configPDA,
          challenge: challengePDA,
          vault: vaultPDA,
          participation: dupParticipationPDA,
          profile: user2ProfilePDA,
          user: user2.publicKey,
          systemProgram: SystemProgram.programId,
        })
        .signers([user2])
        .rpc();
      expect.fail("Should have thrown an error");
    } catch (error) {
      // Account already initialized - PDA already exists
      expect(error).to.exist;
    }
  });

  // ============================================================
  // SUBMIT PROOF TESTS
  // ============================================================

  it("Submit Proof for user2", async () => {
    const proofHash = Buffer.alloc(32);
    proofHash.fill(1);
    const proofType = 0; // screenshot

    [proofRecordPDA] = PublicKey.findProgramAddressSync(
      [
        Buffer.from("proof"),
        participationPDA.toBuffer(),
        new BN(0).toArrayLike(Buffer, "le", 2),
      ],
      program.programId
    );

    await program.methods
      .submitProof(Array.from(proofHash), proofType)
      .accounts({
        challenge: challengePDA,
        participation: participationPDA,
        proofRecord: proofRecordPDA,
        user: user2.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .signers([user2])
      .rpc();

    const proof = await program.account.proofRecord.fetch(proofRecordPDA);
    expect(proof.participation.toBase58()).to.equal(
      participationPDA.toBase58()
    );
    expect(proof.proofIndex).to.equal(0);
    expect(proof.proofType).to.equal(proofType);
    expect(Buffer.from(proof.proofHash)).to.deep.equal(proofHash);
    expect(proof.verified).to.be.false;
    expect(proof.confidenceScore).to.equal(0);

    const participation = await program.account.participation.fetch(
      participationPDA
    );
    expect(participation.proofsSubmitted).to.equal(1);
    expect(Number(participation.lastProofAt.toString())).to.be.greaterThan(0);
  });

  it("Fail: Submit proof too early (ProofTooEarly)", async () => {
    const proofHash = Buffer.alloc(32);
    proofHash.fill(2);

    const [proofRecordPDA2] = PublicKey.findProgramAddressSync(
      [
        Buffer.from("proof"),
        participationPDA.toBuffer(),
        new BN(1).toArrayLike(Buffer, "le", 2),
      ],
      program.programId
    );

    try {
      await program.methods
        .submitProof(Array.from(proofHash), 0)
        .accounts({
          challenge: challengePDA,
          participation: participationPDA,
          proofRecord: proofRecordPDA2,
          user: user2.publicKey,
          systemProgram: SystemProgram.programId,
        })
        .signers([user2])
        .rpc();
      expect.fail("Should have thrown an error");
    } catch (error) {
      expect(error.message).to.include("ProofTooEarly");
    }
  });

  // ============================================================
  // VERIFY PROOF TESTS
  // ============================================================

  it("Verify Proof by authority (AI agent)", async () => {
    const aiSummaryHash = Buffer.alloc(32);
    aiSummaryHash.fill(0xab);
    const confidenceScore = 95;

    await program.methods
      .verifyProof(0, true, confidenceScore, Array.from(aiSummaryHash))
      .accounts({
        config: configPDA,
        challenge: challengePDA,
        participation: participationPDA,
        proofRecord: proofRecordPDA,
        profile: user2ProfilePDA,
        authority: authority.publicKey,
      })
      .signers([authority])
      .rpc();

    const proof = await program.account.proofRecord.fetch(proofRecordPDA);
    expect(proof.verified).to.be.true;
    expect(proof.confidenceScore).to.equal(confidenceScore);
    expect(Buffer.from(proof.aiSummaryHash)).to.deep.equal(aiSummaryHash);

    const participation = await program.account.participation.fetch(
      participationPDA
    );
    expect(participation.proofsVerified).to.equal(1);

    const profile = await program.account.userProfile.fetch(user2ProfilePDA);
    expect(Number(profile.reputation.toString())).to.equal(confidenceScore);
    expect(profile.currentStreak).to.equal(1);
    expect(profile.bestStreak).to.equal(1);
  });

  it("Fail: Verify proof with non-authority (Unauthorized)", async () => {
    const fakeAuth = Keypair.generate();
    const sig = await provider.connection.requestAirdrop(
      fakeAuth.publicKey,
      10 * LAMPORTS_PER_SOL
    );
    await provider.connection.confirmTransaction(sig);

    const [fakeConfigPDA] = PublicKey.findProgramAddressSync(
      [Buffer.from("config"), fakeAuth.publicKey.toBuffer()],
      program.programId
    );

    try {
      await program.methods
        .verifyProof(0, true, 50, Array.from(Buffer.alloc(32)))
        .accounts({
          config: fakeConfigPDA,
          challenge: challengePDA,
          participation: participationPDA,
          proofRecord: proofRecordPDA,
          profile: user2ProfilePDA,
          authority: fakeAuth.publicKey,
        })
        .signers([fakeAuth])
        .rpc();
      expect.fail("Should have thrown an error");
    } catch (error) {
      // Config PDA doesn't exist for fakeAuth
      expect(error).to.exist;
    }
  });

  // ============================================================
  // EXPIRE / COMPLETE CHALLENGE TESTS
  // ============================================================

  it("Fail: Expire challenge before end time (ChallengeNotEnded)", async () => {
    try {
      await program.methods
        .expireChallenge()
        .accounts({
          challenge: challengePDA,
        })
        .rpc();
      expect.fail("Should have thrown an error");
    } catch (error) {
      expect(error.message).to.include("ChallengeNotEnded");
    }
  });

  it("Fail: Claim reward before challenge ends (ChallengeNotEnded)", async () => {
    try {
      await program.methods
        .claimReward()
        .accounts({
          config: configPDA,
          challenge: challengePDA,
          vault: vaultPDA,
          participation: participationPDA,
          profile: user2ProfilePDA,
          user: user2.publicKey,
          treasury: authority.publicKey,
          systemProgram: SystemProgram.programId,
        })
        .signers([user2])
        .rpc();
      expect.fail("Should have thrown an error");
    } catch (error) {
      expect(error.message).to.include("ChallengeNotEnded");
    }
  });

  // ============================================================
  // VALIDATION TESTS
  // ============================================================

  it("Fail: Create challenge with invalid category", async () => {
    const [challengePDA2] = PublicKey.findProgramAddressSync(
      [
        Buffer.from("challenge"),
        new BN(1).toArrayLike(Buffer, "le", 8),
      ],
      program.programId
    );
    const [vaultPDA2] = PublicKey.findProgramAddressSync(
      [Buffer.from("vault"), new BN(1).toArrayLike(Buffer, "le", 8)],
      program.programId
    );

    try {
      await program.methods
        .createChallenge(
          "Bad Category",
          "Test",
          99, // invalid category
          stakeAmount,
          10,
          30,
          0,
          0,
          new BN(1)
        )
        .accounts({
          config: configPDA,
          challenge: challengePDA2,
          vault: vaultPDA2,
          creator: user1.publicKey,
          systemProgram: SystemProgram.programId,
        })
        .signers([user1])
        .rpc();
      expect.fail("Should have thrown an error");
    } catch (error) {
      expect(error.message).to.include("InvalidCategory");
    }
  });

  it("Fail: Create challenge with zero stake", async () => {
    const [challengePDA2] = PublicKey.findProgramAddressSync(
      [
        Buffer.from("challenge"),
        new BN(1).toArrayLike(Buffer, "le", 8),
      ],
      program.programId
    );
    const [vaultPDA2] = PublicKey.findProgramAddressSync(
      [Buffer.from("vault"), new BN(1).toArrayLike(Buffer, "le", 8)],
      program.programId
    );

    try {
      await program.methods
        .createChallenge(
          "Zero Stake",
          "Test",
          0,
          new BN(0), // zero stake
          10,
          30,
          0,
          0,
          new BN(1)
        )
        .accounts({
          config: configPDA,
          challenge: challengePDA2,
          vault: vaultPDA2,
          creator: user1.publicKey,
          systemProgram: SystemProgram.programId,
        })
        .signers([user1])
        .rpc();
      expect.fail("Should have thrown an error");
    } catch (error) {
      expect(error.message).to.include("InvalidStakeAmount");
    }
  });

  it("Create a second challenge (learning category)", async () => {
    const challengeId2 = new BN(1);
    const [challengePDA2] = PublicKey.findProgramAddressSync(
      [
        Buffer.from("challenge"),
        challengeId2.toArrayLike(Buffer, "le", 8),
      ],
      program.programId
    );
    const [vaultPDA2] = PublicKey.findProgramAddressSync(
      [Buffer.from("vault"), challengeId2.toArrayLike(Buffer, "le", 8)],
      program.programId
    );

    await program.methods
      .createChallenge(
        "Learn Rust in 7 Days",
        "Complete one Rust tutorial chapter daily",
        1, // learning
        new BN(0.1 * LAMPORTS_PER_SOL),
        5,
        7,
        0, // daily
        2, // text proof
        challengeId2
      )
      .accounts({
        config: configPDA,
        challenge: challengePDA2,
        vault: vaultPDA2,
        creator: user1.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .signers([user1])
      .rpc();

    const challenge = await program.account.challenge.fetch(challengePDA2);
    expect(Number(challenge.id.toString())).to.equal(1);
    expect(challenge.category).to.equal(1);
    expect(challenge.title).to.equal("Learn Rust in 7 Days");

    const config = await program.account.config.fetch(configPDA);
    expect(Number(config.totalChallenges.toString())).to.equal(2);
  });

  it("Verify config total staked is correct after multiple challenges", async () => {
    const config = await program.account.config.fetch(configPDA);
    // Creator staked 0.5 SOL for challenge 0, user2 joined with 0.5 SOL, creator staked 0.1 SOL for challenge 1
    const expectedStaked = 0.5 * LAMPORTS_PER_SOL + 0.5 * LAMPORTS_PER_SOL + 0.1 * LAMPORTS_PER_SOL;
    expect(Number(config.totalStaked.toString())).to.equal(expectedStaked);
  });

  it("Verify vault holds correct SOL balance", async () => {
    const vaultBalance = await provider.connection.getBalance(vaultPDA);
    // Vault should have at least the staked amount (plus rent)
    expect(vaultBalance).to.be.greaterThanOrEqual(Number(stakeAmount.toString()));
  });
});