import type { Preview } from "@storybook/react-webpack5";
import Theme from "@repo/theme";

import "../styles/index.css";

const preview: Preview = {
  parameters: {
    backgrounds: {
      options: {
        dark: { name: "dark", value: Theme.backgrounds.DEFAULT },
      },
    },
  },
  initialGlobals: {
    backgrounds: { value: "dark" },
  },
};

export default preview;
