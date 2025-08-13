export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "text" | "fill" | "outline";
  mode?: "primary" | "secondary";
  size?: "xSmall" | "small" | "medium" | "large" | "xLarge";
  isLoading?: boolean;
};
