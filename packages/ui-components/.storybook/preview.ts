import type { Preview, StoryContext, PartialStoryFn } from '@storybook/web-components';
import type { TemplateResult } from 'lit';
import '@ov/style';

const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

const applyTheme = (theme: string) => {
  document.documentElement.setAttribute('data-theme', theme);
};

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
