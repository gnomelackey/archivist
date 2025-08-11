import type { Preview } from "@storybook/react-webpack5";

import "../src/index.css";

const preview: Preview = {
  parameters: {
        backgrounds: {
      options: {
        dark: { name: 'Dark', value: '#2D2424' },
      },
    },
  },
  initialGlobals: {
    backgrounds: { value: "dark" },
  },
};

export default preview;
