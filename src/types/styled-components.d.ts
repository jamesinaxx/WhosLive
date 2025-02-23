export * from 'styled-components';
declare module 'styled-components' {
  export interface DefaultTheme {
    type: 'light' | 'dark';
    colors: {
      backgroundColor: string;
      color: string;
      scrollbarColor: string;
    };
  }
}
