export const validGameCodes = ['tekken7', 'tekken8'] as const;
export type GameCode = (typeof validGameCodes)[number];
