import styled from "@emotion/styled";
import { FieldWrapper } from "./FieldWrapper";
import { focusOutline } from "../../styles/mixins";
import type { BaseFieldProps } from "../../types";
import { useFormContext } from "react-hook-form";
import { getValidationRules } from "../../lib/validation";

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
  const {
    register,
    formState: { errors },
  } = useFormContext();

  if (definition.type.kind !== "text") {
    return null;
  }

  const { variant } = definition.type;

  const validationRules = getValidationRules(definition);

  let inputElement: React.ReactNode;

  switch (variant) {
    case "single-line":
      inputElement = (
        <StyledInput
          id={definition.id}
          type="text"
          placeholder={definition.placeholder}
          {...register(definition.id, validationRules)}
          aria-invalid={errors[definition.id] ? "true" : "false"}
        />
      );
      break;
    case "multi-line":
      inputElement = (
        <StyledTextArea
          id={definition.id}
          placeholder={definition.placeholder}
          {...register(definition.id, validationRules)}
        />
      );
      break;
    case "email":
      inputElement = (
        <StyledInput
          id={definition.id}
          type="email"
          placeholder={definition.placeholder}
          {...register(definition.id, validationRules)}
        />
      );
      break;
    case "password":
      inputElement = (
        <StyledInput
          id={definition.id}
          type="password"
          placeholder={definition.placeholder}
          {...register(definition.id, validationRules)}
        />
      );
      break;
    case "number":
      inputElement = (
        <StyledInput
          id={definition.id}
          type="number"
          placeholder={definition.placeholder}
          {...register(definition.id, validationRules)}
        />
      );
      break;
    default:
      inputElement = (
        <StyledInput
          id={definition.id}
          type="text"
          placeholder={definition.placeholder}
          {...register(definition.id, validationRules)}
        />
      );
  }

  return <FieldWrapper definition={definition}>{inputElement}</FieldWrapper>;
};
