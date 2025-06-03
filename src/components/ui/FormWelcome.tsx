import styled from "@emotion/styled";
import { IconCircleDotted } from "@tabler/icons-react";

import { theme } from "../../styles/theme";

const WelcomeContainer = styled.div(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: theme.spacing.lg,
  padding: theme.spacing.xl,

  h3: {
    color: theme.colors.text.primary,
    fontSize: theme.typography.fontSize["2xl"],
    fontWeight: theme.typography.fontWeight.light,
  },
}));

export const FormWelcome = () => (
  <WelcomeContainer>
    <h3>Please select a form above to get started</h3>
    <IconCircleDotted size={70} color={theme.colors.text.muted} stroke={1.5} />
  </WelcomeContainer>
);
