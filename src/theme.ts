type ValueOf<T> = T[keyof T];

export type Theme = ValueOf<typeof knownThemes>;

export const knownThemes = {
  dark: "abyss",
  light: "pastel",
} as const;

export const themeToggleList = Object.values(knownThemes).join(",");

export function toggleTheme(theme: Theme): Theme {
  return theme === knownThemes.light ? knownThemes.dark : knownThemes.light;
}
