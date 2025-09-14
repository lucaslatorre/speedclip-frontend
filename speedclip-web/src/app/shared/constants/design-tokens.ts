// Design tokens de TS para uso em componentes/serviços
export type ThemeName = 'light' | 'dark';

export const DESIGN_TOKENS = Object.freeze({
  cssVars: {
    bg: '--color-bg',
    surface: '--color-surface',
    text: '--color-text',
    textMuted: '--color-text-muted',
    primary: '--color-primary',
    accent: '--color-accent',
    success: '--color-success',
    warn: '--color-warn',
    error: '--color-error',
    glassBg: '--glass-bg',
    glassBlur: '--glass-blur',
    glassBorder: '--glass-border',

    containerMax: '--container-max',
    topbarH: '--topbar-h',
    sidebarW: '--sidebar-w',
    sidebarWCollapsed: '--sidebar-w-collapsed',
  },
} as const);

