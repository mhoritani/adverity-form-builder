import styled from "@emotion/styled";
import { IconHammer } from "@tabler/icons-react";

const StyledLogo = styled.div(({ theme }) => {
  const { colors, typography } = theme;

  return {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: `calc(${typography.fontSize["3xl"]} * 1.5)`,
    fontWeight: typography.fontWeight.light,
    textDecoration: "none",

    "& svg": {
      marginLeft: theme.spacing.sm,
      color: colors.primary[500],
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
