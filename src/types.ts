import type { ViteSSGContext } from 'vite-ssg';

export type UserModule = (ctx: ViteSSGContext) => void;

export type Lang = 'en' | 'ja';

export type DatePicker = 'date' | 'time' | 'datetime';
