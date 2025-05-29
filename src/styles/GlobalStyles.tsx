import { Global } from "@emotion/react";
import { theme } from "./theme";

export const GlobalStyles = () => {
  const { colors, typography } = theme;

  return (
    <Global
      styles={{
        "*": {
          boxSizing: "border-box",
          margin: 0,
          padding: 0,
        },
        html: {
          background: colors.background.primary,
          color: colors.text.primary,
          fontFamily: typography.fontFamily.body,
          fontSize: typography.fontSize.base,
          lineHeight: typography.lineHeight.normal,
        },
        body: {
          background: colors.background.primary,
          minHeight: "100vh",
        },
        button: {
          fontFamily: "inherit",
        },
        input: {
          fontFamily: "inherit",
        },
        textarea: {
          fontFamily: "inherit",
        },
        select: {
          fontFamily: "inherit",
        },
      }}
    />
  );
};
