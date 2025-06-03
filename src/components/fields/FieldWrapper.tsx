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

  const isCheckbox = definition.type.kind === "checkbox";

  return (
    <Wrapper>
      <Flex
        direction={isCheckbox ? "row-reverse" : "column"}
        align={isCheckbox ? "center" : "start"}
        gap={isCheckbox ? "8px" : undefined}
        justify={isCheckbox ? "flex-end" : undefined}
      >
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
