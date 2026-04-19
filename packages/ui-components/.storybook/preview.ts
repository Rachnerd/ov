import type { Preview, StoryContext, PartialStoryFn } from '@storybook/web-components';
import { addons } from '@storybook/preview-api';
import type { TemplateResult } from 'lit';
import '@ov/style';

const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

const applyTheme = (theme: string) => {
  document.documentElement.setAttribute('data-theme', theme);
};

// In docs/autodocs mode, the decorator doesn't re-run on toolbar changes.
// Listen to the channel directly so theme toggles always take effect.
try {
  addons.getChannel().on('globalsUpdated', ({ globals }: { globals: Record<string, unknown> }) => {
    applyTheme((globals['theme'] as string) ?? (systemDark ? 'dark' : 'light'));
  });
} catch {
  // channel not available in all render contexts
}

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Color theme',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: systemDark ? 'dark' : 'light',
  },
  decorators: [
    (story: PartialStoryFn, context: StoryContext): TemplateResult => {
      const theme = (context.globals['theme'] as string) ?? (systemDark ? 'dark' : 'light');
      applyTheme(theme);
      return story() as TemplateResult;
    },
  ],
  parameters: {
    backgrounds: { disable: true },
    layout: 'padded',
  },
};

export default preview;
