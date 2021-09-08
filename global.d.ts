declare const process: NodeJS.Process;

declare namespace NodeJS {
  interface ProcessEnv {
    CLIENTID: string;
    CLIENTSECRET: string;
    PRODUCTION: 'true' | 'false';
  }
  interface Process {
    env: ProcessEnv;
  }
}
