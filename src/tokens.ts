/**
 * Tokens CSS du design system — à utiliser avec `style={{ ... }}` ou dans
 * un preset Tailwind. Chaque valeur est une référence `var(--xxx)` qui
 * respecte le thème actif (light / dark / theme-green / theme-purple).
 */
export const tokens = {
  colors: {
    background:            'var(--background)',
    foreground:            'var(--foreground)',
    primary:               'var(--primary)',
    primaryForeground:     'var(--primary-foreground)',
    muted:                 'var(--muted)',
    mutedForeground:       'var(--muted-foreground)',
    destructive:           'var(--destructive)',
    destructiveForeground: 'var(--destructive-foreground)',
    input:                 'var(--input)',
    border:                'var(--border)',
    ring:                  'var(--ring)',
  },
  spacing: {
    0:  'var(--spacing-0)',
    1:  'var(--spacing-1)',
    2:  'var(--spacing-2)',
    3:  'var(--spacing-3)',
    4:  'var(--spacing-4)',
    5:  'var(--spacing-5)',
    6:  'var(--spacing-6)',
    8:  'var(--spacing-8)',
    10: 'var(--spacing-10)',
    12: 'var(--spacing-12)',
    16: 'var(--spacing-16)',
  },
  radius: {
    sm:   'var(--radius-sm)',
    md:   'var(--radius-md)',
    lg:   'var(--radius-lg)',
    xl:   'var(--radius-xl)',
    '2xl':'var(--radius-2xl)',
    full: 'var(--radius-full)',
  },
  fontSize: {
    xs:   'var(--text-xs)',
    sm:   'var(--text-sm)',
    base: 'var(--text-base)',
    lg:   'var(--text-lg)',
    xl:   'var(--text-xl)',
    '2xl':'var(--text-2xl)',
    '3xl':'var(--text-3xl)',
    '4xl':'var(--text-4xl)',
    '5xl':'var(--text-5xl)',
  },
  fontWeight: {
    normal:   'var(--font-weight-normal)',
    medium:   'var(--font-weight-medium)',
    semibold: 'var(--font-weight-semibold)',
    bold:     'var(--font-weight-bold)',
  },
  fontFamily: {
    sans: 'var(--font-sans)',
    mono: 'var(--font-mono)',
  },
} as const;

/**
 * Noms de thèmes disponibles dans le design system.
 * Correspondance : nom logique → classes CSS à appliquer sur l'élément racine.
 */
export const themeClasses = {
  light:       '',
  dark:        'dark',
  green:       'theme-green',
  greenDark:   'theme-green dark',
  purple:      'theme-purple',
  purpleDark:  'theme-purple dark',
} as const;

export type ThemeName = keyof typeof themeClasses;
