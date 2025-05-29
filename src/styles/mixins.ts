import type { Theme } from "@emotion/react";
import type { CSSObject } from "@emotion/styled";

export const focusOutline = (theme: Theme): CSSObject => {
  const { colors, radius } = theme;

  return {
    "&:focus-visible": {
      outline: `2px solid ${colors.primary[500]}`,
      outlineOffset: "2px",
      borderRadius: radius.sm,
    },
  };
};
