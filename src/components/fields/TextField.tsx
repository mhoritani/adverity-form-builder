import styled from "@emotion/styled";
import { FieldWrapper } from "./FieldWrapper";
import { focusOutline } from "../../styles/mixins";
import type { BaseFieldProps } from "../../types";

export type TextFieldProps = BaseFieldProps;

const StyledInput = styled.input(({ theme }) => ({
  backgroundColor: theme.colors.background.secondary,
  border: `1px solid ${theme.colors.border.default}`,
  borderRadius: theme.radius.md,
  color: theme.colors.text.primary,
  fontSize: theme.typography.fontSize.sm,
  padding: `${theme.spacing.sm}`,
  width: "100%",
  ...focusOutline(theme),
}));

const StyledTextArea = StyledInput.withComponent("textarea");

export const TextField: React.FC<TextFieldProps> = ({ definition }) => {
  if (definition.type.kind !== "text") {
    return null;
  }

  const { variant } = definition.type;
  const isRequired = definition.validation.some(
    (rule) => rule.type === "required",
  );

  let inputElement: React.ReactNode;

  switch (variant) {
    case "single-line":
      inputElement = (
        <StyledInput
          id={definition.id}
          type="text"
          placeholder={definition.placeholder}
          required={isRequired}
        />
      );
      break;
    case "multi-line":
      inputElement = (
        <StyledTextArea
          id={definition.id}
          placeholder={definition.placeholder}
          required={isRequired}
        />
      );
      break;
    case "email":
      inputElement = (
        <StyledInput
          id={definition.id}
          type="email"
          placeholder={definition.placeholder}
          required={isRequired}
        />
      );
      break;
    case "password":
      inputElement = (
        <StyledInput
          id={definition.id}
          type="password"
          placeholder={definition.placeholder}
          required={isRequired}
        />
      );
      break;
    case "number":
      inputElement = (
        <StyledInput
          id={definition.id}
          type="number"
          placeholder={definition.placeholder}
          required={isRequired}
        />
      );
      break;
    default:
      inputElement = (
        <StyledInput
          id={definition.id}
          type="text"
          placeholder={definition.placeholder}
          required={isRequired}
        />
      );
  }

  return <FieldWrapper definition={definition}>{inputElement}</FieldWrapper>;
};
