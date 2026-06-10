import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { themeClasses, type ThemeName } from '../../tokens';

interface ThemeContextValue {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export interface ThemeProviderProps {
  children: ReactNode;
  /**
   * Thème appliqué par défaut.
   * @default 'light'
   */
  defaultTheme?: ThemeName;
  /**
   * Si true, les classes de thème sont appliquées sur `document.documentElement`
   * (comportement global). Sinon elles sont appliquées sur un wrapper <div>.
   * @default false
   */
  global?: boolean;
}

/**
 * Fournisseur de thème pour le design system.
 *
 * Usage global (recommandé pour une app mono-thème) :
 * ```tsx
 * <ThemeProvider defaultTheme="purple" global>
 *   <App />
 * </ThemeProvider>
 * ```
 *
 * Usage scopé (plusieurs thèmes dans la même page) :
 * ```tsx
 * <ThemeProvider defaultTheme="green">
 *   <Section />
 * </ThemeProvider>
 * ```
 */
export const ThemeProvider = ({
  children,
  defaultTheme = 'light',
  global = false,
}: ThemeProviderProps) => {
  const [theme, setTheme] = useState<ThemeName>(defaultTheme);

  // Mode global : applique les classes sur <html>
  useEffect(() => {
    if (!global) return;

    const root = document.documentElement;

    // Supprimer toutes les classes de thème existantes
    Object.values(themeClasses)
      .flatMap((cls) => cls.split(' '))
      .filter(Boolean)
      .forEach((cls) => root.classList.remove(cls));

    // Appliquer le nouveau thème
    themeClasses[theme]
      .split(' ')
      .filter(Boolean)
      .forEach((cls) => root.classList.add(cls));
  }, [theme, global]);

  const wrapperClasses = !global ? themeClasses[theme] : undefined;

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {global ? (
        children
      ) : (
        <div className={wrapperClasses || undefined} style={{ display: 'contents' }}>
          {children}
        </div>
      )}
    </ThemeContext.Provider>
  );
};

/**
 * Hook pour accéder au thème actif et le modifier.
 * Doit être utilisé dans un descendant de `ThemeProvider`.
 */
// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = (): ThemeContextValue => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider');
  return ctx;
};
