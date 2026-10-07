// Address of the HashtagsX API. VITE_API_URL overrides it; local development uses the /api proxy.
const LIVE_API = 'https://hashtagsxsite-production.up.railway.app';
const fromEnv: string = (import.meta as any).env?.VITE_API_URL || '';
const isProd: boolean = !!(import.meta as any).env?.PROD;

export const API_URL: string = (fromEnv || (isProd ? LIVE_API : '')).replace(/\/$/, '');
