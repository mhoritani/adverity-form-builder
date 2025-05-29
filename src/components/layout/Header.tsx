import styled from "@emotion/styled";
import { Logo } from "../ui/Logo";
import { Flex } from "./Flex";

const StyledHeader = styled.header(({ theme }) => ({
  marginBottom: theme.spacing.xl,
  "& p": {
    color: theme.colors.text.muted,
  },
}));

export const Header = () => (
  <StyledHeader>
    <Flex direction="column" align="center" justify="center" gap={16}>
      <Logo />
      <h2>Schema-Driven Form Generator</h2>
      <p>Select a form type to generate a dynamic form based on JSON schema</p>
    </Flex>
  </StyledHeader>
);
