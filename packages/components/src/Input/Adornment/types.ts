import { InputProps } from "../types";

export type AdornmentProps = {
  icon?: InputProps["icon"];
  button?: boolean;
  show: boolean;
  setShow: (show: boolean) => void;
};
