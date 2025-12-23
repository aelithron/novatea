const reqMap = new Map<string, { count: number, time: number }>();
export function rateLimit(ip: string): boolean {
  const user = reqMap.get(ip);
  if (!user || Date.now() - user!.time > 60_000) {
    reqMap.set(ip, { count: 1, time: Date.now() });
    return false;
  }
  if (user.count >= 40) return true;
  user.count++;
  return false;
}