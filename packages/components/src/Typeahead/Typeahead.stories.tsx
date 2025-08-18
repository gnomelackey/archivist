import type { Meta, StoryObj } from "@storybook/react";

import { Typeahead } from "./Typeahead";

const meta = {
  component: Typeahead,
} satisfies Meta<typeof Typeahead>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    options: [
      { id: "1", label: "Option 1", value: 1 },
      { id: "2", label: "Option 2", value: 2 },
      { id: "3", label: "Option 3", value: 3 },
    ],
    placeholder: "Select an option",
    variant: "outline"
  },
};
