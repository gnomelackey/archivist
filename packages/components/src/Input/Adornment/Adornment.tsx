import { IconButton } from "../../IconButton";
import { Iconography } from "../../Iconography";
import type { AdornmentProps } from "./types";

export const Adornment = ({ icon, button, show, setShow }: AdornmentProps) => {
  if (!button && !icon) {
    return null;
  }

  if (!button && icon) {
    return (
      <div className="absolute inset-y-0 right-0 flex items-center pr-4">
        <Iconography {...icon} />
      </div>
    );
  }

  const size = icon?.size ?? 2;
  const label = show ? "Hide password" : "Show password";

  const iconContent = show ? icon?.name : (icon?.alt ?? icon?.name);
  const defaultContent = show ? "hide" : "show";
  const content = icon ? (iconContent ?? defaultContent) : defaultContent;

  return (
    <div className="absolute inset-y-0 right-0 flex items-center pr-4">
      <IconButton
        size={size}
        type="button"
        icon={content}
        aria-label={label}
        onClick={() => setShow(!show)}
      />
    </div>
  );
};
