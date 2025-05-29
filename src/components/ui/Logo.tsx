import styled from "@emotion/styled";
import { IconHammer } from "@tabler/icons-react";

const StyledLogo = styled.div(({ theme }) => {
  const { colors, typography } = theme;

  return {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: typography.fontSize["3xl"],
    fontWeight: typography.fontWeight.light,
    textDecoration: "none",

    "& svg": {
      marginLeft: theme.spacing.sm,
      color: colors.primary[300],
    },
  };
});

export const Logo = () => {
  return (
    <StyledLogo>
      <span>FormForge</span> <IconHammer size={40} stroke={1.5} />
    </StyledLogo>
  );
};
