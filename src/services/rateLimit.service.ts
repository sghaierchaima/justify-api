import { dayKey } from "../utils/dateKey";

const LIMIT = 80000;
const usage = new Map<string, number>();

export function checkAndConsume(token: string, words: number) {
  const key = `${token}:${dayKey()}`;
  const current = usage.get(key) ?? 0;

  if (current + words > LIMIT) {
    return {
      allowed: false as const,
      limit: LIMIT,
      used: current,
      remaining: Math.max(0, LIMIT - current),
    };
  }

  const newValue = current + words;
  usage.set(key, newValue);

  return {
    allowed: true as const,
    limit: LIMIT,
    used: newValue,
    remaining: Math.max(0, LIMIT - newValue),
  };
}
