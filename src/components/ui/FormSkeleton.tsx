import styled from "@emotion/styled";
import { Flex } from "../layout";

export const StyledSkeleton = styled.div<{ width?: string; height?: string }>(
  ({ width = "100%", height = "36px", theme }) => ({
    width,
    height,
    borderRadius: theme.radius.sm,
    background: `linear-gradient(90deg, ${theme.colors.background.secondary} 25%, ${theme.colors.background.tertiary} 50%, ${theme.colors.background.secondary} 75%)`,
    backgroundSize: "200% 100%",
    animation: "swoop 1.2s ease-in-out infinite",
    marginBottom: theme.spacing.sm,
    "@keyframes swoop": {
      "0%": { backgroundPosition: "200% 0" },
      "100%": { backgroundPosition: "-200% 0" },
    },
  }),
);

const FormWrapper = styled.div(({ theme }) => ({
  marginTop: theme.spacing.md,
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing.lg,
  padding: theme.spacing.lg,
  border: `1px solid ${theme.colors.border.default}`,
  borderRadius: theme.radius.md,
}));

export const FormSkeleton = () => (
  <Flex direction="column">
    <StyledSkeleton width="30%" height="36px" />
    <StyledSkeleton width="25%" height="24px" />

    <FormWrapper>
      {[...Array(4)].map((_, i) => (
        <div key={i}>
          <StyledSkeleton width="30%" height="32px" />
          <StyledSkeleton width="100%" height="36px" />
        </div>
      ))}

      <StyledSkeleton width="100%" height="34px" />
    </FormWrapper>
  </Flex>
);
