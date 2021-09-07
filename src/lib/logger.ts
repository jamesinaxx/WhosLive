/* eslint-disable no-console */
const dev = process.env.PRODUCTION !== 'true';

export function log(...data: any[]) {
  if (dev) {
    console.log(...data);
  }
}

export function error(...data: any[]) {
  if (dev) {
    console.error(...data);
  }
}
