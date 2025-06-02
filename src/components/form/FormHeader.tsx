import styled from "@emotion/styled";
import { Flex } from "../layout/Flex";
import { theme } from "../../styles/theme";

interface FormHeaderProps {
  title: string;
  description?: string;
}

const StyledFormHeader = styled.div(({ theme }) => ({
  marginBottom: theme.spacing.md,
}));

export const FormHeader: React.FC<FormHeaderProps> = ({
  title,
  description,
}) => (
  <StyledFormHeader>
    <Flex direction="column" gap={theme.spacing.xs} align="flex-start">
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </Flex>
  </StyledFormHeader>
);
