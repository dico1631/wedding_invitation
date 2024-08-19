import { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Button } from "@/components/basics/Button";

export default {
  title: "Components/Button",
  component: Button,
  argTypes: {
    primary: {
      control: "boolean",
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
    },
    label: {
      control: "text",
    },
    onClick: {
      action: "clicked",
      control: false,
    },
  },
} as Meta<typeof Button>;

type Story = StoryObj<typeof Button>;

export const primary: Story = {
  args: {
    primary: true,
    size: "small",
    label: "버튼버튼",
    onClick: action("Button-click"),
  },
};
