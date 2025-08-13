import type { Preview } from "@storybook/react-webpack5";
import Palette from "@repo/theme/palette";

import "../styles/index.css";

const preview: Preview = {
  parameters: {
    backgrounds: {
      options: {
        dark: { name: "dark", value: Palette[400] },
      },
    },
  },
  initialGlobals: {
    backgrounds: { value: "dark" },
  },
};

export default preview;
