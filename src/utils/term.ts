import type { Term } from '@/types';

export const isValidQuizTerm = (term: Term) => {
  const isLearned = term.learnedAt !== null;
  const inCooldown = new Date().getTime() < new Date(term.metadata.quiz.cooldown).getTime();

  return !isLearned && !inCooldown;
};
