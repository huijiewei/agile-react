declare global {
  namespace NodeJS {
    interface ProcessEnv {
      QS_ARRAY_FORMAT: 'bracket' | 'index' | 'comma' | 'separator' | 'none';
    }
  }
}
