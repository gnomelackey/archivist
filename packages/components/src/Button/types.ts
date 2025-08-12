export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "text" | "fill" | "outline";
  size?: "xSmall" | "small" | "medium" | "large" | "xLarge";
  isLoading?: boolean;
};
