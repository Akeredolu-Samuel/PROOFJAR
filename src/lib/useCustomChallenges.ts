import { useState, useEffect } from 'react';
import { Challenge } from './constants';

export const useCustomChallenges = () => {
  const [customChallenges, setCustomChallenges] = useState<Challenge[]>([]);

  useEffect(() => {
    const loadChallenges = () => {
      const stored = localStorage.getItem('proofjar_custom_challenges');
      if (stored) {
        try {
          setCustomChallenges(JSON.parse(stored));
        } catch (e) {
          console.error(e);
        }
      }
    };
    
    loadChallenges();
    window.addEventListener('storage', loadChallenges);
    window.addEventListener('custom_challenges_updated', loadChallenges);
    
    return () => {
      window.removeEventListener('storage', loadChallenges);
      window.removeEventListener('custom_challenges_updated', loadChallenges);
    };
  }, []);

  const addChallenge = (challenge: Challenge) => {
    const stored = localStorage.getItem('proofjar_custom_challenges');
    let current = [];
    if (stored) {
      try { current = JSON.parse(stored); } catch (e) {}
    }
    const updated = [challenge, ...current];
    setCustomChallenges(updated);
    localStorage.setItem('proofjar_custom_challenges', JSON.stringify(updated));
    window.dispatchEvent(new Event('custom_challenges_updated'));
  };

  const editChallenge = (id: string, updates: Partial<Challenge>) => {
    const stored = localStorage.getItem('proofjar_custom_challenges');
    let current = customChallenges;
    if (stored) {
      try { current = JSON.parse(stored); } catch (e) {}
    }
    const updated = current.map(c => c.id === id ? { ...c, ...updates } : c);
    setCustomChallenges(updated);
    localStorage.setItem('proofjar_custom_challenges', JSON.stringify(updated));
    window.dispatchEvent(new Event('custom_challenges_updated'));
  };

  const deleteChallenge = (id: string) => {
    const stored = localStorage.getItem('proofjar_custom_challenges');
    let current = customChallenges;
    if (stored) {
      try { current = JSON.parse(stored); } catch (e) {}
    }
    const updated = current.filter(c => c.id !== id);
    setCustomChallenges(updated);
    localStorage.setItem('proofjar_custom_challenges', JSON.stringify(updated));
    window.dispatchEvent(new Event('custom_challenges_updated'));
  };

  return { customChallenges, addChallenge, editChallenge, deleteChallenge };
};
