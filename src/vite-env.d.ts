/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_GOOGLE_SCRIPT_URL?: string;
  readonly VITE_GA_ID?: string;
  readonly VITE_BOOKING_URL?: string;
  readonly VITE_ROUTER?: 'hash' | 'browser';
}
