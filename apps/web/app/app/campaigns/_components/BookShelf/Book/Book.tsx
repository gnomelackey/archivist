import { Maybe } from "@repo/clients";
import Palette from "@repo/theme/palette";

import styles from "./Book.module.css";

function hslFromHex(hex: string) {
  const m = hex.replace("#", "");
  const r = parseInt(m.slice(0, 2), 16) / 255;
  const g = parseInt(m.slice(2, 4), 16) / 255;
  const b = parseInt(m.slice(4, 6), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);

  const l = (max + min) / 2;

  let h = 0;
  let s = 0;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;

    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }

    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

function shade(hex: string, amount: number) {
  const { h, s, l } = hslFromHex(hex);

  const L = Math.max(0, Math.min(100, l + amount));

  return `hsl(${h} ${s}% ${L}%)`;
}

export const Book = ({
  title,
  subtitle,
  width = 100,
  height = 300,
  color = Palette[400],
  foil = Palette[100],
}: {
  title: string;
  subtitle?: Maybe<string>;
  width?: number;
  height?: number;
  color?: string;
  foil?: string;
}) => {
  const spineStyle = {
    "--w": `${width}px`,
    "--h": `${height}px`,
    "--leather": color,
    "--leather-dk": shade(color, -12),
    "--leather-lt": shade(color, 10),
    "--foil": foil,
    "--subtitle-height": `${height / 20}rem`,
  } as React.CSSProperties;

  const subtext = subtitle ? (
    <span className={styles["sub-title"]}>{subtitle}</span>
  ) : null;

  return (
    <div className={styles.book}>
      <div className={styles.spine} style={spineStyle}>
        <div className={styles["book-label"]} data-direction="ttb">
          <span className={styles.title}>{title}</span>
          {subtext}
        </div>
      </div>
    </div>
  );
};
