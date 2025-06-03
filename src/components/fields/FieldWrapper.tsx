import styled from "@emotion/styled";
import { useFormContext } from "react-hook-form";

import { Flex } from "../layout";
import { ErrorMessage } from "../ui";

import type { FieldDefinition } from "../../types/field";

interface FieldWrapperProps {
  definition: FieldDefinition;
  children: React.ReactNode;
}

const Label = styled.label(({ theme }) => ({
  fontWeight: theme.typography.fontWeight.semibold,
  textAlign: "left",
  marginBottom: theme.spacing.sm,
}));

const Wrapper = styled.div();

const RequiredMark = styled.span(({ theme }) => ({
  color: theme.colors.error,
  marginLeft: theme.spacing.xs,
}));

export const FieldWrapper: React.FC<FieldWrapperProps> = ({
  definition,
  children,
}) => {
  const {
    formState: { errors },
  } = useFormContext();
  const error = errors[definition.id]?.message as string | undefined;

  const isRequired = definition.validation.some(
    (rule) => rule.type === "required",
  );

  return (
    <Wrapper>
      <Flex direction="column" align="start">
        <Label htmlFor={definition.id}>
          {definition.label}
          {isRequired && <RequiredMark>*</RequiredMark>}
        </Label>

        {definition.description && <div>{definition.description}</div>}

        {children}

        {error && <ErrorMessage>{error}</ErrorMessage>}
      </Flex>
    </Wrapper>
  );
};
