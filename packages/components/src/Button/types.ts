export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "text" | "fill" | "outline";
  size?: "small" | "medium" | "large";
  isLoading?: boolean;
};