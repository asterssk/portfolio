export function waitDuration(duration?: number) {
  return new Promise((resolve) => setTimeout(resolve, duration ?? 100));
}
