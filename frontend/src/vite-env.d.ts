// src/vite-env.d.ts
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_APP_PORT: string; // El ? indica que es opcional
  readonly VITE_APP_PROTOCOL: 'http' | 'https';
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}