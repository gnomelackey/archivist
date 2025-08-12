import type { Meta, StoryObj } from "@storybook/react";

import { TextArea } from "./TextArea";

const meta = {
  component: TextArea,
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    variant: "outline"
  },
};
