import type { Meta, StoryObj } from "@storybook/react";

import { Iconography } from "./Iconography";
import type { IconographyProps } from "./types";

type StorybookIconographyProps = Omit<IconographyProps, "name">;

const StoryBoardPlayground = ({ ...args }: StorybookIconographyProps) => {
  return (
    <div className="flex screen gap-10 flex-wrap">
      <Iconography {...args} name="add" />
      <Iconography {...args} name="bannerCheck" />
      <Iconography {...args} name="bannerMinus" />
      <Iconography {...args} name="show" />
      <Iconography {...args} name="hide" />
      <Iconography {...args} name="save" />
      <Iconography {...args} name="search" />
      <Iconography {...args} name="skull" />
      <Iconography {...args} name="clear" />
    </div>
  );
};

const meta = {
  component: Iconography,
  argTypes: {
    name: {
      control: false,
    },
    color: {
      control: "select",
      options: [
        "DEFAULT",
        "50",
        "100",
        "200",
        "300",
        "400",
        "500",
        "600",
        "bg",
        "fg",
        "surfaceBg",
        "surfaceFg",
        "border",
      ],
    },
    variant: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "success",
        "info",
        "error",
        "backgrounds",
      ],
    },
  },
} satisfies Meta<typeof Iconography>;

export default meta;
type Story = StoryObj<StorybookIconographyProps>;

export const Playground: Story = {
  args: {
    size: 5,
  },
  render: (args) => {
    return <StoryBoardPlayground {...args} />;
  },
};
