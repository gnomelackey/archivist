import type { Meta, StoryObj } from "@storybook/react";

import { Modal } from "./Modal";
import { Button } from "../Button";

const meta = {
  component: Modal,
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    title: "This is a modal header",
    open: true,
    children: <h2 className="text-primary-surfaceFg">This is modal content</h2>,
    footer: (
      <div className="flex justify-end space-x-2 w-full">
        <Button mode="secondary">Cancel</Button>
        <Button mode="secondary" variant="fill">Confirm</Button>
      </div>
    ),
  },
};
