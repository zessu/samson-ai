import { MastraClient } from '@mastra/client-js';

export const controller = new AbortController();

export const mastraClient = new MastraClient({
  baseUrl: import.meta.env.VITE_SAMSON_URL,
  abortSignal: controller.signal,
});

export const samson = mastraClient.getAgent('Samson');
