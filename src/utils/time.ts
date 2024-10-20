export function getDaysInMs(days: number) {
  return days * 24 * 60 * 60 * 1000;
}

export function getHoursInMs(hours: number) {
  return hours * 60 * 60 * 1000;
}

export function getMinutesInMs(minutes: number) {
  return minutes * 60 * 1000;
}

export function getSecondsInMs(seconds: number) {
  return seconds * 1000;
}

export function getFutureDate(time: number): Date {
  const nowInMs = Date.now();
  return new Date(nowInMs + time);
}
