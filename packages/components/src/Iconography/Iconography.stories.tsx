import type { Meta, StoryObj } from "@storybook/react";

import { Iconography } from "./Iconography";

const meta = {
  component: Iconography,
} satisfies Meta<typeof Iconography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    name: "show",
  },
};
