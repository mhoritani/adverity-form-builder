import styled from "@emotion/styled";
import { Button } from "./Button";
import { Flex } from "../layout";
import { theme } from "../../styles/theme";
import { IconRefresh } from "@tabler/icons-react";

interface FetchErrorProps {
  error: Error;
  onRetry: () => void;
}

const ErrorContainer = styled.div(({ theme }) => ({
  background: theme.colors.background.secondary,
  border: `1px solid ${theme.colors.error}`,
  borderRadius: theme.radius.md,
  padding: theme.spacing.lg,
  color: theme.colors.error,
  maxWidth: 480,
  margin: "0 auto",
  textAlign: "center",
}));

const ErrorCodeBlock = styled.pre(({ theme }) => ({
  background: theme.colors.background.tertiary,
  color: theme.colors.error,
  borderRadius: theme.radius.sm,
  padding: theme.spacing.sm,
  margin: `${theme.spacing.md} 0`,
  fontSize: theme.typography.fontSize.sm,
}));

export const FetchError: React.FC<FetchErrorProps> = ({ error, onRetry }) => (
  <ErrorContainer>
    <Flex direction="column" align="center" gap={theme.spacing.md}>
      <h3>Ooops, something went wrong!</h3>
      <img
        src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExNnQ2eGkxa3pnaGN0MG5ydWpjbG4zeXk4c3B6ZG56Z3JwaXN6ZGRuaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/hyyV7pnbE0FqLNBAzs/giphy.gif"
        alt="Error"
        style={{ width: 180, borderRadius: theme.radius.md }}
      />
      <ErrorCodeBlock>{error.message}</ErrorCodeBlock>
      <Button icon={<IconRefresh size={18} />} onClick={onRetry}>
        Retry
      </Button>
    </Flex>
  </ErrorContainer>
);
