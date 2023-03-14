interface ImportMetaEnv {
  readonly VITE_REACT_APP_API_URL: string;
  readonly VITE_PROJECT_NAME: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}