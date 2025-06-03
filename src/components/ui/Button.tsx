import styled from "@emotion/styled";
import { focusOutline } from "../../styles/mixins";

import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
}

const StyledButton = styled.button(({ theme }) => {
  const { colors, radius, spacing, typography } = theme;

  return {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    borderRadius: radius.sm,
    fontWeight: typography.fontWeight.semibold,
    border: 0,
    cursor: "pointer",
    appearance: "none" as const,
    padding: `${spacing.sm} ${spacing.md}`,
    fontSize: typography.fontSize.sm,
    backgroundColor: colors.primary[500],
    backgroundImage: `linear-gradient(to right, ${colors.gradient.primary.from}, ${colors.gradient.primary.to})`,
    color: colors.text.primary,

    "&:hover": {
      backgroundImage: `linear-gradient(to right, ${colors.gradient.primaryHover.from}, ${colors.gradient.primaryHover.to})`,
    },

    ...focusOutline(theme),
  };
});

export const Button = ({ icon, children, ...props }: ButtonProps) => (
  <StyledButton {...props}>
    {icon && icon}
    <span>{children}</span>
  </StyledButton>
);
