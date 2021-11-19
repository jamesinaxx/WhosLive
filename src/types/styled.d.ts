import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    type: 'light' | 'dark';
    colors: {
      backgroundColor: string;
      color: string;
      scrollbarColor: string;
    };
  }
}
