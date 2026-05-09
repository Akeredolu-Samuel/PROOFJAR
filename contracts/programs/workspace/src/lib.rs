use anchor_lang::prelude::*;
use anchor_lang::system_program;

declare_id!("GJnVvUgGrUifyiGrs2NDbLdgqxVT5NbRvRhMYqPDMoLB");

#[program]
pub mod workspace {
    use super::*;

    // fee_bps: u16, Protocol fee in basis points, 250 = 2.5%
    // treasury: Pubkey, Fee collection address, 9PJ8I...3555
    pub fn initialize_config(
        ctx: Context<InitializeConfig>,
        fee_bps: u16,
        treasury: Pubkey,
    ) -> Result<()> {
        require!(fee_bps <= 10000, ErrorCode::InvalidParameter);
        let config = &mut ctx.accounts.config;
        config.bump = ctx.bumps.config;
        config.authority = ctx.accounts.authority.key();
        config.treasury = treasury;
        config.fee_bps = fee_bps;
        config.total_challenges = 0;
        config.total_users = 0;
        config.total_staked = 0;
        config.is_active = true;
        config.is_paused = false;
        config.version = 1;
        Ok(())
    }

    pub fn create_challenge(
        ctx: Context<CreateChallenge>,
        title: String,
        description: String,
        category: u8,
        stake_amount: u64,
        max_participants: u16,
        duration_days: u16,
        frequency: u8,
        proof_type: u8,
        challenge_id: u64,
    ) -> Result<()> {
        require!(title.len() <= 64, ErrorCode::InvalidParameter);
        require!(description.len() <= 256, ErrorCode::InvalidParameter);
        require!(category <= 7, ErrorCode::InvalidCategory);
        require!(stake_amount > 0, ErrorCode::InvalidStakeAmount);
        require!(max_participants > 0, ErrorCode::InvalidParameter);
        require!(duration_days > 0, ErrorCode::InvalidParameter);
        require!(frequency <= 1, ErrorCode::InvalidParameter);
        require!(proof_type <= 2, ErrorCode::InvalidParameter);

        let config = &ctx.accounts.config;
        require!(config.is_active && !config.is_paused, ErrorCode::ConfigInactive);

        require!(challenge_id == config.total_challenges, ErrorCode::InvalidParameter);
        let clock = Clock::get()?;
        let now = clock.unix_timestamp;
        let end_time = now
            .checked_add((duration_days as i64).checked_mul(86400).ok_or(ErrorCode::OverflowError)?)
            .ok_or(ErrorCode::OverflowError)?;

        let challenge = &mut ctx.accounts.challenge;
        challenge.id = challenge_id;
        challenge.creator = ctx.accounts.creator.key();
        challenge.title = title;
        challenge.description = description;
        challenge.category = category;
        challenge.stake_amount = stake_amount;
        challenge.max_participants = max_participants;
        challenge.current_participants = 1;
        challenge.duration_days = duration_days;
        challenge.frequency = frequency;
        challenge.proof_type = proof_type;
        challenge.total_pool = stake_amount;
        challenge.start_time = now;
        challenge.end_time = end_time;
        challenge.status = 0;
        challenge.bump = ctx.bumps.challenge;

        // Transfer stake from creator to vault
        let vault = &mut ctx.accounts.vault;
        vault.challenge_id = challenge_id;
        vault.bump = ctx.bumps.vault;

        let vault_key = vault.key();
        system_program::transfer(
            CpiContext::new(
                ctx.accounts.system_program.to_account_info(),
                system_program::Transfer {
                    from: ctx.accounts.creator.to_account_info(),
                    to: vault.to_account_info(),
                },
            ),
            stake_amount,
        )?;

        let config_mut = &mut ctx.accounts.config;
        config_mut.total_challenges = config_mut
            .total_challenges
            .checked_add(1)
            .ok_or(ErrorCode::OverflowError)?;
        config_mut.total_staked = config_mut
            .total_staked
            .checked_add(stake_amount)
            .ok_or(ErrorCode::OverflowError)?;

        emit!(ChallengeCreated {
            challenge_id,
            creator: ctx.accounts.creator.key(),
            stake_amount,
            max_participants,
            duration_days,
            vault: vault_key,
        });

        Ok(())
    }

    pub fn init_user_profile(ctx: Context<InitUserProfile>) -> Result<()> {
        let profile = &mut ctx.accounts.profile;
        profile.user = ctx.accounts.user.key();
        profile.reputation = 0;
        profile.current_streak = 0;
        profile.best_streak = 0;
        profile.challenges_joined = 0;
        profile.challenges_won = 0;
        profile.total_staked = 0;
        profile.total_earned = 0;
        profile.bump = ctx.bumps.profile;

        let config = &mut ctx.accounts.config;
        config.total_users = config
            .total_users
            .checked_add(1)
            .ok_or(ErrorCode::OverflowError)?;

        Ok(())
    }

    pub fn join_challenge(ctx: Context<JoinChallenge>) -> Result<()> {
        let challenge = &ctx.accounts.challenge;
        require!(challenge.status == 0, ErrorCode::ChallengeNotActive);
        require!(
            challenge.current_participants < challenge.max_participants,
            ErrorCode::ChallengeFull
        );

        let clock = Clock::get()?;
        require!(clock.unix_timestamp < challenge.end_time, ErrorCode::ChallengeNotActive);

        let stake_amount = challenge.stake_amount;

        system_program::transfer(
            CpiContext::new(
                ctx.accounts.system_program.to_account_info(),
                system_program::Transfer {
                    from: ctx.accounts.user.to_account_info(),
                    to: ctx.accounts.vault.to_account_info(),
                },
            ),
            stake_amount,
        )?;

        let participation = &mut ctx.accounts.participation;
        participation.user = ctx.accounts.user.key();
        participation.challenge = ctx.accounts.challenge.key();
        participation.staked_amount = stake_amount;
        participation.proofs_submitted = 0;
        participation.proofs_verified = 0;
        participation.joined_at = clock.unix_timestamp;
        participation.last_proof_at = 0;
        participation.completed = false;
        participation.claimed = false;
        participation.bump = ctx.bumps.participation;

        let challenge_mut = &mut ctx.accounts.challenge;
        challenge_mut.current_participants = challenge_mut
            .current_participants
            .checked_add(1)
            .ok_or(ErrorCode::OverflowError)?;
        challenge_mut.total_pool = challenge_mut
            .total_pool
            .checked_add(stake_amount)
            .ok_or(ErrorCode::OverflowError)?;

        let profile = &mut ctx.accounts.profile;
        profile.challenges_joined = profile
            .challenges_joined
            .checked_add(1)
            .ok_or(ErrorCode::OverflowError)?;
        profile.total_staked = profile
            .total_staked
            .checked_add(stake_amount)
            .ok_or(ErrorCode::OverflowError)?;

        let config = &mut ctx.accounts.config;
        config.total_staked = config
            .total_staked
            .checked_add(stake_amount)
            .ok_or(ErrorCode::OverflowError)?;

        emit!(ChallengeJoined {
            challenge_id: challenge_mut.id,
            user: ctx.accounts.user.key(),
            stake_amount,
        });

        Ok(())
    }

    pub fn submit_proof(
        ctx: Context<SubmitProof>,
        proof_hash: [u8; 32],
        proof_type: u8,
    ) -> Result<()> {
        require!(proof_type <= 2, ErrorCode::InvalidParameter);

        let challenge = &ctx.accounts.challenge;
        require!(challenge.status == 0, ErrorCode::ChallengeNotActive);

        let clock = Clock::get()?;
        let now = clock.unix_timestamp;
        require!(now <= challenge.end_time, ErrorCode::ChallengeNotActive);

        let participation = &ctx.accounts.participation;
        let last_proof = participation.last_proof_at;

        if last_proof > 0 {
            let min_interval: i64 = if challenge.frequency == 0 { 86400 } else { 604800 };
            let elapsed = now.checked_sub(last_proof).ok_or(ErrorCode::OverflowError)?;
            require!(elapsed >= min_interval, ErrorCode::ProofTooEarly);
        }

        let proof_index = participation.proofs_submitted;

        let proof_record = &mut ctx.accounts.proof_record;
        proof_record.participation = ctx.accounts.participation.key();
        proof_record.proof_index = proof_index;
        proof_record.proof_type = proof_type;
        proof_record.proof_hash = proof_hash;
        proof_record.submitted_at = now;
        proof_record.verified = false;
        proof_record.confidence_score = 0;
        proof_record.ai_summary_hash = [0u8; 32];
        proof_record.bump = ctx.bumps.proof_record;

        let participation_mut = &mut ctx.accounts.participation;
        participation_mut.proofs_submitted = participation_mut
            .proofs_submitted
            .checked_add(1)
            .ok_or(ErrorCode::OverflowError)?;
        participation_mut.last_proof_at = now;

        emit!(ProofSubmitted {
            challenge_id: challenge.id,
            user: ctx.accounts.user.key(),
            proof_index,
            proof_hash,
        });

        Ok(())
    }

    pub fn verify_proof(
        ctx: Context<VerifyProof>,
        _proof_index: u16,
        verified: bool,
        confidence_score: u8,
        ai_summary_hash: [u8; 32],
    ) -> Result<()> {
        require!(confidence_score <= 100, ErrorCode::InvalidParameter);

        let proof_record = &mut ctx.accounts.proof_record;
        proof_record.verified = verified;
        proof_record.confidence_score = confidence_score;
        proof_record.ai_summary_hash = ai_summary_hash;

        if verified {
            let participation = &mut ctx.accounts.participation;
            participation.proofs_verified = participation
                .proofs_verified
                .checked_add(1)
                .ok_or(ErrorCode::OverflowError)?;

            let profile = &mut ctx.accounts.profile;
            profile.reputation = profile
                .reputation
                .checked_add(confidence_score as u64)
                .ok_or(ErrorCode::OverflowError)?;
            profile.current_streak = profile
                .current_streak
                .checked_add(1)
                .ok_or(ErrorCode::OverflowError)?;
            if profile.current_streak > profile.best_streak {
                profile.best_streak = profile.current_streak;
            }
        }

        emit!(ProofVerified {
            challenge_id: ctx.accounts.challenge.id,
            user: ctx.accounts.participation.user,
            proof_index: _proof_index,
            verified,
            confidence_score,
        });

        Ok(())
    }

    pub fn claim_reward(ctx: Context<ClaimReward>) -> Result<()> {
        let challenge = &ctx.accounts.challenge;
        require!(
            challenge.status == 1 || challenge.status == 2,
            ErrorCode::ChallengeNotEnded
        );

        let participation = &ctx.accounts.participation;
        require!(!participation.claimed, ErrorCode::AlreadyClaimed);
        require!(participation.proofs_verified > 0, ErrorCode::NotParticipant);

        let total_pool = challenge.total_pool;
        let proofs_verified = participation.proofs_verified as u64;
        let total_participants = challenge.current_participants as u64;

        // Reward = (proofs_verified / total_possible) * pool_share
        // Simplified: proportional share based on verified proofs
        let reward = total_pool
            .checked_mul(proofs_verified)
            .ok_or(ErrorCode::OverflowError)?
            .checked_div(
                total_participants
                    .checked_mul(proofs_verified.max(1))
                    .ok_or(ErrorCode::OverflowError)?,
            )
            .ok_or(ErrorCode::OverflowError)?;

        let fee_bps = ctx.accounts.config.fee_bps as u64;
        let fee = reward
            .checked_mul(fee_bps)
            .ok_or(ErrorCode::OverflowError)?
            .checked_div(10000)
            .ok_or(ErrorCode::OverflowError)?;
        let payout = reward.checked_sub(fee).ok_or(ErrorCode::OverflowError)?;

        // Transfer payout to user
        if payout > 0 {
            let vault_info = ctx.accounts.vault.to_account_info();
            let user_info = ctx.accounts.user.to_account_info();
            **vault_info.try_borrow_mut_lamports()? -= payout;
            **user_info.try_borrow_mut_lamports()? += payout;
        }

        // Transfer fee to treasury
        if fee > 0 {
            let vault_info = ctx.accounts.vault.to_account_info();
            let treasury_info = ctx.accounts.treasury.to_account_info();
            **vault_info.try_borrow_mut_lamports()? -= fee;
            **treasury_info.try_borrow_mut_lamports()? += fee;
        }

        let participation_mut = &mut ctx.accounts.participation;
        participation_mut.claimed = true;
        participation_mut.completed = true;

        let profile = &mut ctx.accounts.profile;
        profile.challenges_won = profile
            .challenges_won
            .checked_add(1)
            .ok_or(ErrorCode::OverflowError)?;
        profile.total_earned = profile
            .total_earned
            .checked_add(payout)
            .ok_or(ErrorCode::OverflowError)?;

        emit!(RewardClaimed {
            challenge_id: challenge.id,
            user: ctx.accounts.user.key(),
            reward: payout,
            fee,
        });

        Ok(())
    }

    pub fn expire_challenge(ctx: Context<ExpireChallenge>) -> Result<()> {
        let challenge = &ctx.accounts.challenge;
        require!(challenge.status == 0, ErrorCode::ChallengeNotActive);

        let clock = Clock::get()?;
        require!(
            clock.unix_timestamp >= challenge.end_time,
            ErrorCode::ChallengeNotEnded
        );

        let challenge_mut = &mut ctx.accounts.challenge;
        challenge_mut.status = 2;

        emit!(ChallengeExpired {
            challenge_id: challenge_mut.id,
        });

        Ok(())
    }

    pub fn complete_challenge(ctx: Context<CompleteChallenge>) -> Result<()> {
        let challenge = &ctx.accounts.challenge;
        require!(challenge.status == 0, ErrorCode::ChallengeNotActive);

        let clock = Clock::get()?;
        require!(
            clock.unix_timestamp >= challenge.end_time,
            ErrorCode::ChallengeNotEnded
        );

        let challenge_mut = &mut ctx.accounts.challenge;
        challenge_mut.status = 1;

        Ok(())
    }
}

// ============================================================
// ACCOUNT STRUCTS
// ============================================================

#[account]
pub struct Config {
    pub bump: u8,
    pub authority: Pubkey,
    pub treasury: Pubkey,
    pub fee_bps: u16,
    pub total_challenges: u64,
    pub total_users: u64,
    pub total_staked: u64,
    pub is_active: bool,
    pub is_paused: bool,
    pub version: u8,
}

impl Config {
    pub const LEN: usize = 1 + 32 + 32 + 2 + 8 + 8 + 8 + 1 + 1 + 1;
}

#[account]
pub struct Challenge {
    pub id: u64,
    pub creator: Pubkey,
    pub title: String,
    pub description: String,
    pub category: u8,
    pub stake_amount: u64,
    pub max_participants: u16,
    pub current_participants: u16,
    pub duration_days: u16,
    pub frequency: u8,
    pub proof_type: u8,
    pub total_pool: u64,
    pub start_time: i64,
    pub end_time: i64,
    pub status: u8,
    pub bump: u8,
}

impl Challenge {
    pub const LEN: usize = 8 + 32 + (4 + 64) + (4 + 256) + 1 + 8 + 2 + 2 + 2 + 1 + 1 + 8 + 8 + 8 + 1 + 1;
}

#[account]
pub struct Vault {
    pub challenge_id: u64,
    pub bump: u8,
}

impl Vault {
    pub const LEN: usize = 8 + 1;
}

#[account]
pub struct Participation {
    pub user: Pubkey,
    pub challenge: Pubkey,
    pub staked_amount: u64,
    pub proofs_submitted: u16,
    pub proofs_verified: u16,
    pub joined_at: i64,
    pub last_proof_at: i64,
    pub completed: bool,
    pub claimed: bool,
    pub bump: u8,
}

impl Participation {
    pub const LEN: usize = 32 + 32 + 8 + 2 + 2 + 8 + 8 + 1 + 1 + 1;
}

#[account]
pub struct UserProfile {
    pub user: Pubkey,
    pub reputation: u64,
    pub current_streak: u16,
    pub best_streak: u16,
    pub challenges_joined: u32,
    pub challenges_won: u32,
    pub total_staked: u64,
    pub total_earned: u64,
    pub bump: u8,
}

impl UserProfile {
    pub const LEN: usize = 32 + 8 + 2 + 2 + 4 + 4 + 8 + 8 + 1;
}

#[account]
pub struct ProofRecord {
    pub participation: Pubkey,
    pub proof_index: u16,
    pub proof_type: u8,
    pub proof_hash: [u8; 32],
    pub submitted_at: i64,
    pub verified: bool,
    pub confidence_score: u8,
    pub ai_summary_hash: [u8; 32],
    pub bump: u8,
}

impl ProofRecord {
    pub const LEN: usize = 32 + 2 + 1 + 32 + 8 + 1 + 1 + 32 + 1;
}

// ============================================================
// CONTEXT STRUCTS
// ============================================================

#[derive(Accounts)]
pub struct InitializeConfig<'info> {
    #[account(
        init,
        seeds = [b"config", authority.key().as_ref()],
        bump,
        payer = authority,
        space = 8 + Config::LEN
    )]
    pub config: Account<'info, Config>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(title: String, description: String, category: u8, stake_amount: u64, max_participants: u16, duration_days: u16, frequency: u8, proof_type: u8, challenge_id: u64)]
pub struct CreateChallenge<'info> {
    #[account(
        mut,
        seeds = [b"config", config.authority.as_ref()],
        bump = config.bump,
        constraint = config.is_active && !config.is_paused @ ErrorCode::ConfigInactive,
    )]
    pub config: Account<'info, Config>,
    #[account(
        init,
        seeds = [b"challenge", challenge_id.to_le_bytes().as_ref()],
        bump,
        payer = creator,
        space = 8 + Challenge::LEN
    )]
    pub challenge: Account<'info, Challenge>,
    #[account(
        init,
        seeds = [b"vault", challenge_id.to_le_bytes().as_ref()],
        bump,
        payer = creator,
        space = 8 + Vault::LEN
    )]
    pub vault: Account<'info, Vault>,
    #[account(mut)]
    pub creator: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct InitUserProfile<'info> {
    #[account(
        mut,
        seeds = [b"config", config.authority.as_ref()],
        bump = config.bump,
    )]
    pub config: Account<'info, Config>,
    #[account(
        init,
        seeds = [b"profile", user.key().as_ref()],
        bump,
        payer = user,
        space = 8 + UserProfile::LEN
    )]
    pub profile: Account<'info, UserProfile>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct JoinChallenge<'info> {
    #[account(
        mut,
        seeds = [b"config", config.authority.as_ref()],
        bump = config.bump,
    )]
    pub config: Account<'info, Config>,
    #[account(
        mut,
        seeds = [b"challenge", &challenge.id.to_le_bytes()],
        bump = challenge.bump,
        constraint = challenge.status == 0 @ ErrorCode::ChallengeNotActive,
    )]
    pub challenge: Account<'info, Challenge>,
    /// CHECK: Vault PDA that holds staked SOL
    #[account(
        mut,
        seeds = [b"vault", &challenge.id.to_le_bytes()],
        bump,
    )]
    pub vault: AccountInfo<'info>,
    #[account(
        init,
        seeds = [b"participation", challenge.key().as_ref(), user.key().as_ref()],
        bump,
        payer = user,
        space = 8 + Participation::LEN
    )]
    pub participation: Account<'info, Participation>,
    #[account(
        mut,
        seeds = [b"profile", user.key().as_ref()],
        bump = profile.bump,
    )]
    pub profile: Account<'info, UserProfile>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(proof_hash: [u8; 32], proof_type: u8)]
pub struct SubmitProof<'info> {
    #[account(
        seeds = [b"challenge", &challenge.id.to_le_bytes()],
        bump = challenge.bump,
        constraint = challenge.status == 0 @ ErrorCode::ChallengeNotActive,
    )]
    pub challenge: Account<'info, Challenge>,
    #[account(
        mut,
        seeds = [b"participation", challenge.key().as_ref(), user.key().as_ref()],
        bump = participation.bump,
        constraint = participation.user == user.key() @ ErrorCode::NotParticipant,
    )]
    pub participation: Account<'info, Participation>,
    #[account(
        init,
        seeds = [b"proof", participation.key().as_ref(), &participation.proofs_submitted.to_le_bytes()],
        bump,
        payer = user,
        space = 8 + ProofRecord::LEN
    )]
    pub proof_record: Account<'info, ProofRecord>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(proof_index: u16)]
pub struct VerifyProof<'info> {
    #[account(
        seeds = [b"config", authority.key().as_ref()],
        bump = config.bump,
        constraint = config.authority == authority.key() @ ErrorCode::Unauthorized,
    )]
    pub config: Account<'info, Config>,
    #[account(
        seeds = [b"challenge", &challenge.id.to_le_bytes()],
        bump = challenge.bump,
    )]
    pub challenge: Account<'info, Challenge>,
    #[account(
        mut,
        seeds = [b"participation", challenge.key().as_ref(), participation.user.as_ref()],
        bump = participation.bump,
    )]
    pub participation: Account<'info, Participation>,
    #[account(
        mut,
        seeds = [b"proof", participation.key().as_ref(), &proof_index.to_le_bytes()],
        bump = proof_record.bump,
    )]
    pub proof_record: Account<'info, ProofRecord>,
    #[account(
        mut,
        seeds = [b"profile", participation.user.as_ref()],
        bump = profile.bump,
    )]
    pub profile: Account<'info, UserProfile>,
    #[account(mut)]
    pub authority: Signer<'info>,
}

#[derive(Accounts)]
pub struct ClaimReward<'info> {
    #[account(
        seeds = [b"config", config.authority.as_ref()],
        bump = config.bump,
    )]
    pub config: Account<'info, Config>,
    #[account(
        seeds = [b"challenge", &challenge.id.to_le_bytes()],
        bump = challenge.bump,
        constraint = challenge.status == 1 || challenge.status == 2 @ ErrorCode::ChallengeNotEnded,
    )]
    pub challenge: Account<'info, Challenge>,
    #[account(
        mut,
        seeds = [b"vault", &challenge.id.to_le_bytes()],
        bump = vault.bump,
    )]
    pub vault: Account<'info, Vault>,
    #[account(
        mut,
        seeds = [b"participation", challenge.key().as_ref(), user.key().as_ref()],
        bump = participation.bump,
        constraint = participation.user == user.key() @ ErrorCode::NotParticipant,
        constraint = !participation.claimed @ ErrorCode::AlreadyClaimed,
    )]
    pub participation: Account<'info, Participation>,
    #[account(
        mut,
        seeds = [b"profile", user.key().as_ref()],
        bump = profile.bump,
    )]
    pub profile: Account<'info, UserProfile>,
    #[account(mut)]
    pub user: Signer<'info>,
    /// CHECK: Treasury address validated against config
    #[account(
        mut,
        constraint = treasury.key() == config.treasury @ ErrorCode::Unauthorized,
    )]
    pub treasury: AccountInfo<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct ExpireChallenge<'info> {
    #[account(
        mut,
        seeds = [b"challenge", &challenge.id.to_le_bytes()],
        bump = challenge.bump,
        constraint = challenge.status == 0 @ ErrorCode::ChallengeNotActive,
    )]
    pub challenge: Account<'info, Challenge>,
}

#[derive(Accounts)]
pub struct CompleteChallenge<'info> {
    #[account(
        seeds = [b"config", authority.key().as_ref()],
        bump = config.bump,
        constraint = config.authority == authority.key() @ ErrorCode::Unauthorized,
    )]
    pub config: Account<'info, Config>,
    #[account(
        mut,
        seeds = [b"challenge", &challenge.id.to_le_bytes()],
        bump = challenge.bump,
        constraint = challenge.status == 0 @ ErrorCode::ChallengeNotActive,
    )]
    pub challenge: Account<'info, Challenge>,
    pub authority: Signer<'info>,
}

// ============================================================
// EVENTS
// ============================================================

#[event]
pub struct ChallengeCreated {
    pub challenge_id: u64,
    pub creator: Pubkey,
    pub stake_amount: u64,
    pub max_participants: u16,
    pub duration_days: u16,
    pub vault: Pubkey,
}

#[event]
pub struct ChallengeJoined {
    pub challenge_id: u64,
    pub user: Pubkey,
    pub stake_amount: u64,
}

#[event]
pub struct ProofSubmitted {
    pub challenge_id: u64,
    pub user: Pubkey,
    pub proof_index: u16,
    pub proof_hash: [u8; 32],
}

#[event]
pub struct ProofVerified {
    pub challenge_id: u64,
    pub user: Pubkey,
    pub proof_index: u16,
    pub verified: bool,
    pub confidence_score: u8,
}

#[event]
pub struct RewardClaimed {
    pub challenge_id: u64,
    pub user: Pubkey,
    pub reward: u64,
    pub fee: u64,
}

#[event]
pub struct ChallengeExpired {
    pub challenge_id: u64,
}

// ============================================================
// ERROR CODES
// ============================================================

#[error_code]
pub enum ErrorCode {
    #[msg("Challenge is not active")]
    ChallengeNotActive,
    #[msg("Challenge is full")]
    ChallengeFull,
    #[msg("Already joined this challenge")]
    AlreadyJoined,
    #[msg("Not a participant in this challenge")]
    NotParticipant,
    #[msg("Proof submitted too early based on frequency")]
    ProofTooEarly,
    #[msg("Challenge has not ended yet")]
    ChallengeNotEnded,
    #[msg("Reward already claimed")]
    AlreadyClaimed,
    #[msg("Unauthorized access")]
    Unauthorized,
    #[msg("Invalid category")]
    InvalidCategory,
    #[msg("Invalid stake amount")]
    InvalidStakeAmount,
    #[msg("Arithmetic overflow")]
    OverflowError,
    #[msg("Invalid parameter")]
    InvalidParameter,
    #[msg("Config is inactive")]
    ConfigInactive,
}