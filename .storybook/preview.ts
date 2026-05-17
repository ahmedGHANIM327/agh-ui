import type { Preview } from '@storybook/react-vite';
// @ts-ignore
import '../src/index.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo'
    }
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme || 'blue';
      const mode = context.globals.mode || 'light';

      // Appliquer les classes au root
      const root = document.documentElement;
      root.className = `theme-${theme} ${mode === 'dark' ? 'dark' : ''}`;

      const sbMain = document.querySelector('.sb-show-main') as HTMLElement;
      if (sbMain) {
        sbMain.style.setProperty("background", "var(--background)", "important");
        sbMain.style.setProperty("color", "var(--foreground)", "important");
      }

      // sbdocs-preview
      const sbPreviews = document.querySelectorAll('.docs-story');
      if (sbPreviews) {
        for(const preview of sbPreviews) {
          const sbPreview = preview as HTMLElement;
          sbPreview.style.setProperty("background", "var(--background)", "important");
          sbPreview.style.setProperty("color", "var(--foreground)", "important");
        }
      }

      return Story();
    },
  ],
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'blue',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: ['blue', 'green', 'purple'],
        dynamicTitle: true,
      },
    },
    mode: {
      description: 'Color mode',
      defaultValue: 'light',
      toolbar: {
        title: 'Mode',
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
  },
};

export default preview;
