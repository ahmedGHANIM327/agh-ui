/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        destructive: {
          DEFAULT: 'var(--destructive)',
          foreground: 'var(--destructive-foreground)',
        },
        input: 'var(--input)',
        border: 'var(--border)',
        ring: 'var(--ring)',
      },
      borderRadius: {
        sm:     'var(--radius-sm)',
        DEFAULT:'var(--radius-md)',
        md:     'var(--radius-md)',
        lg:     'var(--radius-lg)',
        xl:     'var(--radius-xl)',
        '2xl':  'var(--radius-2xl)',
        full:   'var(--radius-full)',
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
        mono: ['var(--font-mono)'],
      },
      fontSize: {
        xs:    ['var(--text-xs)',   { lineHeight: 'var(--text-xs--line-height)' }],
        sm:    ['var(--text-sm)',   { lineHeight: 'var(--text-sm--line-height)' }],
        base:  ['var(--text-base)', { lineHeight: 'var(--text-base--line-height)' }],
        lg:    ['var(--text-lg)',   { lineHeight: 'var(--text-lg--line-height)' }],
        xl:    ['var(--text-xl)',   { lineHeight: 'var(--text-xl--line-height)' }],
        '2xl': ['var(--text-2xl)', { lineHeight: 'var(--text-2xl--line-height)' }],
        '3xl': ['var(--text-3xl)', { lineHeight: 'var(--text-3xl--line-height)' }],
        '4xl': ['var(--text-4xl)', { lineHeight: 'var(--text-4xl--line-height)' }],
        '5xl': ['var(--text-5xl)', { lineHeight: 'var(--text-5xl--line-height)' }],
      },
      fontWeight: {
        normal:   'var(--font-weight-normal)',
        medium:   'var(--font-weight-medium)',
        semibold: 'var(--font-weight-semibold)',
        bold:     'var(--font-weight-bold)',
      },
    },
  },
};
