declare const process: NodeJS.Process;

declare namespace NodeJS {
  interface ProcessEnv {
    CLIENT_ID: string;
    CLIENT_SECRET: string;
    PRODUCTION: 'true' | 'false';
  }
  interface Process {
    env: ProcessEnv;
  }
}
