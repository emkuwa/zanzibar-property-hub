/** AbortSignal.timeout is absent in some supported browsers and test environments. */
export async function fetchWithTimeout(
  input: string,
  init: RequestInit,
  milliseconds: number,
  fetcher = fetch,
) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), milliseconds);
  try {
    return await fetcher(input, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}
