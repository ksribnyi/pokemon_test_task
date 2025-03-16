import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming/create';

const customTheme = create({
  base: 'dark',
  brandTitle: 'Luna Edge',
  brandImage: '/LunaEdgeLogo.svg',
});

addons.register('custom-theme', () => {
  addons.setConfig({
    theme: customTheme,
  });
});
