import styled from "@emotion/styled";
import { IconExclamationCircle } from "@tabler/icons-react";

import { Flex } from "../layout";

import type { PropsWithChildren } from "react";
import { theme } from "../../styles/theme";

const StyledError = styled.div(({ theme }) => ({
  color: theme.colors.error,
  padding: theme.spacing.sm,
  paddingBottom: 0,
  fontSize: theme.typography.fontSize.xs,
}));

export const ErrorMessage: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <StyledError>
      <Flex align="center" gap={theme.spacing.xs}>
        <IconExclamationCircle size={12} />
        {children}
      </Flex>
    </StyledError>
  );
};
