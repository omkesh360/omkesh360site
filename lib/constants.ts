export const IS_PRODUCTION = process.env.NODE_ENV === 'production';
export const TEAM_ID = process.env.TEAM_ID_VERCEL ?? '';
export const VERCEL_TOKEN = process.env.VERCEL_TOKEN ?? '';
export const NEXT_PUBLIC_ROOT_DOMAIN = process.env.NEXT_PUBLIC_ROOT_DOMAIN ?? '';

export const ROW_HEIGHT = 53;
export const MAX_PROJECTS = Number(process.env.MAX_PROJECTS ?? 1);
