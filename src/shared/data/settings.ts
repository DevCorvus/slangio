import { useLocalStorage } from '@vueuse/core';
import type { Settings } from '../types';

export const settings = useLocalStorage<Settings>('settings', { openNewTermDetails: false });
