import type { TermQuizMetadata } from '@/types';
import { getDaysInMs, getFutureDate, getHoursInMs } from '@/utils/time';

class QuizService {
  getDefault(): TermQuizMetadata {
    const stage = 1;

    return {
      priority: 1,
      stage,
      cooldown: this.getCooldownFromStage(stage),
      record: [0, 0]
    };
  }

  getStepForward(data: TermQuizMetadata): TermQuizMetadata {
    if (data.stage >= 6) {
      throw new Error('Cannot step forward');
    }

    const stage = data.stage + 1;

    return {
      priority: Math.max(0, data.priority - 0.1),
      stage,
      cooldown: this.getCooldownFromStage(stage),
      record: [data.record[0] + 1, data.record[1]]
    };
  }

  getStepBackward(data: TermQuizMetadata): TermQuizMetadata {
    let stage: number;

    if (data.stage > 3) {
      stage = 3;
    } else {
      stage = Math.max(1, data.stage - 1);
    }

    return {
      priority: Math.min(1, data.priority + 0.2),
      stage,
      cooldown: this.getCooldownFromStage(stage),
      record: [data.record[0], data.record[1] + 1]
    };
  }

  private getCooldownFromStage(stage: number): Date {
    switch (stage) {
      case 1: {
        return getFutureDate(getHoursInMs(1));
      }
      case 2: {
        return getFutureDate(getHoursInMs(12));
      }
      case 3: {
        return getFutureDate(getDaysInMs(1));
      }
      case 4: {
        return getFutureDate(getDaysInMs(7));
      }
      case 5: {
        return getFutureDate(getDaysInMs(14));
      }
      case 6: {
        return getFutureDate(getDaysInMs(30));
      }
      default: {
        throw new Error('Invalid stage');
      }
    }
  }
}

export const quizService = new QuizService();
